import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public usuario: Usuario;

  constructor(private SidebarService: SidebarService, private UsuarioService: UsuarioService) {
    this.menuItems = SidebarService.menu;
    this.usuario =  UsuarioService._usuario;
  }

  ngOnInit(): void {
  }

}
