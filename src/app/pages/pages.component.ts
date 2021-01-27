import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

//necesito utilizar una funcion global dentro de mi jquery(custom.js) y para que react me la reconozca la declado 
//la declaro dentro de este componente que es el principal y el que contiene todos los moduloas o paginas q estan dentyro del menu principal
declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  //private settingsService: SettingService desde aqui controlo el cambio de theme de la app al cargar la pagina
  constructor(private settingsService: SettingService) {
    //*********seguramente lo eliminare de aqui en el futuro************
    //customInitFunction();//seguramente lo eliminare de aqui en el futuro
  }

  ngOnInit(): void {
    customInitFunction();
  }

}
