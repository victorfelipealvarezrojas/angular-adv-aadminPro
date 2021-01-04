import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';//me permite trabajar con las rutas es una importacion de angular
import { PagesRoutingModule } from './pages/pages.routing';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';


//defino mis rutas que son de tipo Routes
const rutas: Routes = [
    //rutas publicas dentyro del modulo principal
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },//ruta por defecto
    { path: '**', component: NopagefoundComponent }//cuando ñla ruta no existe
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(rutas),//importo mi arreglo de rutas principales
        PagesRoutingModule,//modulo con rutas hijas que maneja las rutas de los componetes dentro de pages
        AuthRoutingModule//modulo con rutas hijas que maneja las rutas de los componetes dentro de auth
    ],
    exports: [RouterModule]//exporto las rutas
})

export class AppRoutingModule { }