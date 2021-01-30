// Data
const data_monthly = [
    {ser1: "Jan", ser2: 5.0},
    {ser1: "Feb", ser2: 79.0},
    {ser1: "Mär", ser2: 71808.0},
    {ser1: "Apr", ser2: 163009.0},
    {ser1: "Mai", ser2: 183410.0},
    {ser1: "Jun", ser2: 195418.0},
    {ser1: "Jul", ser2: 210399.0},
    {ser1: "Aug", ser2: 244802.0},
    {ser1: "Sep", ser2: 292913.0},
    {ser1: "Okt", ser2: 531790.0},
    {ser1: "Nov", ser2: 1069912.0},
    {ser1: "Dez", ser2: 1760520.0}
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

// Initialise the X axis:
let x = d3.scalePoint().range([0,width]);
let xAxis = d3.axisBottom()
    .scale(x);

chart.append('g')
    .attr("transform", "translate(0," + height + ")")
    .attr("class","myXaxis")

// Initialize the Y axis
let y = d3.scaleLinear().range([height, 0]);
let yAxis = d3.axisLeft()
    .scale(y)
    .tickFormat(function (d) {
        if ((d / 1000) >= 1) {
            d = d / 1000 + "K";
        }
        return d;
    });
chart.append('g')
    .attr("class","myYaxis")

// Create a function that takes a dataset as input and update the plot:
function update(data) {

    // Create the X axis:
    x.domain(data.map((s) => s.ser1))
    chart.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(xAxis);

    // create the Y axis
    y.domain([0, d3.max(data, function(d) { return Number(d.ser2)}) ]);
    chart.selectAll(".myYaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(yAxis);

    // Create a update selection: bind to the new data
    let u = chart.selectAll(".lineTest")
        .data([data], function(d){ return d.ser1 });

    // Add area
    u.enter()
        .append("path")
        .data([data], function(d){ return d.ser1 })
        .attr("fill", "darkred")
        .attr("stroke", "none")
        .attr("fill-opacity", .3)
        .attr("d", d3.area()
            .x(function(d) { return x(d.ser1); })
            .y0( height )
            .y1(function(d) { return y(d.ser2); }))

    // Add line
    u.enter()
        .append("path")
        .data([data], function(d){ return d.ser1 })
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function(d) { return x(d.ser1); })
            .y(function(d) { return y(d.ser2); }))

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