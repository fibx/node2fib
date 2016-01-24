var m = [
];

var mo = {};
m.forEach(name=> {
    mo[name] = require(`./lib/${name}`)();
});

module.exports = function(m_name) {
    return mo[m_name];
};