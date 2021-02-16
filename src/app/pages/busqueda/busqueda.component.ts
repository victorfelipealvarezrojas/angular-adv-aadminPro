import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospitales.models';
import { Medico } from 'src/app/models/medicos.models';
import { Usuario } from 'src/app/models/usuario.models';
import { BusquedaService } from 'src/app/services/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuario: Usuario[] = [];
  public medico: Medico[] = [];
  public hospital: Hospital[] = [];

  constructor(
    private _activateRoute: ActivatedRoute,//me permite obtener el parametro id por la URL que llega desde header.componnet.ts
    private _busquedaService: BusquedaService
  ) { }

  ngOnInit(): void {
    this._activateRoute.params.subscribe(({ texto }) => {
      if (texto.length === 0) return;
      this._busquedaService.busquedasGlobales(texto).subscribe(({ hospitales, medicos, usuarios }: any) => {
        this.usuario = usuarios;
        this.medico = medicos;
        this.hospital = hospitales;
      });
    });
  }

}
