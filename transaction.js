const ethers = require("ethers");
const fetch = require("node-fetch");

async function main() {
  // defining the wallet private key
  let privatekey = "0x17e371dc2Cb20294eE302dC3fBD7Ad2AbA89F8Be";
  let wallet = new ethers.Wallet(privatekey);

  // print the wallet address
  console.log("Using wallet address " + wallet.address);

  let transaction = {
    to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
    value: ethers.utils.parseEther("1"),
    gasLimit: "21000",
    maxPriorityFeePerGas: ethers.utils.parseUnits("5", "gwei"),
    maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),
    nonce: 1,
    type: 2,
    chainId: 3,
  };

  // sign and serialize the transaction
  let rawTransaction = await wallet
    .signTransaction(transaction)
    .then(ethers.utils.serializeTransaction(transaction));

  // print the raw transaction hash
  console.log("Raw txhash string " + rawTransaction);

  // pass the raw transaction hash to the "eth_sendRawTransaction" endpoint
  let gethProxy = await fetch(
    `https://api-ropsten.etherscan.io/api?module=proxy&action=eth_sendRawTransaction&hex=${rawTransaction}&apikey=YourApiKeyToken`
  );
  let response = await gethProxy.json();

  // print the API response
  console.log(response);
}

main();
