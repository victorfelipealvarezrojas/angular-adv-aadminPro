import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit {

  constructor() {

    //el observable no funciona si  no me sujbscribo a el
    this.retornaObs().pipe(retry()).subscribe(
      valor => { console.log("valor del subscribe: ", valor) },
      error => { console.log("Error: ", error) },
      () => console.log("El obserbable finalizo... ")
    );

  }

  retornaObs(): Observable<number> {
    let i = -1;
    return new Observable<number>(observador => {
      const intervalo = setInterval(() => {
        i++;
        //necesito emitir mi valor para quien se subscripcion
        observador.next(i);
        if (i === 5) {
          clearInterval(intervalo);
          observador.complete();
        }
      }, 1000)
    });
  }

  ngOnInit(): void {
  }

}
