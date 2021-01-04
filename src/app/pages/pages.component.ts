import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

//necesito utilizar una funcion global dentro de mi jquery(custom.js) y para que react me la reconozca la declado 
declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  //private settingsService: SettingService desde aqui controlo el cambio de theme de la app al cargar la pagina
  constructor(private settingsService: SettingService) { }

  ngOnInit(): void {
    //funcion que regarla el jquery de estilos para el menu
    //<script src="./assets/js/custom.js"></script>
    customInitFunction();
  }

}
