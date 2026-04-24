var http = require('http');
var url = require('url');
var fs = require('fs');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var util = require("util"), repl = require("repl");

serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

http.createServer(function (req, res)  {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data)  {
        if (err)  {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);