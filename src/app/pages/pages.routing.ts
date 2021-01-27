import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//aqui defino las rutas que tedra el menu
const Rutas: Routes = [
    //modulo de rutas hijas dentro de pages, pages contiene la estructura principal(menu) y se inporta dentro del modulo de rutas principales
    //app-routing.module
    {
        path: 'dashboard', 
        component: PagesComponent, 
        canActivate:[AuthGuard],//el guard que se encarga de la proteccion de lar rutas(guards/auth.guard) maneja un boolena y se gatilla en la navegacion entre estas rutas
        children: [
            //cuando la ruta este vacia me enviara va la principal que contiene el menu
            //esta ruta principal "/" acepta todas estar rutas hijas
            { path: '', component: DashboardComponent, data: { 'titulo': 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { 'titulo': 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { 'titulo': 'Grafica1' } },
            { path: 'account-setting', component: AccountSettingComponent, data: { 'titulo': 'AccountSetting' } },
            { path: 'promesas', component: PromesasComponent, data: { 'titulo': 'Promesas' } },
            { path: 'observables', component: RxjsComponent, data: { 'titulo': 'Rxjs' } }
            //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(Rutas)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
