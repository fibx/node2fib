var m = [
    'assert'
];

var mo = {};
m.forEach(name=> {
    mo[name] = require(`./modules/${name}`)();
});

module.exports = function(m_name) {
    return mo[m_name];
};