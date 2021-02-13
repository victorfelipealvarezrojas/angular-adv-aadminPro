//cuando ocupar interfaces o clases
//cuando quiera tener funciones dentro ocupo clases de lo contrario interfaces

//usuario que lo creo
interface _medicoUsuario {
    _id: string,
    nombre: string,
    imagen: string
}

//hospital en el cual esta asociado 
interface _medicoHospital {
    _id: string,
    nombre: string,
    imagen: string
}

//modelo lo creo en funcion de lo que retornara las peticiones al backend
export class Medico {
    constructor(
        public nombre: string,
        public id?: string,
        public imagen?: string,
        public usuario?: _medicoUsuario,
        public hospital?: _medicoHospital
    ) { }
}



