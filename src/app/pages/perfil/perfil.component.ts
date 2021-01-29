import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})

export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenUpload: File;
  public imgTemp: any = '';

  constructor(

    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUpload: FileUploadService

  ) {

    this.usuario = usuarioService._usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.formBuilder.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });

  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(() => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire({
        title: 'Aceptado!',
        text: "El usuario fue actualizado",
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  cambiarImg(file: File) {
    this.imagenUpload = file;

    if (!file) { return this.imgTemp = null }//si file esta vacio siempre limpiara la imgtemp para mostrar la imagen que tenga cargada en la vista 

    const reader = new FileReader();
    const url_64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {
    this.fileUpload.actualizarFoto(this.imagenUpload, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.imagen = img
        Swal.fire({
          title: 'Aceptado!',
          text: "La fotografia del usuario fue actualizada",
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })//el objeto usuario pasa por referencia desde el servicio asi que puedo editarlo desde aqui
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'No se puso subir la imagen',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      })
  }

}
