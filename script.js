function visualizeSlider(){
  
}

function visualizeBubbles(){
  
}


function visualiseDiagram () {

    // Test data
    let tickLabels = ["2015", "2016", "2017", "2018", "2019", "2020"];
    var year = [2015, 2016, 2017, 2018, 2019, 2020];
    var data = [0, 10, 50, 60, 70, 20, 80, 100];

    let margin = {top: 10, right: 30, bottom: 30, left:60},
        width = 660 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#diagrammContainer")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", width + margin.top + margin.bottom)
        .append("g") // Group to container
        .attr("transform", `translate(${margin.left}, ${margin.top})`)


    var xScale = d3.scaleLinear()
        //.domain([d3.min(year), d3.max(year)])
        .range([0, width]);

    let xAxisGenerator = d3.axisBottom(xScale)
        .tickFormat((d,i) => tickLabels[i])
        .ticks(6);

    let xAxis = svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisGenerator)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)" );;


    var yScale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([height, 0]);
/*
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));*/

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