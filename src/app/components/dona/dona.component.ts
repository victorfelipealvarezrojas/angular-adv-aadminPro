import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class donaComponent  {

  @Input() tituloGrafico: string = "--Sin titulo definido--" 
  @Input() label: Label[] = ['--Sin valor--', '--Sin valor--', '--Sin valor--'];
  @Input() data: MultiDataSet = [];

  public colors: Color[] = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
  ]


}
