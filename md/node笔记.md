# 关于nodejs开发接口中遇到的坑

### 1.忽略了陌生函数为异步的可能性
像在写图片接口，文章接口等使用到的：`readdir``readFile`等等，另外在异步函数中尽量不要使用`forEach()`函数来循环，使用普通循环即可。
异步函数不能用return返回，因为异步函数被调用后会先后返回两个值，第一个返回值是一个promise对象(在异步函数被调用后立即返回)，第二个返回值是异步函数return语句的返回值。第二个返回值将成为第一个返回值promise对象的value属性值。即异步函数的return是用来区分promise的状态的。但可以传实参接受数据

### 2.nodejs的暴露与引入与es不同
1. 引入：nodejs是`const xxx = require('xxx')`,而es中是`import xxx from 'xxx'`
2. 暴露：nodejs只能是`module.export{xxxx}`,而es中可以是默认暴露:`export default xxx`,部分暴露:`export xxx`,集中暴露:`export {xxx,xxx}`

### 3.分情况使用异步还是同步
1. `readdir`与`readFile`等fs的异步函数都有与其相对应的同步函数即`readdirSync`和`readFileSync`等(在末尾加上Sync)，该同步函数则没有回调函数，直接返回结果，即例子的文件数组和文件内容。
2. 异步函数不能return导致后续若需要返回异步回调的结果则难以处理，而同步函数则可以更轻松的处理函数返回的后续结果。

### 4. express的get请求处理传递或收到的数据
get请求处理传递或收到的数据应在中间件中处理且`app.get()`内部是独立的无法在外部改变数据而影响app.get()里面（在不重新启动的情况下），所以需要在中间件里处理发送的数据之后再`req.send()`.filetimeis=2022-10-3 22:54