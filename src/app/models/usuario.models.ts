import { environment } from "src/environments/environment"
const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public role?: string,
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