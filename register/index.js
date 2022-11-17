const db = require('../db')

const check = function (req, res) {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.send({ state: 1, message: '用户数据不完整' })
        return 'error'
    }
    const sqlstr1 = `select * from userinfo where username=?`//sql语句查询username是否重复
    const sqlstr2 = `insert into userinfo set ?`//sql语句插入用户注册的数据
    const sqlstr3 = `insert into usercomment set ?`//sql语句插入用户注册的数据
    db.query(sqlstr1, [req.body.username], (err, result) => {//验证注册的username是否重复
        if (err) {
            return res.send({ status: 1, message: '查询数据库连接错误' })
        }
        else if (result.length > 0) {
            return res.send({ status: 1, message: '用户名已被占用' })
        } else {
            db.query(sqlstr2, req.body, (err, result) => {//将用户的注册数据写入数据库
                if (err) {
                    return res.send({ status: 1, message: '插入数据库连接错误' })
                }
                if (result.affectedRows !== 1) {
                    return res.send({ status: 1, message: '注册用户失败' })
                }
                db.query(sqlstr3, { username: req.body.username }, (err, result) => {//将用户的注册数据写入数据库
                    if (err) {
                        console.log(err)
                        return res.send({ status: 1, message: '插入数据库连接错误' })
                    }
                    if (result.affectedRows !== 1) {
                        return res.send({ status: 1, message: '注册用户失败' })
                    }
                    res.send({ status: 0, message: '注册成功' })
                })
            })

        }
    })

}

const register = function (app) {
    app.post('/register', (req, res) => {
        console.log(req.body)
        check(req, res)
    })
}

module.exports = register