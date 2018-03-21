import * as azure from 'azure-sb'

export class AzureNotifications {

    send() {
        const notificationHubService = azure.createNotificationHubService('remora-hub',
        // tslint:disable-next-line:max-line-length
        'Endpoint=sb://remora-hub.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=VCT/jE+cge+O0P+XlKGMk5Py7TL+mcbLHW8HMFNDnYw=')

        const payload = {
            data: {
                message: 'Hello!'
            }
        };
        notificationHubService.gcm.send('', payload, error => {
            if (!error) {
                console.log('Done')
            }
        })
    }
}
