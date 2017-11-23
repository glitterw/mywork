window.yll = window.yll || {};

//工具库
(function (util) {
    "use strict";

    ~function (util) {

        //循环队列
        function CycleQueue(arr) {
            this._arr = arr;
            this._index = 0;
        }

        CycleQueue.prototype = {
            getIndex: function () {//获取指针位置
                return this._index;
            },
            setIndex: function (index) {//设置指针位置
                var len = this._arr.length;
                this._index = (index % len + len) % len;
            },
            prev: function () {//取前一个，并将指针前移
                return this.skipPrev(1);
            },
            skipPrev: function (step) {//向前跳几步
                return this.skipNext(-step);
            },
            next: function () {//取后一个，并将指针后移
                return this.skipNext(1);
            },
            skipNext: function (step) {//向后跳几步
                var arr = this._arr;
                var len = arr.length;
                var index = this._index = ((this._index + step) % len + len) % len;
                return arr[index];
            },
            current: function () {//取当前位置，指针不变
                return this._arr[this._index];
            }
        };

        CycleQueue.prototype.constructor = CycleQueue;

        util.CycleQueue = CycleQueue;

    }(util);

    //开关控制器
    ~function (util) {

        function execHandlers(handlers) {
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].call(this);
            }
        }

        function Switcher() {
            this._onTurnOnHandlers = [];
            this._onTurnOffHandlers = [];
        }

        Switcher.prototype = {
            onTurnOn: function (fn) {
                this._onTurnOnHandlers.push(fn);
                return this;
            },
            onTurnOff: function (fn) {
                this._onTurnOffHandlers.push(fn);
                return this;
            },
            turnOn: function () {//开启
                execHandlers.call(this, this._onTurnOnHandlers);
                return this;
            },
            turnOff: function () {//关闭
                execHandlers.call(this, this._onTurnOffHandlers);
                return this;
            }
        };

        util.Switcher = Switcher;

    }(util);

    //单选控制器
    ~function (util) {

        function execHandlers(handlers, args) {
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].call(this, args);
            }
        }

        function SingleChooser() {
            this._choose = null;
            this._onStartHandlers = [];
            this._onEndHandlers = [];
            this._onChooseInHandlers = [];
            this._onChooseOutHandlers = [];
        }

        SingleChooser.prototype = {
            onStart: function (fn) {
                this._onStartHandlers.push(fn);
                return this;
            },
            onEnd: function (fn) {
                this._onEndHandlers.push(fn);
                return this;
            },
            onChooseIn: function (fn) {
                this._onChooseInHandlers.push(fn);
                return this;
            },
            onChooseOut: function (fn) {
                this._onChooseOutHandlers.push(fn);
                return this;
            },
            getChoose: function () {
                return this._choose;
            },
            setChoose: function (choose) {
                var cache = this._choose;
                if (choose !== null && cache === null) {
                    execHandlers.call(this, this._onStartHandlers);
                }
                if (cache !== null && choose === null) {
                    execHandlers.call(this, this._onEndHandlers);
                }
                if (cache !== null && choose !== cache) {//之前有选中
                    execHandlers.call(this, this._onChooseOutHandlers, cache);
                }
                if (choose !== null && choose !== cache) {//本次有选中
                    execHandlers.call(this, this._onChooseInHandlers, choose);
                }
                this._choose = choose;
                return this;
            }
        };

        util.SingleChooser = SingleChooser;

    }(util);

    //多选控制器
    ~function (util) {

        function execHandlers(handlers, args) {
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].call(this, args);
            }
        }

        function MultipleChooser() {
            this._chooses = [];
            this._onStartHandlers = [];
            this._onEndHandlers = [];
            this._onChooseInHandlers = [];
            this._onChooseOutHandlers = [];
        }

        MultipleChooser.prototype = {
            onStart: function (fn) {
                this._onStartHandlers.push(fn);
                return this;
            },
            onEnd: function (fn) {
                this._onEndHandlers.push(fn);
                return this;
            },
            onChooseIn: function (fn) {
                this._onChooseInHandlers.push(fn);
                return this;
            },
            onChooseOut: function (fn) {
                this._onChooseOutHandlers.push(fn);
                return this;
            },
            getChooses: function () {
                return this._chooses;
            },
            addChoose: function (choose) {//添加选中数据
                var chooses = this._chooses;
                if (chooses.length === 0) {
                    execHandlers.call(this, this._onStartHandlers);
                }
                chooses.push(choose);
                execHandlers.call(this, this._onChooseInHandlers, choose);
                return this;
            },
            removeChoose: function (choose) {
                var chooses = this._chooses;
                for (var i = chooses.length - 1; i >= 0; i--) {
                    if (chooses[i] === choose) {
                        chooses.splice(i, 1);
                    }
                }
                execHandlers.call(this, this._onChooseOutHandlers, choose);
                if (chooses.length === 0) {
                    execHandlers.call(this, this._onEndHandlers);
                }
                return this;
            }
        };

        util.MultipleChooser = MultipleChooser

    }(util);

    //并发锁控制器
    ~function (util) {

        function execHandlers(handlers) {
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].call(this);
            }
        }

        function Locker() {
            this._isLocked = false;
            this._lockHandlers = [];
            this._releaseHandlers = [];
        }

        Locker.prototype = {
            exec: function (handler) {//锁定执行(可携带任意多个参数)
                if (!this._isLocked) {
                    this._isLocked = true;
                    execHandlers.call(this, this._lockHandlers);

                    var args = [];
                    for (var i = 1, len = arguments.length; i < len; i++) {
                        args.push(arguments[i]);
                    }
                    handler.apply(this, args);
                }
            },
            release: function () {
                if (this._isLocked) {
                    this._isLocked = false;
                    execHandlers.call(this, this._releaseHandlers);
                }
            },
            onLocked: function (fn) {
                this._lockHandlers.push(fn);
                return this;
            },
            onReleased: function (fn) {
                this._releaseHandlers.push(fn);
                return this;
            }
        };

        util.Locker = Locker;

    }(util);

    //模板工具
    ~function (util) {

        function HtmlTemplate(html) {
            var eleStorage = this._eleStorage = {};
            var childNodes = this._childNodes = [];

            var attrName = 'tid';
            var div = document.createElement("div");
            div.innerHTML = html;

            for (var i = 0, len = div.childNodes.length; i < len; i++) {
                var childNode = div.childNodes[i];
                childNodes.push(childNode);

                if (childNode.nodeType === Node.ELEMENT_NODE) {//元素节点
                    var tid0 = childNode.getAttribute(attrName);
                    if (tid0) {
                        eleStorage[tid0] = childNode;
                    }

                    if (childNode.hasChildNodes()) {//存在子节点
                        var tmpNodes = childNode.querySelectorAll('[' + attrName + ']');
                        for (var j = 0, len2 = tmpNodes.length; j < len2; j++) {
                            var tmpNode = tmpNodes[j];
                            var tid = tmpNode.getAttribute(attrName);
                            eleStorage[tid] = tmpNode;
                        }
                    }
                }
            }
        }

        HtmlTemplate.prototype = {
            getElementByTid: function (tid) {
                return this._eleStorage[tid];
            },
            appendTo: function (ele) {
                var childNodes = this._childNodes;
                for (var i = 0, len = childNodes.length; i < len; i++) {
                    ele.appendChild(childNodes[i]);
                }
            },
            prependTo: function (ele) {
                if (ele.hasChildNodes()) {
                    var firstChild = ele.firstChild;
                    var childNodes = this._childNodes;
                    for (var i = 0, len = childNodes.length; i < len; i++) {
                        ele.insertBefore(childNodes[i], firstChild);
                    }
                } else {
                    this.appendTo(ele);
                }
            },
            insertBefore: function (ele) {
                var childNodes = this._childNodes;
                for (var i = 0, len = childNodes.length; i < len; i++) {
                    ele.parentNode.insertBefore(childNodes[i], ele);
                }
            },
            insertAfter: function (ele) {
                if (ele.nextSibling === null) {
                    this.appendTo(ele.parentNode);
                } else {
                    this.insertBefore(ele.nextSibling);
                }
            },
            remove: function () {
                var childNodes = this._childNodes;
                for (var i = 0, len = childNodes.length; i < len; i++) {
                    var childNode = childNodes[i];
                    var parentNode = childNode.parentNode;
                    if (parentNode) {
                        parentNode.removeChild(childNode);
                    }
                }
            }
        };

        util.HtmlTemplate = HtmlTemplate;

    }(util);

})(yll.util = yll.util || {});
