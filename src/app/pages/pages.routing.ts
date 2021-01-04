import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

const Rutas: Routes = [
    //modulo de rutas hijas dentro de pages, pages contiene la estructura principal(menu) y se inporta dentro del modulo de rutas principales
    //app-routing.module
    {
        path: 'dashboard', component: PagesComponent, children: [//cuando la ruta este vacia me enviara va la principal que contiene el menu
            //esta ruta principal "/" acepta todas estar rutas hijas
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
            { path: 'account-setting', component: AccountSettingComponent }
            //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(Rutas)],
    exports: [RouterModule]
})

export class PagesRoutingModule { }
