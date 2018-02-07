
import * as sqlite from 'sqlite3'
export class Registration {
    private db = new sqlite.Database('devices.sqlite')

    constructor() {
        // this.db.exec('CREATE TABLE Registration (token NVARCHAR(255))')
        // this.db.close()
    }

    getDevices(callback: (rows: any[]) => void) {
        this.db.all('SELECT token FROM Registration', (err, rows) => {
            callback(rows)
        })
    }

    addDevice(token: string) {

        const statement = this.db.prepare('INSERT INTO Registration(token) VALUES(?)')
        statement.run(token)
        statement.finalize()
        this.db.close()
    }
}
