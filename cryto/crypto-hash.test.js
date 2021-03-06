const  cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
    it('generates a SHA-256 hashed output',  () => {
        expect(cryptoHash('foo'))
            .toEqual('2C26B46B68FFC68FF99B453C1D30413413422D706483BFA0F98A5E886266E7AE'.toLowerCase());
    });

    it('inputs are the same content but order is not same',  () => {
        expect(cryptoHash('one','two','three')).toEqual(cryptoHash('two','three','one'));
    });
});