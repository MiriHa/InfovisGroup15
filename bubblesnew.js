/*
Create Bubble Diagram
*/

json1 = {
    "bubbles": [{
        // Main bubbles
        "id": 1,
        "x": 250,
        "y": 220,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": ANALOG,
        "img": ""
    }, {
        "id": 2,
        "x": 400,
        "y": 220,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": DIGITAL,
        "img": ""
    },
    //analog sub bubbles
    {
        "id": 3,
        "x": 250,
        "y": 70,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": HEALTH,
        "img": "health.png"

    }, {
        "id": 4,
        "x": 80,
        "y": 150,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": NEWS,
        "img": "newsPaper_icon.png"

    }, {
        "id": 5,
        "x": 80,
        "y": 330,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": FREETIME,
        "img": "music.png"
    },
    {
        "id": 6,
        "x": 250,
        "y": 370,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": SPORT,
        "img": "sport.png"
    },
    //digital sub bubbles
    {
        "id": 7,
        "x": 400,
        "y": 370,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": SPORT,
        "img": "sport.png"
    }, {
        "id": 8,
        "x": 400,
        "y": 70,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": HEALTH,
        "img": "health.png"
    }, {
        "id": 9,
        "x": 570,
        "y": 150,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": NEWS,
        "img": "newsPaper_icon.png"
    }, {
        "id": 10,
        "x": 570,
        "y": 330,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": FREETIME,
        "img": "music.png"
    }
    ]
}


//wird hier benötigt also nicht nur bei script updaten
//for bubbles to handle the radius
//bubbleRadi = radius
/*[
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
]*/

/*var radius = [
    [0,0,0,0,0,0,0,0,0,0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // Jan
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // Feb
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // Mrz
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // Apr
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // Mai
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // Jun
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // Jul
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // Aug
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // Sep
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // Okt
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   // Nov
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]   // Dez
]*/



function computeMainBubble(bubbleRadi, month) {
    console.log("month = " + month)
    var summedig = 0;
    for (let bubb = 3; bubb < 7; bubb++) {
        summedig = summedig + bubbleRadi[month][bubb]
        console.log("Summe aus: " + bubbleRadi[month][bubb] + " + ")
    }
    bubbleRadi[month][1] = summedig / 4;
    console.log(" = " + summedig);

    var summeana = 0;
    for (let bubb = 7; bubb < 11; bubb++) {
        summeana = summeana + bubbleRadi[month][bubb]
        console.log("Summe aus: " + bubbleRadi[month][bubb] + " + ")
    }
    bubbleRadi[month][2] = summeana / 4;
    console.log("summeANA = " + summeana);
}


var selectedAnalogBubble = ""
var selectedDigitalBubble = ""
var ClickDigital = true;
var ClickAnalog = true;

/* Create tooltip div */
var tooltip = d3.select("#bubbles")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "#39475c")
    .style("position", "absolute")

