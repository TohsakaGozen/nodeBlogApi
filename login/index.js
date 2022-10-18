const db = require('../db')
const jwt = require('jsonwebtoken')
const config = require('../config')//引入生成token的jwtSecretkey

const resToken = function (reqUserInfo, dbUserInfo) {
    const user = { ...dbUserInfo, password: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretkey, { expiresIn: '24h' })//第三个参数为配置token的有效期
    return tokenStr
}

const loginCheck = function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.send({ state: 1, message: '用户数据不完整' })
        return 'error'
    }

    const sqlstr1 = `select * from userinfo where username=?`//sql语句查询username是否重复
    const sqlstr2 = `insert into userinfo set ?`//sql语句插入用户注册的数据
    db.query(sqlstr1, [req.body.username], (err, result) => {//验证注册的username是否重复
        if (err) {
            return res.send({ status: 1, message: '查询数据库连接错误' })
        }
        else if (result.length > 0) {
            if (result[0].password == req.body.password) {
                let token = resToken(req.body, result[0])//获取token
                const user = { ...result[0], password: '' }
                return res.send({ status: 0, message: '登录成功', token: 'Bearer ' + token, userInfo: user })
            } else {
                return res.send({ status: 1, message: '密码错误，请重新登录' })
            }

        } else {
            return res.send({ status: 1, message: '用户名错误，请重新登录' })
        }
    })

}

const login = function (app) {
    app.post('/login', (req, res) => {
        console.log(req.body)
        loginCheck(req, res)
    })
}

module.exports = login