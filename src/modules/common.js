var AbstractError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Error'
}
AbstractError.prototype = new Error();
AbstractError.prototype.name = 'Abstract Error';

exports.AbstractError = AbstractError;