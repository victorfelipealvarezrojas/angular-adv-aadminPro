import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Medico } from '../models/medicos.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private _http: HttpClient,//consumir servicios de la api
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

  cargarMedicos() {
    const url = `${base_url}/medico`;
    return this._http.get(url, this.headers)
      .pipe(
        map((respuesta: { ok: boolean, medicos: Medico[] }) => respuesta.medicos)
      )
  }

  
  cargarMedicosxId(id: string) {
    const url = `${base_url}/medico/${id}`;
    return this._http.get(url, this.headers)
      .pipe(
        map((respuesta: { ok: boolean, medico: Medico[] }) => respuesta.medico)
      )
  }

  crearMedico(medico: { nombre: string, hospital: string }) {
    const url = `${base_url}/medico`;
    return this._http.post(url, medico, this.headers);
  }

  actualizarMedico(medico: any) {
    const url = `${base_url}/medico/${medico.id}`;
    return this._http.put(url, medico, this.headers);
  }

  eliminarMedico(_id: string) {
    const id = _id;
    const url = `${base_url}/medico/${id}`;
    return this._http.delete(url, this.headers);
  }

}
