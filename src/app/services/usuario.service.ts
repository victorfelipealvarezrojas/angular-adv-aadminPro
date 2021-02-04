import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';//operadores que se usan con observables(programacion reactiva) y tap`dispara acciones o eventos secundarios(efectos)
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { loginForm, resultLogin, resultLoginGoogle, resultReviewToken } from '../interface/login-form.interface';
import { RegisterForm, Registerresult, ICargarUsuario } from '../interface/register-form.interface';
import { Usuario } from '../models/usuario.models';

//contiene las URL(base) de la API 
const base_url = environment.base_url;
//pertenece a la autenticacion con gogle
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;//google_Auth
  public _usuario: Usuario;
  //importo HttpClient que me permite realizar peticiones HTTP
  constructor(
    private _http: HttpClient,
    private router: Router,
    private NgZone: NgZone//para mantener el foco en angular(se pierde el foco al implementyar hoohle_Auth)
  ) {
    this.googleInit();//ejecuto la promesa qie inicializa la funcionalidad de google
  }

  get Token(): string {
    return localStorage.getItem('token-user') || '';
  }

  get uid(): string {
    return this._usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.Token
      }
    }
  }

  googleInit() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '514795340874-k3v4j46247tgt59b1lgigu4p836d5d8d.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });
        resolve(this.auth2);
      });
    })
  }

  crearUsuario(frmData: RegisterForm) {
    return this._http.post(`${base_url}/usuario`, frmData).pipe(
      tap((resultadoPeticion: Registerresult) => {
        localStorage.setItem('token-user', resultadoPeticion.token);
      })
    );
  }

  actualizarPerfil(formData: { email: string, nombre: string, rol: string }) {

    formData = {
      ...formData,
      rol: this._usuario.rol
    }

    return this._http.put(`${base_url}/usuario/${this.uid}`, formData, this.headers );
  }

  loginGoogle(token: string) {
    return this._http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resultadoPeticion: resultLoginGoogle) => {
        localStorage.setItem('token-user', resultadoPeticion.tokenId);
      })
    );
  }

  loginUsuario(frmData: loginForm) {
    return this._http.post(`${base_url}/login`, frmData).pipe(
      tap((resultadoPeticion: resultLogin) => {
        localStorage.setItem('token-user', resultadoPeticion.token);
      })
    );
  }

  //Nota: Al hacer logout el vboton de google desaparece y para evitar que seo ocurra tengo que usar NgZone encapsulando la redireccion
  //y esto ocurre xq la autentificacion de google no pertenece a angular y es alñgo que ocurre fuera
  logout() {
    localStorage.removeItem('token-user');
    this.auth2.signOut().then(() => {
      this.NgZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  reviewToken(): Observable<boolean> {
    return this._http.get(`${base_url}/login/review`, {
      headers: {
        'x-token': this.Token
      }
    }).pipe(
      tap((resultadoPeticion: resultReviewToken) => {
        const { email, google, imagen, nombre, rol, uid } = resultadoPeticion.usuario;
        this._usuario = new Usuario(nombre, email, '', rol, google, imagen, uid);
        localStorage.setItem('token-user', resultadoPeticion.token);
      }),
      map((respuesta) => true),
      catchError(error => of(false))//of(false) me permite crear un obserbale en base al valor dentro de of(), enn este caso un false
      //es un observable que captura el erro y retorna un false.
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuario?desde=${desde}`;
    return this._http.get<ICargarUsuario>(url, this.headers).pipe(
      map(res => {
        const usuario = res.usuario.map(usuario => new Usuario
          (
            usuario.nombre,
            usuario.email,
            '',
            usuario.rol,
            usuario.google,
            usuario.imagen,
            usuario.uid
          )
        );

        return {
          tolal_registros: res.tolal_registros,
          usuario
        };
      })
    )
  }

  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuario/${usuario.uid}`;
    return this._http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this._http.put(`${base_url}/usuario/${usuario.uid}`, usuario, this.headers);
  }


}


