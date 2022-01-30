# SOLANA API

This is a [typscript](https://www.typescriptlang.org/) base project with [mongodb](https://www.mongodb.com/), [express](https://expressjs.com/fr/), [solana](https://docs.solana.com/developing/clients/javascript-api) and [mocha](https://mochajs.org/) tests.
<br>It provide a CRUD for users with Solana address as primary index.

# Routes
<ul>
<li><strong>GET /user/get</strong></li>
    <em>required params : address (as string from Solana publicKey).
    <br>response : an user object in body (with address, _id, pseudo?).</em>

<br>

<li><strong>POST /user/update</strong></li>
    <em>required body :
    <ul>
        <li>signature : a string representing a recent solana transaction signature (containing the concerned address).</li>
        <li>datas : an object with custom datas to create or update an user.
    </ul>
        response : an user object in body (with address, _id, pseudo?).</em>

<br>

<li><strong>POST /user/remove</strong></li>
    <em>required body : signature : a string representing a recent solana transaction signature (containing the concerned address).
    <br>response : status 200 with success : true in body.</em>
</ul>



<br>

<em>Note: the update function also create a new user if not exist.</em>
<br><em>The client need to make an empty transaction (cost 0.00005 sol) on the update and remove function, to proove that he own the account.
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

