export interface loginForm {
    email: string;
    password: string;
    recuerdame: boolean;
}

export interface resultLogin {
    ok: boolean;
    token: string;
    menu?:string;
}

export interface resultReviewToken {
    ok:true;
    token: string;
    usuario: {
        email: string,
        google: boolean
        imagen: string
        nombre: string
        rol: string
        uid: string
    },
    menu?:string
}


export interface resultLoginGoogle {
    ok: boolean;
    tokenId: string;
    menu?:string;
}