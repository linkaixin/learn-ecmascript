const express = require('express');
const bodyParse = require('body-parser');
// 引入读取文件
const { readFileSync } = require('fs');
const { resolve } = require('path');

const app = express();

// 处理Post请求
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

// 处理跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-methods', 'GET,POST');
    next();
})

// 返回数据
let myResult = []
app.post('/getQuestion', function (req, res) {
    const order = req.body.order;
    const questionData = JSON.parse(readFileSync(resolve(__dirname, 'data/question.json'), 'utf8'));
    const questionResult = questionData[order];

    if (questionResult) {
        const { id, question, items } = questionResult;
        res.send({
            error_code: 0,
            msg: 0,
            data: {
                id,
                question,
                items
            }
        })
    } else {
        res.send({
            error_code: 1,
            msg: 'NO_DATA',
            data: myResult
        })
        myResult = []
    }
})

app.post('/uploadAnswer', function (req, res) {
    const { order, myAnswer } = req.body;
    const questionData = JSON.parse(readFileSync(resolve(__dirname, 'data/question.json'), 'utf8'));

    const { id, question, items, answer } = questionData[order];

    myResult.push({
        qid: id,
        question,
        myAnswer: items[myAnswer],
        rightAnswer: items[answer],
        isRight: myAnswer == answer
    });
    res.send({
        error_code: 0,
        msg: 'Ok',
    })
})

app.listen(8888, function () {
    console.log('Welcome to use Express on 8888');
})