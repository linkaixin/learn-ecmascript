; (function (doc) {
    var tabs = doc.getElementsByClassName('tabs-wrap')[0],
        search = doc.getElementById('search'),
        item = doc.getElementsByClassName('recommend-cate-item'),
        oContent = doc.getElementsByClassName('sec-content')[0],
        data = JSON.parse(doc.getElementById('J_data').innerHTML),
        tpl = doc.getElementById('J_tpl').innerHTML,
        dataName = 'all',
        keyword = '';

    window.onload = function () {
        init();
    }

    var init = function () {
        render(data)
        bindEvent();
    }

    var bindEvent = function () {
        tabs.addEventListener('click', bindClick, false);
        search.addEventListener('input', bindSearch, false);
    }

    function bindClick(e) {
        var e = e || window.event,
            target = e.target || e.srcElement,
            className = target.className,
            index = 0;
        if (className == 'recommend-cate-item') {
            dataName = target.getAttribute('data-name');
            index = Array.prototype.indexOf.call(item, target);
            for (let i = 0; i < item.length; i++) {
                const element = item[i];
                element.className = 'recommend-cate-item'
            }
            item[index].className += ' active';
            keyword == '' ? render(filterData(data, dataName)) : render(searchData(filterData(data, dataName), keyword))
        }
    }

    function bindSearch() {
        keyword = search.value;
        if (keyword.length > 0) {
            render(searchData(filterData(data, dataName), keyword))
        } else {
            render(filterData(data, dataName));
        }
    }

    function filterData(data, filterText) {
        if (filterText == 'all') {
            return data;
        }
        return data.filter(function (ele) {
            switch (filterText) {
                case 'free':
                    return ele.is_free == 1;
                    break;
                case 'pay':
                    return ele.is_free == 0;
                    break;
                default:
                    return data;
            }
        })
    }

    function searchData(data, keyword) {
        return data.filter(function (ele) {
            return ele.course.indexOf(keyword) !== -1;
        })
    }

    function render(list) {
        if (list.length != 0) {
            var str = '';
            list.forEach(function (ele, i, arr) {
                str += setTplToHtml(tpl, regTpl, {
                    course: ele.course,
                    is_free: ele.is_free == 1 ? '付费' : '免费',
                    classes: ele.classes,
                    img: ele.img
                })
            });
            oContent.innerHTML = str;
        } else {
            oContent.innerHTML = `<span>-暂无数据-</span>`
        }
    }

    function setTplToHtml(tpl, RegExp, opt) {
        return tpl.replace(RegExp(), function (node, key) {
            return opt[key];
        })
    }

    function regTpl() {
        return new RegExp('{{(.*?)}}', 'gim');
    }
})(document)