/* Visualize the bubble chart. Is called every time you move the timer */
function visualizeBubbles(json, currentMounth) {
    console.log("visualize: ")
    bubbleRadi = radius

    computeMainBubble(bubbleRadi, currentMounth);
    console.log(bubbleRadi)

    //json Datei nutzen:
    //id: analog(1,2-5) und digital (2, 6-9)

    state = 0; //nur analog und digital anzeigen

    var width = 700,
        height = 420;

    var margin = { top: 10, right: 100, bottom: 30, left: 60 };

    /* clear the page and add the svg */
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

    //console.log("hello Blub");
    //console.log("Monat: " + currentMounth);

    /*Create the circles: analog, digital */
    var circle = elemEnter.append("circle")
        .filter(function (d) { return d.id < 3 }) //nur Hauptbubbles
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { if (bubbleRadi[currentMounth][d.id] == 0) { return 50 } else { return bubbleRadi[currentMounth][d.id] + 10 } })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
        .on("click", function (d) { return Bubbleclick(d3.select(this)) })
        //noch testen
        // .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
        /* Mouseover event: Get position of the bubble and show the tooltip */
        .on("mouseover", function (d) {
            console.log("mouseover event triggered")
            var matrix = this.getScreenCTM()
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html("Hello")
                .style("left", (window.pageXOffset + matrix.e + 15) + "px")
                .style("top", (window.pageYOffset + matrix.f - 30) + "px");
        })
        // .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
        .on("mouseout", function (d) {
            console.log("Mouseout")
            tooltip.transition().duration(500).style("opacity", 0);
        })
        
    elemEnter.selectAll("text").remove()
    //Texte einfügen und später filtern
    elemEnter.append("text")
        .filter(function (d) { return d.id < 3 })
        .attr("dx", function (d) { return -35 })
        .attr("dy", 5)
        .text(function (d) { return d.label })
        .style("fill", function (d) { return Choosetextcolor(d) })
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .filter(function (d) { return d.id < 3 })


    //andere Bubbles transparent
    elemEnter.append("circle")
        .filter(function (d) { return d.id > 2 })
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { if (bubbleRadi[currentMounth][d.id] == 0) { return 50 } else { return bubbleRadi[currentMounth][d.id] + 10 } })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
    
    elemEnter.append("svg:image")
        .filter(function (d) { return d.id > 2 })
        .attr("x", function (d) { return computeImagePos(d.id) })
        .attr("y", function (d) { return computeImagePos(d.id) })
        .attr("width", function (d) { return computeImageSize(d.id) })
        .attr("height", function (d) { return computeImageSize(d.id) })
        .attr("id", function (d) { return d.id })
        .attr("xlink:href", function (d) { return "icons/" + d.img })
        .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
        // .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
        /* Mouseover event: Get position of the bubble and show the tooltip */
        .on("mouseover", function (d) {
            console.log("Mouseover")
            var matrix = this.getScreenCTM()
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip.transition().duration(200).style("opacity", .9);
            //TODO sytle this?
            var label = "world"
            var aktT = idToLabel(this.id) //get the lable from id
            tooltip.html("hello "+ label + "<br/>" + aktT)
                .style("left", (window.pageXOffset + matrix.e + 15) + "px")
                .style("top", (window.pageYOffset + matrix.f - 30) + "px");
        })
        // .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
        .on("mouseout", function (d) {
            console.log("Mouseout")
            tooltip.transition().duration(500).style("opacity", 0);
        })
        // Klaus: Added this .on() to be able to click the sub-bubbles
        .on("click", function (d) { return Bubbleclick(d3.select(this)) })


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
        if (currentMounth > 9) { return "grey"; }
        if (d.c == COLOR_DIGITAL) { /* blue */
            return "white"; /* white */
        }
        if (d.c == COLOR_ANALOG) { /* orange */
            return "white";
        }
        console.log("keine Farbe");
        return "black";
    }

    /* Get the color of the bubbles based on the id */
    function idToColor(id) {
        if (id == 1) { return COLOR_ANALOG }
        if (id == 2) { return COLOR_DIGITAL }
        if (id > 2 && id < 7) { return COLOR_ANALOG }
        if (id > 6) { return COLOR_DIGITAL }
        return " ";
    }

    var clickCounter = 0;
    var previousID = 0;
    var clicked_Analog = 0;
    var clicked_Digital = 0;
    var sameClick = 1;

    /* Event handler for mouse click on bubbles */
    function Bubbleclick(d) {
        clickCounter = clickCounter + 1;
        console.log("ID = " + d.attr("id")); //-> zugriff auf Attribute der angeklickten Bubble
        var idClick = d.attr("id");
        console.log("clickedAna = " + clicked_Analog);
        console.log("clickedD = " + clicked_Digital);
        console.log("currentClick = " + idClick);
        if (idClick > 2 && idClick < 7) { //Analog
            elemEnter.selectAll("circle")//.append("circle")
                .filter(function (d) { return (d.id == idClick) })
                .attr("fill", "#a84d0a")
                .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
            //wenn vorher auch analog -> alte bubble nicht markieren
            if (previousID > 2 && previousID < 7) {
                if (idClick == clicked_Analog) {
                    //nix
                    if (previousID == clicked_Analog) {
                        sameClick++;


                        console.log("sameClick = " + sameClick);

                        if (sameClick % 2 == 0) {
                            // Farbe vom vorherigen zurücksetzen
                            elemEnter.selectAll("circle")//.append("circle")
                                .filter(function (d) {
                                    return (d.id == clicked_Analog)
                                })
                                .attr("fill", idToColor(clicked_Analog))
                                .style("opacity", function (d) {
                                    if (currentMounth > 9) {
                                        return 0.5
                                    } else {
                                        1
                                    }
                                })
                        }
                    }
                } else {
                    sameClick = 1;

                    // Farbe vom vorherigen zurücksetzen
                    elemEnter.selectAll("circle")//.append("circle")
                        .filter(function (d) {
                            return (d.id == clicked_Analog)
                        })
                        .attr("fill", idToColor(clicked_Analog))
                        .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
                }
            } else {
                // Farbe vom vorherigen zurücksetzen
                sameClick++;
                elemEnter.selectAll("circle")//.append("circle")
                    .filter(function (d) {
                        return (d.id == clicked_Analog)
                    })
                    .attr("fill", idToColor(clicked_Analog))
                    .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
            }
            clicked_Analog = idClick;


        } else if (idClick > 6) { //Digital
            elemEnter.selectAll("circle")//.append("circle")
                .filter(function (d) { return (d.id == idClick) })
                .attr("fill", "#08456e")
                .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })

            //wenn vorher auch digital -> alte bubble nicht markieren
            if (previousID > 6) {
                if (idClick == clicked_Digital) {
                    //nix
                    sameClick++;

                    console.log("sameClick = " + sameClick);

                    if (sameClick % 2 == 0) {
                        // Farbe vom vorherigen zurücksetzen
                        elemEnter.selectAll("circle")//.append("circle")
                            .filter(function (d) {
                                return (d.id == clicked_Digital)
                            })
                            .attr("fill", idToColor(clicked_Digital))
                            .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
                    }
                } else {
                    sameClick = 1;
                    // Farbe vom vorherigen zurücksetzen
                    elemEnter.selectAll("circle")//.append("circle")
                        .filter(function (d) {
                            return (d.id == clicked_Digital)
                        })
                        .attr("fill", idToColor(clicked_Digital))
                        .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
                }
            } else {
                sameClick++;
                // Farbe vom vorherigen zurücksetzen
                elemEnter.selectAll("circle")//.append("circle")
                    .filter(function (d) {
                        return (d.id == clicked_Digital)
                    })
                    .attr("fill", idToColor(clicked_Digital))
                    .style("opacity", function (d) { if (currentMounth > 9) { return 0.5 } else { 1 } })
            }
            clicked_Digital = idClick;

        } else {

            //nix, da Hauptbubble
        }




        previousID = idClick;

        if (d.attr("id") == 2) {
            console.log("if - digital");
            //CickDigital = true;
            //ClickAnalog = false;
            //return ClickforDig(d);
        }
        if (d.attr("id") == 1) {
            console.log("else if -analog");
            //ClickDigital = false;
            //ClickAnalog = true;
            //return ClickforAna(d);
        } else {
            //Click auf keine Hauptbubble -> Diagramm anzeigen lassen für diese Bubble
            console.log("else");
            var currentLabel = idToLabel(d.attr("id"));
            if (d.attr("id") >= 3 && d.attr("id") <= 6) {
                console.log("analog sub-bubble clicked: " + currentLabel)
                // was selected before, so remove selection
                if (selectedAnalogBubble === currentLabel) {
                    selectedAnalogBubble = ""
                    // TODO: change color back
                }
                // add new selection
                else {
                    selectedAnalogBubble = currentLabel
                    // TODO: change color etc
                }
            } else if (d.attr("id") >= 7 && d.attr("id") <= 10) {
                console.log("digital sub-bubble clicked: " + currentLabel)
                // was selected before, so remove selection
                if (selectedDigitalBubble === currentLabel) {
                    selectedDigitalBubble = ""
                    // TODO: change color back
                }
                // add new selection
                else {
                    selectedDigitalBubble = currentLabel
                    // TODO: change color etc
                }
            }

            parser(selectedAnalogBubble, selectedDigitalBubble)

            /*
            if (d.attr("id") == 4) {
                console.log("4");
                // code
            }
            if (d.attr("id") == 3) {
                console.log("3");
                // code
            }
            return showDiagram(d.attr("label"));*/

        }
    }

    /*
        function ClickforAna(d) {
            //analoge sichtbar
            elemEnter.selectAll("circle")//.append("circle")
                .filter(function (d) { return (d.id <= 6 && d.id != 2) }) //nur analoge
                .attr("id", function (d) { return d.id })
                .attr("r", function (d) { if( bubbleRadi[currentMounth][d.id] == 0) { return 50} else {return bubbleRadi[currentMounth][d.id] + 10}})
                .attr("stroke", "#DBDBDB")
                .attr("fill", function (d) { return d.c })
                .style("opacity", 2)
                //.on("mouseover", handleMouseOver(d)) //klappt
                .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
                .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
                .on("click", function (d) { return Bubbleclick(d3.select(this)) })
     
     
            //digitale Bubble transparent -> noch nicht richtig
            elemEnter//.append("circle")
                .selectAll("circle")
                .filter(function (d) { return (d.id > 6) })
                .attr("id", function (d) { return d.id })
                .attr("r", function (d) { if( bubbleRadi[currentMounth][d.id] == 0) { return 50} else {return bubbleRadi[currentMounth][d.id] + 10}})
                .attr("stroke", "black")
                .attr("fill", function (d) { return d.c })
                .style("opacity", 0.2)
     
     
            elemEnter.append("text")
                .filter(function (d) { return (d.id <= 2) }) //nur analoge und hauptbubble
                .attr("dx", function (d) { return -40 })
                .attr("dy", 3)
                .text(function (d) { return d.label })
                .style("fill", function (d) { return Choosetextcolor(d) })
                .style("font-size", "24px")
                .style("font-weight", "bold") // new
                
     
     
            elemEnter.selectAll("svg:image").remove()
            elemEnter.selectAll("svg:image")
                .filter(function (d) { return (d.id <= 5) }) //nur analoge und hauptbubble
                .attr("x", function (d) { return computeImagePos(d.id) })
                .attr("y", function (d) { return computeImagePos(d.id) })
                .attr("width", function (d) { return computeImageSize(d.id)  })
                .attr("height", function (d) { return computeImageSize(d.id)  })
                .attr("xlink:href", function (d) {return "icons/" + d.img })
                .style("opacity", 5)
                .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
                .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
        }
     
        function ClickforDig(d) {
            elemEnter
                .selectAll("circle")
                //.append("circle")
                .filter(function (d) { return (d.id > 6 || d.id == 2) }) //nur digitale
                .attr("id", function (d) { return d.id })
                .attr("r", function (d) { if( bubbleRadi[currentMounth][d.id] == 0) { return 50} else {return bubbleRadi[currentMounth][d.id] + 10}})
                .attr("stroke", "#DBDBDB")
                .attr("fill", function (d) { return d.c })
                .style("opacity", 2)
                //.on("mouseover", handleMouseOver(d)) //klappt
                .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
                .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
                .on("click", function (d) { return Bubbleclick(d3.select(this)) });
     
     
            //analoge Bubbles transparent
            elemEnter//.append("circle")
                .selectAll("circle")
                .filter(function (d) { return (d.id > 2 && d.id <= 6) })
                .attr("id", function (d) { return d.id })
                .attr("r", function (d) { if( bubbleRadi[currentMounth][d.id] == 0) { return 50} else {return bubbleRadi[currentMounth][d.id] + 10}})
                .attr("stroke", "black")
                .attr("fill", function (d) { return d.c })
                .style("opacity", 0.2)
     
            elemEnter.append("text")
                .filter(function (d) { return (d.id <= 2) }) //nur analoge und hauptbubble
                .attr("dx", function (d) { return -40 })
                .attr("dy", 3)
                .text(function (d) { return d.label })
                .style("fill", function (d) { return Choosetextcolor(d) })
                .style("font-size", "24px")
                .style("font-weight", "bold") 
     
     
            elemEnter.selectAll("svg:image").remove()
            elemEnter.selectAll("svg:image")
                .filter(function (d) { return (d.id <= 5) }) //nur analoge und hauptbubble
                .attr("x", function (d) { return computeImagePos(d.id) })
                .attr("y", function (d) { return computeImagePos(d.id) })
                .attr("width", function (d) { return computeImageSize(d.id)  })
                .attr("height", function (d) { return computeImageSize(d.id)  })
                .attr("xlink:href", function (d) {return "icons/" + d.img })
                .style("opacity", 5)
                .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
                .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
        }
    */ //Click on centered Bubbles

    function computeImageSize(id) {

        var bubbleid = id;
        var radiusBubble = bubbleRadi[currentMounth][bubbleid];
        console.log("radiusBubble mit id " + bubbleid + " = " + radiusBubble);
        console.log("monat: " + currentMounth);
        var imageSize = radiusBubble;
        // no data to show
        if (imageSize == 0) {
            return 60;
        }
        return imageSize + 20;
    }

    function computeImagePos(id) {

        var bubbleid = id;
        var radiusBubble = bubbleRadi[currentMounth][bubbleid];
        var imagePos = radiusBubble * (-0.5);
        // no data to show
        if (imagePos == 0) {
            return -30;
        }

        return imagePos - 10;
    }

    function idToLabel(id) {
        if (id == 3) { return HEALTH }
        if (id == 4) { return NEWS }
        if (id == 5) { return FREETIME }
        if (id == 6) { return SPORT }
        if (id == 7) { return SPORT }
        if (id == 8) { return HEALTH }
        if (id == 9) { return NEWS }
        if (id == 10) { return FREETIME }
        return " ";
    }

    // Create Event Handlers for mouse
    function handleMouseOver(d) {  // Add interactivity
        console.log("inMouseOVER");

        var matrix = this.getScreenCTM()
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(d)
                .style("left", (window.pageXOffset + matrix.e + 15) + "px")
                .style("top", (window.pageYOffset + matrix.f - 30) + "px");

        // var currentText = idToLabel(d.attr("id"));
        // // console.log(currentText); //-> zugriff auf Attribute der angeklickten Bubble
        // // var xpos = d.attr("x") + 100;
        // // var ypos = d.attr("y") + 100;
        // //d.attr("fill", "red");
        // // Specify where to put label of text
        // //Mouse Position
        // // svg.append("text")
        // //     .attr("x", 800)/*800)*/
        // //     .attr("y", 80)/*80)*/
        // //     .attr("id", "t" + currentText)
        // //     .text(currentText)
        // //     .style("font-size", "20px")
        // //     .style("font-style", "italic")
        // //     .style("fill", "#DBDBDB");

        // var tooltip = d3.select("#bubbles")
        //     .append("div")
        //     .style("position", "absolute")
        //     .attr("class", "tooltip")
        //     .attr("id", "tooltip")
        //     .style("background-color", "black")
        //     .style("border-radius", "5px")
        //     .style("padding", "10px")
        //     .style("color", "white")
        //     .style("opacity", 1)

        // tooltip.html("Country: " + d.country)
        //     // .style("left", (d3.pointer(this)[0] + 30) + "px")
        //     // .style("top", (d3.pointer(this)[1] + 30) + "px")
        //     .style("left", d.cx)
        //     .style("top", d.cy)
        //     .transition()
        //     .duration(200)

    }

    function handleMouseMove(d) {
        tooltip
            .style("left", (d3.pointer(this)[0] + 30) + "px")
            .style("top", (d3.pointer(this)[1] + 30) + "px")
    }

    function handleMouseOut(d) {
        var currentText = idToLabel(d.attr("id"));
        console.log("inMouseOUT - remove:" + "#t" + currentText);
        // Select text by id and then remove
        d3.select("#t" + currentText).remove();  // Remove text location

        d3.select("#tooltip").remove()

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

function bubbleSizeInOne() {
    Promise.all([
        // Open file(s)
        d3.csv(PATH_ANALOG_FREETIME),
        d3.csv(PATH_ANALOG_HEALTH),
        d3.csv(PATH_ANALOG_NEWS),
        d3.csv(PATH_ANALOG_SPORT),
        d3.csv(PATH_DIGITAL_FREETIME),
        d3.csv(PATH_DIGITAL_HEALTH),
        d3.csv(PATH_DIGITAL_NEWS),
        d3.csv(PATH_DIGITAL_SPORT),
    ]).then(function (files) {
        console.log("loading both successfull")
        // files[0] will contain file1.csv
        // files[1] will contain file2.csv
        var fileAFreetime = files[0]
        var fileAHealth = files[1]
        var fileANews = files[2]
        var fileASport = files[3]
        var fileDFreetime = files[4]
        var fileDHealth = files[5]
        var fileDNews = files[6]
        var fileDSport = files[7]

        var bubbleRadius = []
        var max = 0
        var min = 0

        fileAHealth.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                console.log("month " + month)
                var amount = Number(d.VerkaufLinear)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 3, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 3, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        fileANews.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                console.log("month " + month)
                var amount = Number(d.VerkaufLinear)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 4, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 4, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        fileAFreetime.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                console.log("month " + month)
                var amount = Number(d.VerkaufLinear)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 5, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 5, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        fileASport.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                console.log("month " + month)
                var amount = Number(d.VerkaufLinear)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 6, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 6, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDSport.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                //console.log(month)
                var amount = Number(d.KatVisits)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 7, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 7, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDHealth.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                //console.log(month)
                var amount = Number(d.KatVisits)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 8, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 8, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDNews.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                //console.log(month)
                var amount = Number(d.KatVisits)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 9, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 9, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDFreetime.forEach(function (d) {
            if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                //console.log(month)
                var amount = Number(d.KatVisits)
                if (amount > max) {
                    max = amount
                }
                if (min != 0 && amount < min) {
                    min = amount
                } else if (min == 0) {
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = { id: 10, month: month.charAt(1), amount: amount };
                } else {
                    console.log("late month")
                    feed = { id: 10, month: month, amount: amount };
                }
                bubbleRadius.push(feed);
            }
        })

        bubbleRadius.forEach(function (a) {
            console.log("ana ForEach")
            var id = a.id
            var month = a.month
            var amount = a.amount

            const radiusScale = d3.scaleSqrt()
                .domain([min, max])
                .range([30, 100])
            var r = radiusScale(amount)

            console.log("max: " + max)
            console.log("min: " + min)

            radius[month][id] = r
        })
        visualizeBubbles(json1, 1);



    }).catch(function (err) {
        // handle error
        console.log("loading error" + err)
    })
}



bubbleSizeInOne()

//visualizeBubbles(json1, bubbleRadi, 1);
