function parser(analog, digital) {

    // Variables
    let path = "./data/"
    var analogData = []
    var digitalData = []
    var path_csv_analog = null
    var path_csv_digital = null

    // Dictionary of all .csv files (aka data sets)
    const csv_files = {
        "label1" : "analog/data_zeitschrif_klettern.csv",
        "label2" : "digital/data_online_apothekenUmschau.csv"
        // (...)
    }

    // Check parameter
    if (analog != null) {
        path_csv_analog = path + csv_files[analog]
        console.log(path_csv_analog)
    }
    if (digital != null) {
        path_csv_digital = path + csv_files[digital]
        console.log(path_csv_digital)
    }

    // Parse Data
    Promise.all([
        // Open file(s)
        d3.csv(path_csv_analog),
        d3.csv(path_csv_digital),
    ]).then(function(files) {
        // files[0] will contain file1.csv
        // files[1] will contain file2.csv
        var file1Data = files[0]
        var file2Data = files[1]

        file1Data.forEach(function (d){
            // Build data blocks (fill arrays)
            var feed = {ser1: d.Quartal, ser2: d.Verkauf};
            console.log("quartal_a " + feed)
            analogData.push(feed);
        })

        file2Data.forEach(function (d){
            // Build data blocks (fill arrays)
            var feed = {ser1: d.Quartal, ser2: d.Verkauf};
            console.log("quartal_d " + feed)
            digitalData.push(feed);
        })

    }).catch(function(err) {
        // handle error here
        console.log("loading error" + err)
    })

    // Test
    console.log("analogData");
    console.log(analogData);
    console.log("digitalData");
    console.log(digitalData);

    // Visualize data
    //visualizeLineDiagram(analogData, digitalData);
}



function visualizeLineDiagram(analogData, digitalData) {

    // Todo: data weiterverarbeiten
    // code


    // set the dimensions and margins of the graph
    const Margin = 80;
    const width = 1000 - 2 * Margin;
    const height = 600 - 2 * Margin;

    // Remove old diagram
    var svg = d3.select("#bottomDiagram").selectAll("svg").remove()
    // append the svg object to the body of the page
    var svg = d3.select("#bottomDiagram")
        .append("svg")

    // Init Chart
    const chart = svg.append('g')
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

    // Create the X axis:
    //x.domain([0, d3.max(data, function(d) { return d.ser1 }) ]);
    x.domain(data.map((s) => s.ser1))
    chart.selectAll(".myXaxis")
        .transition()
        .duration(2000)
        .attr('class', 'tick_Scales')
        .call(xAxis);

    // create the Y axis
    y.domain([0, d3.max(data, function(d) { return d.ser2  }) ]);
    chart.selectAll(".myYaxis")
        .transition()
        .duration(2000)
        .attr('class', 'tick_Scales')
        .call(yAxis);

    // Create a visualizeLineDiagram selection: bind to the new data
    var u = chart.selectAll(".lineTest")
        .data([data], function(d){ return d.ser1 });

    // visualizeLineDiagram the line
    u
        .enter()
        .append("path")
        .attr("class","lineTest")
        .merge(u)
        .transition()
        .duration(2000)
        .attr("d", d3.line()
            .x(function(d) { return x(d.ser1); })
            .y(function(d) { return y(d.ser2); }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)


    // Label for yAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - Margin)
        .attr('y', Margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Text')


    // Label for xAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + Margin)
        .attr('y', height + Margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Text')

    // Title
    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + Margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Überschrift')

    // Source
    svg.append('text')
        .attr('class', 'source')
        .attr('x', width - Margin / 2)
        .attr('y', height + Margin * 1.7)
        .attr('text-anchor', 'start')
        .text('Quelle: example.de')
}

//visualizeLineDiagram(data2);
//visualizeLineDiagram().apply(d3);
/*
    !DO NOT DELETE!
*/