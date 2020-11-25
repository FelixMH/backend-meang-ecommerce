import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';
import { COLLECTIONS } from '../config/constants';


const resolversMutation: IResolvers = {
    Mutation: {
        async register( _, { user }, { db } ) {

            // Comprobar que el usuario no existe.
            const userCheck = await db.collection(COLLECTIONS.USERS)
                                    .findOne({ email: user.email });
            
            if ( userCheck !== null ) {
                return {
                    status: false,
                    message: `El email ${user.email} ya se encuentra en uso. Registra otro, por favor.`,
                    user: null
                };
            }

            // comprobar el último registro realizado
            const lastUser = await db.collection(COLLECTIONS.USERS)
                                    .find()
                                    .limit(1)
                                    .sort( { registerDate: -1 } ).toArray();
            if ( lastUser.length === 0 ) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
            // Asignar la fecha en formato ISO en la propiedad registerDate
            user.registerDate = new Date().toISOString();

            // Encriptar password.
            user.password = bcrypt.hashSync(user.password, 10);

            // Guardar el documento en la colección.
            return await db
                        .collection(COLLECTIONS.USERS)
                        .insertOne(user).then(
                            async () => {
                                return {
                                    status: true,
                                    message: `El usuario fue registrado correctamente.`,
                                    user
                                };
                            }
                        )
                        .catch( ( err: Error ) => {
                            console.log(err.message);
                            return {
                                status: false,
                                message: `El error fue inesperado.`,
                                user: null
                            };
                        });

        }
    }
};

export default resolversMutation;