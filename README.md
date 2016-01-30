#node2fib

###node2fib 致力于能将 nodejs 代码能够在 fibjs 运行		

##过程							

* 先进行 js 层面的兼容					
* 再逐步原生向此靠拢			

##结构

* fix 为 nodejs 无法使用 js 实现的 api 提出由fibjs 原生实现									
* lib 为 js 兼容库									
* realization 为 js 兼容部分需要 原生的实现								
* src 为 fib 脚本      			
* test 为最终兼容测试				


##兼容及发现错误方案

	1. Debug 模式进行 api 兼容 
	2. 查找兼容方式及无法兼容的api
		a. 兼容方式使用 js 实现
		b. 无法兼容的 API 提出 fix
	3. 对兼容部分模块进行 test 模式校验
	4. 对JS兼容部分提出 realization         
	5. 完全兼容模块进行 test 模式校验
	
##实现进度

| 模块名            | js 兼容程度        | 原生兼容程度   |
| -----------------|:-----------------:|:------------:|
| assert					 | 		完全兼容		     |	 待兼容		  | 
| buffer					 |		部分兼容				 |完全兼容(待发布)|
| child_process		 |									 |						  |
| cluster					 |									 |						  |
| console					 |									 |						  |
| crypto				   |									 |						  |
| dgram					   |									 |						  |
| dns						   |									 |						  |
| domain				   |									 |						  |
| events					 |									 |						  |
| fs				       |									 |						  |
| http				     |									 |						  |
| https				     |									 |						  |
| module					 |									 |						  |
| net 						 |									 |						  |
| os				       |		完全兼容				 |	 待兼容		  |
| path					   |								   |						  |
| punycode				 |									 |						  |
| querystring			 |									 |						  |
| readline				 |									 |						  |
| repl				     |									 |						  |
| stream					 |									 |						  |
| stringdecoder		 |								   |						  |
| timers				   |									 |						  |
| tls			         |									 |						  |
| tty				       |								   |						  |
| url				       |									 |						  |
| util					   |									 |						  |
| v8				       |									 |						  |
| vm					     |									 |						  |
| zlib						 |									 |						  |