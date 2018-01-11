//import * as sqlite from 'sqlite3'
import * as sql from 'mssql'

export class Beers {
    getBeers(callback: (rows: any[]) => void) {
        // const db = new sqlite.Database('beers.sqlite')

        // const stmt = db.prepare('INSERT INTO Beers VALUES (?)');
        // for (let i = 0; i < 10; i++) {
        //     stmt.run('Beer ' + i);
        // }
        // stmt.finalize();

        // db.all('SELECT * FROM Beers', (err, rows) => {
        //     callback(rows)
        // });
        // // db.exec('CREATE TABLE Beers (name TEXT)')
        // db.close()
    }

    async getData() {
        const conn = await new sql.ConnectionPool('Server=localhost,1433;Database=NORTHWND;User Id=sa;Password=555555;Encrypt=true')
            .connect()

        conn.on('error', err => {
            console.log(err)
        })
        const result = await conn.request().query('Select top 100 * from Orders')
        return result.recordset
    }
}
