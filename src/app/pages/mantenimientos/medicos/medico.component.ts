import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { Hospital } from '../../../models/hospitales.models';
import { HospitalService } from '../../../services/hospital.service';
import { Medico } from '../../../models/medicos.models';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public MedicoForm: FormGroup;
  public Hospitales: Hospital[] = [];
  public HospitSeleccionado: Hospital;
  public MedicoSeleccionado: Medico;//cuande llege por edicion con un id en la url aqui almacenare el medico y sus propiedades

  constructor(
    private fb: FormBuilder,
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private router: Router,
    private _activateRoute: ActivatedRoute//me permite obtener el parametro id por la URL
  ) { }

  ngOnInit(): void {
    //obtengo el id del medico para cargar sus datos en pantalla
    this._activateRoute.params.subscribe(({ id, nombre, hospital }) => this.cargarMedico(id));

    this.MedicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();
    //como estoy trabajando co formularios reacrtivos puedo est<r pendeinte a un campo en especifico
    //valueChanges ers un observable al cual me puedo subscribir y en esteb caso me tgrae el value del select(id)
    this.MedicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      //obtengo informacion del hospital de mi array en memoria
      this.HospitSeleccionado = this.Hospitales.find((h: any) => h.id === hospitalId);
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
      this.Hospitales = hospitales;
    });
  }

  cargarMedico(id: string) {
    if(id === 'nuevo'){
      //si es nuevo no esta modificando nada 
      return;
    }
    //delay para que de tiempo en la carga de imagen del hospital
    this._medicoService.cargarMedicosxId(id).pipe(delay(100)).subscribe((medico: any) => {
      //si el medico noe xiste me voy  amedicos
      if(!medico){
        return   this.router.navigateByUrl(`/dashboard/medicos`);
      }
      //desestructuro el contyenido que se visualizara en el text del nombre y select del hospital que funciona x id
      const { nombre, hospital: { _id } } = medico;
      //lleno medico seleccionado el cual utuilizo en el html para visualizar datos del medico MedicoSeleccionado.imagen
      this.MedicoSeleccionado = medico;
      //seteo valores de mi formulario con los que retorna la api
      this.MedicoForm.setValue({ nombre, hospital: _id })
    });
  }

  guardarMedico() {
    const { nombre } = this.MedicoForm.value;
    if (this.MedicoSeleccionado) {
      //modificar
      const data = {
        ...this.MedicoForm.value,//contiene id del hospital seleccionado y el nombre del medico
        id: this.MedicoSeleccionado.id//necesito incorporar el id del medico que modificare
      }
      this._medicoService.actualizarMedico(data).subscribe(() => {
        Swal.fire(
          'Medico actualizado',
          `El medico ${nombre} fue actualizado`,
          "success"
        )
      });
    } else {
      //crear
      this._medicoService.crearMedico(this.MedicoForm.value).subscribe((respuesta: any) => {
        Swal.fire(
          'Medico creado',
          `El medico ${nombre} fue creado`,
          "success"
        )
        this.router.navigateByUrl(`/dashboard/medico/${respuesta.medico.id}`)
      });
    }
  }
}
