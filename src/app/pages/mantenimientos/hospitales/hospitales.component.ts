import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital, HospitalResultado } from '../../../models/hospitales.models';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedaService } from '../../../services/busqueda.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})

export class HospitalesComponent implements OnInit, OnDestroy {

  public HospitalesList: Hospital[] = [];
  public Cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private _hospitalService: HospitalService,
    private _modalImagenService: ModalImagenService,
    private busquedasService: BusquedaService
  ) { }

  ngOnDestroy(): void {
    //elimino la subscripcion o siempre quedara activo y se crearan multiples instacias.
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    //me subscribo al emit del modal-imagen-service el cual indica q ue ocurrio un cambio en la carga de imagen en el servicio del modal
    //y de esta forma puedo actualizar el icono de la imagen en la tabla de hospitales
    this.imgSubs = this._modalImagenService.nuevaImagenEvent
      //no alcanzaba a actualizar la imagen asi que le doy un tiempo de espera
      .pipe(delay(1000))
      .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.Cargando = true;
    this._hospitalService.cargarHospitales().subscribe(hospitales => {
      this.Cargando = false;
      this.HospitalesList = hospitales;
      console.log(this.HospitalesList)
    });
  }

  guardarcambios(hospital: HospitalResultado) {

    this._hospitalService.actualizarHospital(hospital.id, hospital.nombre)
      .subscribe(() => {
        Swal.fire(
          'Usuario actualizado',
          `${hospital.nombre} fue actualizado`,
          "success"
        )
      });
  }

  eliminarHospital(hospital: HospitalResultado) {

    this._hospitalService.eliminarHospital(hospital.id)
      .subscribe(() => {
        this.cargarHospitales();
        Swal.fire(
          'Borrado',
          `${hospital.nombre} fue Eliminado`,
          "success"
        )
      });
  }

  async abrirSwalAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      confirmButtonText: 'Guardar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })
    if (value.length > 0) {
      this._hospitalService.crearHospital(value).subscribe((respuesta: any) => {
        this.HospitalesList.push(respuesta.hospital)
        console.log(respuesta);
      })
    }
  }

  //llama funcion de abrir modal que se encuentra dentro del servicio del modal
  abrirModal(hospital: HospitalResultado) {
    this._modalImagenService.abrirModal('hospitales', hospital.id, hospital.imagen);
  }

  
  Buscar(termino: string) {
    if (termino.length === 0) {
       return this.cargarHospitales();
    }

    this.busquedasService.buscar('hospitales', termino).subscribe(resultado => {
      this.HospitalesList = resultado
    });
  }


}


