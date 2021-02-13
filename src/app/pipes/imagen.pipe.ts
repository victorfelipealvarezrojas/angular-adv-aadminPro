import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'//nombre queb usao de referencia en el html
})

export class ImagenPipe implements PipeTransform {
  //si la ruta de la imagen no exite es el controlador der server quien envia una x defectos
  transform(imagen: string, tipo: 'usuarios' | 'hospitales' | 'medicos'): string {
    if (imagen) {
      if (imagen.includes('https')) {
          return imagen;
      } else {
          return `${base_url}/upload/${tipo}/${imagen}`;
      }
  } else {
      return `${base_url}/upload/${tipo}/${imagen}`;
  }
  }

}
