import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'//me permite usar los ngmodel 
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';//componnetes que manejan la estructura del menu
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';


//modulo que utiliza al modulo shared(con todos sus componentes) ademas de los componnetes dentro de este propio modulo y que 
//seran utilizados dentro del modulo principal app.module.ts  y a esta ruta llego por defecto desde el routing principal que la define
//como ruta por defecto
@NgModule({
  declarations: [//rutas que manejara pages(conmtenidas dentro de la carpeta page)
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent
  ],
  exports: [//rutas que manejara pages(conmtenidas dentro de la carpeta page) inportadas dentro del modulo page
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,//(modulo shared)modulo que manejara las rutas de componentes dentro de page(estructura del menu que se incrusta dentro del componente page)
    RouterModule,//incrustara componnetes dentro asi que necesita esto para usar <router-outlet></router-outlet> y es una alternativa a AppRoutingModule
    ComponentsModule,//inncrusta el modulo components que contiene el componente incrementador que se encuentra dentro de la carpeta components
  ]
})
export class PagesModule { }