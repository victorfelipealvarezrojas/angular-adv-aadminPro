import { Component } from '@angular/core';
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

  constructor(private UsuarioService: UsuarioService) {
    this.usuario = UsuarioService._usuario;
  }

  logout() {
    this.UsuarioService.logout();
  }

}
