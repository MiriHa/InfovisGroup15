
function visualizeSlider(){
  
}

function showDiagram(label){
    //TODO
}

json1 = {
    "bubbles": [{
        "id": 1,
        "x": 310,
         "y": 310,
        "r": 100,
        "c" : "orange", 
        "label": "analog"        
    }, { 
        "id": 2,
        "x": 510,
        "y": 310,
        "r": 100,
        "c" : "blue",
        "label": "digital"        
    },{
        "id": 3,
        "x": 150,
         "y": 100,
        "r": 100,
        "c" : "orange", 
        "label": "Board Games"
        
    },{
        "id": 4,
        "x": 100,
         "y": 310,
        "r": 100,
        "c" : "orange", 
        "label": "books"
        
    },{
        "id": 5,
        "x": 150,
        "y": 510,
        "r": 100,
        "c" : "orange", 
        "label": "News paper"
        
    },{
        "id": 6,
        "x": 500,
        "y": 515,
        "r": 100,
        "c" : "blue",
        "label": "Streaming"        
    }, {
        "id": 7,
        "x": 500,
        "y": 100,
        "r": 100,
        "c" : "blue",
        "label": "Social Media"        
    }, {
        "id": 8,
        "x": 700,
        "y": 190,
        "r": 100,
        "c" : "blue",
        "label": "Games"        
    }, {
        "id": 9,
        "x": 700,
        "y": 410,
        "r": 100,
        "c" : "blue",
        "label": "Television"        
    }
    ]
}

function visualizeBubbles(json){
    //json Datei nutzen:
    //id: analog(1,2-5) und digital (2, 6-9)
    
    state = 0; //nur analog und digital anzeigen
    
    
    var width = 960,
    height = 500;
    

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

/* Define the data for the circles */
var elem = svg.selectAll("g")
    .data(json.bubbles)

/*Create and place the "blocks" containing the circle and the text */
var elemEnter = elem.enter()
    .append("g")
    .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")"
})

console.log("hello Blub");
/*Create the circles: analog, digital */
var circle = elemEnter.append("circle")
.filter(function(d) {return d.id < 3}) //nur Hauptbubbles
    .attr("id", function (d) {return d.id})
    .attr("r", function (d) {return d.r})
    .attr("stroke", "black")
    .attr("fill", function(d) { return d.c}) 
    .on("click", function(d) {
        d3.select(this).attr("fill", function(d) { return "red"}); //noch rausnehmen nur damit klar was gedrückt wurde
        console.log("ID = " + d3.select(this).attr("id")); //-> zugriff auf Attribute der angeklickten Bubble
        if(d3.select(this).attr("id") == 2){
            console.log("if");
            return ClickforDig(d);
        }
        if(d3.select(this).attr("id") == 1){
            console.log("else if");
            return ClickforAna(d);
        }else{
            //Click auf keine Hauptbubble -> Diagramm anzeigen lassen für diese Bubble
            console.log("else" + d.id);
            return showDiagram(d.label);
            
        }
        
        
    })

/* Create the text for each block */
elemEnter.append("text")
    //.filter(function(d) {return d.id < 3})
    .attr("dx", function (d) {return -30 })
	.attr("dy", 3)    
    .text(function (d) {return d.label})


    //andere Bubbles transparent
elemEnter.append("circle")
.filter(function(d) {return d.id > 2})
.attr("id", function (d) {return d.id})
.attr("r", function (d) {return d.r})
.attr("stroke", "black")
.attr("fill", function(d) { return d.c}) 
.style("opacity", 0.2)

 //MouseEvent
/*
// On Click, we want to add data to the array and chart
circle.on("click", function() {
    var coords = d3.mouse(this);   

    circle.selectAll("circle")  // For new circle, go through the update process
      .data(dataset)
      .enter()
      .append("circle")
      .attr(circleAttrs)  // Get attributes from circleAttrs var
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
  })
*/


function ClickforAna(d){
    //analoge sichtbar 
    var circle = elemEnter.append("circle")
    .filter(function(d) {return (d.id <= 5 | d.id == 1)}) //nur analoge
    .attr("id", function (d) {return d.id})
    .attr("r", function (d) {return d.r})
    .attr("stroke", "black")
    .attr("fill", function(d) { return d.c}) 
    .style("opacity", 1)
    //Texte anzeigen
    elemEnter.append("text")
    //.filter(function(d) {return d.id < 3})
    .attr("dx", function (d) {return -30 })
	.attr("dy", 3)    
    .text(function (d) {return d.label})

    //digitale Bubble transparent
    var circle = elemEnter.append("circle")
    //.filter(function(d) {return 2})
    .attr("id", function (d) {return d.id})
    .attr("r", function (d) {return d.r})
    .attr("stroke", "black")
    .attr("fill", function(d) { return d.c}) 
    .style("opacity", 0.2)
}

function ClickforDig(d){
    var circle = elemEnter.append("circle")
    .filter(function(d) {return (d.id > 5 | d.id == 2)}) //nur digitale
    .attr("id", function (d) {return d.id})
    .attr("r", function (d) {return d.r})
    .attr("stroke", "black")
    .attr("fill", function(d) { return d.c}) 
    .style("opacity", 1)
    //Texte anzeigen
    elemEnter.append("text")
    //.filter(function(d) {return d.id < 3})
    .attr("dx", function (d) {return -30 })
	.attr("dy", 3)    
    .text(function (d) {return d.label})
    
    //analoge Bubbles transparent
    var circle = elemEnter.append("circle")
    //.filter(function(d) {return 2})
    .attr("id", function (d) {return d.id})
    .attr("r", function (d) {return d.r})
    .attr("stroke", "black")
    .attr("fill", function(d) { return d.c}) 
    .style("opacity", 0.2)
}
 // Create Event Handlers for mouse
 function handleMouseOver(d, i) {  // Add interactivity

    // Use D3 to select element, change color and size
    d3.select(this).attr({
      fill: "orange",
      r: radius * 2
    });

    // Specify where to put label of text
    svg.append("text").attr({
       id: "t" + d.label + "-" + i,  // Create an id for text so we can select it later for removing on mouseout        
    })
    .text(function() {
      return [d.label];  // Value of the text
    });
  }

function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this).attr({
      fill: "black",
      r: radius
    });

    // Select text by id and then remove
    d3.select("#t" + d.label + "-" + i).remove();  // Remove text location
  }

  


//kreisAnimation
/*
var width = 500,
height = 600,
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
    //http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774 -> Mouse_Events
}




visualizeBubbles(json1);

