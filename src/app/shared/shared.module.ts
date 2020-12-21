import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


//este modulo incorpòra los componnetes dentro de la carpeta shared que seran utilizado por medio de 
//el modulo page dentro de sus componentes 
@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule { }
