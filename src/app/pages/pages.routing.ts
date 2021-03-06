import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarosComponent } from './mantenimientos/usuaros/usuaros.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

//aqui defino las rutas que tedra el menu
const Rutas: Routes = [
    //modulo de rutas hijas dentro de pages, pages contiene la estructura principal(menu) y se inporta dentro del modulo de rutas principales
    //app-routing.module
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],//el guard que se encarga de la proteccion de lar rutas(guards/auth.guard) maneja un boolena y se gatilla en la navegacion entre estas rutas
        children: [
            //aqui disponibilizo mis rutas
            //cuando la ruta este vacia me enviara va la principal que contiene el menu
            //esta ruta principal "/" acepta todas estar rutas hijas
            { path: '', component: DashboardComponent, data: { 'titulo': 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { 'titulo': 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { 'titulo': 'Grafica1' } },
            { path: 'account-setting', component: AccountSettingComponent, data: { 'titulo': 'AccountSetting' } },
            { path: 'buscar/:texto', component: BusquedaComponent, data: { 'titulo': 'Busquedas Glogales' } },
            { path: 'promesas', component: PromesasComponent, data: { 'titulo': 'Promesas' } },
            { path: 'observables', component: RxjsComponent, data: { 'titulo': 'Rxjs' } },
            { path: 'perfil', component: PerfilComponent, data: { 'titulo': 'Perfil' } },
            { path: 'perfil', component: PerfilComponent, data: { 'titulo': 'Perfil' } },
            /* ==>  MANTENIMIENTOS   <== */
            { path: 'hospitales', component: HospitalesComponent, data: { 'titulo': 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { 'titulo': 'Mantenimiento de Medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { 'titulo': 'Mantenimiento de Medico' } },
            //rutas de rol admin
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuarosComponent, data: { 'titulo': 'Usuarios de aplicacion' } }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(Rutas)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
