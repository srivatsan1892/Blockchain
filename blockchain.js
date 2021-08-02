const SHA256=require("crypto-js/sha256");
class block {
 constructor (index,timestamp,data,prevhash= ''){
    this.index=index;//index for the class
    this.timestamp=timestamp;
    this.data=data;
    this.prevhash=prevhash;
    this.hash='';
    this.nonce=0;

  }
  calculateHash(){
    //using SHA256 function
      return  SHA256(this.index+this.timestamp+this.prevhash+JSON.stringify(this.data)+this.nonce).toString();
  }
  mineNewBlock(diffcuilty){
    while(this.hash.substring(0,diffcuilty)!==Array(diffcuilty+1).join("0")){
      this.nonce++;
      this.hash=this.calculateHash();
    }
    console.log("A new block was mined with hash"+this.hash);
  }
}

class Blockchain{
  constructor(){
    //the first variable of the array will be the genesis block,crated manually
    this.chain=[this.createGenesisBlock()];
    this.diffcuilty=3;
  }
  createGenesisBlock(){
  return new block(0,"01/01/2021","This is a genesis block","0");
  }
  getlatestBlock(){
    return this.chain[this.chain.length-1];
  }
  addBlock(newBlock){
    newBlock.prevhash=this.getlatestBlock().hash;
    newBlock.mineNewBlock(this.diffcuilty);
    //newBlock.hash= newBlock.calculateHash();
    this.chain.push(newBlock);
  }
  checkBlockValid(){
    for(let i=1;i<this.chain.length;i++){
     const current=this.chain[i];
     const prev=this.chain[i-1];

     if(current.hash!= current.calculateHash()){
       return false;
     }
     if(current.prevhash != prev.hash){
       return false;
     }
    }
    return true;
  }

}
let Block1 = new block(1,"02/02/2021",{mybalance:100});
let Block2 = new block(2,"03/02/2021",{mybalance:50});
console.log("First Block creation ");
let myBlockchain= new Blockchain();
myBlockchain.addBlock(Block1);
console.log("Second Block creation ");
myBlockchain.addBlock(Block2);

console.log(JSON.stringify(myBlockchain,null,4));
console.log("Validation Check for the blockchain: "+myBlockchain.checkBlockValid());

myBlockchain.chain[1].data ={mybalance:5000};
console.log("Validation Check for the blockchain: "+myBlockchain.checkBlockValid());
//proof of work  to be added in the calculateHash function
//SHA256 string should start with zero
// for this wee consider the nonce value
