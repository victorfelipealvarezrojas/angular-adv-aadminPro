import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html'
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuario().then(usuario => {
      console.log(usuario);
    });

    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('finalizo ok');
      } else {
        reject("algo salio mal");
      }
    });

    promesa.then((resultado) => {
      console.log(resultado);
    }).catch((resultado) => {
      console.log(resultado);
    });
  }


  getUsuariouno() {
    fetch('https://reqres.in/api/users').then(respuesta => {
      respuesta.json().then(body => {
        console.log(body)
      });
    });
  }


  getUsuariodos() {
    const promesa = new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(respuesta => respuesta.json())
        .then(body => resolve(body.data));
    });
    return promesa;
  }

  getUsuario() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then(respuesta => respuesta.json())
        .then(body => resolve(body.data));
    });
  }

}
