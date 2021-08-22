//Hash function demo
lightningHash = (data) => {
    return data + '*';
}
class Block {
    constructor(data, hash, lashHash) {
        this.data = data;
        this.hash = hash;
        this.lashHash = lashHash;
    }
}

class Blockchain {
    constructor() {
        const genesis = new Block('gen-data',
            'gene-hash', 'gen-lashHash');
        this.chain = [genesis];
    }

    addBlock(data) {
        const lashHash = this.chain[this.chain.length - 1].hash;
        const hash = lightningHash(data);
        const newBlock = new Block(data,hash, lashHash);
        this.chain.push(newBlock);
    }
}

const fooBlockchain = new Blockchain();
fooBlockchain.addBlock('one');
fooBlockchain.addBlock('two');
fooBlockchain.addBlock('three');

console.log('fooBlockchain', fooBlockchain);
