import * as admin from 'firebase-admin'

const serviceAccount = require('../platformer-e2a1b2b32975.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://platformer-761c8.firebaseio.com'
})

export class Notifications {
    constructor() {

    }

    send(token: string, title: string, body: string) {

        const payload = {
            notification: {
                title: title,
                body: body
            }
        }

        // Send a message to devices subscribed to the provided topic.
        admin.messaging().sendToDevice(token, payload)
            .then(response => {
                // See the MessagingTopicResponse reference documentation for the
                // contents of response.
                console.log('Successfully sent message:', response)
            })
            .catch(error => {
                console.log('Error sending message:', error)
            })
    }
}
