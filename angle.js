const readline = require('readline')
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
r1.question('请输入三边长：', function (str) {
    let a = str.split(' '), b, c
    a = a.map((i) => {
        return parseInt(i)
    })
    a.sort()
    b = a[1]
    c = a[2]
    a = a[0]
    console.log("三边是" + a, b, c)
    if (a + b <= c) {
        console.log('该三边无法构成三角形')
    } else {
        if (a * a + b * b == c * c) {
            console.log("该三角形是直角三角形")
        } else if (a * a + b * b > c * c) {
            console.log('该三角形是钝角三角形')
        } else if (a * a + b * b < c * c) {
            console.log('该三角形是锐角三角形')
        }
    }

    r1.close()
})
