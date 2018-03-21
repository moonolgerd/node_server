import { Notifications } from './notifications'
import { Item } from './models/item'
import { Beers } from './beers'
import * as express from 'express'
import * as shell from 'shelljs'
import * as bodyParser from 'body-parser'
import { AzureNotifications } from './azure'
import { Registration } from './registration'

class App {
    express: express.Express

    jsonParser = bodyParser.json()

    constructor() {
        this.express = express()
        this.mountRoutes()
    }

    private mountRoutes() {
        const router = express.Router()

        router.get('/', (req, res) => {
            res.json(
                {
                    message: 'Hello World!',
                    value: 12345,
                    age: 10,
                    lists: [
                        'Oleg',
                        'Tatsiana'
                    ]
                })
        })

        router.get('/items', (req, res) => {

            const beers = new Beers()
            beers.getBeers(data => {
                res.json(data)
            })
        })

        router.get('/orders', async (req, res) => {

            const beers = new Beers()
            const data = await beers.getData()
            res.json(data)
        })

        router.post('/push', this.jsonParser, (req, res) => {
            const registration = new Registration
            const notifications = new Notifications
            const title = req.body.title
            const body = req.body.body
            registration.getDevices(rows => {
                for (const row of rows) {
                    notifications.send(row.token, title, body)
                    res.sendStatus(204)
                }
            })
        })

        router.post('/register', this.jsonParser, (req, res) => {
            const token = req.body.Token
            console.log(token)
            const registration = new Registration
            registration.addDevice(token)
            res.sendStatus(204)
        })

        router.get('/devices', (req, res) => {
            const registration = new Registration
            registration.getDevices(rows => {
                res.json(rows)
            })
        })

        router.post('/azure', this.jsonParser, (req, res) => {
            const notifications = new AzureNotifications
            notifications.send()
            res.send('Done')
        })

        router.post('/', this.jsonParser, (req, res) => {
            const server = req.body.server
            const user = req.body.user
            const password = req.body.password
            const command = req.body.command

            shell.exec(`printf '${password}\n' >password.txt`)

            shell.exec(`ssh-keygen -F ${server}`, (code, stdout, stderr) => {
                if (stderr !== '') {
                    console.error(stderr)
                } else if (stdout === '') {

                    // tslint:disable-next-line:no-shadowed-variable
                    shell.exec('find ~/.ssh/ -name id_rsa', (code, stdout, stderr) => {
                        if (stdout === '') {
                            // tslint:disable-next-line:no-shadowed-variable
                            shell.exec(`ssh-keygen -t rsa -q -f ~/.ssh/id_rsa -N ""`, (code, stdout, stderr) => {
                                if (code !== 0) {
                                    console.error(stderr)
                                } else {
                                    this.copyKey(server, user)
                                }
                            })
                        } else {
                            this.copyKey(server, user)
                        }
                    })

                } else {
                    console.log('Key already exists')
                    this.copyKey(server, user)
                }
                res.send(204).end()
            })
        })

        this.express.use('/', router)
    }

    copyKey(server: String, user: String) {
        shell.exec(`sshpass -f password.txt ssh-copy-id ${user}@${server}`, (code, stdout, stderr) => {
            if (code === 1) {
                console.error(stderr)
            } else {
                shell.exec(`ssh -oStrictHostKeyChecking=no ${user}@${server} hostname`,
                    // tslint:disable-next-line:no-shadowed-variable
                    (code, stdout, stderr) => {
                        console.log(stdout)
                    })
            }
            shell.exec(`rm password.txt`)
        })
    }

}

export default new App().express
