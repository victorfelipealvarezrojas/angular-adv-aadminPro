import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';//ruta de componentes estructura principal de la pagina
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,//modulo auth que contiene los componnetes de login y register
    AppRoutingModule,//incrustara componnetes dentro asi que necesita esto para usar <router-outlet></router-outlet>
    PagesModule//rutas principales de pagina...rutas principales publicas(estructura principal de la pagina) contiene las rutas del modulo page
  ],
  providers: [],
  bootstrap: [AppComponent]//componente principal desde el cual construioremos el resto de la app
})
export class AppModule { }
