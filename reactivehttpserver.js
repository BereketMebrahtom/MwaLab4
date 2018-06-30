const http = require('http');
const { Subject } = require('rxjs');
const url = require('url');

const { fork } = require('child_process');

var obsere = new Subject();

obsere.subscribe(function (param) {
    var parseUrl = url.parse(param.reqParam.url, true);
    if (parseUrl.query.url === "path/to/my/file.txt") {
        const childProcess = fork('childreader.js');

        childProcess.send('start');

        childProcess.on('message', function (data) {
            if (data === 'end') {
                param.resParam.end();
            }
            else {
                param.resParam.write(data);
            }
        });
    }
    else {
        param.resParam.end();
    }
});

http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    obserable.next({ reqParam: req, resParam: res });
}).listen(4000, () => {
    console.log("started listening on port 4000");
});