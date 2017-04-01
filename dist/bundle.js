/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

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

var dom_config = {
    "h2": "Weback tools that imporove front-end work flows.",
    "h3": "It\'s allways good to be using tools. Don\'t waste your time.",
    "h4*3": "Don\'t repeat yourself!",
    "h5": "Important thing should be mentioned three times!",
    "ol":{
        "li": ["Just be simple.", "Good to go.", "No bullshit."]
    }
};
console.log('123');
document.body.appendChild(createDom(dom_config));

/***/ })
/******/ ]);