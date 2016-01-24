var os = require('os');

module.exports = () => {

    var o = {};

    o.type = os.type.toLowerCase().indexOf('window') != -1 ? 'Windows_NT' : os.type;

    return o;
};