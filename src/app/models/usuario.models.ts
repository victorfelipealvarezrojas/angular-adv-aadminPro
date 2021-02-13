import { environment } from "src/environments/environment"
const base_url = environment.base_url;

//la diferencia entre clases e interfaces es que en uin apuedop implementar funciones y en la otra no respectivamente
export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public rol?: string,
        public google?: boolean,
        public imagen?: string,
        public uid?: string
    ) { }
   
    get imagenUrl() {
        if (this.imagen) {
            if (this.imagen.includes('https')) {
                return this.imagen;
            } else {
                return `${base_url}/upload/usuarios/${this.imagen}`;
            }
        } else {
            return `${base_url}/upload/usuarios/${this.imagen}`;
        }
    }
}