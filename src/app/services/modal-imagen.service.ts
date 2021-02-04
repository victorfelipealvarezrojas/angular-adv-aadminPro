import { Injectable,EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo:  'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;

  //enecesito emitir que la imaghen cambia y asi actualizar la imagen de usuario la tabla de usuarios y
  //es de tipo observable y me puedo subscribir desde cualquier componente a el como por ejemplo usuarios-component
  public nuevaImagenEvent: EventEmitter<string> = new EventEmitter<string>(); 

  //los get se pueden implementar en el HTML del componnete de forma directa posterior a su impòrtacion en el cosntructor
  get ocultarModal() {
    return this._ocultarModal;
  }

  //esta funcion levanta el modal y recibe los valores del usuario que se esta trabajando o seleccionado
  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'defaultImg') {
    //indica que el modal se eencuentra activo, es visible
    this._ocultarModal = false;
    //estan declaradas de forma global para tener acceso a sus valores en todas las funciones del servicio
    this.tipo = tipo;
    this.id = id;

    if(img.includes('https')){
      this.img = img;
    }else{
      this.img= `${base_url}/upload/${tipo}/${img}`;
    }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
