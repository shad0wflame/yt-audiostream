const { request }  = require('https');
const { URL } = require('url');
const PassthroughStream = require('./passthrough-stream');

let _private = new WeakMap();

class YTAudioStream {

    constructor(firstURL) {
		
		this.live = false;
		
        _private.set(this, {
            /** @private { DuplexStream } _dStream **/
            _dStream: new PassthroughStream(),

            /** @private { Function } _pipeChunks **/
            _pipeChunks: pipeChunks
        });

        _private.get(this)._pipeChunks.call(this, firstURL);
    }

    pipe(stream) {
        return _private.get(this)._dStream.pipe(stream);
    }
}

/**
 * @private
 *
 * Downloads a file and pipe its chunks.
 * @param url
 * @returns {*}
 */
function pipeChunks(url) {
    const dStream = _private.get(this)._dStream;
    const req = request(url.href);

    req.on('response', res => {
        res.pipe(dStream, {end: false});
        res.on('end', () => {
            const header = res.headers['x-sequence-num'];
            let _url = url;

            if (header) {
                const currentSegment = JSON.parse(header);
                console.log(currentSegment);

                if (!this.live) {
                    const nextSegment = res.headers['x-head-seqnum'];
                    _url = new URL(url.href.replace(/&sq=[0-9]+/, `&sq=${nextSegment}`));
                    this.live = true;
                } else {
                    _url = new URL(url.href.replace(/&sq=[0-9]+/, `&sq=${currentSegment + 1}`));
                }
            }

            _private.get(this)._pipeChunks.call(this, _url);
        });
    });

    return req.end();
}

module.exports = YTAudioStream;