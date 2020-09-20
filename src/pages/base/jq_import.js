var jquery = require("jquery");
window.$ = window.jQuery = jquery; // notice the definition of global variables here
require("jquery-ui-dist/jquery-ui.js");

$(function() {
  $("#datepicker").datepicker();
});