import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public titulo: string = "";
  public labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public contenido1 = [
    [350, 450, 100]
  ];

  public contenido2 = [
    [500, 200, 300]
  ];
  
  public contenido3 = [
    [800, 100, 100]
  ];

}
