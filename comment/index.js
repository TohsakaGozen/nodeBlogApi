const db = require('../db')
const sqlstr1 = `select * from usercomment where username=?`//sql语句查询username是否存在
const sqlstr2 = `update usercomment set comment=?  where username=?`//sql语句新增用户评论
const sqlstr3 = `select * from usercomment`//sql语句查询所有用户发言
let textdata = []
const upload = function (req, res) {
    db.query(sqlstr1, [req.body.username], (err, result) => {
        if (err) {
            return res.send({ status: 1, message: err })
        }
        else if (result.length > 0) {
            let t = new Date();
            let time = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes();
            if (result[0].comment == null) { //初始化为数组
                textdata = [{ text: req.body.comment, time: time }]
            } else {
                textdata = JSON.parse(result[0].comment)
                textdata.push({ text: req.body.comment, time: time })
            }
            textdata = JSON.stringify(textdata)
            db.query(sqlstr2, [textdata, req.body.username], (err, result) => {
                if (err) {
                    return res.send({ status: 1, message: err })
                }
                else {
                    return res.send({ status: 0, message: "评论成功" })
                }
            })
        } else {
            return res.send({ status: 1, message: "请先注册登录再进行评论" })
        }
    })
}
const getComments = function (req, res) {
    db.query(sqlstr3, [], (err, result) => {
        if (err) {
            return res.send({ status: 1, message: err })
        }
        else if (result.length > 0) {
            result.forEach(i => {
                i.comment = JSON.parse(i.comment)
            });
            return res.send({ status: 0, message: "获取成功", data: result })
        } else {
            return res.send({ status: 1, message: "其它错误" })
        }
    })
}
const comment = function (app) {
    app.post('/comment', (req, res) => {
        upload(req, res)
    })
    app.get('/getComments', (req, res) => {
        getComments(req, res)
    })
}
module.exports = comment