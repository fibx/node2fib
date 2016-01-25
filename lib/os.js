var os = require('os');
var process = require('process');
var process_node = require('./process');

var o = {};

o.type = function() {
    return os.type.toLowerCase().indexOf('window') != -1 ? 'Windows_NT' : os.type;
};
o.EOL = os.EOL;
o.arch = function() {
    switch (os.arch) {
        case 'x86_64':
            return 'x64';
        case 'i686':
            return 'ia32';
        case 'arm':
            return 'arm';
        default:
            return 'unknown';
    }
};

o.cpus = function() {
    return os.CPUInfo();
};

o.freemem = os.freemem;
o.loadavg = os.loadavg;
o.uptime = os.uptime;
o.totalmem = os.totalmem;

o.release = function() {
    os.version();
};

o.hostname = function() {
    return os.hostname;
};

o.homedir = function() {
    return process.popen('echo ~/').read().toString().split('\n')[0];
};

o.endianness = function() {                                                                                    //TODO change

};

o.tmpdir = function() {
    var path, trailingSlashRe;
    if (o.type().toLowerCase().indexOf('windows') != -1) {                                                     //TODO change
        trailingSlashRe = /[^:]\\$/;
        path = process_node.env.TEMP ||
            process_node.env.TMP ||
            (process_node.env.SystemRoot || process_node.env.windir) + '\\temp';
    } else {
        trailingSlashRe = /.\/$/;
        path = process_node.env.TMPDIR ||
            process_node.env.TMP ||
            process_node.env.TEMP ||
            '/tmp';
    }

    if (trailingSlashRe.test(path))
        path = path.slice(0, -1);
    return path;
};

o.tmpDir = o.tmpdir;

o.networkInterfaces = function() {
    return os.networkInfo();
};

o.platform = function() {
    return process.popen(`python ${__dirname}/../src/script/-nix.py platform`).read().toString().split('\n')[0];
};

module.exports = o;