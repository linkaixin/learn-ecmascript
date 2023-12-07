var initCourse = (function (doc) {
    var item = doc.getElementsByClassName('recommend-cate-item'),
        tpl = doc.getElementById('J_tpl').innerHTML,
        data = JSON.parse(doc.getElementById('J_data').innerHTML),
        oContent = doc.getElementsByClassName('sec-content')[0],
        oSearch = doc.getElementById('search'),
        field = 'all',
        keyword = '';
    return {
        clickTabs: function (e) {
            var e = e || window.event,
                target = e.target || e.srcElement,
                className = target.className,
                index = -1;
            if (className == 'recommend-cate-item') {
                index = Array.prototype.indexOf.call(item, target);
                field = item[index].getAttribute('data-name');
                for (let i = 0; i < item.length; i++) {
                    const element = item[i];
                    element.className = 'recommend-cate-item';
                }
                item[index].className += ' active';
                this.renderList(this.makeList(this.searchData(keyword, this.fiterData(field))))
            }
        },
        searchCourse: function () {
            keyword = oSearch.value;
            this.renderList(this.makeList(this.searchData(keyword, this.fiterData(field))))
        },
        fiterData: function (field) {
            if (field == 'all') {
                return data;
            }
            return data.filter(function (ele) {
                switch (field) {
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
        },
        makeList: function (data) {
            var list = '';
            if (data.length != 0) {
                data.forEach(element => {
                    list += this.setTplToHtml(tpl, this.regTpl, {
                        img: element.img,
                        course: element.course,
                        is_free: element.is_free == 1 ? '免费' : '收费',
                        classes: element.classes
                    })
                });
            } else {
                list = `<span>-暂无数据-<span>`
            }
            return list;
        },
        renderList: function (list) {
            oContent.innerHTML = list;
        },
        searchData: function (keyword, data) {
            if (keyword.trim() == '') {
                return data;
            } else {
                return data.reduce(function (prev, ele) {
                    if (ele.course.indexOf(keyword) != -1) {
                        prev.push(ele)
                    }
                    return prev;
                }, [])
            }
        },
        setTplToHtml: function (tpl, RegExp, opt) {
            return tpl.replace(RegExp(), function (node, key) {
                return opt[key];
            })
        },
        regTpl: function () {
            return new RegExp('{{(.*?)}}', 'gim');
        }
    }
})(document)

    ; (function (doc) {
        var oTabs = doc.getElementsByClassName('tabs-wrap')[0],
            oSearch = doc.getElementById('search');

        var init = function () {
            initCourse.renderList(initCourse.makeList(initCourse.fiterData('all')))
            bindEvent()
        }

        var bindEvent = function () {
            oTabs.addEventListener('click', initCourse.clickTabs.bind(initCourse), false)
            oSearch.addEventListener('input', initCourse.searchCourse.bind(initCourse), false)
        }

        init();
    })(document)