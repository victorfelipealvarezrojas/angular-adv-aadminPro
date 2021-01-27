import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public tituloView: string;//valor del titulo que desplegare en la vista
  public tituloSub$: Subscription;//de tipo subscripcion

  constructor(private router: Router) {
    //me subscribo al observable, titulo es el retorno del obswrvable
    this.tituloSub$ = this.getDataRuta().subscribe(({ titulo }) => {
      this.tituloView = titulo
      document.title = `Sistema de administracion-${titulo}`;
    });
  }

  //elimino mis subscripcion al observable que obtiene el titulo desde la rutas para evitar instancias duplicadas al recosntruir el componente
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  //esta funcion de tipo observable estara activa siempre y cuando alguna rutina este subscrita y en este caso desde el constructor
  getDataRuta() {
    //obtengo el evento que contiene la informacion del titulo que llega desde las rutas(Router) y filtro entre sus distintas propiedades
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),//una instancioa de donde quiero obtener el titulo que llega desde las rutas dentro de ActivationEnd
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),//trae dos eventos con nombre ActivationEnd y solo necesito el que tiene la propiedad firstChild en null
      map((event: ActivationEnd) => event.snapshot.data)//obtengo la data que contiene informacion de mi ruta actuale(titulo)...event.snapshot.data retorna "titulo"
    )
  }
}
