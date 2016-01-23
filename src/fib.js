var vm = require('vm');
var process = require('process');
var modules = require('./modules');

var {argv} = process;
argv[2] = argv[2] || 'index.js';
var mainPath = `${__dirname}/${argv[2]}`;

var nodeEnv = new vm.SandBox({}, function() {
        var m = modules(arguments[0]);
        if (m) {
            return m;
        }
    },
    'node_env');

nodeEnv.run(mainPath);

