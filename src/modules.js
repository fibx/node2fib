var m = [
    'buffer',
    'util',
    'os',
    'process',
    'process_node',
    'assert',
    'fs',
    'path',
    'events'
];

var mo = {};
m.forEach(name=> {
    if (name === 'process') {
        return mo[name] = require('process');
    }
    if (name === 'process_node') {
        return mo[name] = require('../lib/process');
    }
    mo[name] = require(`../lib/${name}`);
});

module.exports = function(m_name) {
    return mo[m_name];
};