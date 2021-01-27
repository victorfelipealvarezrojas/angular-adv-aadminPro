import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';//operadores que se usan con observables(programacion reactiva) y tap`dispara acciones o eventos secundarios(efectos)
import { environment } from '../../environments/environment';
import { loginForm, resultLogin, resultLoginGoogle } from '../interface/login-form.interface';
import { RegisterForm, Registerresult } from '../interface/register-form.interface';

//contiene las URL(base) de la API 
const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  public auth2: any;

  //importo HttpClient que me permite realizar peticiones HTTP
  constructor(
    private _http: HttpClient,
    private router: Router,
    private NgZone: NgZone
  ) {
    this.googleInit();//ejecuto la promesa qie inicializa la funcionalidad de google
  }

  googleInit() {
    return new Promise( resolve => {
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

  loginUsuario(frmData: loginForm) {
    return this._http.post(`${base_url}/login`, frmData).pipe(
      tap((resultadoPeticion: resultLogin) => {
        localStorage.setItem('token-user', resultadoPeticion.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this._http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resultadoPeticion: resultLoginGoogle) => {
        localStorage.setItem('token-user', resultadoPeticion.tokenId);
      })
    );
  }

  reviewToken(): Observable<boolean> {
    const token = localStorage.getItem('token-user') || '';
    return this._http.get(`${base_url}/login/review`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resultadoPeticion: resultLogin) => {
        localStorage.setItem('token-user', resultadoPeticion.token);
      }),
      map(respuesta => true),
      catchError(error => of(false))//of(false) me permite crear un obserbale en base al valor dentro de of(), enn este caso un false
      //es un observable que captura el erro y retorna un false.
    );
  }

  //Nota: Al hacer logout el vboton de google desaparece y para evitar que seo ocurra tengo que usar NgZone encapsulando la redireccion
  //y esto ocurre xq la autentificacion de google no pertenece a angular y es alñgo que ocurre fuera
  logout() {
    localStorage.removeItem('token-user');
    this.auth2.signOut().then(() => {
      this.NgZone.run(()=> {
        this.router.navigateByUrl('/login');
      });
    });
  }

}
