import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';
import enviroment from './config/environments';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayground from 'graphql-playground-middleware-express';
import Database from './lib/database';
import { IContext } from './interfaces/context.interface';


// Configuracuón de las variables de entorno ( lectura )

if ( process.env.NODE_ENV !== 'production' ) {
    const env = enviroment;
    console.log(env);
}

async function init() {
    const app = express();

    app.use('*', cors());
    
    app.use(compression());


    const database = new Database();
    const db = await database.init();

    // application context....
    // const ctx = { db };

    const ctx = async ( { req, connection }: IContext ) => {
        const token = (req) ? req.headers.authorization : connection.authorization;
        return { db, token };
    };


    const server = new ApolloServer({
        schema,
        introspection: true,
        context: ctx
    });

    server.applyMiddleware({app});
    
    app.get('/', expressPlayground({
        endpoint: '/graphql'
    }));
    
    const PORT = process.env.PORT || 2002;

    const http = createServer(app);
    http.listen({
        port: 4001,
    }, () => console.log(`http://localhost:${PORT}`));
}

init();
