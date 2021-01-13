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

function loadAnalog(id, path_csv_analog, max, min, ana) {
    console.log("load with id " + id)
    d3.csv(path_csv_analog)
        .then(function (data) {
            console.log("loaded analog successfully")
            data.forEach(function (d) {
                // Build analogData block (fill array)
                // TODO: filtern; same number of quartals in both files
                if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                    var date = d.Monat
                    var month = date.substr(date.length - 2, 2)
                    console.log("month " + month)
                    var amount = d.VerkaufLinear
                    var feed
                    if (month.charAt(0) == "0") {
                        console.log("early month")
                        feed = {id: id, month: month.charAt(1), amount: amount};
                    } else {
                        console.log("late month")
                        feed = {id: id, month: month, amount: amount};
                    }

                    ana.push(feed);
                    /*console.log("after push ")
                    console.log(ana)*/
                }
            })

            console.log("mal gucken (ana): ")
            console.log(ana)

            ana.forEach(function (a) {
                console.log("ana ForEach")
                var id = a.id
                var month = a.month
                var amount = a.amount

                //console.log("id: " + id)

                /*const radiusScale = d3.scaleSqrt()
                    .domain([min, max])
                    .range([20, 50])
                    var r = radiusScale(amount)*/

                var range = max - min
                var r = (amount - min)/range* (100-30)/100 + 30
                //var r = (amount - min)/((100-30)/(max-min))+min
                /*Gw - Kw = x
                (Mw - Kw)/x * (100-30)/100 + 30 = GesuchterWert*/


                /*console.log("r : " + r)

                console.log("radius before ")
                console.log(radius)*/
                radius[month][id] = r
                /*console.log("radius after ")
                console.log(radius)*/
            })

            /*dig.forEach(function (d) {
                console.log("digi forEach")
                var id = a.id
                var month = a.month
                var amount = a.amount

                const radiusScale = d3.scaleSqrt()
                    .domain([min, max])
                    .range([40, 100])

                var r = radiusScale(amount)

                radius[month][id + 1] = r
            })*/

            visualizeBubbles(json1, 1);
        })
        .catch(function (error) {
            console.log("loading analog error " + error)
        })
}

function loadDigital(path_csv_digital, max, min, i, dig) {
    d3.csv(path_csv_digital)
        .then(function (data) {
            console.log("loaded digital successfully")
            data.forEach(function (d) {
                if (Number(d.Monat) >= 202001 && Number(d.Monat) <= 202009) {
                    var date = d.Monat
                    var month = date.substr(date.length - 2, 2)
                    //console.log(month)
                    var amount = d.KatVisits
                    if (month.charAt(0) == "0") {
                        console.log("early month")
                        feed = {id: id, month: month.charAt(1), amount: amount};
                    } else {
                        console.log("late month")
                        feed = {id: id, month: month, amount: amount};
                    }
                    dig.push(feed);
                }
            })
            dig.forEach(function (a) {
                console.log("ana ForEach")
                var id = a.id
                var month = a.month
                var amount = a.amount

                //console.log("id: " + id)

                /*const radiusScale = d3.scaleSqrt()
                    .domain([min, max])
                    .range([20, 50])
                    var r = radiusScale(amount)*/

                var range = max - min
                var r = (amount - min) / range * (100 - 30)/100 + 30
                radius[month][id] = r
            })
            visualizeBubbles(json1, 1);
        })
        .catch(function (error) {
            console.log("loading digital error " + error)
        })
}

function calculateBubbleSize(max, min) {

    console.log("calculateBubbles")

    const csv_files_analog = new Map([
            [SPORT , PATH_ANALOG_SPORT],
            [NEWS , PATH_ANALOG_NEWS],
            [HEALTH , PATH_ANALOG_HEALTH],
            [FREETIME , PATH_ANALOG_FREETIME]
        ]
    )
    const csv_files_digital = new Map([
            [SPORT , PATH_DIGITAL_SPORT],
            [NEWS , PATH_DIGITAL_NEWS],
            [HEALTH , PATH_DIGITAL_HEALTH],
            [FREETIME , PATH_DIGITAL_FREETIME]
        ]
    )

    var ana = []
    var dig = []


    var i

    for(i=0; i<10; i++){
        console.log("for loop")
        var currentLabel = idToLabel(i)
        if(i>=3 && i<=6){
            // analog
            var path_csv_analog = csv_files_analog.get(currentLabel)
            //paths.push(d3.csv(path_csv_analog))

            var id = i
            console.log("id: i " + id)

            loadAnalog(id, path_csv_analog, max, min, ana);

        } else if(i>=7 && i<=10){
            // digital
            var path_csv_digital = csv_files_digital.get(currentLabel)
            //paths.push(d3.csv(path_csv_digital))

            loadDigital(path_csv_digital, max, min, i, dig);

        }


    }
    /*if (paths.length == 8) {
        var promises = Promise.all(paths)
        promises.then(function (files) {
            files[0]



                ana.forEach(function (a) {
                    console.log("ana ForEach")
                    var id = a.id
                    var month = a.month
                    var amount = a.amount

                    const radiusScale = d3.scaleSqrt()
                        .domain([min, max])
                        .range([40, 100])

                    var r = radiusScale(amount)

                    radius[month][id + 1] = r
                })

                dig.forEach(function (d) {
                    console.log("digi forEach")
                    var id = a.id
                    var month = a.month
                    var amount = a.amount

                    const radiusScale = d3.scaleSqrt()
                        .domain([min, max])
                        .range([40, 100])

                    var r = radiusScale(amount)

                    radius[month][id + 1] = r
                })

                visualizeBubbles(json1, radius, 1);

            })
            .catch(function (err) {
                // handle error
                console.log("loading error" + err)
            })
    }*/





    /*Promise.all([
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

        file1Data.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                if (analogSource === "") {
                    analogSource = SOURCE_ANALOG + d.Quellzusatz
                }
                if (analogTitel === "") {
                    analogTitel = d.Titel
                }
                console.log("quartal_a " + feed)
                analogData.push(feed);
            }

        })

        file2Data.forEach(function (d) {
            // Build digitalData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                if (digitalSource === "") {
                    digitalSource = SOURCE_DIGITAL
                }
                if (digitalTitel === "") {
                    digitalTitel = d.Bezeichnung
                }
                console.log("quartal_d " + feed)
                digitalData.push(feed);
            }

        })
    }).catch(function (err) {
        // handle error
        console.log("loading error" + err)
    })*/
}

function calculateMaxAndMin(){
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


        var max = 0
        var min = 0
        fileAFreetime.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.VerkaufLinear
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        fileAHealth.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.VerkaufLinear
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        fileANews.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.VerkaufLinear
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        fileASport.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.VerkaufLinear
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        fileDFreetime.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.KatVisits
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        fileDHealth.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.KatVisits
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        fileDNews.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.KatVisits
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        fileDSport.forEach(function (d) {
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            if (Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                var amount = d.KatVisits
                if(amount > max){
                    max = amount
                }
                if(min != 0 && amount < min){
                    min = amount
                } else if(min == 0){
                    min = amount
                }
            }
        })

        calculateBubbleSize(max, min);
    }).catch(function (err) {
        // handle error
        console.log("loading error" + err)
    })
}

calculateMaxAndMin();

//visualizeBubbles(json1, bubbleRadi, 1);
