import enviroment from './environments';

if ( process.env.NODE_ENV !== 'production' ) {
    const env = enviroment;
}

export const SECRET_KEY = process.env.SECRET || 'GabsnessYStore';

export enum COLLECTIONS {
    USERS='users'
}

export enum MESSAGES {
    TOKEN_VERIFICATION_FAILED = 'Token inválido, Inicia sesión nuevamente'
}

export enum EXPIRE_TIME {
    H1 = 60 * 60,
    H24 = 24 * H1,
    M15 = H1 / 4,
    D3 = H24 * 3


}