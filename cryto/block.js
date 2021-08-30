const GENESIS = require('./config');
const cryptoHash = require('./crypto-hash');
class Block {
    constructor({timestamp, lastHash, data, hash}){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.data = data;
        this.hash = hash;
    }

    static genesis(){
        return new this(GENESIS);
    }
    static mineBlock({lastBlock, data}) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        return new this({
            timestamp,
            lastHash,
            data,
            hash: cryptoHash(timestamp,lastBlock.hash, data)
        });
    }
}

module.exports = Block;