/*
Create Bubble Diagram
*/

json1 = {
    "bubbles": [{
        // main bubbles
        "id": 1,
        "x": bubDigitalPosX, //250
        "y": bubDigitalPosY, //220
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": ANALOG,
        "img": ""
    }, {
        "id": 2,
        "x": bubDigitalPosX + 150, //400,
        "y": bubDigitalPosY,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": DIGITAL,
        "img": ""
    },
    // analog sub bubbles
    {
        "id": 3,
        "x": bubDigitalPosX,
        "y": bubDigitalPosY - 150, //70
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": HEALTH,
        "img": "health.png"

    }, {
        "id": 4,
        "x": bubDigitalPosX - 180, //70
        "y": bubDigitalPosY - 70,//150
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": NEWS,
        "img": "newsPaper_icon.png"

    }, {
        "id": 5,
        "x": bubDigitalPosX - 180, //70,
        "y": bubDigitalPosY + 110,//330,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": FREETIME,
        "img": "music.png"
    },
    {
        "id": 6,
        "x": bubDigitalPosX,
        "y": bubDigitalPosY + 150,//370,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": SPORT,
        "img": "sport.png"
    },
    //digital sub bubbles
    {
        "id": 7,
        "x": bubDigitalPosX + 150,//400,
        "y": bubDigitalPosY + 150,//370,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": SPORT,
        "img": "sport.png"
    }, {
        "id": 8,
        "x": bubDigitalPosX + 150,//400,
        "y": bubDigitalPosY - 150,//70,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": HEALTH,
        "img": "health.png"
    }, {
        "id": 9,
        "x": bubDigitalPosX + 330,//580,
        "y": bubDigitalPosY - 70,//150,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": NEWS,
        "img": "newsPaper_icon.png"
    }, {
        "id": 10,
        "x": bubDigitalPosX + 330,//580,
        "y": bubDigitalPosY + 110,//330,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": FREETIME,
        "img": "music.png"
    }
    ]
}

var bubbleName;

// Scroll to the bootom of the page when arrow clicked
function scrollDown(){
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
}


function computeMainBubbles(bubbleRadi, month) {
    var summedig = 0;
    for (let bubb = 3; bubb < 7; bubb++) {
        summedig = summedig + bubbleRadi[month][bubb] + 10

    }
    bubbleRadi[month][1] = summedig / 4;
    // console.log(" = " + summedig);

    var summeana = 0;
    for (let bubb = 7; bubb < 11; bubb++) {
        summeana = summeana + bubbleRadi[month][bubb] + 10

    }
    bubbleRadi[month][2] = summeana / 4;
    // console.log("summeANA = " + summeana);
}


var selectedAnalogBubble = ""
var selectedDigitalBubble = ""
var ClickDigital = true;
var ClickAnalog = true;


var tooltip_line = d3.select("#bubbles")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white") // "#39475c")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "#39475c")
    .style("position", "absolute")




