function visualizeSlider(){
  
}

function visualizeBubbles(){
  
}


function visualiseDiagram () {

    // Test data
    let tickLabels = ["2015", "2016", "2017", "2018", "2019", "2020"];
    var year = [2015, 2016, 2017, 2018, 2019, 2020];
    var data = [0, 10, 50, 60, 70, 20, 80, 100];

    // Margin + geometry
    let margin = {top: 50, right: 30, bottom: 30, left:60},
        width = 660 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Container
    var svg = d3.select("#diagrammContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", width + margin.top + margin.bottom)
        .append("g") // Group to container
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Title of Graph
    svg.append("text")
        .attr("x", width / 2 )
        .attr("y", -(margin.top / 2))
        .style("font", "20px times")
        .text("Title of Graph");

    // Init xAxis
    let xScale = d3.scaleLinear()
        //.domain([d3.min(year), d3.max(year)])
        .range([0, width]);

    // Use Generator to customize tickLabels of Axis
    let xAxisGenerator = d3.axisBottom(xScale)
        .tickFormat((d,i) => tickLabels[i])
        .ticks(6);

    // Set attributes & show xAxis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisGenerator)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)" );;

    // Init yAxis
    let yScale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([height, 0]);

    // Show yAxis
    svg.append("g")
        .call(d3.axisLeft(yScale));

/*

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Year");

    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return "$" + d;
        })
            .ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Number");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.year); })
        .attr("y", function(d) { return yScale(d.value); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.value); });
*/
}
visualiseDiagram();