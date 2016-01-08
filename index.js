/**
 * 随机工具. 用于生成字符串,数字,或在一组对像中随机取值.
 */

/**
 * @inner
 */
var defaultCharts = 'abcdefghijklmnopqrstuvwxyz0123456789';

/**
 * 
 * 生成一个区间内的随机数
 * 
 * @param {number} max 最大值
 * @param {number} [min] 最小值
 * @returns {number} this value between the max and min;
 */
var random = function(max, min) {

    min = ~~min || 0;
    max = ~~max || 0;

    // min, max is not 0
    if (min && max) {
        max = max - min + 1;
        return ~~(Math.random() * max) + min;
    } else if (max) {
        // faster the 0 - max;
        return ~~(Math.random() * max);
    }

    // faster return 0;
    return min;
};

/**
 * 生成包含[a-zA-Z0-9]的指定长度的随机字符串
 * 
 * @param {number} [len] 指定长度,默认为 10;
 * @return {string} this string include the [a-z0-9] and length is len
 */
var randomStr = function(len) {
    var str = '';
    len = len || 10;
    while (str.length < len) {
        str += defaultCharts[random(36)];
    }

    return str;
};

/**
 * 生成包含charts指定集合内字符的指定长度的随机字符串
 * 
 * @param {number} len 指定长度,默认为 10;
 * @param {charts} [charts] 指定长度,默认为 10;
 * @return {string}
 */
var randomStrLimit = function(len, charts) {
    var str = ''; var chartsLen;

    len = len || 10;
    charts = charts || defaultCharts;
    
    chartsLen = charts.length;

    while (str.length < len) {
        str += charts[random(chartsLen)];
    }

    return str;
};

/**
 * @class Iterator
 * @params {array} content 初始化内容
 */
function Iterator(content){
    this._index = 0;
    if (content && Array.isArray(content)) {
        this._contents = content;
    } else {
        this._contents = [content];
    }
    this._size = this._contents.length;
}

Iterator.prototype = {
    next: function(){
        return this._contents[this._index++];
    },
    /**
     * 添加一项到列表中
     * @param item
     * @returns {number} 新的内容长度
     */
    push: function(item) {
        if(arguments.length > 0){
            this._contents.push(item);
            this._size = this._contents.length;
        }
        return this._size;
    },
    /**
     * 从列表中移除一个或多个项目
     * 
     * @param condition {any} 
     *      当condition为一个function时, 将执行这个function并传入列表的每一个值, 如果function返回true,将移除这个元素
     *      当condition不是一个function,执行index,并删除匹配到的第一项.
     *        
     * @param forceItem {boolean} default false
     *      当值为true时,认为condition永远是一个普通值
     *      
     * @returns {number} 新的内容长度
     */
    remove: function(condition, forceItem){
        if(arguments.length > 0){
            
            if(!forceItem && condition instanceof Function){
                this._contents = this._contents.filter(function(){
                    return condition.apply(arguments);
                });
            }else{
                // undefined and null maybe is good item;
                var index = this._contents.indexOf(condition);
                if (index !== -1) {
                    this._contents.splice(index,1);
                }
            }
            
            this._size = this._contents.length;
            
        }
    },
    /**
     * 判断内容是否为空
     * @returns {Boolean}
     */
    isEmpty:function(){
        return this._contents.length === 0;
    },
    /**
     * 是否仍有下一个元素
     * @returns {Boolean}
     */
    hasNext:function(){
        return  this._index < this._size; 
    }
}

/**
 * 一个随机获取内容项的工具对像
 * @class RandomIterator
 * @extends Iterator
 * @params {array} content 初始化内容
 */
var RandomIterator = function(content) {
    Iterator.apply(this,arguments);
};

RandomIterator.prototype = /** @lends RandomOf */{
    __proto__:Iterator.prototype,
    /**
     * 随机获取下一项
     * @returns {any}
     */
    next: function() {
        
        if(this.isEmpty()){
            return;
        }
        
        return this._contents[random(this._size)];
    },
    hasNext:function(){
        return !this.isEmpty();
    }
};
/**
 * 一个轮寻获取内容项的工具对像
 * @class RollingIterator
 * @extends Iterator
 * @params {array} content 初始化内容
 */
var RollingIterator = function(content) {
    Iterator.apply(this,arguments);
};

RollingIterator.prototype = /** @lends Rolling*/{
    __proto__:Iterator.prototype,
    /**
     * 顺序获取下一项内容
     * @returns {any}
     */
    next: function() {
        
        if(this.isEmpty()){
            return;
        }
        
        return this._contents[this._index++ % this._size];
    },
    hasNext:function(){
        return !this.isEmpty();
    }
};

module.exports = {
    random: random,
    getStr: randomStr,
    getStrLimit: randomStrLimit,
    RandomOf: RandomIterator,
    Rolling: RollingIterator
};
