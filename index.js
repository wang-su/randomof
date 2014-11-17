/**
 * New node file
 */

var defaultCharts = 'abcdefghijklmnopqrstuvwxyz0123456789';

var random = function(max,min,q){
    
    min = ~~min || 0;
    max = ~~max || 0;
    
    //min, max is not 0
    if(min && max){
        max = max - min + 1;
        return ~~(Math.random() * max) + min;
    }else if(max){
        // faster the 0 - max;
        return ~~(Math.random() * max);
    }
    
    // faster return 0;
    return min;
};

/**
 * 生成包含[a-zA-Z0-9]的指定长度的随机字符串
 * @param {number} len 指定长度,默认为 10;
 * @return {string} 生成的指定长度字符串
 */ 
var randomStr = function(_len){
    var str = '' , len = _len || 10;
    for(; str.length < len ; str += defaultCharts[random(36)]);
    return str;
};

var randomStrLimit = function(_len,charts){
    var str = '' , len = _len || 10, chartsLen;
    charts = charts || defaultCharts;
    chartsLen = charts.length;
    for(; str.length < len ; str += charts[random(chartsLen)]);
    return str;
    
};

var RandomOf = function(content){
    
    if(content && Array.isArray(content)){
        this._contents = content;
    }else{
        this._contents = [content];
    }
    
    this._size = this._contents.length;
};

RandomOf.prototype = {
    next : function(){
        return this._contents[random(this._size)];
    },
    push:function(item){
        this._contents.push(item);
        this._size = this._contents.length;
    }
}

module.exports  = {
    /**
     * 
     * @param max
     * @param min
     * @returns {Number}
     */
    random:random,
    /**
     * quick get a random string include charts [a-z0-9];
     */
    getStr:randomStr,
    /**
     * get get a random string;
     */
    getStrLimit:randomStrLimit,
    RandomOf:RandomOf
};

console.log(randomStr(50));
console.log(randomStrLimit(50));

var ro = new RandomOf(['aaa','bbb','cccc']);

for(var i=0;i<100;i++){
    console.log(ro.next());
};
