/**
 * VISUALIZE SLIDER START
**/

var margin = { top: 10, right: 100, bottom: 30, left: 60 };

var circumference_handle = 20;
var circumference_r = 170;
var circumference_inner = 150;

var width_slider = 500,
    //  width = (radiuas+ margin)*
    height_slider = 220,
    radians = 0.0174532925
//Value for the MonthTicks
tickStart = circumference_r + 35,
    tickLength = -80,
    MonthLabelRadius = circumference_r + 30,
    MonthLabelYOffset = 5;

//use for 12 months
                 //0  Jan        30  Feb          60 Mär
var tickphiright_many = [4.712388975, 5.23598775, 5.759586525,
    //90 Apr    120   Mai    150  Jun     180 Junly
    0, 0.5235987755, 1.04719755, 1.570796325,
    //210 Aug       240 Sep     270 Okt
    2.0943951, 2.617993875, 3.14159265,
    //300 NOv       330 Dez
    3.665191425, 4.1887902]

var monthNames = ["Januray", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var coronaCases = [5, 74, 71729,91201,20401,12008,14981, 34403,48111,238877,538122,690608]

//use for Quartals
var tickphiright = [4.712388975, 6.2831853, 0, 1.570796325, 3.14159265]
var quartalNames = ["Jan -Mar", "Apr-Jun", "Apr-Jun", "July-Sept","Oct-Dec"]
var coronaCasesQuartal = [71808, 123610, 123610, 97495, 1467607]


//Define drag for the slider, functions at the end
var drag = d3.drag()
    .subject(function (event, d) { return event, d; })
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

var svg = d3.select("#slider").append("svg")
    .attr("id", "sliderContainer")
    .attr("width", width_slider)
    .attr("height", height_slider)
    .append("g")
    .attr("id","slider_tranform")
    .attr("transform", `translate(${width_slider/2}, ${height_slider})`);

var container = svg.append("g")
    .attr("id", "sliderGroup");

var face = container.append("g")
    .attr('id', 'scale-face');

//Scale for the MonthTick scale
var tickScale = d3.scaleLinear()
    .range([0, 360])
    .domain([0, 4]);
    // for months : 
    //.range([0,330])
    //.domain([0, 11]);

//Make the monthticks
face.selectAll('.tick')
    .data(d3.range(0, 4))
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
    .attr("dy", "-1.1em")
    .style("text-anchor", "middle")
    .text("Jan-March");

var coronaCasesLable = innerContainer.append("text")
    .attr("id", "casesLable")
    .attr("dy", "-0.3em")
    .style("text-anchor", "middle")
    .text("Corona Cases");

var coronaCasesNumbers = innerContainer.append("text")
    .attr("id", "casesNumbers")
    .attr("dy", "0.8em")
    .style("text-anchor", "middle")
    .text(coronaCasesQuartal[0]);

var lockdownIndicator = innerContainer.append("text")
    .attr("id", "lockdownIndicator")
    .attr("dy", "3.6em")
    .style("text-anchor", "middle")
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
        .text(quartalNames[postion]);

    d3.select("#casesNumbers")
        .text(coronaCasesQuartal[postion]);

    //TODO set Corona cases
    //TOdo set Lockdown indicator -> make it more dynamic
    console.log("Slider in position ", postion)
    if (postion == 1 || postion == 2) {
        d3.select("#innerCircle")
            .attr("fill", "darkred");

        d3.select("#lockdownIndicator")
            .text("Lockdown");
    }
    else if (postion == 4) {
        d3.select("#innerCircle")
            .attr("fill", "darkred");

        d3.select("#lockdownIndicator")
            .text("Lockdown");
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
    //annaTest mit Zeitungen
    if(postion > 0 && postion < 13){
        visualizeBubbles(json1, bubbleRadi, postion);
    }else{
        visualizeBubbles(json1, bubbleRadi, 1);
    }
    /* 
    if (postion == 1)  visualizeBubbles(json2)
    else if (postion == 2) visualizeBubbles(json1)
    else if (postion == 3) visualizeBubbles(json3)
    else if (postion == 4) visualizeBubbles(json1)
    else if (postion == 5) visualizeBubbles(json2)
    else if (postion == 6) visualizeBubbles(json3)
    else if (postion == 7) visualizeBubbles(json2)
    else if (postion == 8) visualizeBubbles(json1)
    else if (postion == 9) visualizeBubbles(json3)
    else if (postion == 10) visualizeBubbles(json1)
    else if (postion == 11) visualizeBubbles(json2)
    else if (postion == 12) visualizeBubbles(json3)
    else visualizeBubbles(json1)
    */
    /** KLAUS TEST ENDE**/
}

/**
 * VISUALIZE SLIDER END
 */

