// javascript ES6 syntax
// using functions in a class

const Web3 = require('web3');

// txChecker projectID on infura

class TransactionChecker {
  web3;
  account;

  constructor(projectId, account) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${projectId}`));
    this.account = account.toLowerCase();
  }

  async checkBlock() {
    // problem with latest, you can't tell what's goin on
    // let block = await this.web3.eth.getBlock("latest", () => console.log('fetched getBlock()'))

    // instead of latest lets do my block
    let block = await this.web3.eth.getBlock("9659922", () => console.log('fetched Block || 9659922'))

    console.log('Searching block ' + block.number.toString());
    

    if (block!=null && block.transactions!=null) {
      for (let txHash of block.transactions) {
        // obtain the particular transaction
        let tx = await this.web3.eth.getTransaction(txHash)
        // log out the transaction
        // console.log('tx: ' + JSON.stringify(tx, null, '\t'));

        // condition to skip that value with tx.to as null
        if (tx.to == null) {
          console.log('tx.to: null on txHash: ' + txHash)
          continue
        }

        if(this.account == tx.to.toLowerCase()) {
          console.log('Transaction Found! on block ' + block.number)
          
          // if its undefined
          
          console.log(`sent ${this.web3.utils.fromWei(tx.value, 'ether')}Ξ to ${this.account}}`)
          console.log({
            address: tx.from, 
            value: this.web3.utils.fromWei(tx.value, 'ether'), 
            timestamp: new Date()
          });
          
        }
      }
    }
  }
}

// personal project details.
const data = {
  projectId: 'bfe813ef72da4016a4b9b3d5feb8c2dd',
  // weth smart contract
  account: '0xc778417e063141139fce010982780140aa0cd5ab'
}


async function main() {
  try {
    console.log('--inside try block')
    // initialize obj
    let txChecker = new TransactionChecker(data.projectId, data.account)
    // call method()
    txChecker.checkBlock();


  } catch (e) {
    console.log('try catch: ' + e)
  }
}

main()
  .then(() => console.log('main executed'))
  .catch((error) => console.log('async catch: ' + error));

