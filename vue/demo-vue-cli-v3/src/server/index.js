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

// 写TODOLIST的方法
app.get('/get_todo', (req, res) => {
    let data = readTodo();

    res.json({
        code: 0,
        meg: 'ok',
        data
    })
})

app.post('/add_todo', (req, res) => {
    let todo = req.body.todo;
    todo.complated = todo.complated === 'false' ? false : true;
    console.log(todo.complated);

    let data = readTodo();
    data.push(todo);
    writeTodo(data);
    res.json({
        code: 0,
        msg: 'ok'
    })
})

app.post('/toggle_todo', (req, res) => {
    let data = readTodo();
    let id = req.body.id;
    data = data.map(item => {
        if (item.id == id) {
            item.complated = !item.complated
        }
        return item
    })
    writeTodo(data);

    res.json({
        code: 0,
        meg: 'ok'
    })
})

app.post('/remove_todo', (req, res) => {
    let data = readTodo();
    let id = req.body.id;
    data = data.filter(item => item.id != id);
    writeTodo(data);

    res.json({
        code: 0,
        meg: 'ok'
    })
})

function readTodo() {
    return JSON.parse(readFileSync(resolve(__dirname, 'data/todo.json'), 'utf-8') || '[]')
}

function writeTodo(data) {
    writeFileSync(resolve(__dirname, 'data/todo.json'), JSON.stringify(data))
}


app.listen(8888, function () {
    console.log('wlecome');
})