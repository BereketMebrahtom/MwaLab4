var fs = require('fs');

function readFile(data) {
    var readStream = fs.createReadStream(__dirname + '/file.txt', 'utf-8');
    readStream.on('data', function(chunk){
       
        process.send(chunk);
    });

    readStream.on('end', function(){
        process.send('end');
    });
}

process.on('message', function (msg) {
    readFile();
});