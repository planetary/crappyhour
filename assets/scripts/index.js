module.exports = {};

var moment = require('moment');
require('moment-countdown');




$("#countdown").text(moment().countdown("2016-07-09").toString());

$( document ).ready(function() {

  moment().format();




  var numbr = 50;

  setInterval(function() {
	function r(el, deg) {
	    el.setAttribute('transform', 'rotate('+ deg +' 50 50)')
	}
	var d = new Date()
	r(hour, 30*(d.getHours()%12) + d.getMinutes()/2)
  r(min, 6*d.getMinutes())
  r(sec, 6*d.getSeconds())
  $("#countdown").text(moment().countdown("2016-07-21").toString());

}, 1000)




});
