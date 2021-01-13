/*
Create Bubble Diagram
*/

json1 = {
    "bubbles": [{
        "id": 1,
        "x": 350,
        "y": 310,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": ANALOG,
        "img" : ""
    }, {
        "id": 2,
        "x": 550,
        "y": 310,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": DIGITAL,
        "img" : ""
    }, 
    //analog
    {
        "id": 3,
        "x": 350,
        "y": 100,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": HEALTH,
        "img": "health.png"

    }, {
        "id": 4,
        "x": 150,
        "y": 190,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": NEWS,
        "img": "newsPaper_icon.png"

    }, {
        "id": 5,
        "x": 150,
        "y": 410,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": FREETIME,
        "img": "music.PNG"
    }, 
    {
        "id": 6,
        "x": 350,
        "y": 510,
        "r": 90,
        "c": COLOR_ANALOG, /* orange */
        "label": SPORT,
        "img": "sport.PNG"
    }, 
    //digital
    {
        "id": 7,
        "x": 550,
        "y": 510,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": SPORT,
        "img": "sport.PNG"
    }, {
        "id": 8,
        "x": 550,
        "y": 100,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": HEALTH,
        "img": "health.png"
    }, {
        "id": 9,
        "x": 750,
        "y": 190,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": NEWS,
        "img": "newsPaper_icon.png"
    }, {
        "id": 10,
        "x": 750,
        "y": 410,
        "r": 90,
        "c": COLOR_DIGITAL, /* blue */
        "label": FREETIME,
        "img": "music.PNG"
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

var selectedAnalogBubble = ""
var selectedDigitalBubble = ""



function visualizeBubbles(json, aktmounth) {
    console.log("visualize: ")
    bubbleRadi =radius
    console.log(bubbleRadi)
    
    //json Datei nutzen:
    //id: analog(1,2-5) und digital (2, 6-9)

    state = 0; //nur analog und digital anzeigen



    var width = 960,
        height = 800;

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

    //console.log("hello Blub");
    //console.log("Monat: " + aktmounth);

    /*Create the circles: analog, digital */
    var circle = elemEnter.append("circle")
        .filter(function (d) { return d.id < 3 }) //nur Hauptbubbles
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { 
            //console.log("Radius von " + d.id + ":" + bubbleRadi[aktmounth][d.id]) + "[" + aktmounth + "][" + d.id + "]";
            return bubbleRadi[aktmounth][d.id] })
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
        .attr("dx", function (d) { return -40 })
        .attr("dy", 3)
        .text(function (d) { return d.label })
        .style("fill", function (d) { return Choosetextcolor(d) })
        .style("font-size", "24px")
        .style("font-weight", "bold")
        .filter(function (d) { return d.id < 3 })
        

    //andere Bubbles transparent
    elemEnter.append("circle")
        .filter(function (d) { return d.id > 2 })
        .attr("id", function (d) { return d.id })
        .attr("r", function (d) { return bubbleRadi[aktmounth][d.id] })
        .attr("stroke", "black")
        .attr("fill", function (d) { return d.c })
        .style("opacity", 0.2)

    elemEnter.append("svg:image")
        .filter(function (d) { return d.id > 2 })
        .attr("x", -50)
        .attr("y", -40)
        .attr("width", 100)
        .attr("height", 80)
        .attr("id", function (d) { return d.id })
        .attr("xlink:href", function (d) {return "icons/" + d.img })
        .style("opacity", 0.5)
        .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
        .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
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
        if (d.c == COLOR_DIGITAL) { /* blue */
            return "black"; /* white */
        }
        if (d.c == COLOR_ANALOG) { /* orange */
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
            var currentLabel = idToLabel(d.attr("id"));
            if(d.attr("id") >= 3 && d.attr("id") <= 6){
                console.log("analog sub-bubble clicked: " + currentLabel)
                // was selected before, so remove selection
                if(selectedAnalogBubble === currentLabel){
                    selectedAnalogBubble = ""
                    // TODO: change color back
                }
                // add new selection
                else{
                    selectedAnalogBubble = currentLabel
                    // TODO: change color etc
                }
            } else if(d.attr("id") >= 7 && d.attr("id") <= 10){
                console.log("digital sub-bubble clicked: " + currentLabel)
                // was selected before, so remove selection
                if(selectedDigitalBubble === currentLabel){
                    selectedDigitalBubble = ""
                    // TODO: change color back
                }
                // add new selection
                else{
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

    function ClickforAna(d) {
        //analoge sichtbar
        elemEnter.selectAll("circle")//.append("circle")
            .filter(function (d) { return (d.id <= 6 && d.id != 2) }) //nur analoge
            .attr("id", function (d) { return d.id })            
            .attr("r", function (d) { return bubbleRadi[aktmounth][d.id] })
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
            .attr("r", function (d) { return bubbleRadi[aktmounth][d.id] })
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
            .attr("x", -50)
            .attr("y", -40)
            .attr("width", 100)
            .attr("height", 80)
            .attr("xlink:href", function (d) {return "icons/" + d.img })
            .style("opacity", 5)
            .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
            .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
            


        /*
        //alte Texte entfernen
        elemEnter.selectAll("text").remove()
        //Texte anzeigen
        elemEnter.append("text")
            .filter(function (d) { return (d.id <= 5) }) //nur analoge und hauptbubble
            .attr("dx", function (d) { return -40 })
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
            .filter(function (d) { return (d.id > 6 || d.id == 2) }) //nur digitale
            .attr("id", function (d) { return d.id })
            .attr("r", function (d) { return bubbleRadi[aktmounth][d.id] })
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
            .attr("r", function (d) { return bubbleRadi[aktmounth][d.id] })
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
            .attr("x", -50)
            .attr("y", -40)
            .attr("width", 100)
            .attr("height", 80)
            .attr("xlink:href", function (d) {return "icons/" + d.img })
            .style("opacity", 5)
            .on("mouseover", function (d) { return handleMouseOver(d3.select(this)) })
            .on("mouseout", function (d) { return handleMouseOut(d3.select(this)) })
            

        /*
    //alte Texte entfernen
    elemEnter.selectAll("text").remove()
    //Texte anzeigen
    elemEnter.append("text")
        .filter(function (d) { return (d.id > 5 || d.id <= 2) }) //nur digitale und hauptbubble
        .attr("dx", function (d) { return -40 })
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

        var aktT = idToLabel(d.attr("id"));
        console.log(aktT); //-> zugriff auf Attribute der angeklickten Bubble
        var xpos = d.attr("x")+100;
        var ypos = d.attr("y")+100;
        //d.attr("fill", "red");
        // Specify where to put label of text
        //Mouse Position
        svg.append("text")
            .attr("x", 800)/*800)*/
            .attr("y", 80)/*80)*/
            .attr("id", "t" + aktT)
            .text(aktT)
            .style("font-size", "20px")
            .style("font-style", "italic")
            .style("fill", "#DBDBDB");
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

function bubbleSizeInOne(){
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 3, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 3, month: month, amount: amount};
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 4, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 4, month: month, amount: amount};
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 5, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 5, month: month, amount: amount};
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                var feed
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 6, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 6, month: month, amount: amount};
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 7, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 7, month: month, amount: amount};
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 8, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 8, month: month, amount: amount};
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 9, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 9, month: month, amount: amount};
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
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
                if (month.charAt(0) == "0") {
                    console.log("early month")
                    feed = {id: 10, month: month.charAt(1), amount: amount};
                } else {
                    console.log("late month")
                    feed = {id: 10, month: month, amount: amount};
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
