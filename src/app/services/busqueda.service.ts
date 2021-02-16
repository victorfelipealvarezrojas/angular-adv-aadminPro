import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.models';
import { Medico } from '../models/medicos.models';
import { Usuario } from '../models/usuario.models';

//contiene las URL(base) de la API
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})

export class BusquedaService {

  public _usuario: Usuario;

  constructor(
    private _http: HttpClient
  ) { }

  get Token(): string {
    return localStorage.getItem('token-user') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.Token
      }
    }
  }

  private transfromaUsuarios(resultado: any[]): Usuario[] {
    return resultado.map(
      _usuario => new Usuario
                    (
                      _usuario.nombre,
                      _usuario.email,
                      '',
                      _usuario.rol,
                      _usuario.google,
                      _usuario.imagen,
                      _usuario.uid
                    )
    );
  }

  private transfromaHospitales(resultado: any[]): Hospital[] {
    return resultado;
  }

  private transfromaMedicos(resultado: any[]): Medico[] {
    return resultado;
  }


  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this._http.get<any[]>(url, this.headers).pipe(
      map((respuesta: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transfromaUsuarios(respuesta.resultado)
            break;
          case 'medicos':
            return this.transfromaMedicos(respuesta.resultado)
            break;
          case 'hospitales':
            return this.transfromaHospitales(respuesta.resultado)
            break;

          default:
            return [];
        }
      })
    );
  }

  busquedasGlobales(texto: string){
    const url = `${base_url}/todo/${texto}`;
    return this._http.get(url, this.headers);

  }




}

