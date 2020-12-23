import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'//me permite usar los ngmodel 
import { ChartsModule } from 'ng2-charts';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { donaComponent } from './dona/dona.component';



@NgModule({
  declarations: [
    IncrementadorComponent,
    donaComponent
  ],
  exports: [
    IncrementadorComponent,
    donaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]

})
export class ComponentsModule { }
