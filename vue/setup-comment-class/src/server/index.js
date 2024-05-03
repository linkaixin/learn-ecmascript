const express = require('express');
const app = express();

// 读写函数、路径
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

// 处理POST请求
const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

// 处理跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", 'GET,POST');
    next();
})

app.get('/get_comment', (req, res) => {
    const commentList = readComment()
    res.json({
        code: 0,
        msg: 'ok',
        data: commentList
    })
})

app.post('/set_comment', (req, res) => {
    let commentList = readComment();
    let comment = req.body.comment;
    commentList.unshift(comment)
    writeComment(commentList)

    res.json({
        code: 0,
        msg: 'ok'
    })
})

function readComment() {
    return JSON.parse(readFileSync(resolve(__dirname, 'data/comment.json'), 'utf-8') || '[]')
}

function writeComment(commentList) {
    writeFileSync(resolve(__dirname, 'data/comment.json'), JSON.stringify(commentList))
}


app.listen(8888, function () {
    console.log('wlecome');
})