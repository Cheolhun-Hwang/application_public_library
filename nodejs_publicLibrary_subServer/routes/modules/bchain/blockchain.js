const sha256 = require('sha256');

HashMap = function(){   
    this.map = new Array(); 
};

HashMap.prototype = {   
    put : function(key, value){   
        this.map[key] = value; 
    },   
    get : function(key){   
        return this.map[key]; 
    },   
    getAll : function(){   
        return this.map; 
    },   
    clear : function(){   
        this.map = new Array(); 
    },   
    isEmpty : function(){     
         return (this.map.size() == 0); 
    }, 
    remove : function(key){     
         delete this.map[key]; 
    }, 
    toString : function(){ 
        var temp = ''; 
        for(i in this.map){   
            temp = temp + ',' + i + ':' +  this.map[i]; 
        } 
        temp = temp.replace(',',''); 
          return temp; 
    }, 
    keySet : function(){   
        var keys = new Array();   
        for(i in this.map){   
            keys.push(i); 
        }   
        return keys; 
    } 
}; 

var BlockChainList = new HashMap();

class Block {
  constructor(index, timestamp, key, prevHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.key = key;
    this.prevHash = prevHash;
    this.thisHash = sha256(
      this.index + this.timestamp + this.key + this.prevHash
    );
  }
}

createBlock = (key) => {
    return new Block(0, Date.now(), key, '0');
}
    
nextBlock = (lastBlock, key) =>{
    return new Block(lastBlock.index + 1, Date.now(), key, lastBlock.thisHash);
}

module.exports.createBlockchainForKey = (key) =>{
    const blockchain = [createBlock(key)];
    BlockChainList.put(key, blockchain);
}

module.exports.addBlockchainForkey = (key, newKey)=>{
    var blockchain = BlockChainList.get(key);

    var length = 0;
    while(true){
        if(blockchain[length] == undefined){
            break;
        }
        length += 1
    }
    let previousBlock = blockchain[length-1]
    const blockToAdd = nextBlock(previousBlock, newKey);
    BlockChainList.get(key).push(blockToAdd);
}

module.exports.getBlockchainForKey = (key) =>{
    return BlockChainList.get(key);
}