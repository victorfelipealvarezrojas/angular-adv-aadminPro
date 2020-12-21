import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const Rutas: Routes = [
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent }
]


@NgModule({
    imports: [RouterModule.forChild(Rutas)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }
