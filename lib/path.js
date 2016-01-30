var path = require('path');
var os = require('./os');
var util = require('./util');

function trimArray(arr) {
    var lastIndex = arr.length - 1;
    var start = 0;
    for (; start <= lastIndex; start++) {
        if (arr[start])
            break;
    }

    var end = lastIndex;
    for (; end >= 0; end--) {
        if (arr[end])
            break;
    }

    if (start === 0 && end === lastIndex)
        return arr;
    if (start > end)
        return [];
    return arr.slice(start, end + 1);
}

function assertPath(path) {
    if (typeof path !== 'string') {
        throw new TypeError('Path must be a string. Received ' +
            util.inspect(path));
    }
}

var win32sep = '\\';
var win32format = function(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new TypeError(
            'Parameter "pathObject" must be an object, not ' + typeof pathObject
        );
    }

    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base ||
        ((pathObject.name || '') + (pathObject.ext || ''));
    if (!dir) {
        return base;
    }
    if (dir === pathObject.root) {
        return dir + base;
    }
    return dir + win32sep + base;
};


var posixsep = '/';
var posixformat = function(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new TypeError(
            'Parameter "pathObject" must be an object, not ' + typeof pathObject
        );
    }

    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base ||
        ((pathObject.name || '') + (pathObject.ext || ''));
    if (!dir) {
        return base;
    }
    if (dir === pathObject.root) {
        return dir + base;
    }
    return dir + posixsep + base;
};

var posixisAbsolute = function(path) {
    assertPath(path);
    return !!path && path[0] === '/';
};

const splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
function win32StatPath(path) {
    const result = splitDeviceRe.exec(path);
    const device = result[1] || '';
    const isUnc = !!device && device[1] !== ':';
    return {
        device,
        isUnc,
        isAbsolute: isUnc || !!result[2], // UNC paths are always absolute
        tail: result[3]
    };
}
var win32isAbsolute = function(path) {
    assertPath(path);
    return win32StatPath(path).isAbsolute;
};

var osType = os.type();

path.parse = function(p) {
    assertPath(p);
    var ext = path.extname(p);
    var result = splitDeviceRe.exec(p);
    return {
        root: osType === 'Windows_NT' ? (result[1] || '') + (result[2] || '') : '/',
        dir: path.dirname(p),
        base: path.basename(p),
        ext,
        name: path.basename(p, ext)
    }
};

path.resolve = function() {
    var args = Array.prototype.slice.call(arguments);
    var p = path.join.apply(null, args);
    return path.fullpath(p);
};

var posixrelative = function(from, to) {
    assertPath(from);
    assertPath(to);

    from = path.resolve(from).substr(1);
    to = path.resolve(to).substr(1);

    var fromParts = trimArray(from.split('/'));
    var toParts = trimArray(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
        }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
};

var win32relative = function(from, to) {
    assertPath(from);
    assertPath(to);

    from = path.resolve(from);
    to = path.resolve(to);

    // windows is not case sensitive
    var lowerFrom = from.toLowerCase();
    var lowerTo = to.toLowerCase();

    var toParts = trimArray(to.split('\\'));

    var lowerFromParts = trimArray(lowerFrom.split('\\'));
    var lowerToParts = trimArray(lowerTo.split('\\'));

    var length = Math.min(lowerFromParts.length, lowerToParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
        if (lowerFromParts[i] !== lowerToParts[i]) {
            samePartsLength = i;
            break;
        }
    }

    if (samePartsLength === 0) {
        return to;
    }

    var outputParts = [];
    for (var i = samePartsLength; i < lowerFromParts.length; i++) {
        outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('\\');
};

if (osType === 'Windows_NT') {
    path.format = win32format;
    path.isAbsolute = win32isAbsolute;
    path.relative = win32relative;
} else {
    path.format = posixformat;
    path.isAbsolute = posixisAbsolute;
    path.relative = posixrelative;
}

module.exports = path;