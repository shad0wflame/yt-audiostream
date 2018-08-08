const { createServer } = require('http');
const http = createServer();
const path = require('path');
const { URL } = require('url');
const YTAudioStream = require('./ytaudiostream.js');

// Stream driven
let downloader;
http.on('request', (req, res) => {
	const firstUrl = new URL('https://r3---sn-jxnj5-cjoe.googlevideo.com/videoplayback?expire=1533746399&mm=32&mn=sn-jxnj5-cjoe&id=ytJb-xDl69U.0&ipbits=0&source=yt_live_broadcast&noclen=1&pl=18&ei=f8hqW9SMIIjy8wTP5omYCw&ms=lv&ip=84.89.63.110&c=WEB&keepalive=yes&compress=yes&mt=1533724501&gir=yes&mime=audio%2Fmp4&key=yt6&requiressl=yes&live=1&gcr=es&cmbypass=yes&signature=D6C0DDC7D6A9C74E068C10CF9725DE0AA6F3913E.2BF70A989E7CD19F6EE8888179825BCD5E1A48A1&mv=u&sparams=cmbypass%2Ccompress%2Cei%2Cgcr%2Cgir%2Chang%2Cid%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clive%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cnoclen%2Cpl%2Crequiressl%2Csource%2Cexpire&hang=1&itag=140&alr=yes&cpn=-OSkiSWeonqNwpAL&cver=2.20180804&sq=10757&rn=26&rbuf=11246');
    const downloader = new YTAudioStream(firstUrl);
	
	res.setHeader('Content-Type', 'audio/webm');
	res.setHeader('Transfer-Encoding', 'chunked');
	downloader.pipe(res);
});

http.listen(3000, function(){
	console.log('Listening!');

});