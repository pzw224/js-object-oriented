var UserSelector = (function () {
    var UserSelector = function (options) {
        this.options = options || {};
        this.init();
        this.render();
        this.bind();

    };
    UserSelector.prototype = {
        init: function () {
            this.dom = document.createElement("div");
            this.dom.className = "container";
            this.dom.style.display = "none";
            this.status = this.options.show == 0 ? 0 : 1; //0-隐藏，1-显示
            document.body.appendChild(this.dom);
        },
        render: function () {
            this.dom.innerHTML = `<div class="user_Container">
            <div class="user_content">
            <ul class="fl select_first">
                
            </ul>
            <div class="fl panel">
                <button class="btn_add">添加</button>
                <button class="btn_del">删除</button>
            </div>
            <ul class="fl select_second">

            </ul>
        </div>
        <div class="user_strap">
            <button class="btn_save fl">保存</button>
            <button class="btn_cancel fl">取消</button>
        </div>
        </div>
        `;
            this.left = document.querySelector(".select_first");
            this.right = document.querySelector(".select_second");
            this.add = document.querySelector(".btn_add");
            this.delete = document.querySelector(".btn_del");
            this.save = document.querySelector(".btn_save");
            this.cancel = document.querySelector(".btn_cancel");
        },
        bind: function () {
            let items = "", _self = this;
            this.options.data.map((data, index) => {
                items += `<li data-val='${data.value}'>${data.text}</li>`;
            });
            this.left.innerHTML = items;

            //bind select click event
            _itemsClickBind.call(this, "left");
            _itemsClickBind.apply(this, ["right"]);

            //add & delete
            this.add.addEventListener('click', () => {
                this.interchange("left", "right");
            })
            this.delete.addEventListener('click', () => {
                this.interchange("right", "left");
            })

            //save & cancel
            this.cancel.addEventListener('click', this.hide.bind(this));
            this.save.addEventListener('click', (event) => {
                let arrResult = [];
                Array.prototype.map.call(this.right.querySelectorAll("li[class$='selected']"), (data, index) => {
                    arrResult.push(data.getAttribute('data-val'));
                });
                alert(arrResult.join(','));
                this.hide();
            });

        },
        show: function () {
            this.dom.style.display = "block";
            this.dom.style.background = "rgba(0,0,0,.6)";
            this.status = 1;
        },
        hide: function () {
            this.dom.style.display = "none";
            this.dom.style.background = "#fff";
            this.status = 0;
        },
        interchange: function (a, b) {
            //interchange a & b actions
            Array.prototype.map.call(this[a].querySelectorAll("li[class$='selected']"), (data, index) => {
                this[a].removeChild(data);
                this[b].appendChild(data);
            })
        }
    }

    function _itemsClickBind(targetName) {
        for (var i = 0; i < this[targetName].children.length; i++) {
            this[targetName].children[i].addEventListener('click', (event) => {
                if (event.target.className.indexOf("selected") >= 0) {
                    event.target.className = event.target.className.replace("selected", "");
                } else {
                    event.target.className += "selected";
                }
            })
        }
    }

    return UserSelector;
}())