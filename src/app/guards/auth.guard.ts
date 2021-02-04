import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';
@Injectable({
  providedIn: 'root'
})

//los guard se encargan de la proteccion de las rutas dentro de page.routes
export class AuthGuard implements CanActivate {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    //consumo servicio que valida el token y genera uno nuevo
    /*********this.usuarioService.reviewToken().subscribe(resp => {
      console.log("rev",resp)
    })*/

    //el mismo auth.guard manejara la subscripcion, reviewToken es un observabler y como tal requiere susbcripcion
    return this.usuarioService.reviewToken().pipe(
      tap(estaAutenticado => {
        if(!estaAutenticado){
          this.router.navigateByUrl('/login');
        }
      })
    )

  }

}
