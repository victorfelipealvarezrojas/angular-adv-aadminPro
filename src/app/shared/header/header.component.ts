import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario;

  constructor(
    private UsuarioService: UsuarioService,
    private _router: Router//me permite navegar entre rutas tiene que estar inportado en el modulo principal al que pertenece este componente

  ) {
    this.usuario = UsuarioService._usuario;
  }

  logout() {
    this.UsuarioService.logout();
  }

  buscar(texto: string) {
    if (texto.length === 0) {
      return;
    }
    this._router.navigateByUrl(`/dashboard/buscar/${texto}`)
  }



}
