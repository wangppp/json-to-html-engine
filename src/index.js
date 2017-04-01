function isObject(o){
    return o instanceof Object && !Array.isArray(o);
}

function isStringOrNum(s){
    return typeof s === 'string' || typeof s === 'number';
}

function createNode(tag, content) {
    var t = tag.trim();
    if (typeof tag === 'string') {
        if(isStringOrNum(content)){
            var node = document.createElement(t);
            node.innerText = content;
            return node;
        }

    }
    throw new Error('Invalid tag name');
    return document.createElement('div');
}

function createDom(config) {
    var d = new DocumentFragment(),
        s = createDom,
        c = config,
        multi_reg = /^(\w+|\d+)\*(\d+)$/;

    if (isObject(config)) {
        for (var i in c) {
            if (c.hasOwnProperty(i)) {
                //是否为类似 li*10 的节点类型
                if (multi_reg.test(i)) {
                    var match_arr = i.match(multi_reg),
                        _tag = match_arr[1] ? match_arr[1] : 'div',
                        _times = match_arr[2] ? match_arr[2] : '';
                    //节点对应的基本类型值
                    for (var j = 0; j < parseInt(_times); j++) {
                         if (isStringOrNum(c[i])) {
                            var _node = createNode(_tag, c[i]);
                                d.appendChild(_node);
                        }else if(isObject(c[i])){
                            var _p_node = createNode(_tag, '');
                            var _c_node = createDom(c[i]);
                            _p_node.appendChild(_c_node);
                            d.appendChild(_p_node);
                        }
                    }
                   
                    //普通节点
                } else {
                    //如果节点值为数组
                    if (Array.isArray(c[i])) {
                        c[i].forEach(function (o) {
                            if (isStringOrNum(o)) {
                                var _n = createNode(i, o);
                                d.appendChild(_n);
                            } else if (isObject(o)) {
                                var _n = createDom(o);
                                d.appendChild(_n);
                            }
                        })
                    }else if(isObject(c[i])){
                        var _p_node = createNode(i, '');
                        var _node = createDom(c[i]);
                        _p_node.appendChild(_node);
                        d.appendChild(_p_node);
                    }else if(isStringOrNum(c[i])){
                        var _node = createNode(i, c[i]);
                        d.appendChild(_node);
                    }
                }
            }
        }
    }

    return d;
}


exports =  createDom;