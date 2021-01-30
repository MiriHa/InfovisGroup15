/**
 * VISUALIZE SLIDER START
**/

var margin = { top: 10, right: 100, bottom: 30, left: 60 };

var circumference_handle = 12;
var circumference_r = 90;
var circumference_inner = 70;

var width_slider = 200,
    //  width = (radiuas+ margin)*
    height_slider = 80,
    radians = 0.0174532925
//Value for the MonthTicks
tickStart = circumference_r + 7,
    tickLength = -60,
    MonthLabelRadius = circumference_r + 10,
    MonthLabelYOffset = 5;

//use for 12 months
//0  Jan        30  Feb          60 Mär
var tickphiright = [4.712388975, 5.23598775, 5.759586525,
    //90 Apr    120   Mai    150  Jun     180 Junly
    0, 0.5235987755, 1.04719755, 1.570796325,
    //210 Aug       240 Sep     270 Okt
    2.0943951, 2.617993875, 3.14159265,
    //300 NOv       330 Dez
    3.665191425, 4.1887902]

//use for months
var monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
var totoalCoronaCases = [5, 79, 71808, 163009, 183410, 195418, 210399, 244802, 292913, 531790, 1069912, 1760520]
var newCoronaCases = [5, 74, 71729, 91201, 20401, 12008, 14981, 34403, 48111, 238877, 538122, 690608]

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
    .attr("id", "slider_tranform")
    .attr("transform", `translate(${width_slider / 1.6}, ${height_slider * 1.55})`);

var container = svg.append("g")
    .attr("id", "sliderGroup");

var yearButton = d3.select("#slider").append("button")
yearButton
    .attr("id", "yearButton")
    .text("Wechsel zu " + shownButtonYear)
    .classed("button", true)
    .on("click", changeYear);


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

//YearLable
var circleLableYear = innerContainer.append("text")
    .attr("id", "yearLable")
    .attr("dy", "-1.0em")
    .style("text-anchor", "middle")
    .text("2020");

//Month Lable
var circleLableTime = innerContainer.append("text")
    .attr("id", "monthLable")
    .attr("dy", "-1.5em")
    .style("text-anchor", "middle")
    .text(monthNames[0]);

//Corona Cases Text
var coronaCasesLable = innerContainer.append("text")
    .attr("id", "casesLable")
    .attr("dy", "0.5em")
    .style("text-anchor", "middle")
    .text("Corona Fälle");

//Corona Cases Numbers
var coronaCasesNumbers = innerContainer.append("text")
    .attr("id", "casesNumbers")
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .text(totoalCoronaCases[0]);

//Lockdown text
var lockdownIndicator = innerContainer.append("text")
    .attr("id", "lockdownIndicator")
    .attr("dy", "4.5em")
    .style("text-anchor", "middle")
    .text(" ");



function changeYear() {
    if (currentYear == 2020) {
        currentYear = 2019
        shownButtonYear = 2020
        yearButton.text("Wechsel zu " + shownButtonYear)
    } else {
        currentYear = 2020
        shownButtonYear = 2019
        yearButton.text("Wechsel zu " + shownButtonYear)
    }
    updateCurrent()
    console.log("yeahrchangedto " + currentYear)

}

//Functions to handle the Slider drag
function dragstarted(event, d) {
    event.sourceEvent.stopPropagation();
    d3.select(this)
        .classed("dragging", true);
}

function dragged(event, d) {
    //calculate the current positon of the silder handle in the circle and draw it there
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

    //Find the Phi degree of the current sliderHandlePosition and compare it to Phi-values of the MarkTicks
    var cosPhi = (d.x / circumference_r)
    var sinPhi = - (d.x / circumference_r)
    var phi = 0

    if (d.y >= 0) {
        phi = Math.acos(cosPhi)
    }
    else {
        phi = 2 * Math.PI - Math.acos(cosPhi)
    }

    //Find the closest tick:
    var closestPhi = tickphiright[0];
    var diff = Math.abs(phi - closestPhi);
    currentSliderPosition = 0
    console.log("currentSliderPosition "+currentSliderPosition)

    // between hightst and 0 value it will always take highest and not 0
    for (var val = 0; val < tickphiright.length; val++) {
        var newdiff = Math.abs(phi - tickphiright[val]);
        if (newdiff < diff) {
            diff = newdiff;
            closestPhi = tickphiright[val];
            currentSliderPosition = val;
        }
    }

    //Set/Snap handle to closest TickMark:
    d3.select(this)
        .attr("cx", d.x = circumference_r * Math.cos(closestPhi))
        .attr("cy", d.y = circumference_r * Math.sin(closestPhi));

    //Set the month label
    d3.select("#monthLable")
        .text(monthNames[currentSliderPosition]);


    updateCurrent()

}


function updateCurrent() {
    if (currentYear == 2020) {

        //for bubbles to handle the radius
        bubbleRadi = radius

        if (currentSliderPosition > 0 && currentSliderPosition < 13) {
            console.log("slider radius:" +radius)
            visualizeBubbles(json1, currentSliderPosition + 1);
        } else {
            visualizeBubbles(json1, 1);
        }

        //Set CaseNumber each Month

        d3.select("#yearLable")
            .text(currentYear)
        d3.select("#casesNumbers")
            .text(totoalCoronaCases[currentSliderPosition]);

        // For each slider position set the associated values of the lockdownindicator
        if (currentSliderPosition == 3 || currentSliderPosition == 4 || currentSliderPosition == 5) {
            d3.select("#innerCircle")
                .attr("fill", "darkred");

            d3.select("#lockdownIndicator")
                .text("Lockdown");
        }
        else if (currentSliderPosition == 10 || currentSliderPosition == 11) {
            d3.select("#innerCircle")
                .attr("fill", "darkred");

            d3.select("#lockdownIndicator")
                .text("Lockdown");

            d3.select("#additionalSpace")
                .style("opacity", 100);
        }
        else if (currentSliderPosition == 9) {
            d3.select("#additionalSpace")
                .style("opacity", 100);
        }
        else {
            d3.select("#innerCircle")
                .attr("fill", "grey");

            d3.select("#lockdownIndicator")
                .text(" ");

            d3.select("#additionalSpace")
                .style("opacity", 0);
        }



    } else {
        //for bubbles to handle the radius
        bubbleRadi = radius

        if (currentSliderPosition > 0 && currentSliderPosition < 13) {
            console.log("slider radius:" +radius)
            visualizeBubbles(json1, currentSliderPosition + 1);
        } else {
            visualizeBubbles(json1, 1);
        }

        d3.select("#innerCircle")
            .attr("fill", "grey");

        d3.select("#lockdownIndicator")
            .text(" ");

        d3.select("#additionalSpace")
            .style("opacity", 0);

        d3.select("#yearLable")
            .text(currentYear)
        d3.select("#casesNumbers")
            .text("0")

    }
}
