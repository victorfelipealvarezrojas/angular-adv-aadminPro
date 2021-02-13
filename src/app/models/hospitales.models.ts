
//cuando ocupar interfaces o clases
//cuando quiera tener funciones dentro ocupo clases de lo contrario interfaces

interface _HospitalUsuario {
    _id: string,
    nombre: string,
    imagen: string
}

export class Hospital {
    constructor(
        public nombre: string,
        public _id?: string,
        public imagen?: string,
        public usuario?: _HospitalUsuario
    ) { }
}

export class HospitalResultado {
    constructor(
        public nombre: string,
        public id?: string,
        public imagen?: string,
        public usuario?: _HospitalUsuario
    ) { }
}