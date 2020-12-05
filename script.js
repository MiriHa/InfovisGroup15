function visualizeSlider(){
  
}

function visualizeBubbles(){
  
}

visualiseDiagram();
function visualiseDiagram () {

    // Test Data
    var data = {
        header: ["Year", "Number"],
        rows: [
            ["2015", 1500],
            ["2016", 87000],
            ["2017", 175000],
            ["2018", 10000],
            ["2019", 242000],
            ["2020", 25000]
        ]}

    let margin = {top: 10, right: 30, bottom: 30, left:60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        color = "steelblue";

    var svg = d3.select("#diagrammContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", width + margin.top + margin.bottom)
        .append("g") // Group to container
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xAxis = d3.scaleLinear()
        //.domain([d3.extent(data, item => Number(item.jahr))])
        .range([0, width])

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xAxis));

    var yAxis = d3.scaleLinear()
        //.domain([(d3.min(data, item => Number(item.wert)))-1, d3.max(data, item => Number(item.wert))])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(yAxis));
    
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .style("fill", color)
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });

}
