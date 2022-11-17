const express = require("express");
const expressJWT = require('express-jwt')
const config = require('./config')
const images = require('./images')
const sendHtml = require('./sendHtml')
const transform = require('./getHtml')
const acceptMd = require('./acceptMd')
const register = require('./register')
const login = require('./login')
const comment = require('./comment')
const path = require('path')
const app = express()
const fs = require("fs");
const app2 = express()
const cors = require('cors')
app.use(express.urlencoded({ extended: false }))//配置解析post参数为url格式的的中间件，也可以去第三方下载
app.use(express.json())//配置解析post参数为json格式的中间件
app.use(cors())//配置跨源中间件
app.listen(3001, () => {
    console.log("3001端口已经开发了")
})

transform.md2html({
    theme: 'theme1',
    inputPath: path.resolve(__dirname, './md'),
    outputPath: path.resolve(__dirname, './output')
})

images.articleImages(app)
images.ImagesUrls(app)
sendHtml.sendHtmlCode(app)
console.log(111)
register(app)
login(app)
app.use(expressJWT({ secret: config.jwtSecretkey }).unless({
    method: ['GET']  // 指定get请求不经过 Token 解析
}))//在需要验证token的路由前配置解析token中间件
app.post('/checkToken', (req, res) => {
    res.send({ status: 0, message: 'token在有效期内' })
})
comment(app)
acceptMd.upload(app)//上传文件时配置需要解析token才能上传
app.use((err, req, res, next) => {//错误中间件
    if (err.name === 'UnauthorizedError') return res.send({ status: 1, message: 'token或已过期,身份认证失败' })
    return res.send({ status: 1, message: '未知错误' })
})



















// app2.use(cors())
// app2.listen(3002, () => {
//     console.log("3002端口已经开发了")
// })
// app2.use(express.static('dist'))