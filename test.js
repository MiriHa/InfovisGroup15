// Create 2 datasets
var data1 = [
    {ser1: 1, ser2: 4},
    {ser1: 2, ser2: 16},
    {ser1: 3, ser2: 8},
    {ser1: 4, ser2: 4},
    {ser1: 5, ser2: 16},
    {ser1: 6, ser2: 8}
];

var data2 = [
    {ser1: 1, ser2: 2},
    {ser1: 2, ser2: 3},
    {ser1: 3, ser2: 7},
    {ser1: 4, ser2: 4},
    {ser1: 5, ser2: 16},
    {ser1: 6, ser2: 0}
];

// set the dimensions and margins of the graph
const Margin = 80;
const width = 1000 - 2 * Margin;
const height = 600 - 2 * Margin;

// append the svg object to the body of the page
var svg = d3.select("#bottomDiagram")
    .append("svg")
    .attr("width", width + Margin + Margin)
    .attr("height", height + Margin + Margin)
    .append("g")
    .attr("transform", "translate(" + Margin + "," + Margin + ")");

// Initialise a X axis:
var x = d3.scaleLinear().range([0,width]);
var xAxis = d3.axisBottom().scale(x);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class","myXaxis")

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
    .attr("class","myYaxis")

// Create a function that takes a dataset as input and update the plot:
function update(data) {

    // Create the X axis:
    x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
    svg.selectAll(".myXaxis")
        .transition()
        .duration(3000)
        .attr('class', 'tick_Scales')
        .call(xAxis);

    // create the Y axis
    y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
    svg.selectAll(".myYaxis")
        .transition()
        .duration(3000)
        .attr('class', 'tick_Scales')
        .call(yAxis);

    // Create a update selection: bind to the new data
    var u = svg.selectAll(".lineTest")
        .data([data], function(d){ return d.ser1 });

    // Updata the line
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
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
}

// At the beginning, I run the update function on the first dataset:
update(data1);