import { Db } from 'mongodb';

/**
 * Obtener el ID que se va a utilizar en el nuevo usuario.
 * 
 * @param database Base de datos sobre la cual haremos modificaciones.
 * @param collection Collecion a modificar perteneciente a la base de datos.
 * @param sort tipo de Ordenamiento { < propiedad > - 1 }
 */

export const asignDocumentId = async (
    database: Db,
    collection: string,
    sort: object = { registerDate: -1 }
) => {
    // comprobar el último registro realizado
    const lastElement = await database.collection(collection)
                        .find()
                        .limit(1)
                        .sort( sort )
                        .toArray();
    if ( lastElement.length === 0 ) {
        return 1;
    }
    return lastElement[0].id + 1;
};


/**
 * Obtener el dato del filtro que vamos a requerir para las querys , tales como email,
 * id, etc.
 * 
 * @param database Base de datos sobre la cual haremos modificaciones.
 * @param collection Collecion a modificar perteneciente a la base de datos.
 * @param filter dato a buscar en la BD.
 */
export const findOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
    return database.collection(collection)
        .findOne(filter);
};


/**
 * registrar un dato en la base de datos.
 * 
 * @param database Base de datos sobre la cual haremos modificaciones.
 * @param collection Collecion a modificar perteneciente a la base de datos.
 * @param document dato a insertar dentro de la colección de la base de datos.
 */
export const insertOneElement = async (
    database: Db,
    collection: string,
    document: object
) => {
    return database
        .collection(collection)
        .insertOne(document);
};

/**
 * registrar una colección de datos en la base de datos.
 * 
 * @param database Base de datos sobre la cual haremos modificaciones.
 * @param collection Collecion a modificar perteneciente a la base de datos.
 * @param documents colecciones de datos a insertar dentro de la base de datos.
 */
export const insertManyElement = async (
    database: Db,
    collection: string,
    documents: Array<object>
) => {
    return database
        .collection(collection)
        .insertMany(documents);
};


/**
 * registrar una colección de datos en la base de datos.
 * 
 * @param database Base de datos sobre la cual haremos modificaciones.
 * @param collection Collecion a modificar perteneciente a la base de datos.
 * @param filter dato(s) a filtrar/mostrar. 
 */
export const findElement = async (
    database: Db,
    collection: string,
    filter: object = {}
) => {
    database
        .collection(collection)
        .find(filter)
        .toArray();
};