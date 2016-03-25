var vm = require('vm');
var process = require('process');
var modules = require('./modules');

var {argv} = process;
argv[2] = argv[2] || 'index.js';
var mainPath = `${__dirname}/${argv[2]}`;

var fibers = {};
var fiberID = 0;

exports.addFiber = function(fiber) {
    fibers['fiber' + fiberID] = fiber;
    fiberID++;
    return fiberID - 1;
};

exports.removeFiber = function(fiberID) {
    fibers['fiber' + fiberID].dispose();
    delete fibers['fiber' + fiberID];
    return fiberID;
};

var nodeEnv = new vm.SandBox({}, function() {
        var m = modules(arguments[0]);
        if (m) {
            return m;
        }
    },
    'node_env');

nodeEnv.require('../lib/global.js');
nodeEnv.run(mainPath);

for (var fiber in fibers) {
    fibers[fiber].join();
}