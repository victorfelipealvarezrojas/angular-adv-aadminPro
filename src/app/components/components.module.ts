import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'//me permite usar los ngmodel 
import { ChartsModule } from 'ng2-charts';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { donaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    donaComponent,
    ModalImagenComponent
  ],
  exports: [
    IncrementadorComponent,
    donaComponent,
    ModalImagenComponent//este componente lo utilizare fuera del modulo y por eso lo exporto
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]

})
export class ComponentsModule { }
