/**
 * VISUALIZE SLIDER START
 **/

var margin = { top: 10, right: 100, bottom: 30, left: 60 };

var circumference_handle = 12;
var circumference_r = 120;
var circumference_inner = 100;

var width_slider = 400,
    //  width = (radiuas+ margin)*
    height_slider = 130,
    radians = 0.0174532925
//Value for the MonthTicks
tickStart = circumference_r + 18,
    tickLength = -26,
    MonthLabelRadius = circumference_r + 24,
    MonthLabelYOffset = 5;


//0  Jan        30  Feb          60 Mär
var tickphiright = [4.712388975, 5.23598775, 5.759586525,
    //90 Apr    120   Mai    150  Jun     180 Junly
    0, 0.5235987755, 1.04719755, 1.570796325,
    //210 Aug       240 Sep     270 Okt
    2.0943951, 2.617993875, 3.14159265,
    //300 NOv       330 Dez
    3.665191425, 4.1887902]

var monthNames = ["Januray", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


//Define drag for the slider, functions at the end
var drag = d3.drag()
    .subject(function (event, d) { return event, d; })
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

var svg = d3.select("#slider").append("svg")
    .attr("id", "sliderContainer")
    .attr("width", width_slider + margin.left + margin.right)
    .attr("height", height_slider)
    .append("g")
    .attr("transform", `translate(${width_slider}, ${height_slider + 40})`);

var container = svg.append("g")
    .attr("id", "sliderGroup");

var face = container.append("g")
    .attr('id', 'scale-face');

//Scale for the MonthTick scale
var tickScale = d3.scaleLinear()
    .range([0, 330])
    .domain([0, 11]);

//Make the monthticks
face.selectAll('.tick')
    .data(d3.range(0, 12))
    .enter()
    .append('line')
    .attr('class', 'tick')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', tickStart)
    .attr('y2', tickStart + tickLength)
    .attr('transform', function (d) {
        return 'rotate(' + tickScale(d) + ')';
    });


//Make the round slider bar
var circumference = container.append('circle')
    .attr("id", "sliderCircle")
    .attr('r', circumference_r)
    .attr('class', 'circumference');


handle = [{
    x: 0,
    y: -circumference_r
}];

//Slider handle
handle_circle = container.append("g")
    .attr("id", "sliderHandle")
    .attr("class", "handle")
    .selectAll('circle')
    .data(handle)
    .enter().append("circle")
    .attr("r", circumference_handle)
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .call(drag);


var innerContainer = container.append("g")
    .attr("id", "innerCircleContainer");


//Make the inner circle that displays month and corona cases
var inner_circle = innerContainer.append("circle")
    .attr("id", "innerCircle")
    .attr("class", "circle")
    .attr("r", circumference_inner)
    .attr("fill", "grey")

//Make the month lable, corona cases and lockdown indicator, changes with slider
var circleLableTime = innerContainer.append("text")
    .attr("id", "monthLable")
    .attr("dy", "-1.4em")
    .style("text-anchor", "middle")
    .attr("font-size", "28px")
    .attr("fill", "white")
    .text("January");

var coronaCasesLable = innerContainer.append("text")
    .attr("id", "casesLable")
    .attr("dy", "-0.1em")
    .style("text-anchor", "middle")
    .attr("font-size", "17px")
    .attr("fill", "white")
    .text("Corona Cases");

var coronaCasesNumbers = innerContainer.append("text")
    .attr("id", "casesNumbers")
    .attr("dy", "0.8em")
    .style("text-anchor", "middle")
    .attr("font-size", "38px")
    .attr("fill", "white")
    .text("00000000");

var lockdownIndicator = innerContainer.append("text")
    .attr("id", "lockdownIndicator")
    .attr("dy", "3.6em")
    .style("text-anchor", "middle")
    .attr("font-size", "17px")
    .attr("fill", "white")
    .text(" ");

//Functions to handle the Slider drag
function dragstarted(event, d) {
    event.sourceEvent.stopPropagation();
    d3.select(this)
        .classed("dragging", true);
}

function dragged(event, d) {
    d_from_origin = Math.sqrt(Math.pow(event.x, 2) + Math.pow(event.y, 2));

    var cosalph = event.x / d_from_origin

    alpha = Math.acos(cosalph);

    d3.select(this)
        .attr("cx", d.x = circumference_r * Math.cos(alpha))
        .attr("cy", d.y = event.y < 0 ? -circumference_r * Math.sin(alpha) : circumference_r * Math.sin(alpha));
}

//for bubbles to handle the radius
bubbleRadi = [
    [0,0,0,0,0,0,0,0,0,0],
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Jan
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Feb
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Mrz
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Apr
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Mai
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Jun
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Jul
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Aug
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Sep
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Okt
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Nov
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100]   // Dez
]

