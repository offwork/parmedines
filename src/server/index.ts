import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const port: number = parseInt(<string>process.env.PORT, 10) || 3000;
const app = next({ dir: './src/client', dev: dev });
const handle = app.getRequestHandler();

// const server = express();
// server.listen(port, (err) => {
//   if (err) {
//     throw err;
//   }
//   if (dev) {
//     console.log(`> Ready on http://localhost:${port}`);
//   }
// });

app.prepare()
  .then(() => {
    const server = express();

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
