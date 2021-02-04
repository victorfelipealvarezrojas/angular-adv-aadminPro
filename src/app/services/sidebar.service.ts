import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'ProgressBar', url: 'progress' },
        { titulo: 'Gráfica', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Observables', url: 'observables' }
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Medicos', url: 'medicos' },
        { titulo: 'Hospitales', url: 'hospitales' },
      ]
    }
  ];

  constructor() { }

}
