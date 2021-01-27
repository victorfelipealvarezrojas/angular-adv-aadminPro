
export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public role?: boolean,
        public google?: string,
        public imagen?: string,
        public uid?: string
    ) { }
}