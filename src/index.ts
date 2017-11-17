import app from './app'
import * as bodyParser from 'body-parser';
import * as express from 'express';
const port = 3000;

app.listen(port, (err: Function) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on ${port}`);
})
