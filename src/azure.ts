import * as azure from 'azure-sb'

export class AzureNotifications {

    send() {
        const notificationHubService = azure.createNotificationHubService('remora-hub', 'Endpoint=sb://remora-hub.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=VCT/jE+cge+O0P+XlKGMk5Py7TL+mcbLHW8HMFNDnYw=')

        var payload = {
            data: {
                message: 'Hello!'
            }
        };
        notificationHubService.gcm.send("", payload, error => {
            if (!error) {
                //notification sentl
            }
        })
    }
}
