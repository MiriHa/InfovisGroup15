function visualizeSlider(){
  
}

function visualizeBubbles(){
  
}


function visualiseDiagram () {

    // Test data
    let tickLabels_year = ["2015", "2016", "2017", "2018", "2019", "2020"];
    let tickLabels_month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    var data = [0, 10, 50, 60, 70, 20, 80, 100];

    // Margin + geometry
    let margin = {top: 50, right: 30, bottom: 30, left:60},
        width = 670 - margin.left - margin.right,
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
    //let xScale = d3.scaleLinear()
    let xScale = d3.scaleBand()
        .range([0, width]);

    // Use Generator to customize tickLabels of Axis
    let xAxisGenerator = d3.axisBottom(xScale)
        .tickFormat((d,i) => tickLabels_year[i])
        //.tickFormat((d,i) => tickLabels_month[i])
        .ticks(6);
        //.ticks(12);

    // Set attributes & show xAxis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisGenerator)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)" );

    // Init yAxis
    let yScale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([height, 0]);

    // Show yAxis
    svg.append("g")
        .call(d3.axisLeft(yScale));
/*
    svg.selectAll()
        .data(tickLabels_year)
        .enter()
        .append('rect')
        .attr('x', (s) => xScale(s.language))
        .attr('y', (s) => yScale(s.value))
        .attr('height', (s) => height - yScale(s.value))
        .attr('width', xScale.bandwidth())*/
/*
    // Bars
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