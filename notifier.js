const request = require('request');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'nexmo apiKey',
  apiSecret: 'nexmo apiSecret',
});

// Add the indicies of the validators you want to track in this array.
validators = ['146','3'];

balance_history = {};
args = ''
var index = 0;
for (let validator of validators) {
  if (index != validators.length-1) {
    args = args + 'indices=' + validator + '&';
  } else {
    args = args + 'indices=' + validator;
  }
    balance_history[validator] = [];
    index++;
}

link = "https://api.prylabs.net/eth/v1alpha1/validators/balances?" + args;

var requestLoop = setInterval(function(){

  request(link, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    if (body != undefined) {
      for (let validator of body['balances']) {

        balance = validator['balance'];
        index = validator['index'];

        balance_history[index].push({'time': Date.now(),'balance': balance})

        if (balance_history[index].length >= 2) {
          if (balance_history[index][balance_history[index].length-1].balance - balance_history[index][balance_history[index].length-2].balance < 0.0) {
            console.log("Balance decreased!");
            // Balance decreased!
            // Send SMS
            const from = 'Vonage SMS API';
            const to = '46702413144';
            const text = 'Balance for validator ' + index + ' decreased!';

            nexmo.message.sendSms(from, to, text);
          }
        }

        if (balance_history[index].length > 100) {
          balance_history[index] =  balance_history[index].splice(1, 1)
        }

        console.log('The balance of validator ' + index + ' is ' + balance);

      }

    }
  }
);

},12000*60);
