import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenUpload: File;
  public imgTemp: any = '';


  constructor(
    public modalImagenService: ModalImagenService,
    private fileUpload: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;
  }

  cambiarImg(file: File) {
    this.imagenUpload = file;

    if (!file) { return this.imgTemp = null }//si file esta vacio siempre limpiara la imgtemp para mostrar la imagen que tenga cargada en la vista 

    const reader = new FileReader();
    const url_64 = reader.readAsDataURL(file);//entrego al render la foto seleccionada
    reader.onloadend = () => {
      this.imgTemp = reader.result;//es la imagen que se esta cargando y el valor que previsualizare en la vista
    }

  }


  subirImagen() {

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUpload.actualizarFoto(this.imagenUpload, tipo, id)
      .then(img => {
        Swal.fire({
          title: 'Aceptado!',
          text: "La fotografia del usuario fue actualizada",
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        //emito un evento del modal a imagen-service que indica que la imagen cambio y es de tipo observable
        this.modalImagenService.nuevaImagenEvent.emit(img)
        this.cerrarModal();
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
