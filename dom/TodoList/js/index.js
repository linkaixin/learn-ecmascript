; (function (utils) {
    var TodoList = function (opt) {
        var _this = this,
            addStatus = 'add',
            pubIndex = null;

        this.addBtn = opt.addBtn;
        this.inputBox = opt.inputBox;
        this.add = opt.add;
        this.inputText = opt.inputText;
        this.list = opt.list;

        utils.addEvent(this.addBtn, 'click', function () {
            addStatus = 'add';
            _this.add.innerHTML = `添加事项`;
            _this.inputText.value = '';
            _this.changeStatus('open')
        })

        utils.addEvent(this.add, 'click', function () {
            _this.addList(addStatus, pubIndex)
        })

        utils.addEvent(this.list, 'click', function (e) {
            var e = e || window.event,
                target = e.target || e.srcElement,
                className = target.className,
                parent = target.parentNode.parentNode,
                indexOf = Array.prototype.indexOf,
                listItems = document.getElementsByClassName('list-item'),
                inputText = _this.inputText;

            if (className == 'btn btn-edit') {
                pubIndex = indexOf.call(listItems, parent);
                _this.changeStatus('open');
                inputText.value = listItems[pubIndex].getElementsByClassName('item-text')[0].innerHTML;
                addStatus = 'edit';
                _this.add.innerHTML = `修改第${pubIndex + 1}项事项`;
            } else if (className == 'btn btn-del') {
                pubIndex = indexOf.call(listItems, parent);
                listItems[pubIndex].remove();
            }
        })
    }

    TodoList.prototype = {
        changeStatus: function (status) {
            var inputBox = this.inputBox;
            if (status == 'open') {
                inputBox.style.display = 'flex';
            } else {
                inputBox.style.display = 'none';
            }
        },
        addList: function (addStatus, index) {
            var val = this.inputText.value,
                list = this.list,
                listItems = document.getElementsByClassName('list-item'),
                itemTexts = document.getElementsByClassName('item-text'),
                len = itemTexts.length,
                item,
                status = addStatus;

            if (!val) error('请输入正确的内容');

            for (let i = 0; i < len; i++) {
                item = itemTexts[i];
                if (item.innerHTML === val) {
                    return
                }
            }
            if (status === 'add') {
                var oLi = document.createElement('li');
                oLi.className = 'list-item';
                oLi.innerHTML = tpl(val);
                list.appendChild(oLi);
            } else if (status === 'edit') {
                listItems[index].getElementsByClassName('item-text')[0].innerHTML = val;
            }
            close.call(this);
        }
    }

    function error(text) {
        throw new Error(text);
    }

    function tpl(text) {
        return `<span class="item-text">${text}</span>
            <div class="btn-box">
                <button class="btn btn-edit">编辑</button>
                <button class="btn btn-del">删除</button>
            </div>`
    }

    function close() {
        var inputText = this.inputText;
        this.changeStatus('close');
        inputText.value = '';
    }

    window.TodoList = TodoList;
}(utils))