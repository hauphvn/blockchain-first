const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchian', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
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
        beforeEach(() => {
            blockchain.addBlock({data: 'hauphvn1'});
            blockchain.addBlock({data: 'hauphvn2'});
            blockchain.addBlock({data: 'hauphvn3'});
        });
        describe('when the chain does not start with the genesis block', () => {
            it('should return false', () => {
                blockchain.chain[0] = {data: 'fake-genesis'};

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

            });
        });
        describe('when the chain start with the genesis and has multiple blocks', () => {
            describe('and a lastHash reference hash changed', () => {
                it('should return false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with an invalid field', () => {
                it('should return false', () => {
                    blockchain.chain[2].data = 'some-bad-and-evil-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain does not contain any invalid blocks', () => {
                it('should return true', () => {

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });
        });
    });

    describe('replaceChain()', () => {
        describe('when the new chain is not longer', () => {
            it('should not replace the chain',  () => {
                newChain.chain[0] = {new: 'chain'};
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });
        });

        describe('when the new chain is longer', () => {
            beforeEach(() => {
                newChain.addBlock({data: 'hauphvn1'});
                newChain.addBlock({data: 'hauphvn2'});
                newChain.addBlock({data: 'hauphvn3'});
            });
             describe('and the chain is invalid', () => {
                 it('should not replace the chain',  () => {
                     newChain.chain[2].data = 'bad-data';
                     blockchain.replaceChain(newChain.chain);
                     expect(blockchain.chain).toEqual(originalChain);
                 });
             });

             describe('and the chain is valid', () => {
                 it('should replace the chain',  () => {
                     blockchain.replaceChain(newChain.chain);
                     expect(blockchain.chain).toEqual(newChain.chain);
                 });
            });
        });
    });
});