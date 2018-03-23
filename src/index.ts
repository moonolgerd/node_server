import app from './app'
import { logger } from './app'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as winston from 'winston'
const port = 3000

app.use(bodyParser.json())

app.listen(port, (err: Function) => {
    if (err) {
        return logger.error(err.toString())
    }

    return logger.info(`server is listening on ${port}`)
})
