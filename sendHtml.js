const transform = require('./getHtml')
const fs = require('fs')
const path = require('path')
// 1.读取文件
const getHtmlCode = function () {
    let htmlCode = []
    fs.readdirSync('C:/Users/Tohsaka/Desktop/blogNode/output', 'utf8').forEach((files) => {
        let data = fs.readFileSync(path.join(__dirname + '/output/' + files), 'utf8')
        let str = {
            title: '',
            info: '',
            content: ''
        }
        let data2
        let data1 = data
        data1 = data1.split('\n')
        for (let j = 0; j < data1.length; j++) {
            if (data1[j].indexOf('</h1>') != -1) {
                data2 = data1[j].split('</h1>')
                data2 = data2[0].split('<div class="markdown-body">')
                data2 = data2[1].split('>')
                str.title = data2[1]
                str.info = data1[19] + data1[20] + data1[21] + data1[22]
            }
        }
        let str2 = []
        let str1 = data.split('<style></style>')
        if (str1[1]) {
            str2 = str1[1].split('</body>')
        }
        str.content = str2[0]
        htmlCode.push(str)
        if (htmlCode.length == files.length) {
            //
            return htmlCode
        }
    })
    return htmlCode
}

const sendHtmlCode = function (app) {
    app.get('/article', (req, res) => {
        let result = getHtmlCode()
        console.log(result.length)
        res.send(result)
    })
}



module.exports = { sendHtmlCode }