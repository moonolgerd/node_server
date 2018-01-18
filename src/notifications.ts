import * as admin from 'firebase-admin'

const serviceAccount = require('../platformer-e2a1b2b32975.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://platformer-761c8.firebaseio.com'
})

export class Notifications {
    constructor() {

    }

    send() {
        var registrationToken = "f5wa0WzWWFY:APA91bHV8M5SGE3ld59DIB_ioMW4ATADHmBJECzhoqtm9wm3PRrGUewgc-DMQ94s8Ztk6mQbvw9TzYNV2tqN7__cErsuplZRU4ukJN3YwwO-UNMOEJsS1EXJbWxZeHCCM5HkTy9R2rQ6";

        // See the "Defining the message payload" section below for details
        // on how to define a message payload.
        var payload = {
            notification: {
                title: "My Notificaation",
                body: "Important Message"
            }
        }

        // Send a message to devices subscribed to the provided topic.
        admin.messaging().sendToDevice(registrationToken, payload)
            .then(function (response) {
                // See the MessagingTopicResponse reference documentation for the
                // contents of response.
                console.log("Successfully sent message:", response)
            })
            .catch(function (error) {
                console.log("Error sending message:", error)
            })
    }
}
