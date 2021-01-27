import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//modulo que incorpora los componentes Auth login y register
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,//permite navegar entre rutas
    FormsModule,
    ReactiveFormsModule,//trabajare con fromularios reactivios.
    HttpClientModule//me permite trtabajar con peticiones HTTP 
  ]
})
export class AuthModule { }


