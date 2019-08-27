import 'reflect-metadata';
import express from 'express';
import next from 'next';
import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import { createConnection } from 'typeorm';
import { RegisterResolver } from './modules/user/Register';

const dev = process.env.NODE_ENV !== 'production';
const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
const app = next({
  dir: './src/client',
  dev: dev,
});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createConnection().then(conntection => {
      console.log(conntection);
    })

    const schema = buildSchemaSync({
      resolvers: [RegisterResolver]
    });

    const apolloServer = new ApolloServer({ schema });

    const server = express();

    apolloServer.applyMiddleware({ app: server });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }

      if (dev) {
        console.log(`> Ready on http://localhost:${port}`);
      }
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
