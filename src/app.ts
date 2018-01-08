import { Item } from './item';
import * as express from 'express'
import * as shell from 'shelljs'

class App {
    public express: express.Express;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes() {
        const router = express.Router();

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
            const server = req.body.server
            const user = req.body.user
            const password = req.body.password

            shell.exec(`printf '${password}\n' >password.txt`)

            shell.exec(`ssh-keygen -F ${server}`, (code, stdout, stderr) => {
                if (stderr !== '') {
                    console.error(stderr)
                } else if (stdout === '') {

                    shell.exec('find ~/.ssh/ -name id_rsa', (code, stdout, stderr) => {
                        if (stdout === '') {
                            shell.exec(`ssh-keygen -t rsa -q -f ~/.ssh/id_rsa.pub -N ""`, (code, stdout, stderr) => {
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
        });

        this.express.use('/', router);
    }

    copyKey(server: String, user: String) {
        shell.exec(`sshpass -f password.txt ssh-copy-id ${user}@${server}.liquidnet.biz`, (code, stdout, stderr) => {
            if (code === 1) {
                console.error(stderr)
            } else {
                shell.exec(`ssh -oStrictHostKeyChecking=no ${user}@${server}.liquidnet.biz hostname`, (code, stdout, stderr) => {
                    console.log(stdout)
                })
            }
            shell.exec(`rm password.txt`)
        })
    }

}

export default new App().express;
