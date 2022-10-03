const multer = require('multer')
const fs = require('fs')
const path = require('path')
const uploadFile = multer({ dest: 'md' })


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
        res.send({ ok: 1 })
    })
}

module.exports = { upload }