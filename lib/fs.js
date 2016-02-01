var fs = require('fs');
var constants = require('./constants');

var f = {};

['F_OK', 'R_OK', 'W_OK', 'X_OK'].forEach(function(key) {
    Object.defineProperty(f, key, {
        enumerable: true, value: constants[key] || 0, writable: false
    });
});

function nullCheck(path, callback) {
    if (('' + path).indexOf('\u0000') !== -1) {
        var er = new Error('Path must be a string without null bytes');
        er.code = 'ENOENT';
        if (typeof callback !== 'function')
            throw er;
        callback.call(null, er);
        return false;
    }
    return true;
}

f.access = function(path, mode, callback) {
    if (typeof mode === 'function') {
        callback = mode;
        mode = f.F_OK;
    } else if (typeof callback !== 'function') {
        throw new TypeError('"callback" argument must be a function');
    }

    if (!nullCheck(path, callback))
        return;

    mode = mode | 0;

    var stat;
    try {
        stat = fs.stat(path);
    } catch (e) {
        return callback(e);
    }

    var m = [];

    m[f.F_OK] = null;
    m[f.R_OK] = !stat.isReadable();
    m[f.W_OK] = !stat.isWritable();
    m[f.X_OK] = !stat.isExecutable();
    m[f.R_OK | f.W_OK] = m[f.R_OK] && m[f.W_OK];
    m[f.R_OK | f.X_OK] = m[f.R_OK] && m[f.X_OK];
    m[f.W_OK | f.X_OK] = m[f.W_OK] && m[f.X_OK];
    m[f.W_OK| f.X_OK | f.W_OK] =  m[f.W_OK] && m[f.X_OK] && m[f.R_OK];
    callback(m[mode]);
};

f.createWriteStream = function(file, option){
    return fs.openTextStream(file, 'w');
};

module.exports = f;