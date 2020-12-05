
function visualizeSlider(){
  
}

json = {
    "nodes": [{
        "x": 310,
         "y": 310,
        "r": 100,
        "c" : "orange", 
        "label": "analog"        
    }, { 
        "x": 510,
        "y": 310,
        "r": 100,
        "c" : "blue",
        "label": "digital"        
    }, {
        "x": 150,
         "y": 100,
        "r": 100,
        "c" : "orange", 
        "label": "Board Games"
        
    },{
        "x": 100,
         "y": 310,
        "r": 100,
        "c" : "orange", 
        "label": "books"
        
    },{
        "x": 150,
         "y": 510,
        "r": 100,
        "c" : "orange", 
        "label": "News paper"
        
    },{
        "x": 500,
        "y": 515,
        "r": 100,
        "c" : "blue",
        "label": "Streaming"        
    }, {
        "x": 500,
        "y": 100,
        "r": 100,
        "c" : "blue",
        "label": "Social Media"        
    }, {
        "x": 700,
        "y": 190,
        "r": 100,
        "c" : "blue",
        "label": "Games"        
    }, {
        "x": 700,
        "y": 410,
        "r": 100,
        "c" : "blue",
        "label": "Television"        
    }
    
    
    ]
}

function visualizeBubbles(var json){
  var width = 960,
    height = 500;
    

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

/* Define the data for the circles */
var elem = svg.selectAll("g")
    .data(json.nodes)

/*Create and place the "blocks" containing the circle and the text */
var elemEnter = elem.enter()
    .append("g")
    .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")"
})

/*Create the circle for each block */
var circle = elemEnter.append("circle")
    .attr("r", function (d) {
    return d.r
})
    .attr("stroke", "black")
    .attr("fill", function(d) { return d.c})

/* Create the text for each block */
elemEnter.append("text")
    .attr("dx", function (d) {
    return -30
    
})
		.attr("dy", 3)    
    .text(function (d) {
    return d.label
})


//Versuch für Animation, kleines und größer
/*
var width = 500,
height = 500,
minRadius = 50,
    maxRadius = 100;

var duration = 1000;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
    
svg.append("circle")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", minRadius)
    .attr("stroke","black")
    .attr("fill", "blue")
    .call(transition, minRadius, maxRadius);
*/

function transition(element, start, end) {
    element.transition()
        .duration(duration)
        .attr("r", end)
        .each("end", function() { d3.select(this).call(transition, end, start); });
}
}
