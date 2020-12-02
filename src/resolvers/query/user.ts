import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, MESSAGES, EXPIRE_TIME } from '../../config/constants';
import JWT from './../../lib/jwt';
import bcrypt from 'bcrypt';
import { findOneElement, findElement } from './../../lib/db-operations';


const resolversUserQuery: IResolvers = {
    Query: {
        async users( _, __, { db } ) {
            try {
                return {
                    status: true,
                    message: 'Lista de usuarios cargada con éxito',
                    users: await findElement(
                        db,
                        COLLECTIONS.USERS
                    ),
                };
            } catch(err) {
                console.log(err);
                return {
                    status: false,
                    message: 'Error en la busqueda, compruebe su conexión a internet',
                    users: []
                };
            }
        },

        async login( _, { email, password }, { db } ) {
            try {
                const user = await findOneElement(db, COLLECTIONS.USERS, { email });
                
                if ( user === null ) {
                    return {
                        status: false,
                        message: 'Usuario inexistente',
                        token: null
                    };
                }

                // const user = await db.collection(COLLECTIONS.USERS)
                // .findOne( { email, password } );

                // comparamos las claves encriptadas.
                const pwd = bcrypt.compareSync(password, user.password);

                if ( pwd !== null ) {
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }

                return {
                    status: !pwd ? false : true,
                    message: !pwd ? 'Error: Contraseña o email inválido.' : 'Has iniciado sesión. Bienvenido.',
                    token: !pwd ? null : new JWT().sign({ user })
                };
            } catch (err) {
                console.log(err.message);
                return {
                    status: false,
                    message: 'Error, no has podido iniciar sesión. Intentalo mas tarde.',
                    token: null
                };
            }
        },

        me( _, __, { token } ) {
            console.log(token);
            let info = new JWT().verify(token);

            if ( info === MESSAGES.TOKEN_VERIFICATION_FAILED ) {
                return {
                    status: false,
                    message: info,
                    user:null
                };
            }

            return {
                status: true,
                message: 'Usuario autenticado correctamente.....',
                user: Object.values(info)[0]
            };
        }
    }
};

export default resolversUserQuery;