var Process = require('process');                     //use fibjs module process and node module process
var os = require('os');                               //use node module

var p = {};

if (os.type.toLowerCase().indexOf('windows') === -1) {
    p.env = JSON.parse(Process.popen(`python ${__dirname}/../src/script/-nix.py env`).read().toString().replace(/\'/g, '\"'));
} else {
    //TODO windows
}

p.pid = parseInt(Process.popen(`python ${__dirname}/../src/script/-nix.py pid`).read().toString()) - 2;  //TODO check pid is true
p.popen = Process.popen;

module.exports = ()=> {

    return p;
};