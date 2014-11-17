/**
 * Test functional and performance
 */
var Benchmark = require('benchmark');
var rand = require("./");

var str = "abcdefghijklmnopqrstuvwxyz0123456789";

//var suite = new Benchmark.Suite();
//
//suite.add('join',function(){
//    var rv = []
//    for(var i=0, len = str.length ; i<len ; i++){
//        rv.push(str[i]);
//    }
//    return rv.join('');
//}).add("add",function(){
//    var rv = '';
//    for(var i=0, len = str.length ; i<len ; i++){
//        rv += str[i];
//    }
//    return str;
//}).on('cycle', function(event) {
//  console.log(String(event.target));
//}).on('complete', function() {
//  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
//}).run({ 'async': true });


var suite1 = new Benchmark.Suite();

suite1.add('notLimit',function(){
    (rand.getStr(10));
}).add('limit',function(){
    (rand.getStrLimit(10));
}).on('cycle', function(event) {
  console.log(String(event.target));
}).on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run({ 'async': true });