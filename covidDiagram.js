// Data
const data_monthly = [
    { ser1: "Jan", ser2: 5.0 },
    { ser1: "Feb", ser2: 79.0 },
    { ser1: "Mär", ser2: 71808.0 },
    { ser1: "Apr", ser2: 163009.0 },
    { ser1: "Mai", ser2: 183410.0 },
    { ser1: "Jun", ser2: 195418.0 },
    { ser1: "Jul", ser2: 210399.0 },
    { ser1: "Aug", ser2: 244802.0 },
    { ser1: "Sep", ser2: 292913.0 },
    { ser1: "Okt", ser2: 531790.0 },
    { ser1: "Nov", ser2: 1069912.0 },
    { ser1: "Dez", ser2: 1760520.0 }
];

// set the dimensions and margins of the graph
const Margin = 80;
const width = 580 - Margin;
const height = 300 - Margin;

// append the svg object to the body of the page
var svg = d3.select("#topDiagram").append("svg")

// Init Chart
const chart = svg.append('g')
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("transform", "translate(" + Margin + "," + Margin + ")");

//const focus = chart.append("g")
//    .style("display", "none");

var mouseLine = chart
    .append("path") // create vertical line to follow mouse
    .attr("class", "mouse-line")
    .attr("stroke", "#303030")
    .attr("stroke-width", 2)
    .attr("opacity", "0");

var tooltip = chart
    .append("g")
    .attr("class", "tooltip-wrapper")
    .attr("display", "none");
var tooltipBackground = tooltip.append("rect").attr("fill", "#e8e8e8");
var tooltipText = tooltip.append("text");


// svg.append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .style("fill", "none")
//     .style("pointer-events", "all")
//     .on("mouseover", function () { focus.style("display", null); })
//     .on("mouseout", function () { focus.style("display", "none"); })
// //   .on("mousemove", mousemove);

var rectOverlay = chart
    .append("rect")
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + Margin + "," + Margin + ")")
    .on("mousemove", focusMouseMove)
    .on("mouseover", focusMouseOver)
    .on("mouseout", focusMouseOut);


// Create a function that takes a dataset as input and update the plot:
function update(data) {

      // Create a update selection: bind to the new data
    let u = chart.selectAll(".lineTest")
      .data([data], function (d) { return d.ser1 });


    // Create the X axis:
    let xFocus = d3.scalePoint()
        .range([0, width])
        .domain(data.map((s) => s.ser1))
    let xAxis = d3.axisBottom()
        .scale(xFocus);

    chart.append('g')
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")

    chart.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(xAxis);

    // create the Y axis
    let y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, function (d) { return Number(d.ser2) })]);
    let yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat(function (d) {
            if ((d / 1000) >= 1) {
                d = d / 1000 + "K";
            }
            return d;
        });
    chart.append('g')
        .attr("class", "myYaxis")
    chart.selectAll(".myYaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(yAxis);

    // Add area
    u.enter()
        .append("path")
        .data([data], function (d) { return d.ser1 })
        .attr("fill", "darkred")
        .attr("stroke", "none")
        .attr("fill-opacity", .3)
        .attr("d", d3.area()
            .x(function (d) { return xFocus(d.ser1); })
            .y0(height)
            .y1(function (d) { return y(d.ser2); }))

    // Add line
    u.enter()
        .append("path")
        .data([data], function (d) { return d.ser1 })
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return xFocus(d.ser1); })
            .y(function (d) { return y(d.ser2); }))

    focus
        .append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "white")
        .attr("r", 4);

    // Horizontal Lines
    const makeYLines = () => d3.axisLeft()
        .scale(y)

    chart.append('g')
        .attr('class', 'grid')
        .attr("opacity", 0.4)
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    // Label for yAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - Margin)
        .attr('y', Margin / 8)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Fälle')

    // Label for xAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + Margin)
        .attr('y', height + Margin * 1.5)
        .attr('text-anchor', 'middle')
        .text('Monate')

    // Title
    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + Margin)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .text('Corona-Fälle insgesamt (Deutschland 2020)')

    // Source
    svg.append('text')
        .attr('class', 'source')
        .attr('x', Margin / 2)
        .attr('y', height * 1.63)
        .attr('text-anchor', 'start')
        .text('Quelle: https://data.europa.eu/euodp/en/data/dataset/covid-19-coronavirus-data')
}

update(data_monthly);
/*
    !DO NOT DELETE!
*/

function focusMouseMove() {
    console.log("FocusMouseMOve")
    // tooltip.attr("display", null);
    // var mouse = d3.pointer(this);
    // var dateOnMouse = xFocus.invert(mouse[0]);
    // var nearestDateIndex = d3.bisect(availableDates, dateOnMouse.toString());
    // // get the dates on either of the mouse cord
    // var d0 = new Date(availableDates[nearestDateIndex - 1]);
    // var d1 = new Date(availableDates[nearestDateIndex]);
    // var closestDate;
    // if (d0 < xFocus.domain()[0]) {
    //     closestDate = d1;
    // } else if (d1 > xFocus.domain()[1]) {
    //     closestDate = d0;
    // } else {
    //     // decide which date is closest to the mouse
    //     closestDate = dateOnMouse - d0 > d1 - dateOnMouse ? d1 : d0;
    // }

    // var nearestDateYValues = groupValuesByX[closestDate];
    // var nearestDateXCord = xFocus(new Date(closestDate));

    // mouseLine.attr("d", `M ${nearestDateXCord} 0 V ${focusChartHeight}`).attr("opacity", "1");

    // tooltipText.selectAll(".tooltip-text-line").remove();
    // focus.selectAll(".tooltip-line-circles").remove();
    // console.log(xFocus.domain());
    // var formatTime = d3.timeFormat("%H:%M");
    // tooltipText
    //     .append("tspan")
    //     .attr("class", "tooltip-text-line")
    //     .attr("x", "5")
    //     .attr("y", "5")
    //     .attr("dy", "13px")
    //     .attr("font-weight", "bold")
    //     .text(`${formatTime(closestDate)}`);

    // for (let key of Object.keys(nearestDateYValues)) {
    //     focus
    //         .append("circle")
    //         .attr("class", "tooltip-line-circles")
    //         .attr("r", 5)
    //         .attr("fill", colors(key))
    //         .attr("cx", nearestDateXCord)
    //         .attr("cy", yFocus(nearestDateYValues[key]));

    //     tooltipText
    //         .append("tspan")
    //         .attr("class", "tooltip-text-line")
    //         .attr("x", "5")
    //         .attr("dy", `14px`)
    //         .attr("fill", colors(key))
    //         .text(`${key}: ${nearestDateYValues[key].toFixed(2)}`);
    // }

    // var tooltipWidth = tooltipText.node().getBBox().width;
    // var tooltipHeight = tooltipText.node().getBBox().height;
    // var rectOverlayWidth = rectOverlay.node().getBBox().width;
    // tooltipBackground.attr("width", tooltipWidth + 10).attr("height", tooltipHeight + 10);
    // if (nearestDateXCord + tooltipWidth >= rectOverlayWidth) {
    //     tooltip.attr("transform", "translate(" + (nearestDateXCord - tooltipWidth - 20) + "," + mouse[1] + ")");
    // } else {
    //     tooltip.attr("transform", "translate(" + (nearestDateXCord + 10) + "," + mouse[1] + ")");
    // }
}


function focusMouseOver() {
    mouseLine.attr("opacity", "1");
    tooltip.attr("display", null);
}

function focusMouseOut() {
    mouseLine.attr("opacity", "0");
    tooltip.attr("display", "none");
    focus.selectAll(".tooltip-line-circles").remove();
}