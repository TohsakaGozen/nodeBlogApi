const multer = require('multer')//一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
//注意: Multer 不会处理任何非 multipart/form-data 类型的表单数据
const fs = require('fs')
const path = require('path')
const transform = require('./getHtml')
const uploadFile = multer({ dest: 'md' })//设置接收到的文件的存放地址


const getFileTime = function (filename, newname) {
    let t = new Date();
    let time = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes();
    fs.appendFileSync(`./md/${filename}`, `  filetimeis=${time}`)
    fs.renameSync('./md/' + filename, './md/' + newname)
}

const upload = function (app) {
    app.post('/upload', uploadFile.single('file'), (req, res) => {
        getFileTime(req.file.filename, req.body.filename)
        console.log(req.file)
        console.log(req.body.filename)
        transform.md2html({
            theme: 'theme1',
            inputPath: path.resolve(__dirname, './md'),
            outputPath: path.resolve(__dirname, './output')
        })
        res.send({ ok: 1 })
    })
}

module.exports = { upload }