/**
 * @description: 数据类型检测
 * @param {*} data 传入的待检测数据
 * @return {*} 返回数据类型
 */
function getType(data) {
    // TODO：待补充代码
    let result = Object.prototype.toString.call(data)
    result = result.split(" ")[1].split("]")[0]
    return result
}
const testArr = [
    "s",
    0,
    false,
    undefined,
    Symbol(),
    function () { },
    123n,
    null,
    {},
    [],
    new Date(),
    new Map(),
    new Set(),
    /a/,
];
const result = testArr.map((item) => getType(item));
console.log("得到的结果：", result);


