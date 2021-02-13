import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Medico } from '../../../models/medicos.models';
import { MedicoService } from '../../../services/medico.service';
import { BusquedaService } from '../../../services/busqueda.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public MedicosList: Medico[] = [];
  public Cargando: boolean = true;
  public imgSubs: Subscription;//carga de imagen con fuencion reactiva

  constructor(
    private _medicoService: MedicoService,
    private _modalImagenService: ModalImagenService,
    private _busquedasService: BusquedaService
  ) { }

  ngOnDestroy(): void {
     this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargaMedicos();

    //me subscribo al emit del modal-imagen-service el cual indica q ue ocurrio un cambio en la carga de imagen en el servicio del modal
    //y de esta forma puedo actualizar el icono de la imagen en la tabla de hospitales
    this.imgSubs = this._modalImagenService.nuevaImagenEvent
      //no alcanzaba a actualizar la imagen asi que le doy un tiempo de espera
      .pipe(delay(1000))
      .subscribe(() => this.cargaMedicos());
  }

  //llama funcion de abrir modal que se encuentra dentro del servicio del modal
  abrirModal(medico: Medico) {
    console.log(medico)
    this._modalImagenService.abrirModal('medicos', medico.id, medico.imagen);
  }

  cargaMedicos() {
    this.Cargando = true;
    this._medicoService.cargarMedicos().subscribe(resultado => {
      this.MedicosList = resultado;
      this.Cargando = false;
    });
  }

    
  Buscar(termino: string) {
    if (termino.length === 0) {
       return this.cargaMedicos();
    }

    this._busquedasService.buscar('medicos', termino).subscribe(resultado => {
      this.MedicosList = resultado
    });
  }



  eliminarMedico(medico: Medico) {


    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar al medico ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '!Si, deseo eliminarlo!'

    }).then((result) => {

      if (result.isConfirmed) {
        this._medicoService.eliminarMedico(medico.id).subscribe(() => {
            this.cargaMedicos();
            Swal.fire(
              'Medico eliminado',
              `${medico.nombre} fue eliminado`,
              "success"
            )
          });
      }
    })
  }

}