function dragended(event, d) {
    d3.select(this)
        .classed("dragging", false);

    //Find the Phi degree of the HandlePosition and compare it to Phi-values of the MarkTicks
    var cosPhi = (d.x / circumference_r)
    var sinPhi = - (d.x / circumference_r)
    var phi = 0

    if (d.y >= 0) {
        phi = Math.acos(cosPhi)
        //phi = Math.asin(sinPhi)
    }
    else {
        phi = 2 * Math.PI - Math.acos(cosPhi)
        //phi = 2*Math.PI - Math.asin(sinPhi)
    }

    //Find the closest tick:
    var closestPhi = tickphiright[0];
    var diff = Math.abs(phi - closestPhi);
    var postion = 0

    // TODO
    // between hightst and 0 value it will always take highest and not 0
    for (var val = 0; val < tickphiright.length; val++) {
        var newdiff = Math.abs(phi - tickphiright[val]);
        if (newdiff < diff) {
            diff = newdiff;
            closestPhi = tickphiright[val];
            postion = val;
        }
    }


    //Set/Snap handle to closest TickMark:
    d3.select(this)
        .attr("cx", d.x = circumference_r * Math.cos(closestPhi))
        .attr("cy", d.y = circumference_r * Math.sin(closestPhi));


    //Set the Month Lable
    d3.select("#monthLable")
        .text(monthNames[postion]);

    //TODO set Corona cases
    //TOdo set Lockdown indicator -> make it more dynamic
    if (postion == 4 || postion == 5 || postion == 6) {
        d3.select("#innerCircle")
            .attr("fill", "darkred");

        d3.select("#lockdownIndicator")
            .text("Lockdown");
    }
    else if (postion == 10 || postion == 11) {
        d3.select("#innerCircle")
            .attr("fill", "red");

        d3.select("#lockdownIndicator")
            .text("Lockdown Light");
    }
    else {
        d3.select("#innerCircle")
            .attr("fill", "grey");

        d3.select("#lockdownIndicator")
            .text(" ");
    }

    /** KLAUS TEST START **/
    /**
     * For each slider position render a different .json file.
     * Remove old rendering bevore appending a new "svg".
     **/
   
    
    /*
    if (postion == 1)  visualizeBubbles(json2)
    else if (postion == 2) visualizeBubbles(json1)
    else if (postion == 3) visualizeBubbles(json2)
    else if (postion == 4) visualizeBubbles(json1)
    else if (postion == 5) visualizeBubbles(json2)
    else if (postion == 6) visualizeBubbles(json1)
    else if (postion == 7) visualizeBubbles(json2)
    else if (postion == 8) visualizeBubbles(json1)
    else if (postion == 9) visualizeBubbles(json2)
    else if (postion == 10) visualizeBubbles(json1)
    else if (postion == 11) visualizeBubbles(json2)
    else if (postion == 12) visualizeBubbles(json1)
    else visualizeBubbles(json1)
    */
    /** KLAUS TEST ENDE**/

    //annaTest mit Zeitungen
    if(position > 0 && positon < 13){
        visualizeBubbles(json1, bubbleRadi, postion);
    }else{
        visualizeBubbles(json1, bubbleRadi, 1);
    }
    


}

