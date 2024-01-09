// console.log(document.getElementById('jsonpScript'));
// var path = document.getElementById('jsonpScript').src,
//     callback = path.match(/cb=(.*)/)[1];

$.post('https://www.fastmock.site/mock/983fe9c26d504fbc02d76aa20d055411/api/postData', {}, function (data) {
    // console.log(data, 'post');
    test(data)
})

