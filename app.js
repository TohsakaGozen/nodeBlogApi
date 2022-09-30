const express = require("express");
const images = require('./images')
const sendHtml = require('./sendHtml')
const transform = require('./getHtml')
const path = require('path')
const app = express()
const fs = require("fs");
const app2 = express()
const cors = require('cors')
app.use(cors())
app.listen(3001, () => {
    console.log("3001端口已经开发了")
})

// fs.watch('md', { recursive: true }, (event, filename) => {
//     console.log('该文件已增添')
//     transform.md2html({
//         theme: 'theme1',
//         inputPath: path.resolve(__dirname, './md'),
//         outputPath: path.resolve(__dirname, './output')
//     })
//     images.ImagesUrls(app)
//     images.articleImages(app)
//     sendHtml.getHtmlCode(app)
// })

setInterval(() => {
    transform.md2html({
        theme: 'theme1',
        inputPath: path.resolve(__dirname, './md'),
        outputPath: path.resolve(__dirname, './output')
    })
    images.ImagesUrls(app)
    images.articleImages(app)
    sendHtml.sendHtmlCode(app)

}, 2000)


// transform.md2html({
//     theme: 'theme1',
//     inputPath: path.resolve(__dirname, './md'),
//     outputPath: path.resolve(__dirname, './output')
// })
// images.ImagesUrls(app)
// images.articleImages(app)
// sendHtml.sendHtmlCode(app)





















// app2.use(cors())
// app2.listen(3002, () => {
//     console.log("3002端口已经开发了")
// })
// app2.use(express.static('dist'))