/**
 * VISUALIZE SLIDER END
 */



/*
Create Bubble Diagram
*/

json1 = {
    "bubbles": [{
        "id": 1,
        "x": 310,
        "y": 310,
        "r": 100,
        "c": "orange",
        "label": "analog",
        "img" : ""
    }, {
        "id": 2,
        "x": 510,
        "y": 310,
        "r": 100,
        "c": "blue",
        "label": "digital",
        "img" : ""
    }, {
        "id": 3,
        "x": 150,
        "y": 100,
        "r": 100,
        "c": "orange",
        "label": "Board Games",
        "img" : "puzzles_icon.png"

    }, {
        "id": 4,
        "x": 100,
        "y": 310,
        "r": 100,
        "c": "orange",
        "label": "books",
        "img": "books_icon.png"

    }, {
        "id": 5,
        "x": 150,
        "y": 510,
        "r": 100,
        "c": "orange",
        "label": "News paper",
        "img": "newsPaper_icon.png"

    }, {
        "id": 6,
        "x": 500,
        "y": 515,
        "r": 100,
        "c": "blue",
        "label": "Streaming",
        "img": "Streaming.png"
    }, {
        "id": 7,
        "x": 500,
        "y": 100,
        "r": 100,
        "c": "blue",
        "label": "Social Media",
        "img": "socialMedia_icon.png"
    }, {
        "id": 8,
        "x": 700,
        "y": 190,
        "r": 100,
        "c": "blue",
        "label": "Games",
        "img": "games_icons.png"
    }, {
        "id": 9,
        "x": 700,
        "y": 410,
        "r": 100,
        "c": "blue",
        "label": "Television",
        "img": "tv_icon.png"
    }
    ]
}


json2 = {
    "bubbles": [{
        "id": 1,
        "x": 310,
        "y": 310,
        "r": 80,
        "c": "orange",
        "label": "analog",
        "img" : ""
    }, {
        "id": 2,
        "x": 510,
        "y": 310,
        "r": 70,
        "c": "blue",
        "label": "digital",
        "img" : ""
    }, {
        "id": 3,
        "x": 150,
        "y": 100,
        "r": 50,
        "c": "orange",
        "label": "Board Games",
        "img" : "puzzles_icon.png"

    }, {
        "id": 4,
        "x": 100,
        "y": 310,
        "r": 90,
        "c": "orange",
        "label": "books",
        "img": "books_icon.png"

    }, {
        "id": 5,
        "x": 150,
        "y": 510,
        "r": 60,
        "c": "orange",
        "label": "News paper",
        "img": "newsPaper_icon.png"

    }, {
        "id": 6,
        "x": 500,
        "y": 515,
        "r": 30,
        "c": "blue",
        "label": "Streaming",
        "img": "Streaming.png"
    }, {
        "id": 7,
        "x": 500,
        "y": 100,
        "r": 20,
        "c": "blue",
        "label": "Social Media",
        "img": "socialMedia_icon.png"
    }, {
        "id": 8,
        "x": 700,
        "y": 190,
        "r": 70,
        "c": "blue",
        "label": "Games",
        "img": "games_icons.png"
    }, {
        "id": 9,
        "x": 700,
        "y": 410,
        "r": 60,
        "c": "blue",
        "label": "Television",
        "img": "tv_icon.png"
    }
    ]
}

