var common = require('./common');
var assert = require('assert');

module.exports = ()=> {

    var a = function() {
        try {
            assert.ok.apply(null, arguments);
        } catch (e) {
            e.name = 'AssertionError';
            throw e;
        }
    };

    var AssertionError = function(msg) {
        AssertionError.super.call(this, msg, this.constructor);
    };
    AssertionError.prototype = new common.AbstractError();
    AssertionError.prototype.name = 'AssertionError';

    for (var func in assert) {
        a[func] = function() {
            try {
                assert[func].apply(null, arguments);
            } catch (e) {
                e.name = 'AssertionError';                    //TODO whether be a new AssertionError
                throw e;
            }
        };
    }

    a['throws'] = function(block, _error, _message) {
        try {
            assert.throws(block, _message);
        } catch (e) {

        }
    };

    a['doesNotThrow'] = function(block, _error, _message) {
        try {
            assert.doesNotThrow(block, _message);
        } catch (e) {

        }
    };

    a['AssertionError'] = AssertionError;

    return a;
};