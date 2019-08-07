# ClueCon-MathCheat
ClueCon 2019 Dangerous Demo - MathCheat

This project is designed as an example to implement SignalWire's new NodeJS API.
It implements the API leveraging the Relay Consumer and demonstrates the asynchronization of a two-way communication paradigm leveraging some minor bot intelligence.

This Bot simulates the ability to cheat on your math test by texting your equation to solve to the MathCheat Bot.

## Goals of Project

* Create a Fully Functional NodeJS Implementation of SignalWire's Messaging API.
* Demonstrate asynchonization to simulate a two-party conversation.
* Document how everything works.
* Do it all in 100-lines of code or less (including comments)!

## Getting Started
To run this project, you must have NodeJS installed.  You must also have a SignalWire account.
You can obtain a SignalWire account by visiting:  https://signalwire.com/signup

The next steps are to install the SignalWire API and other dependencies.
`npm install @signalwire/node`
`npm install https`

Now you must obtain your SignalWire Space, ProductKey and APIToken.  This can be completed on your SignalWire dashboard.  Once you have both secrets add them into the (mathcheat.js) project.

`const projectID = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX';`

`const apiToken = 'PTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';`

`const spaceURL = 'example.signalwire.com';`

Now, obtain a DID (Phone Number) from SignalWire.  This will be the phone number you will need to text into.
Finally, if you are in trial mode, you must verify any phone number that is used for testing.  Following the Verify instructions within the Phone Numbers tab on the SignalWire Dashboard to complete this process.

## Starting the Bot.
To start the bot, simply perform the following at the command line:
`node mathcheat.js`

## Using the Bot.
The bot is designed to direct the user to the HELP message if they enter a none equation.
The HELP message will outline the math operands available and provide an example of how to use.

To learn to use the bot, simply text:  `help`
or an equation, like:  `2*128/4`
