const fs = require("fs");
const express = require("express");
const path = require('path')
const articleImages = function (app) {
    let imagesUrl = [];
    const imagefileUrl = `public/images/recordImages`
    fs.readdir('C:/Users/Tohsaka/Desktop/tohsaka_blog/public/images/recordImages', 'utf-8', (err, files) => {
        files.forEach((filename) => {
            //获取当前文件的绝对路径
            const filedir = path.join(imagefileUrl, filename);
            imagesUrl.push(filedir.replace(".jpg", '').replace(".jpg", '').replace(/\\/img, '/'))
            // 最后打印的就是完整的文件路径了
        })
        app.get('/articleImages', (req, res) => {
            res.send(imagesUrl)
        })
    })
}

const ImagesUrls = function (app) {
    let imagesUrl = [];
    const imagefileUrl = `public/images/showImages`
    fs.readdir('C:/Users/Tohsaka/Desktop/tohsaka_blog/public/images/showImages', 'utf-8', (err, files) => {
        files.forEach((filename) => {
            //获取当前文件的绝对路径
            const filedir = path.join(imagefileUrl, filename);
            imagesUrl.push(filedir.replace(".jpg", '').replace(".jpg", '').replace(/\\/img, '/'))
            // 最后打印的就是完整的文件路径了
        })
        app.get('/images', (req, res) => {
            res.send(imagesUrl)
        })
    })

}


module.exports = { ImagesUrls, articleImages }