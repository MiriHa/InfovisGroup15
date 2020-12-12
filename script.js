
/**
 * VISUALIZE SLIDER
 */

var margin = { top: 10, right: 100, bottom: 30, left: 60 };

var circumference_handle = 12;
var circumference_r = 120;
var circumference_inner = 100;

var width = 600,
    //  width = (radiuas+ margin)*
    height = 300,
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


//Define Drag for the slider, functions at the end
var drag = d3.drag()
    .subject(function (event, d) { return event, d; })
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

var svg = d3.select("#bubbleChartContainer").append("svg")
    .attr("id", "sliderContainer")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${width}, ${height / 2})`);

var container = svg.append("g")
    .attr("id", "sliderGroup");

var face = container.append("g")
    .attr('id', 'scale-face');

//Scale for the MonthTick scale
var tickScale = d3.scaleLinear()
    .range([0, 330])
    .domain([0, 11]);

//Make the Monthticks     
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


//Make the round Slider bar
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


//Make the inner Circle that displays Month and Corona Cases
var inner_circle = innerContainer.append("circle")
    .attr("id", "innerCircle")
    .attr("class", "circle")
    .attr("r", circumference_inner)
    .attr("fill", "grey")

//Make the Month Lable, corona cases and lockdown indicator, changes with Slider
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

    //Finde the closest Tick:
    var closestPhi = tickphiright[0];
    var diff = Math.abs(phi - closestPhi);
    var postion = 0

    // TODO 
    // between hightst and 0 value it wil always take highest and not 0
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
    //TOdo set Lockdown indicator -> make it mor dinamic
    if (postion == 4 || postion == 5 || postion == 6){
        d3.select("#innerCircle")
          .attr("fill", "darkred");

        d3.select("#lockdownIndicator")
          .text ("Lockdown");
    }
    else if(postion == 10 || postion == 11){
        d3.select("#innerCircle")
          .attr("fill", "red");

        d3.select("#lockdownIndicator")
          .text("Lockdown Light");
    }
    else{
        d3.select("#innerCircle")
          .attr("fill", "grey");
        
          d3.select("#lockdownIndicator")
          .text(" ");
    }

}

/**
 * VISUALIZE SLIDER END
 */






function visualizeBubbles() {

}

