# EXPRESS MONGODB TYPESCRIPT SOLANA BASE PROJECT WITH MOCHA TESTS

This is a basic Typescript project configuration with Express, Mongodb and Solana with Mocha tests.

## USAGE 

1. Clone the repository on your machine.
2. Open a terminal and move to the root of the project in the folder created by cloning repository.
3. In the terminal, type "npm i" and press enter (you have to get [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [nodejs](https://nodejs.org/en/download/) installed).
3. In the terminal, type "npm run test" and press enter for launching mocha test or "npm run build" to create a dist folder containing the javascript native code.
4. Be shure to have [mongodb](https://www.mongodb.com/) installed on your local machine and accessible.


## TEST NOTES

<ins>Mongoose</ins> reset the database before launching all tests.
It should drop all the collections and indexes in the index.data.spec.ts to avoid problems with indexes.

<ins>Solana</ins> got 2 keypairs in keypairs folder and make airdrop before launching all tests until balance is more or equal to 1 sol. 
<br>
It also test a transaction of a few sols from key1 to key2.
<br>
Use <em>devnet</em> Cluster.

The mocha timeout is fixed to 1 minute because of solana's confirmations time.

## EXAMPLE

You can find an example of using and testing mongodb in example.data.ts and example.data.spec.ts.