; (function (doc, utils) {
    var oWd = doc.getElementById("wd"),
        oList = doc.getElementById("list"),
        tpl = doc.getElementById('tpl').innerHTML;

    var init = function () {
        bindEvent()
    }

    function bindEvent() {
        utils.addEvent(oWd, 'input', search)
    }

    function search(e) {
        var val = e.target.value;

        if (val.trim() == '') {
            closeSearch();
        }
        getData(val)
    }

    function getData(wd) {
        $.ajax({
            url: `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=39998,40045,40067&wd=${wd}`,
            type: 'get',
            dataType: 'JSONP',
            jsonp: 'cb',
            success: function (res) {
                var data = res.g,
                    len = data.length;
                if (len == 0) {
                    renderList(data);
                } else {
                    data = data.map(item => {
                        return item.q;
                    })
                    renderList(data, wd)
                }
            }
        })
    }

    function renderList(data, wd) {
        if (data.length == 0) {
            closeSearch();
        } else {
            var len = data.length,
                item,
                list = '';
            oList.style.display = 'block';
            for (let i = 0; i < len; i++) {
                item = data[i];
                list += tpl.replace(/{{(.*?)}}/gim, function (node, key) {
                    return {
                        wd: item,
                        wdele: handleFont(item, wd)
                    }[key]
                })
            }
            oList.innerHTML = list;
        }
    }

    function handleFont(item, wd) {
        return `<span class="font-normal">${wd}</span>${item.slice(wd.length)}`;
    }

    function closeSearch() {
        oList.style.display = 'none';
        oList.innerHTML = '';
    }

    init();
})(document, utils)