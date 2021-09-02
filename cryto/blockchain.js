const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({data}) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length - 1],
            data
        });

        this.chain.push(newBlock);
    }

    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            console.error('The incoming chain must be longer');
            return;
        } else {
            if(!Blockchain.isValidChain(newChain)) {
                console.error('The incoming chain must be valid');
                return;
            }
        }
        this.chain = newChain;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const actualLastHash = chain[i - 1].hash;
            const {timestamp, lastHash, data, hash} = block;
            if (lastHash !== actualLastHash) return false;

            const validateHash = cryptoHash(timestamp, lastHash, data);
            if (validateHash !== hash) return false;

        }
        return true;
    }
}

module.exports = Blockchain;