function visualizeBubbles(json) {
    //json Datei nutzen:
    //id: analog(1,2-5) und digital (2, 6-9)

    state = 0; //nur analog und digital anzeigen



    var width = 960,
        height = 500;

    var margin = { top: 10, right: 100, bottom: 30, left: 60 };

    var svg = d3.select("#bubbles").selectAll("svg").remove()
    svg = d3.select("#bubbles").append("svg")
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
        .filter(function (d) { return d.id < 3 }) //nur Hauptbubbles
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { return d.r })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .on("click", function (d) { return Bubbleclick(d3.select(this)) })
        //noch testen
        .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
        .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
        .style("opacity", 0.9)


    elemEnter.selectAll("text").remove()
    //Texte einfügen und später filtern
    elemEnter.append("text")
        .filter(function (d) { return d.id < 3 })
        .attr("dx", function (d) { return -30 })
        .attr("dy", 3)
        .text(function (d) { return d.label })
        .style("fill", function (d) { return Choosetextcolor(d) })
        .filter(function (d) { return d.id < 3 })

    //andere Bubbles transparent
    elemEnter.append("circle")
        .filter(function (d) { return d.id > 2 })
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { return d.r })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .style("opacity", 0.2)

    elemEnter.append("svg:image")
    .filter(function (d) { return d.id > 2 })
    .attr("x", -50)
    .attr("y", -50)
    .attr("width", 100)
    .attr("height", 80)
    .attr("xlink:href", function (d) {return "icons/" + d.img })
    .style("opacity", 0.5)
    
    

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

    function Choosetextcolor(d) {
        if (d.c == "blue") {
            return "white";
        }
        if (d.c == "orange") {
            return "black";
        }
        console.log("keine Farbe");
        return "black";
    }

    function Bubbleclick(d) {
        console.log("ID = " + d.attr("id")); //-> zugriff auf Attribute der angeklickten Bubble
        if (d.attr("id") == 2) {
            console.log("if");
            return ClickforDig(d);
        }
        if (d.attr("id") == 1) {
            console.log("else if");
            return ClickforAna(d);
        } else {
            //Click auf keine Hauptbubble -> Diagramm anzeigen lassen für diese Bubble
            console.log("else");
            return showDiagram(d.attr("label"));

        }
    }



    function ClickforAna(d) {
        //analoge sichtbar 
        elemEnter.selectAll("circle")//.append("circle")
            .filter(function (d) { return (d.id <= 5 && d.id != 2) }) //nur analoge
            .attr("id", function (d) { return d.id })
            .attr("r", function (d) { return d.r })
            .attr("stroke", "black")
            .attr("fill", function (d) { return d.c })
            .style("opacity", 2)
            //.on("mouseover", handleMouseOver(d)) //klappt
            .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
            .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
            .on("click", function (d) { return Bubbleclick(d3.select(this)) })


        //digitale Bubble transparent -> noch nicht richtig
        elemEnter//.append("circle")
            .selectAll("circle")
            .filter(function (d) { return (d.id > 5) })
            .attr("id", function (d) { return d.id })
            .attr("r", function (d) { return d.r })
            .attr("stroke", "black")
            .attr("fill", function (d) { return d.c })
            .style("opacity", 0.2)
            

            elemEnter.append("text")
            .filter(function (d) { return (d.id <= 2) }) //nur analoge und hauptbubble
            .attr("dx", function (d) { return -30 })
            .attr("dy", 3)
            .text(function (d) { return d.label })
            .style("fill", function (d) { return Choosetextcolor(d) });


        elemEnter.selectAll("svg:image").remove()
        elemEnter.selectAll("svg:image")
            .filter(function (d) { return (d.id <= 5) }) //nur analoge und hauptbubble
            .attr("x", -50)
            .attr("y", -50)
            .attr("width", 100)
            .attr("height", 80)
            .attr("xlink:href", function (d) {return "icons/" + d.img })
            .style("opacity", 5)

        
        /*
        //alte Texte entfernen
        elemEnter.selectAll("text").remove()
        //Texte anzeigen
        elemEnter.append("text")
            .filter(function (d) { return (d.id <= 5) }) //nur analoge und hauptbubble
            .attr("dx", function (d) { return -30 })
            .attr("dy", 3)
            .text(function (d) { return d.label })
            .style("fill", function (d) { return Choosetextcolor(d) });

        */

        
        //noch fehlerhaft
        //.on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
        //.on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
        //.on("click", function(d) { return Bubbleclick(d3.select(this))});

    }

    function ClickforDig(d) {
        elemEnter
            .selectAll("circle")
            //.append("circle")
            .filter(function (d) { return (d.id > 5 || d.id == 2) }) //nur digitale
            .attr("id", function (d) { return d.id })
            .attr("r", function (d) { return d.r })
            .attr("stroke", "black")
            .attr("fill", function (d) { return d.c })
            .style("opacity", 2)
            //.on("mouseover", handleMouseOver(d)) //klappt
            .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
            .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
            .on("click", function (d) { return Bubbleclick(d3.select(this)) });


        //analoge Bubbles transparent    
        elemEnter//.append("circle")
            .selectAll("circle")
            .filter(function (d) { return (d.id > 2 && d.id <= 5) })
            .attr("id", function (d) { return d.id })
            .attr("r", function (d) { return d.r })
            .attr("stroke", "black")
            .attr("fill", function (d) { return d.c })
            .style("opacity", 0.2)

        elemEnter.append("text")
            .filter(function (d) { return (d.id <= 2) }) //nur analoge und hauptbubble
            .attr("dx", function (d) { return -30 })
            .attr("dy", 3)
            .text(function (d) { return d.label })
            .style("fill", function (d) { return Choosetextcolor(d) })

        
        elemEnter.selectAll("svg:image").remove()
        elemEnter.selectAll("svg:image")
            .filter(function (d) { return (d.id <= 5) }) //nur analoge und hauptbubble
            .attr("x", -50)
            .attr("y", -50)
            .attr("width", 100)
            .attr("height", 80)
            .attr("xlink:href", function (d) {return "icons/" + d.img })
            .style("opacity", 5)

            /*
        //alte Texte entfernen
        elemEnter.selectAll("text").remove()
        //Texte anzeigen
        elemEnter.append("text")
            .filter(function (d) { return (d.id > 5 || d.id <= 2) }) //nur digitale und hauptbubble
            .attr("dx", function (d) { return -30 })
            .attr("dy", 3)
            .text(function (d) { return d.label })
            .style("fill", function (d) { return Choosetextcolor(d) })

            */

        
        //noch fehlerhaft
        //.on("mouseover", handleMouseOver(d3.select(this))) 
        //.on("mouseout", handleMouseOut(d3.select(this)))
        //.on("click", function(d) { return Bubbleclick(d3.select(this))});

    }

    function idToLabel(id) {
        if (id == 3) { return "BoardGames" }
        if (id == 4) { return "Books" }
        if (id == 5) { return "NewsPaper" }
        if (id == 6) { return "Streaming" }
        if (id == 7) { return "SocialMedia" }
        if (id == 8) { return "DigitalGames" }
        if (id == 9) { return "Television" }
        return " ";
    }
    // Create Event Handlers for mouse
    function handleMouseOver(d) {  // Add interactivity
        console.log("inMouseOVER: ");

        var aktT = idToLabel(d.attr("id"));
        console.log("t" + aktT); //-> zugriff auf Attribute der angeklickten Bubble
        var xpos = d.attr("x");
        var ypos = d.attr("y");
        //d.attr("fill", "red");
        // Specify where to put label of text
        //Mouse Position
        svg.append("text")
            .attr("x", 800)
            .attr("y", 80)
            .attr("id", "t" + aktT)
            .text(aktT);
    }

    function handleMouseOut(d) {
        var aktT = idToLabel(d.attr("id"));
        console.log("inMouseOUT - remove:" + "#t" + aktT);
        // Select text by id and then remove
        d3.select("#t" + aktT).remove();  // Remove text location

    }


    //Auswahl in den Vordergrund verschieben
    /*
    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    */

    /* beim Mouseovering
    circles.on("mouseover",function(){
    var sel = d3.select(this);
    sel.moveToFront();
      });
    */




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
            .each("end", function () { d3.select(this).call(transition, end, start); });
    }
    //http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774 -> Mouse_Events
}

visualizeBubbles(json1);
/*
//Visualize Bubbles end
*/
