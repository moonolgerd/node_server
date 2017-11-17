import { Item } from './item';
import * as express from 'express'

class App {
  public express: express.Express;

  constructor () {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes () {
    const router = express.Router();

    router.get('/', (req, res) => {
      res.json(
        {
        message: 'Hello World!',
        value: 12345,
        age: 10,
        lists : [
          'Oleg',
          'Tatsiana'
        ]
      });
    });

    router.get('/items', (req, res) => {

      res.json(
        [
          new Item('Oleg', 10, new Date(), 'Ave P'),
          new Item('Oleg2', 10, new Date(), 'Ave P'),
        ]);
    });

    router.post('/', (req, res) => {
      res.send(204).end();
    });

    this.express.use('/', router);
  }
}

export default new App().express;
