/*
  ClueCon 2019 - Dangerous Demo (MathCheat)
  by Chris Cline
*/

// Dependencies
const https = require('https');
const { RelayConsumer } = require('@signalwire/node')

// SignalWire Project/API Secrets
const projectID = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';
const apiToken = 'PTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const spaceURL = 'example.signalwire.com';

/*
   This function will send a response back to the message originator.
   @param object message - Relay Message Object
   @param string response - Text message to send
*/
const sendResponse = async (message, response) => {
  let result = await consumer.client.messaging.send({
    context: 'default',
    from: message.to,
    to: message.from,
    body: "Math Cheat Answer: " + response
  })

  // validate send result
  if (result.successful) {
    console.log('Message ID: ', result.messageId)
  }
}

/*
    This function will initiate an external HTTPS GET request.
    @param object message - Relay Message Object.
    @param string url - HTTP URL to retrieve.
*/
const sendHTTP = (message, url) => {
  https.get(url, (res) => {
    let result = '';
  
    // get chunk of data and add it to our result.
    res.on('data', (d) => {
      result += d;
    });
  
    // transaction complete process result.
    res.on('end', () => {
      if (res.statusCode == 200) {
        console.log("Responding with Answer: " + result);
        sendResponse(message, result);
      } else {
        console.log("The formula entered is complete CRAP!");
        console.log("Inform the user how to use the HELP command.");
        sendResponse(message, "\nDude, have you been drinking?\nWhatever you typed in was crap!\n\nClean it up and try again.\nYou can get assistance by typing HELP.");
      }
    });
  
  }).on('error', (e) => {
    console.error(e);
  });  
}

// Create the SignalWire Consumer
const consumer = new RelayConsumer({
  project: projectID,
  token: apiToken,
  contexts: ['default'],

  // Process new inbound message
  onIncomingMessage: async (message) => {
    console.log('Received message', message.id, message.context);

    // Determine if the user requested help.
    if (message.body.toUpperCase() == "HELP") {
      let response = "\n\nWelcome to Math Cheat, all you need to do is to enter a math equation\n" +
                     "Possible operands:\n+ - / * ^ ( )\nsqrt(x) sin(x) cos(x)\ntan(x) log(x)\n\n" +
                     "Example: (2*3)+8/4*sqrt(81)";
      sendResponse(message, response);
    } else {

      console.log("Formula Entered: " + message.body);

      var formula = message.body;
      formula = formula.replace('÷', '/');
      formula = formula.replace('×', '*');
  
        // User didn't request help... perform the lookup.
      let encodedBody = 'https://api.mathjs.org/v4/?expr='+encodeURIComponent(formula);
  
      console.log("HTTPS: " + encodedBody);
      sendHTTP(message, encodedBody.toLowerCase());
    }

  }
})

// Start the consumer.
consumer.run()

