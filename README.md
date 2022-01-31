# SOLANA AUTH API

This is a [typscript](https://www.typescriptlang.org/) base project with [mongodb](https://www.mongodb.com/), [express](https://expressjs.com/fr/), [solana](https://docs.solana.com/developing/clients/javascript-api) and [mocha](https://mochajs.org/) tests.
<br>It provide a CRUD for users with Solana address as primary index and Auth system with [JWT]('https://www.npmjs.com/package/jsonwebtoken').
<br>

## Principle

The user have to send signed messages matching with the know messages of the server and him public address to access or modify him account datas.
<br>

## Routes
<ul>

<li><strong>GET /messageSample</strong></li>
    <em>required params (optional): code ( as number ).
    <br>response (json) => message : string .</em>
<br>
<br>


<li><strong>POST /user/connect</strong></li>
    <em>required body :
    <ul>
        <li>signedMessage : a string representing the messageSample (code 0) signed by the owner of Solana address.</li>
        <li>address : the solana pubkey address as string.
    </ul>
        response (json) => user : User, token : string</em>
<br>
<br>


<li><strong>GET /user/get</strong></li>
    <em>required header : the authorisation field with the token sended in connect.
    <br>response (json) => User </em>
<br>
<br>

<li><strong>POST /user/update</strong></li>
    <em>required header : the authorisation field with the token sended in connect.
    <br>required body :
    <ul>
        <li>signedMessage : a string representing the messageSample (code 1) signed by the owner of Solana address.</li>
        <li>datas : an object with custom datas to create or update an user.
    </ul>
        response (json) => an user object in body (with address, _id, pseudo?).</em>

<br>

<li><strong>POST /user/remove</strong></li>
    <em>required header : the authorisation field with the token sended in connect.
    <em>required body : signedMessage : a string representing the messageSample (code 2) signed by the owner of Solana address.
    <br>response (json) => status 200 with success : true in body.</em>
</ul>
<br>

<em>Note: the connect call also create a new user if not exist (and if signed message is correct and correspond to the address).</em>
<br>
</em>

</ul>


## USAGE 

1. Clone the repository on your machine.
2. Open a terminal and move to the root of the project in the folder created by cloning repository.
3. In the terminal, type "npm i" and press enter (you have to get [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [nodejs](https://nodejs.org/en/download/) installed).
3. In the terminal, type "npm run test" and press enter for launching mocha test or "npm run build" to create a dist folder containing the javascript code.
4. Be shure to have [mongodb](https://www.mongodb.com/) installed on your local machine and accessible.


## TEST NOTES

1. npm run test => test the global application with routes, datas, exclusing tests on solana API
2. npm run testRoutes => test only routes
3. npm run testSolana => run only tests on the solana API like basic transactions

<ins>Mongoose</ins> reset the database before launching all tests.
It should drop all the collections and indexes in the index.data.spec.ts to avoid problems with indexes.

<ins>Solana</ins> got 2 keypairs in keypairs folder and make airdrop before launching all tests until balance is more or equal to 1 sol. 
<br>
It also test a transaction of a few sols from key1 to key2.
<br>
Use <em>devnet</em> Cluster.

The mocha timeout is fixed to 1 minute because of solana's confirmations time.

## PROD

Set a value MODE=prod before runing the application and edit the mongodb path in src/environment.ts to your mongodb url on production skope.
<br>Solana Cluster is set to "mainnet-beta" in prod mode.

