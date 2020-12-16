
/*
Create Bubble Diagram
*/

json1 = {
    "bubbles": [{
        "id": 1,
        "x": 310,
        "y": 310,
        "r": 90,
        "c": "orange",
        "label": "analog",
        "img" : ""
    }, {
        "id": 2,
        "x": 510,
        "y": 310,
        "r": 90,
        "c": "blue",
        "label": "digital",
        "img" : ""
    }, {
        "id": 3,
        "x": 150,
        "y": 100,
        "r": 90,
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
        "r": 90,
        "c": "orange",
        "label": "News paper",
        "img": "newsPaper_icon.png"

    }, {
        "id": 6,
        "x": 500,
        "y": 515,
        "r": 90,
        "c": "blue",
        "label": "Streaming",
        "img": "Streaming.png"
    }, {
        "id": 7,
        "x": 500,
        "y": 100,
        "r": 90,
        "c": "blue",
        "label": "Social Media",
        "img": "socialMedia_icon.png"
    }, {
        "id": 8,
        "x": 700,
        "y": 190,
        "r": 90,
        "c": "blue",
        "label": "Games",
        "img": "games_icons.png"
    }, {
        "id": 9,
        "x": 700,
        "y": 410,
        "r": 90,
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
        "r": 70,
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
        "r": 50,
        "c": "orange",
        "label": "Board Games",
        "img" : "puzzles_icon.png"

    }, {
        "id": 4,
        "x": 100,
        "y": 310,
        "r": 60,
        "c": "orange",
        "label": "books",
        "img": "books_icon.png"

    }, {
        "id": 5,
        "x": 150,
        "y": 510,
        "r": 50,
        "c": "orange",
        "label": "News paper",
        "img": "newsPaper_icon.png"

    }, {
        "id": 6,
        "x": 500,
        "y": 515,
        "r": 90,
        "c": "blue",
        "label": "Streaming",
        "img": "Streaming.png"
    }, {
        "id": 7,
        "x": 500,
        "y": 100,
        "r": 80,
        "c": "blue",
        "label": "Social Media",
        "img": "socialMedia_icon.png"
    }, {
        "id": 8,
        "x": 700,
        "y": 190,
        "r": 90,
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


json3 = {
    "bubbles": [{
        "id": 1,
        "x": 310,
        "y": 310,
        "r": 60,
        "c": "orange",
        "label": "analog",
        "img" : ""
    }, {
        "id": 2,
        "x": 510,
        "y": 310,
        "r": 90,
        "c": "blue",
        "label": "digital",
        "img" : ""
    }, {
        "id": 3,
        "x": 150,
        "y": 100,
        "r": 70,
        "c": "orange",
        "label": "Board Games",
        "img" : "puzzles_icon.png"

    }, {
        "id": 4,
        "x": 100,
        "y": 310,
        "r": 50,
        "c": "orange",
        "label": "books",
        "img": "books_icon.png"

    }, {
        "id": 5,
        "x": 150,
        "y": 510,
        "r": 80,
        "c": "orange",
        "label": "News paper",
        "img": "newsPaper_icon.png"

    }, {
        "id": 6,
        "x": 500,
        "y": 515,
        "r": 70,
        "c": "blue",
        "label": "Streaming",
        "img": "Streaming.png"
    }, {
        "id": 7,
        "x": 500,
        "y": 100,
        "r": 60,
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
        "r": 80,
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
        console.log("inMouseOVER");

        var aktT = idToLabel(d.attr("id"));
        console.log(aktT); //-> zugriff auf Attribute der angeklickten Bubble
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