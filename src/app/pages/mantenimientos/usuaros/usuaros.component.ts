import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuaros',
  templateUrl: './usuaros.component.html',
  styles: [
  ]
})
export class UsuarosComponent implements OnInit, OnDestroy {

  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuarios_temp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private UsuarioService: UsuarioService,
    private busquedasService: BusquedaService,
    public modalImagenService: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    //elimino la subscripcion o siempre quedara activo y se crearan multiples instacias.
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    //me suubscribo al emit del modal-imagen-service el cual indica q ue ocurrio un cambio en la carga de imagen en els ervicio del modal
    //y de esta forma puedo actualizar el icono de la imagen en la tabla de usuarios
    this.imgSubs = this.modalImagenService.nuevaImagenEvent
    //no alcanzaba a actualizar la imagen asi que le doy un tiempo de espera
      .pipe(delay(1000))
      .subscribe(imagen => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.UsuarioService.cargarUsuarios(this.desde).subscribe(({ tolal_registros, usuario }) => {
      this.totalUsuario = tolal_registros;
      this.usuarios = usuario;
      this.usuarios_temp = usuario;
      this.cargando = false;
    });
  }

  avPAgina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuario) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  Buscar(termino: string) {
    if (termino.length === 0) return this.usuarios = this.usuarios_temp;
    this.busquedasService.buscar('usuarios', termino).subscribe(resultado => {
      this.usuarios = resultado
    });
  }

  Eliminar(usuario: Usuario) {

    if (usuario.uid === this.UsuarioService.uid) {
      return Swal.fire(
        'Error',
        "No puede eliminar el usuario actual",
        "error"
      )
    }

    Swal.fire({

      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar al usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '!Si, deseo eliminarlo!'

    }).then((result) => {

      if (result.isConfirmed) {
        this.UsuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario eliminado',
              `${usuario.nombre} fue eliminado`,
              "success"
            )
          });
      }
    })
  }

  cambiarRole(usuario: Usuario){
    this.UsuarioService.guardarUsuario(usuario)
    .subscribe(resp => {
      console.log(resp);
    });
  }

  //llama funcion de abrir modal que se encuentra dentro del servicio del modal
  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid, usuario.imagen);
  }

}