/* Visualize the bubble chart. Is called every time you move the timer */
function visualizeBubbles() {
    console.log("visualizeBubbles")
    bubbleRadi = radius
    var currentMonth = currentSliderPosition +1

    parser(selectedAnalogBubble, selectedDigitalBubble)
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
        .data(json1.bubbles)

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
        .style("opacity", function (d) { if (currentYear == 2020 && currentMonth > 9) { return 0.5 } else { 1 } })
        /* Handle mousehovering event: Get position of the bubble and show the tooltip */
        .on("mouseover", function (d) {
            var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip_line.transition().duration(200).style("opacity", .9);
            var id = this.id
            tooltip_line.html(tooltipDetailsMainBubbles(id))
                .style("left", (window.pageXOffset + matrix.e + 30) + "px")
                .style("top", (window.pageYOffset + matrix.f - 70) + "px");
        })
        /* Handle mousehovering event: Remove the tooltip */
        .on("mouseout", function (d) {
            tooltip_line.transition().duration(500).style("opacity", 0);
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
    // Text doesn't have an id so inkorrekt tooltips gets display

    /* Event handler for mouse hovering on bubbles (show tooltip) */
    // .on("mouseover", function (d) {
    //     console.log(" in mouseover")
    //     var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
    //         .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
    //     tooltip.transition().duration(200).style("opacity", .9);
    //     var id = this.label //text has no ID
    //     tooltip.html(id)
    //         .style("left", (window.pageXOffset + matrix.e + 30) + "px")
    //         .style("top", (window.pageYOffset + matrix.f - 70) + "px");
    // })
    // /* Remove the tooltip */
    // .on("mouseout", function (d) {
    //     console.log("in mouseout")
    //     tooltip.transition().duration(500).style("opacity", 0);
    // })

    /* Make other bubbles transparent */
    elemEnter.append("circle")
        .filter(function (d) { return d.id > 2 })
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { if (bubbleRadi[currentMonth][d.id] == 0) { return 50 } else { return bubbleRadi[currentMonth][d.id] + 10 } })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .style("opacity", function (d) { if (currentYear == 2020 &&currentMonth > 9) { return 0.5 } else { 1 } })
        /* Event handler for mouse hovering on bubbles (show tooltip) */
        .on("mouseover", function (d) {
                      var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip_line.transition().duration(200).style("opacity", .9);
            var id = this.id
            tooltip_line.html(tooltipDetails(id, currentMonth))
                .style("left", (window.pageXOffset + matrix.e + 30) + "px")
                .style("top", (window.pageYOffset + matrix.f - 59) + "px");
        })
        /* Remove the tooltip */
        .on("mouseout", function (d) {
                      tooltip_line.transition().duration(500).style("opacity", 0);
        })

    elemEnter.append("svg:image")
        .filter(function (d) { return d.id > 2 })
        .attr("x", function (d) { return computeImagePos(d.id) })
        .attr("y", function (d) { return computeImagePos(d.id) })
        .attr("width", function (d) { return computeImageSize(d.id) })
        .attr("height", function (d) { return computeImageSize(d.id) })
        .attr("id", function (d) { return d.id })
        .attr("xlink:href", function (d) { return "icons/" + d.img })
        .style("opacity", function (d) { if (currentYear == 2020 &&currentMonth > 9) { return 0.5 } else { 1 } })
        /* Event handler for mouse hovering on bubbles (show tooltip) */
        .on("mouseover", function (d) {
                     var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
            tooltip_line.transition().duration(200).style("opacity", .9);
            var id = this.id
            tooltip_line.html(tooltipDetails(id, currentMonth))
                .style("left", (window.pageXOffset + matrix.e + 30) + "px")
                .style("top", (window.pageYOffset + matrix.f - 59) + "px");
        })
        /* Remove the tooltip */
        .on("mouseout", function (d) {
                       tooltip_line.transition().duration(500).style("opacity", 0);
        })
        // Klaus: Added this .on() to be able to click the sub-bubbles
        /* Handle mouseclick event */
        .on("click", function (d) { return bubbleClick(d3.select(this)) })

    var done = false;
    if (done == false) {
        fillClickedBubbles(markedBD, markedBA);

        function fillClickedBubbles(D, A) {
            if (D == 0 && A == 0) {
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
                    if (currenYear==2020 && currentMonth > 9) {
                        return 0.5
                    } else {
                        1
                    }
                })
        }
        done = true;
    }


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
        return details;
    }

    //Get the TooltipText for the Main Bubbels
    function tooltipDetailsMainBubbles(currentid) {

        if (currentid == 1) { return "Zusammenfassung </br> analoger Medien" }
        else if (currentid == 2) { return "Zusammenfassung </br> digitaler Medien" }
        else { return "This is a Bubble" }

    }

    function Choosetextcolor(d) {
        if (currentYear==2020 && currentMonth > 9) { return "grey"; }
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

    function markBubble(idClick) {
        elemEnter.selectAll("circle")//.append("circle")
            .filter(function (d) {
                return (d.id == idClick)
            })
            .attr("fill", function (d) {
                if (idClick > 6) {
                    return "#08456e"; //digital
                }
                if (idClick > 2 && idClick < 7) {
                    return "#a84d0a"; //analog
                }
                if (idClick == 1) {
                    return "#a84d0a"; //analog
                }
                if (idClick == 2) {
                    return "#08456e"; //digital
                }
            })
            .style("opacity", function (d) {
                if (currentYear == 2020 && currentMonth > 9) {
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
                if (currentYear == 2020 && currentMonth > 9) {
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
        if (clicked_Analog != 0) { resetBubble(clicked_Digital); }
        if (clicked_Digital != 0) { resetBubble(clicked_Analog); }
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

        if (selectedAnalogBubble == "" && selectedDigitalBubble == "") {
            markedBA = 0
            markedBD = 0
            markMainB();
        } else {
            if (selectedAnalogBubble != "") {
                markedBA = AlabelToId(selectedAnalogBubble)
                markBubble(AlabelToId(selectedAnalogBubble));
            }
            if (selectedDigitalBubble != "") {
                markedBD = DlabelToId(selectedDigitalBubble)
                markBubble(DlabelToId(selectedDigitalBubble));
            }
        }

        parser(selectedAnalogBubble, selectedDigitalBubble)




    }


    function computeImageSize(id) {

        var bubbleid = id;
        var radiusBubble = bubbleRadi[currentMonth][bubbleid];
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
        if (id == 2) { return DIGITAL }
        if (id == 1) { return ANALOG }
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
        if (label == HEALTH) { return 3; }
        if (label == NEWS) { return 4; }
        if (label == FREETIME) { return 5; }
        if (label == SPORT) { return 6; }

    }

    function DlabelToId(label) {
        if (label == HEALTH) { return 8; }
        if (label == NEWS) { return 9; }
        if (label == FREETIME) { return 10; }
        if (label == SPORT) { return 7; }

    }

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
        var max = 47513448
        var min = 3401

        var endmax = 47513448
        var endmin = 3401


        var yearBeginn =202001
        var yearEnd =  202009

        if(currentYear == 2020){
            yearBeginn =202001
            yearEnd =  202009
        }
        else{
            yearBeginn =201901
            yearEnd =  201912
        }


        fileAHealth.forEach(function (d) {
            if (Number(d.Monat) >= yearBeginn && Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                        var amount = Number(d.VerkaufLinear)
                var title = d.Titel
                var feed
                if (month.charAt(0) == "0") {
                                      feed = { id: 3, month: month.charAt(1), amount: amount, title: title };
                } else {
                                      feed = { id: 3, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        fileANews.forEach(function (d) {
            if (Number(d.Monat) >=yearBeginn && Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)

                var amount = Number(d.VerkaufLinear)
                var title = d.Titel
                var feed
                if (month.charAt(0) == "0") {

                    feed = { id: 4, month: month.charAt(1), amount: amount, title: title };
                } else {

                    feed = { id: 4, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        fileAFreetime.forEach(function (d) {
            if (Number(d.Monat) >= yearBeginn && Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)
                               var amount = Number(d.VerkaufLinear)
                var title = d.Titel
                var feed
                if (month.charAt(0) == "0") {

                    feed = { id: 5, month: month.charAt(1), amount: amount, title: title };
                } else {

                    feed = { id: 5, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        fileASport.forEach(function (d) {
            if (Number(d.Monat) >= yearBeginn && Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)

                var amount = Number(d.VerkaufLinear)
                var title = d.Titel
                var feed
                if (month.charAt(0) == "0") {

                    feed = { id: 6, month: month.charAt(1), amount: amount, title: title };
                } else {

                    feed = { id: 6, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDSport.forEach(function (d) {
            if (Number(d.Monat) >= yearBeginn && Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)

                var amount = Number(d.KatVisits)
                var title = d.Bezeichnung
                if (month.charAt(0) == "0") {

                    feed = { id: 7, month: month.charAt(1), amount: amount, title: title };
                } else {

                    feed = { id: 7, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDHealth.forEach(function (d) {
            if (Number(d.Monat) >=yearBeginn && Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)

                var amount = Number(d.KatVisits)
                var title = d.Bezeichnung
                if (month.charAt(0) == "0") {
                                 feed = { id: 8, month: month.charAt(1), amount: amount, title: title };
                } else {

                    feed = { id: 8, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDNews.forEach(function (d) {
            if (Number(d.Monat) >= yearBeginn&& Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)

                var amount = Number(d.KatVisits)
                var title = d.Bezeichnung
                if (month.charAt(0) == "0") {

                    feed = { id: 9, month: month.charAt(1), amount: amount, title: title };
                } else {

                    feed = { id: 9, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        fileDFreetime.forEach(function (d) {
            if (Number(d.Monat) >=yearBeginn && Number(d.Monat) <= yearEnd) {
                var date = d.Monat
                var month = date.substr(date.length - 2, 2)

                var amount = Number(d.KatVisits)
                var title = d.Bezeichnung
                if (month.charAt(0) == "0") {

                    feed = { id: 10, month: month.charAt(1), amount: amount, title: title };
                } else {

                    feed = { id: 10, month: month, amount: amount, title: title };
                }
                bubbleRadius.push(feed);
            }
        })

        bubbleRadius.forEach(function (a) {

            var id = a.id
            var month = a.month
            var amount = a.amount
            var title = a.title

            const radiusScale = d3.scaleSqrt()
                .domain([endmin, endmax])
                .range([30, 100])
            var r = radiusScale(amount)


            console.log("max:"+max + " min: "+min)
            radius[month][id] = r
            //For the Tooltip, save the amount and title to display
            amountCollection[month][id] = amount
            titleCollection[id] = title
        })

        // console.log("bubbleradius " + amountCollection + "  " + titleCollection)

       visualizeBubbles();



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
