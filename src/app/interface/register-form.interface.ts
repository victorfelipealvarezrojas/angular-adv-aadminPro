import { Usuario } from "../models/usuario.models";

//las interfaces no tienen una version en js asi que solo sirven para estructurar las clase o limitar el comportamiento de estas 
export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    passwordConf: string;
    terminos: boolean;
}


export interface Registerresult {
    ok: boolean,
    token: string,
    usuario: {
        rol: string,
        google: string,
        nombre: string,
        email: string,
        uid: string
    }
}

export interface ICargarUsuario { 
    tolal_registros: number;
    usuario: Usuario[];
 }
