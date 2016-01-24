/** 1 **/
var buf1 = new Buffer('fibjs');
console.log(buf1);                              //TODO 输出形式 <Buffer 66 69 62 6a 73>

var arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

/** 2 **/
var buf1 = new Buffer(arr); // copies the buffer
var buf2 = new Buffer(arr.buffer); // shares the memory with arr;

console.log(buf1);
// Prints: <Buffer 88 a0>, copied buffer has only two elements
console.log(buf2);
// Prints: <Buffer 88 13 a0 0f>

/** 3 **/
var buf1 = new Buffer('this is a tést');
console.log(buf1.toString());
// prints: this is a tést
console.log(buf1.toString('ascii'));            //TODO var buf = new Buffer('this is a tést')  should be 'this is a tC)st'  but error
// prints: this is a tC)st

/** 4 **/
var arr = [Buffer('1234'), Buffer('0123')];     //TODO buffer() 的支持

/** 5 **/
var buf1 = new Buffer(10).fill(0);              //TODO fill 支持执行后原对象返回
var buf2 = new Buffer(14).fill(0);
var buf3 = new Buffer(18).fill(0);
console.log(buf1.length + buf2.length + buf3.length);

/** 6 **/
var buf = new Buffer(10);
buf.write('abcdefghj', 0, 'ascii');            //TODO write 时,长度没有,默认使用 buf.length
console.log(buf.length);
// Prints: 10
buf = buf.slice(0, 5);
console.log(buf.length);
// Prints: 5

/** 7 **/
var buf = new Buffer([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(buf.readDoubleBE());               //TODO readDoubleBE 等一系列方法默认 offset 为0

/** 8 **/
var buf = new Buffer('buffer');                //TODO slice 反向的支持
console.log(buf.slice(-6, -1).toString());

/** 9 **/
var buf = new Buffer('fibjs');
console.log(buf.toString(undefined,0,5));      //TODO undefined 时为 utf8

/** 10 **/
var buf = new Buffer('test');
var json = JSON.stringify(buf);

console.log(json);
// Prints: '{"type":"Buffer","data":[116,101,115,116]}'

var copy = JSON.parse(json, (key, value) => { //TODO toJSON 接口形式为 {type:'Buffer',data:obj}形式 原有 toJSON 的接口希望能够保留,改个名字eg. toJSON2
    return value && value.type === 'Buffer'
        ? new Buffer(value.data)
        : value;
});

console.log(copy.toString());
// Prints: 'test'

/** 11 **/
var buf = new Buffer(6);                     //TODO 尽快实现 writeUIntBE 等
buf.writeUIntBE(0x1234567890ab, 0, 6);
console.log(buf);
//Prints: <Buffer 12 34 56 78 90 ab>

/** 12 **/
//buffer.toString(encoding)  ascii/utf16le/ucs2/binary 等的支持