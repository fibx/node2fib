var Process = require('process');                     //use fibjs module process or node module process
var os = require('os');                               //use node module
var util = require('util');

var p = {};

var type = util.isString(os.type) ? os.type : os.type();

if (type.toLowerCase().indexOf('windows') === -1) {
    p.env = JSON.parse(Process.popen(`python ${__dirname}/../src/script/-nix.py env`).read().toString().replace(/\'/g, '\"'));
} else {
    //TODO windows
}

p.pid = parseInt(Process.popen(`python ${__dirname}/../src/script/-nix.py pid`).read().toString()) - 2;  //TODO check pid is true
p.popen = Process.popen;

module.exports = p;