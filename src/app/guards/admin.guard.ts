import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _usuarioS: UsuarioService,
    private router: Router
  ) { }

  //este guiards o middleware valida que si el rol del usuario autenticado es distinto de administrador salga de la ruta en la cual esta implementado 
  //el guard --->   { path: 'usuarios', canActivate: [AdminGuard], component: UsuarosComponent, data: { 'titulo': 'Usuarios de aplicacion' } }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //return this._usuarioS.role === 'ADMIN_ROLE' ? true : false
    if (this._usuarioS.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }

}
