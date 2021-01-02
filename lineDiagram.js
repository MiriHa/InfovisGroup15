function filterData(data) {
    const maxTempYear = data.filter(item => item.name === "Jahreshöchsttemperatur");
    visualiseChart(maxTempYear);
}

function visualiseChart (data) {

    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;

    var svg = d3.select("#bottomDiagram")
        .append("svg")
        .attr("width", width + margin + margin)
        .attr("height", width + margin + margin)
        .append("g") // Group to container
        .attr("transform", `translate(${margin}, ${margin})`);

    var xAxis = d3.scaleLinear()
        .domain([d3.extent(data, item => Number(item.jahr))])
        .range([0, width])

    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xAxis));

    var yAxis = d3.scaleLinear()
        .domain([(d3.min(data, item => Number(item.wert)))-1, d3.max(data, item => Number(item.wert))])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(yAxis));

    var curve = svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "turquoise")
        .attr("stroke-width", 1,5)
        .attr("d", d3.line()
            .x(item => xAxis(Number(item.jahr)))
            .y(item => yAxis(Number(item.wert)))
        );

    d3.select("#mySlider").on("change", function() {
        let selectedValue = this.value

        xAxis.domain([selectedValue, d3.max(data, item => Number(item.jahr))])
            .range([0, width]);

        svg.select("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xAxis));

        curve.datum(data)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("width", 6)
            .attr("d", d3.line()
                .x(item => xAxis(Number(item.jahr)))
                .y(item => yAxis(Number(item.wert)))
            );
    })
}
