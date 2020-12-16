import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';//me permite trabajar con las rutas
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';


//defino mis rutas que son de tipo Routes
const rutas: Routes = [
    //rutas hijas protected
    { path: '', component: PagesComponent, children: [

        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'grafica1', component: Grafica1Component },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]},

    //rutas madre public
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    { path: '**', component: NopagefoundComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(rutas)//importo mi arreglo de rutas principales
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }