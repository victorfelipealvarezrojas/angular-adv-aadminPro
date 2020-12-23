import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit() {
    this.btnClase = `btn ${this.btnClase}`;
  }

  @Input() progreso: number = 50;//variable de entrada desde el componente padre
  @Input() btnClase: string = "btn-primary";//variable de entrada desde el componente padre

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();//variable de salida para el componente padre nes de tipo evento
  //y como evento tiene la propiedad event en sus parametros y s ele asigna por medio del .emit para emitor un valor


  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);//asigno por medio del emit un valor al evento valorSalida 
      return this.progreso;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);//asigno por medio del emit un valor al evento valorSalida 
      return this.progreso;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);//asigno por medio del emit un valor al evento valorSalida 
  }

  onChange(valor: number) {
    if (valor >= 100) {
      this.progreso = 100;
    } else if (valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    
    this.valorSalida.emit(valor);
  }


}
