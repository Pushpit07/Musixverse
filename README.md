# Musixverse

## How to setup

-   Run `npm install` to install npm dependencies

-   Start the local development blockchain on Ganache

-   Connect Metamask to local Ganache blockcahin

-   Run `truffle migrate --reset` in the terminal

-   Run `npm start` to start the React application

## How to contribute?

**DO NOT** make and push changes to the main branch!

**ALWAYS** make changes to code by checking out to a different branch.

## Running the Test Script

Just run: `truffle test`

## Migrate the Contract after making any changes inside the contracts folder

`truffle migrate --reset`

## Testing in Truffle console

-   Run: `truffle console`

-   `Musixverse.deployed().then(function(instance) {contract = instance})`

-   Test the deployed contract:

    `contract.address`

    `contract.name()`

    `contract.symbol()`

-   Create Song:

    `contract.createSong("Yay!", "Sommaiya Angrish", 2, "imageHash123", "songHash123", false, ["spotifyLink.com", "appleLink.com", "amznLink.com"], ["Pop", ["Guitar", "Drums"], "A good day", "Non-Rhyme", "Metaphorical", "Mids heavy", "Digital", true])`

-   To check the created song:
    `contract.songs(0)`

## Migrating to Polygon Testnet

-   `truffle migrate --network polygonTestnet`
