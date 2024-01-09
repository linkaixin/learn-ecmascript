var $ = (function () {
    function _doAjax(opt) {
        var o = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'),
            t = null;

        if (!o) {
            throw new Error('您的浏览器不支持AJAX');
        }

        var url = opt.url,
            type = (opt.type || 'GET').toUpperCase(),
            data = opt.data || null,
            async = '' + opt.async == 'false' ? flase : true,
            dataType = opt.dataType || 'JSON',
            jsonp = opt.jsonp,
            jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
            timeout = opt.timeout || 30000,
            success = opt.success || function () { },
            error = opt.error || function () { },
            complte = opt.complte || function () { };

        if (!url) {
            throw new Error('请输入正确的URL');
        }

        if (dataType.toUpperCase() === 'JSONP' && type !== 'GET') {
            throw new Error('JSONP仅支持GET方式');
        }

        if (dataType.toUpperCase() === 'JSONP') {
            var oScript = document.createElement('script');
            // 当get有其他多余的参数时，使用&拼接。
            if (!data) {
                oScript.src = url.indexOf('?') === -1 ? url + '?' + jsonp + '=' + jsonpCallback
                    : url + '&' + jsonp + '=' + jsonpCallback;
            } else {
                oScript.src = url + formatUrl(data) + '&' + jsonp + '=' + jsonpCallback;
            }
            document.body.appendChild(oScript);
            document.body.removeChild(oScript);

            window[jsonpCallback] = function (data) {
                success(data);
            }
            return
        }

        o.onreadystatechange = function () {
            if (o.readyState === 4) {
                if ((o.status >= 200 && o.status < 300) || o.status === 304) {
                    switch (dataType.toUpperCase()) {
                        case 'JSON':
                            success(JSON.parse(o.responseText));
                            break;
                        case 'XML':
                            success(o.responseXML);
                            break;
                        case 'TEXT':
                            success(o.responseText);
                            break;
                        default:
                            success(JSON.parse(o.responseText));
                            break;
                    }
                } else {
                    error();
                }
                complte();
                clearTimeout(t);
                t = null;
                o = null;
            }
        }

        t = setTimeout(function () {
            console.log(111);
            complte();
            o.abort();
            clearTimeout(t);
            t = null;
            o = null;
        }, timeout)

        if (type === 'GET') {
            o.open('GET', `${url}${formatUrl(data)}`, async);
        } else {
            o.open('POST', url, async);
            o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        o.send(type === 'GET' ? null : formatData(data));
    }

    // 20位随机数
    function randomNum() {
        var str = '';
        for (let i = 0; i < 20; i++) {
            str += Math.floor(Math.random() * 10);
        }
        return str;
    }

    // 拼接url
    function formatUrl(data) {
        if (!data || Object.keys(data).length === 0) {
            return ''
        }
        return '?' + formatData(data);
    }

    // 对象转换&拼接
    function formatData(data) {
        if (!data || Object.keys(data).length === 0) {
            return null;
        }
        var str = '';
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                str += `${key}=${element}&`;
            }
        }
        return str.replace(/&$/, '');
    }

    return {
        ajax: function (opt) {
            _doAjax(opt);
        },
        post: function (url, data, callback) {
            _doAjax({
                type: 'POST',
                url,
                data,
                success: callback
            })
        },
        get: function (url, callback) {
            _doAjax({
                type: 'GET',
                url,
                success: callback
            })
        }
    }
})()