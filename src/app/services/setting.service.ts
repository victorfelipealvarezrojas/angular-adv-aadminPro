import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  //<link href="" id="theme" rel="stylesheet"> 
  private elemento = document.querySelector('#theme');


  constructor() {
    //tema desde configurado y/o por defecto
    const themeLocal = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    //cambio el valor del elemento obtenido desde document.querySelector('#theme');
    this.elemento.setAttribute('href', themeLocal);
  }

  changeColor(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    //cambio el valor del elemento obtenido desde document.querySelector('#theme');
    this.elemento.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();

  }

  checkCurrentTheme(): void {
    const selector =  document.querySelectorAll('.selector');
    //realizo un barrido a todos los botones de thema y verirfico cual de ellos coincide con el tema utilizado
      selector.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');//valor de color en el control
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;//color a theme principal seleccionado en el boton
      const currentTheme = this.elemento.getAttribute('href');//thema principal usado en la pagina 
      if (btnThemeUrl === currentTheme) {//si mi tema principal es igual al tema del boton marcho con la clase la seleccion del boton
        element.classList.add('working');
      }
    });

  }

}
