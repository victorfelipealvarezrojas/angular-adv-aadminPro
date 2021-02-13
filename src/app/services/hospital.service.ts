import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospitales.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  constructor(
    private _http: HttpClient,//consumir servicios de la api
    private router: Router,//navega entre rutas
    private NgZone: NgZone//para mantener el foco en angular(se pierde el foco al implementyar hoohle_Auth)
  ) { }

  //me permite obtener el token de la secion actual 
  get Token(): string {
    return localStorage.getItem('token-user') || '';
  }

  //header de la peticiones que requieran token
  get headers() {
    return {
      headers: {
        'x-token': this.Token
      }
    }
  }

  cargarHospitales() {
    const url = `${base_url}/hospital`;
    return this._http.get(url, this.headers)
      .pipe(
        map((respuesta: { ok: boolean, hospital: Hospital[] }) => respuesta.hospital)
        
      )
  }

  crearHospital(nombre: string) {
    const url = `${base_url}/hospital`;
    return this._http.post(url, { nombre }, this.headers);
  }

  actualizarHospital(_id: string, nombre: string) {
    console.log(_id,nombre);
    const url = `${base_url}/hospital/${_id}`;
    return this._http.put(url, { nombre }, this.headers);
  }

  eliminarHospital(_id: string) {
    const id = _id;
    const url = `${base_url}/hospital/${id}`;
    return this._http.delete(url, this.headers);
  }


}




