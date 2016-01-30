var path = require('path');

console.log(path.join('foo', {}, 'bar'));                                                                //TODO: 相关报错信息
// throws exception
//TypeError: Arguments to path.join must be strings