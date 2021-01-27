/*
Create Bubble Diagram
*/

json1 = {
    "bubbles": [{
        // main bubbles
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
    // analog sub bubbles
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
        "x": 70,
        "y": 150,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": NEWS,
        "img": "newsPaper_icon.png"

    }, {
        "id": 5,
        "x": 70,
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
        "x": 580,
        "y": 150,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": NEWS,
        "img": "newsPaper_icon.png"
    }, {
        "id": 10,
        "x": 580,
        "y": 330,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": FREETIME,
        "img": "music.png"
    }
    ]
}

var bubbleName;


function computeMainBubbles(bubbleRadi, month) {
    console.log("month = " + month)
    var summedig = 0;
    for (let bubb = 3; bubb < 7; bubb++) {
        summedig = summedig + bubbleRadi[month][bubb] + 10
        console.log("Summe aus: " + bubbleRadi[month][bubb] + " + ")
    }
    bubbleRadi[month][1] = summedig / 4;
    console.log(" = " + summedig);

    var summeana = 0;
    for (let bubb = 7; bubb < 11; bubb++) {
        summeana = summeana + bubbleRadi[month][bubb] + 10
        console.log("Summe aus: " + bubbleRadi[month][bubb] + " + ")
    }
    bubbleRadi[month][2] = summeana / 4;
    console.log("summeANA = " + summeana);
}


var selectedAnalogBubble = ""
var selectedDigitalBubble = ""
var ClickDigital = true;
var ClickAnalog = true;


var tooltip = d3.select("#bubbles")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white") // "#39475c")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "#39475c")
    .style("position", "absolute")

