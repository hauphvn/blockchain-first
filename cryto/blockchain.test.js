const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchian', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('contains a `chain` Array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block to the chain', () => {
        const newData = 'foo bar';
        blockchain.addBlock({data: newData});
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });
    describe('isValidChain()', () => {
        describe('when the chain does not start with the genesis block', () => {
            it('should return false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

            });
        });
        describe('when the chain start with the genesis and has multiple blocks', () => {
            beforeEach(() =>{
                blockchain.addBlock({data: 'hauphvn1'});
                blockchain.addBlock({data: 'hauphvn2'});
                blockchain.addBlock({data: 'hauphvn3'});
            });
            describe('and a lastHash reference hash changed', () => {
                it('should return false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with an invalid field', () => {
                it('should return false',  () => {
                    blockchain.chain[2].data = 'some-bad-and-evil-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain does not contain any invalid blocks', () => {
                it('should return true',  () => {

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
        });
    });
});