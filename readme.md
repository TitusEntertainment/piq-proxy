# PaymentIQ Proxy

This proxy is meant to proxy the integration API and logs the incoming requests from both PaymentIQ and the merchants requests towards PaymentIQ. Can be usefull for debugging purposes.

### Setup

1. Install [NodeJs](https://nodejs.org/en/) and make sure it's working (simply write node --version in a console/terminal)
2. Make sure NPM was also installed with node, so run `npm --version`. If it isn't installed, install it. Heres a [guide](https://blog.teamtreehouse.com/install-node-js-npm-mac)
3. Install [ngrok](https://ngrok.com/)
4. Cd into the "mock-piq-integration" directory. `cd my/path/to/piq-proxy`
5. Run `npm install`
6. Use ngrok to tunnel port 3001 -> `./ngrok http 3001` (note that you'll need to cd to the dir where ngrok was unzipped on mac)
7. Open the file `config.json`, paste in the integration URL that's currently in the MerchantConfig
8. Run `npm run start` in the mock-piq-integration directory -> This will then start the application
9. Now go to your MID in PaymentIQ --> Admin --> Configuration --> MerchantConfig. Here you will need to change the `integrationService` value
 to `standardMerchantIntegrationService` and add <apiIntegrationUrl>{YOUR_NGROK_HTTPS_URL_HERE}/api/{action}</apiIntegrationUrl>, example:

```xml
  <apiIntegrationUrl>https://0094-185-139-247-194.ngrok.io/api/{action}</apiIntegrationUrl>
  <integrationService>standardMerchantIntegrationService</integrationService>
```

`note that the /api might not be needed. Check if the current URL has /something/{action}`

### Changing port

You can change the port that the application runs on in config.json