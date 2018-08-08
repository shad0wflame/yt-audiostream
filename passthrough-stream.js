const { Transform } = require('stream');

class PassthroughStream extends Transform {

    constructor(options) {
        super(options);
    }

    _transform(chunk, encoding, callback) {
        callback(null, chunk);
    }

}

module.exports = PassthroughStream;