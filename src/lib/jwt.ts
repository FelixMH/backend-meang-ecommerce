import jwt from 'jsonwebtoken';

import { SECRET_KEY, MESSAGES, EXPIRE_TIME } from '../config/constants';
import { IJWT } from '../interfaces/jwt.interface';


class JWT {
    private secretKey = SECRET_KEY as string;

    // Payload del token con fecha de caducidad de 24 horas.
    sign( data: IJWT, expiresIn: number = EXPIRE_TIME.H24 ) {
        return jwt.sign(
            { user: data.user },
            this.secretKey,
            { expiresIn}
        );
    }

    verify(token: string) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (err) {
            console.log(err.message);
            return MESSAGES.TOKEN_VERIFICATION_FAILED;
        }
    }
}

export default JWT;