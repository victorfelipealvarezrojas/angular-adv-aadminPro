export interface loginForm {
    email: string;
    password: string;
    recuerdame: boolean;
}

export interface resultLogin {
    ok: boolean;
    token: string;
}

export interface resultLoginGoogle {
    ok: boolean;
    tokenId: string;
}