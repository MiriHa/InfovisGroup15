
var width = 200,
height = 80,

var svg = d3.select("#explanation").append("svg")
.attr("id", "explanationContainer")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("id","explanation_tranform")
.attr("transform", `translate(${width/1.3}, ${height*1.7})`);




var svg = d3.select("#legend").append("svg")
.attr("id", "legendContainer")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("id","legend_tranform")
.attr("transform", `translate(${width/1.3}, ${height*1.7})`);