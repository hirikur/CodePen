/*2. JavaScript数据类型及语言基础*/

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return arr instanceof Array;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof(fn) === "function";
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    if (src === null || src === undefined || typeof src !== "object"){
    	return src;
    }
    var result = null;
    if (!isArray(src)){
    	result = new Object();
    	for (var attr in src){
    		result[attr] = cloneObject(src[attr]);
    	}
    } else {
    	result = new Array();
    	var temp = null;
    	for (var i = 0;i < src.length;i++){
    		temp  = cloneObject(src[i]);
    		result.push(temp);
    		temp = null;
    	}
    }
    return result;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var o = new Object();
    var result = new Array();
    for (var i = 0;i<arr.length;i++){
    	if(!o[arr[i]]){
    		result.push(arr[i]);
    		o[arr[i]] = true;
    	}
    }
    return result;
}

// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var i = 0,a = 0,b = str.length;
    for(i = 0;i<str.length;i++){
    	if(str.charAt(i)!==" "&&str.charAt(i)!=="	"){
    		a = i;
    		break
    	}
    }
    for(i=str.length-1;i>-1;i--){
    	if(str.charAt(i)!==" "&&str.charAt(i)!=="	"){
    		b = i+1;
    		break;
    	}
    }
    return str.substring(a,b);
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s*|\s*$/g,"");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
	for (var i = 0;i<arr.length;i++) {
		fn(arr[i],i);
	};
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var i = 0;
	for (var attr in obj){
		i++;
	}
	return i;
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    return /[a-zA-z0-9_\.+-]+@[a-zA-z0-9_\.+-]+.[a-zA-z0-9]+/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^1[3458]\d{9}$/.test(phone);
}

/*3. DOM*/
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var arr = trim(element.className).split(/\s+/);
    if (arr.indexOf(newClassName) === -1){
    	arr.push(newClassName);
    }
    element.className = arr.join(" ");
    return element;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var arr = trim(element.className).split(/\s+/);
    var idnex = 0;
    if (index = arr.indexOf(newClassName) !== -1){
    	arr.splice(index,1);
    }
    element.className = arr.join(" ");
    return element;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var topPosition = 0,
    	leftPosition = 0,
    	scrollTopPosition = 0,
    	scrollLeftPosition = 0,
    	current = element,
    	obj = {};
    while(current != null){
    	topPosition += current.offsetTop;
    	leftPosition += current.offsetLeft;
    	current = current.offsetParent;
    }
    if(document.compatMode=="CSS1Compat"){
    	scrollTopPosition = document.documentElement.scrollTop;
    	scrollLeftPosition = document.documentElement.scrollLeft;
    } else {
    	scrollTopPosition = document.body.scrollTop;
    	scrollLeftPosition = document.body.scrollLeft;
    }
    obj.x = topPosition - scrollTopPosition;
    obj.y = leftPosition - scrollLeftPosition;
    return obj;
}

//将NodeList转化为数组
function toArray(elements) {
    var arr = null;
    try {
        arr = Array.prototype.slice.call(elements,0)
    } catch (ex) {
        arr = new Array();
        for(var i = 0;i<elements.length;i++){
            arr.push(elements[i]);
        }
    }
    return arr;
}

//在不直接使用document.querySelector的情况下，实现一个简单的jQuery miniQuery
// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象
// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

// function miniQuery() {

// }

// miniQuery.prototype = {
// 	init : function(){
// 		return this;
// 	}
// }

function miniQuery(selector) {
	selector = trim(selector);
	var keys = selector.split(/\s+/);
		node = document;
	for (var a = 0;a<keys.length;a++){
		node = query(node,keys[a]);
	}
	return node[0];

    function query(element,keyStr) {
        var arr = new Array();
        if (isArray(element)) {
            for(var i = 0;i<element.length;i++) {
                arr =  arr.concat(querySingle(element[i],keyStr));
            }
            return arr;
        } else {
            arr = arr.concat(querySingle(element,keyStr));
        }
        return arr;
    }

    function querySingle(element,keyStr) {
        switch(keyStr.charAt(0)) {
            case "#" : 
                var result = new Array();
                str = keyStr.substr(1);
                arr.push(element.getElementById(str));
                return arr;
            case "." :
                str = keyStr.substr(1);
                var result = new Array();
                var nodes = element.getElementsByTagName("*");
                for (var i = 0;i<nodes.length;i++){
                    if (hasClass(nodes[i],str)) {
                        result.push(nodes[i]);
                    }
                }
                return result;
            case "[" : 
                str = keyStr.substring(1,keyStr.length);
                var result = new Array();
                var nodes = element.getElementsByTagName("*");
                if (str.indexOf("=") === -1) {
                    for (var i = 0;i<nodes.length;i++){
                        if (nodes[i].getAttribute(str)!=null) {
                            result.push(nodes[i]);
                        }
                    }
                } else {
                    str = str.split("=");
                    var attr = str[0];
                    var value = str[1];
                    for (var i = 0;i<nodes.length;i++){
                        if (nodes[i].getAttribute(attr)===value) {
                            result.push(nodes[i]);
                        }
                    }
                    return result;
                }

            default : 
                str = keyStr.substring(1,keyStr.length);
                var result = new Array();
                var nodes = element.getElementByTagName(str);
                try {
                    result = Array.prototype.slice.call(nodes,0)
                } catch (ex) {
                    for(var i = 0;i<nodes.length;i++){
                        result.push(nodes[i]);
                    }
                }
                return result;
        }
    }
}