/* Visualize the bubble chart. Is called every time you move the timer */
function visualizeBubbles(json, currentMonth) {
    bubbleRadi = radius

    computeMainBubbles(bubbleRadi, currentMonth);
    //console.log(bubbleRadi)

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

    /*Create the main circles: analog, digital */
    var circle = elemEnter.append("circle")
        .filter(function (d) { return d.id < 3 })
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { if (bubbleRadi[currentMonth][d.id] == 0) { return 50 } else { return bubbleRadi[currentMonth][d.id] + 10 } })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .style("opacity", function (d) { if (currentMonth > 9) { return 0.5 } else { 1 } })
        /* Handle mousehovering event: Get position of the bubble and show the tooltip */ 
        .on("mouseover", function (d) {
            console.log(" in mouseover")
            var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip.transition().duration(200).style("opacity", .9);
            var currentText = function (d) {
                if (this.id == 1){return "Zusammenfassung </br> analoger Medien"}
                else {return "Zusammenfassung </br> digitaler Medien"}
            }
            tooltip.html(currentText)
                .style("left", (window.pageXOffset + matrix.e + 30) + "px")
                .style("top", (window.pageYOffset + matrix.f - 70) + "px");
        })
        /* Handle mousehovering event: Remove the tooltip */
        .on("mouseout", function (d) {
            console.log("in mouseout")
            tooltip.transition().duration(500).style("opacity", 0);
        })
        /* Handle mouseclick event */ 
        .on("click", function (d) { return bubbleClick(d3.select(this)) }) //noch testen



    elemEnter.selectAll("text").remove()
    //Texte einfügen und später filtern
    elemEnter.selectAll("text").remove()
    elemEnter.append("text")
        .filter(function (d) { return d.id < 3 })
        .attr("dx", function (d) { return -35 })
        .attr("dy", 5)
        .text(function (d) { return d.label })
        .style("fill", function (d) { return Choosetextcolor(d) })
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .filter(function (d) { return d.id < 3 })
        /* Event handler for mouse hovering on bubbles (show tooltip) */
        .on("mouseover", function (d) {
            console.log(" in mouseover")
            var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip.transition().duration(200).style("opacity", .9);
            var currentText = function (d) {
                if (this.id == 1){return "Zusammenfassung </br> analoger Medien"}
                else {return "Zusammenfassung </br> digitaler Medien"}
            }
            tooltip.html(currentText)
                .style("left", (window.pageXOffset + matrix.e + 30) + "px")
                .style("top", (window.pageYOffset + matrix.f - 70) + "px");
        })
        /* Remove the tooltip */
        .on("mouseout", function (d) {
            console.log("in mouseout")
            tooltip.transition().duration(500).style("opacity", 0);
        })

    /* Make other bubbles transparent */
    elemEnter.append("circle")
        .filter(function (d) { return d.id > 2 })
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { if (bubbleRadi[currentMonth][d.id] == 0) { return 50 } else { return bubbleRadi[currentMonth][d.id] + 10 } })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .style("opacity", function (d) { if (currentMonth > 9) { return 0.5 } else { 1 } })
        /* Event handler for mouse hovering on bubbles (show tooltip) */
        .on("mouseover", function (d) {
            console.log("in mouseover")
            var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip.transition().duration(200).style("opacity", .9);
            var id = this.id
            tooltip.html(tooltipDetails(id, currentMonth))
                .style("left", (window.pageXOffset + matrix.e + 30) + "px")
                .style("top", (window.pageYOffset + matrix.f - 59) + "px");
        })
        /* Remove the tooltip */
        .on("mouseout", function (d) {
            console.log("in mouseout")
            tooltip.transition().duration(500).style("opacity", 0);
        })

    elemEnter.append("svg:image")
        .filter(function (d) { return d.id > 2 })
        .attr("x", function (d) { return computeImagePos(d.id) })
        .attr("y", function (d) { return computeImagePos(d.id) })
        .attr("width", function (d) { return computeImageSize(d.id) })
        .attr("height", function (d) { return computeImageSize(d.id) })
        .attr("id", function (d) { return d.id })
        .attr("xlink:href", function (d) { return "icons/" + d.img })
        .style("opacity", function (d) { if (currentMonth > 9) { return 0.5 } else { 1 } })
        /* Event handler for mouse hovering on bubbles (show tooltip) */
        .on("mouseover", function (d) {
            console.log(" in mouseover")
            var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip.transition().duration(200).style("opacity", .9);
            var id = this.id
            tooltip.html(tooltipDetails(id, currentMonth))
                .style("left", (window.pageXOffset + matrix.e + 30) + "px")
                .style("top", (window.pageYOffset + matrix.f - 59) + "px");
        })
        /* Remove the tooltip */
        .on("mouseout", function (d) {
            console.log("in mouseout")
            tooltip.transition().duration(500).style("opacity", 0);
        })
        // Klaus: Added this .on() to be able to click the sub-bubbles
        /* Handle mouseclick event */
        .on("click", function (d) { return bubbleClick(d3.select(this)) })

    var done = false;
        if(done == false) {
            fillClickedBubbles(markedBD, markedBA);

            function fillClickedBubbles (D, A){
                if(D == 0 && A == 0){
                    markBubble(1);
                    markBubble(2);
                }
                elemEnter.selectAll("circle")//.append("circle")
                    .filter(function (d) {
                        return (d.id == A || d.id == D)
                    })
                    .attr("fill",
                        function (d) {
                            if (d.id == D) {
                                return "#08456e";
                            } else {
                                return "#a84d0a";
                            }
                        })
                    .style("opacity", function (d) {
                        if (currentMonth > 9) {
                            return 0.5
                        } else {
                            1
                        }
                    })
            }
            done = true;
        }


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

     //Get the Text for the Tooltip
     function tooltipDetails(currentid, currentMonth) {
        var details;

        if (currentid > 2 && currentid < 7) {
            details = ("<b>Kategorie:</b> " + idToLabel(currentid) + "</br><b>Quelle:</b> " + titleCollection[currentid] + "</br><b>Verkaufszahlen:</b> " + amountCollection[currentMonth][currentid]);
        }
        else if (currentid > 6 && currentid < 11) {
            details = ("<b>Kategorie:</b> " + idToLabel(currentid) + "</br><b>Quelle:</b> " + titleCollection[currentid] + "</br><b>Besuche:</b> " + amountCollection[currentMonth][currentid]);
        } else {
            details = ("Nothing here");
        }
        console.log(details);
        return details;
    }

    function Choosetextcolor(d) {
        if (currentMonth > 9) { return "grey"; }
        if (d.c == COLOR_DIGITAL) { /* blue */
            return "white"; /* white */
        }
        if (d.c == COLOR_ANALOG) { /* orange */
            return "white";
        }
        console.log("keine Farbe");
        return "black";
    }

    function idToColor(id) {
        if (id == 1) { return COLOR_ANALOG }
        if (id == 2) { return COLOR_DIGITAL }
        if (id > 2 && id < 7) { return COLOR_ANALOG }
        if (id > 6) { return COLOR_DIGITAL }
        return " ";
    }

    var clickCounter = 0;
    var previousID = 0;

    function markBubble(idClick){
        elemEnter.selectAll("circle")//.append("circle")
            .filter(function (d) {
                return (d.id == idClick)
            })
            .attr("fill", function (d) {
                if (idClick > 6) {
                    return "#08456e"; //digital
                }
                if (idClick > 2 && idClick < 7)  {
                    return "#a84d0a"; //analog
                }
                if (idClick == 1){
                    return "#a84d0a"; //analog
                }
                if (idClick == 2) {
                    return "#08456e"; //digital
                }
            })
            .style("opacity", function (d) {
                if (currentMonth > 9) {
                    return 0.5
                } else {
                    1
                }
            });
    }

    function resetBubble(clicked_bubble) {
        elemEnter.selectAll("circle")//.append("circle")
            .filter(function (d) {
                return (d.id == clicked_bubble)
            })
            .attr("fill", idToColor(clicked_bubble))
            .style("opacity", function (d) {
                if (currentMonth > 9) {
                    return 0.5
                } else {
                    1
                }
            });
    }

    function markMainB() {
        markBubble(1);
        markBubble(2);
        //demarke old_bubbles
        sameClick = 1;
        if(clicked_Analog != 0) { resetBubble(clicked_Digital); }
        if(clicked_Digital != 0) { resetBubble(clicked_Analog); }
        clicked_Analog = 0;
        clicked_Digital = 0;
        selectedAnalogBubble = "";
        selectedDigitalBubble = "";
    }

    /* Event handler for mouse click on bubbles */
    function bubbleClick(d) {
        clickCounter = clickCounter + 1;
        console.log("ID = " + d.attr("id"));
        var idClick = d.attr("id");
        bubbleName = idToLabel(idClick);

//Bubbleclick anderer Ansatz, noch Enfernen vor Abgabe
/*
        if (idClick > 2 && idClick < 7) { // Analog sub bubbles
            markBubble(idClick);
            if (previousID > 2 && previousID < 7) {
                if (idClick == clicked_Analog) {
                    //nix
                    if (previousID == clicked_Analog) {
                        sameClick++;
                        console.log("sameClick = " + sameClick);
                        if (sameClick % 2 == 0) {
                            // Reset previous color
                            resetBubble(clicked_Analog);
                            markedBA = 0;
                        }
                    }
                } else {
                    sameClick = 1;
                    // Reset previous color
                    resetBubble(clicked_Analog);
                    markedBA = 0;
                }
            } else {
                // Reset previous color
                resetBubble(clicked_Analog);
            }
            clicked_Analog = idClick;
            resetBubble(1);
            resetBubble(2);
        } else if (idClick > 6) { // Digital sub bubbles
            markBubble(idClick);
            if (previousID > 6) {
                if (idClick == clicked_Digital) {
                    sameClick++;
                    if (sameClick % 2 == 0) {
                        resetBubble(clicked_Digital);
                    }
                } else {
                    sameClick = 1;
                    resetBubble(clicked_Digital);
                    //markedBD = 0;
                }
            } else {
                sameClick++;
                resetBubble(clicked_Digital);
            }
            clicked_Digital = idClick;
            resetBubble(1);
            resetBubble(2);
        } else {
            //mainBubbles
            if(idClick == 1 || idClick == 2){
                console.log("mainBubblesCLICKED");
                console.log("clickANa = " + clicked_Analog);
                console.log("clickDigital = " + clicked_Digital);
                //mark mainbubbles
                markMainB();
            }
        }
        */
            //show Diagram
            var currentLabel = idToLabel(d.attr("id"));
            var currentID = d.attr("id");

            if (d.attr("id") == 2) {
            //do nothing, because mainBubbles
            selectedAnalogBubble = "";
            selectedDigitalBubble = "";
            }

            if (d.attr("id") == 1) {
            //do nothing, because mainBubbles
            selectedAnalogBubble = "";
            selectedDigitalBubble = "";
            }

            if (d.attr("id") >= 3 && d.attr("id") <= 6) {
                console.log("analog sub-bubble clicked: " + currentLabel)
                // was selected before, so remove selection
                if (selectedAnalogBubble === currentLabel) {
                    selectedAnalogBubble = "";
                    // TODO: change color back

                    markedBA = 0;
                }
                // add new selection
                else {
                    selectedAnalogBubble = currentLabel
                    // TODO: change color etc

                    markedBA = currentID;
                }
            } else if (d.attr("id") >= 7 && d.attr("id") <= 10) {
                console.log("digital sub-bubble clicked: " + currentLabel)
                // was selected before, so remove selection
                if (selectedDigitalBubble === currentLabel) {
                    selectedDigitalBubble = ""
                    // TODO: change color back

                    markedBD = 0;
                }
                // add new selection
                else {
                    selectedDigitalBubble = currentLabel
                    // TODO: change color etc

                    markedBD = currentID;
                }

            }
            previousID = idClick;



            for (var i = 1; i < 12; i++) {
                resetBubble(i);
            }

        if(selectedAnalogBubble == "" && selectedDigitalBubble == "") {
            markMainB();
        }else{
            if(selectedAnalogBubble != "") {
                markBubble(AlabelToId(selectedAnalogBubble));
            }
            if(selectedDigitalBubble != "") {
                markBubble(DlabelToId(selectedDigitalBubble));
            }
        }

            parser(selectedAnalogBubble, selectedDigitalBubble)



        
    }   


    function computeImageSize(id) {

        var bubbleid = id;
        var radiusBubble = bubbleRadi[currentMonth][bubbleid];
        console.log("radiusBubble mit id " + bubbleid + " = " + radiusBubble);
        console.log("monat: " + currentMonth);
        var imageSize = radiusBubble;
        // no data to show
        if (imageSize == 0) {
            return 60;
        }
        return imageSize + 20;
    }

    function computeImagePos(id) {

        var bubbleid = id;
        var radiusBubble = bubbleRadi[currentMonth][bubbleid];
        var imagePos = radiusBubble * (-0.5);
        // no data to show
        if (imagePos == 0) {
            return -30;
        }

        return imagePos - 10;
    }

    function idToLabel(id) {
        if (id == 2){ return DIGITAL}
        if(id == 1){return ANALOG}
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

    function AlabelToId(label) {
        if(label == HEALTH) { return 3; }
        if(label == NEWS) { return 4; }
        if(label == FREETIME) { return 5; }
        if(label == SPORT) { return 6; }

    }

    function DlabelToId(label) {
        if(label == HEALTH) { return 8; }
        if(label == NEWS) { return 9; }
        if(label == FREETIME) { return 10; }
        if(label == SPORT) { return 7; }

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

    d3.select("#tooltip").remove();

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
                var title = d.Titel
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
                    feed = { id: 3, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 3, month: month, amount: amount, title: title };
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
                var title = d.Titel
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
                    feed = { id: 4, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 4, month: month, amount: amount, title: title };
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
                var title = d.Titel
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
                    feed = { id: 5, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 5, month: month, amount: amount, title: title };
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
                var title = d.Titel
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
                    feed = { id: 6, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 6, month: month, amount: amount, title: title };
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
                var title = d.Bezeichnung
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
                    feed = { id: 7, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 7, month: month, amount: amount, title: title };
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
                var title = d.Bezeichnung
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
                    feed = { id: 8, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 8, month: month, amount: amount, title: title };
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
                var title = d.Bezeichnung
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
                    feed = { id: 9, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 9, month: month, amount: amount, title: title };
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
                var title = d.Bezeichnung
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
                    feed = { id: 10, month: month.charAt(1), amount: amount, title: title };
                } else {
                    console.log("late month")
                    feed = { id: 10, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        bubbleRadius.forEach(function (a) {
            console.log("ana ForEach")
            var id = a.id
            var month = a.month
            var amount = a.amount
            var title = a.title

            const radiusScale = d3.scaleSqrt()
                .domain([min, max])
                .range([30, 100])
            var r = radiusScale(amount)

            console.log("max: " + max)
            console.log("min: " + min)

            radius[month][id] = r
            //For the Tooltip, save the amount and title to display
            amountCollection[month][id] = amount
            titleCollection[id] = title
        })

        console.log("bubbleradius " + amountCollection + "  " + titleCollection)

        visualizeBubbles(json1, 1, clicked_Analog, clicked_Digital);



    }).catch(function (err) {
        // handle error
        console.log("loading error" + err)
    })

    
}

/* Get the respective media name; relevant for the tooltips of the line diagramm ("lineDiagramm.js") */
function getMediaName() {
    return bubbleName;
}

bubbleSizeInOne()