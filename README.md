# ETH2-Validator-Notifier
A script that alerts you when your Ethereum validator is down. 

# How does it work?
The notifier uses API:s from Prysmatic to track the balance of your validators. It then sends an SMS to a specified phone number using the nexmo API.

# How do I start the service?
1. Create an account on [Nexmo](https://developer.nexmo.com/)
2. Copy your API key and secret from the website.
3. Paste the API key and secret in notifier.js
```javascript
const nexmo = new Nexmo({
  apiKey: 'nexmo apiKey',
  apiSecret: 'nexmo apiSecret',
});
```
4. Enter your phone number and your validators.
```javascript
// Your phone number
phone_number = "Enter phone number"

// Add the indicies of the validators you want to track in this array.
validators = ['146','3'];
```
5. Start the service by typing the following into the terminal.
```
node notifier.js
```
