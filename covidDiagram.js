// Test data
var data_monthly = [
        {ser1: "Jan", ser2: 5.0},
        {ser1: "Feb", ser2: 79.0},
        {ser1: "Mar", ser2: 71808.0},
        {ser1: "Apr", ser2: 163009.0},
        {ser1: "May", ser2: 183410.0},
        {ser1: "Jun", ser2: 195418.0},
        {ser1: "Jul", ser2: 210399.0},
        {ser1: "Aug", ser2: 244802.0},
        {ser1: "Sep", ser2: 292913.0},
        {ser1: "Okt", ser2: 531790.0},
        {ser1: "Nov", ser2: 1069912.0},
        {ser1: "Dec", ser2: 1760520.0}
    ];

// set the dimensions and margins of the graph
const Margin = 60;
const width = 600 - 2 * Margin;
const height = 350 - 2 * Margin;

// append the svg object to the body of the page
var svg = d3.select("#topDiagram")
    .append("svg")

// Init Chart
const chart = svg.append('g')
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("transform", "translate(" + Margin + "," + Margin + ")");

// Initialise a X axis:
//var x = d3.scaleLinear().range([0,width]);
var x = d3.scalePoint().range([0,width]);
var xAxis = d3.axisBottom().scale(x);
chart.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr("class","myXaxis")

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
chart.append('g')
    .attr("class","myYaxis")

// Horizontal Lines
const makeYLines = () => d3.axisLeft()
    .scale(y)

chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
    )


// Create a function that takes a dataset as input and update the plot:
function update(data) {

    // Create the X axis:
    //x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
    x.domain(data.map((s) => s.ser1))
    chart.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(xAxis);

    // create the Y axis
    y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
    chart.selectAll(".myYaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(yAxis);

    // Create a update selection: bind to the new data
    var u = chart.selectAll(".lineTest")
        .data([data], function(d){ return d.ser1 });

    // Update the line
    u
        .enter()
        .append("path")
        .attr("class","lineTest")
        .merge(u)
        .transition()
        .duration(3000)
        .attr("d", d3.line()
            .x(function(d) { return x(d.ser1); })
            .y(function(d) { return y(d.ser2); }))
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2.5)


    /* Label for yAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - Margin)
        .attr('y', Margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Total Cases')*/

    // Label for xAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + Margin)
        .attr('y', height + Margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Months')

    // Title
    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + Margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Corona cases (Germany 2020)')

    // Source
    svg.append('text')
        .attr('class', 'source')
        .attr('x', width - Margin / 2)
        .attr('y', height + Margin * 1.7)
        .attr('text-anchor', 'start')
        .text('https://data.europa.eu/euodp/en/data/dataset/covid-19-coronavirus-data')
}


update(data_monthly);
/*
    !DO NOT DELETE!
*/