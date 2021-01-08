function parser(analog, digital) {

    console.log("Parser:")
    console.log(analog)
    console.log(digital)

    // Variables
    let folder_analog = "./data/analog/"
    let folder_digital = "./data/digital/format/"
    var analogData = []
    var digitalData = []
    var path_csv_analog = ""
    var path_csv_digital = ""

    // Dictionary of all .csv files (aka data sets)
    // TODO: check all file names
    const csv_files_analog = new Map([
        [SPORT , "data_zeitschrif_klettern.csv"],
        [NEWS , "data_zeitung_sz.csv"],
        [HEALTH , "data_zeitschrift_ApothekenUmschau.csv"],
        [FREETIME , "data_zeitschrift_essenUndTrinken.csv"]
        ]
    )
    // TODO: check all file names
    const csv_files_digital = new Map([
            [SPORT , "digital_bergsteiger.csv"],
            [NEWS , "digital_sueddeutsche.csv"],
            [HEALTH , "digital_apothekenUmschau.csv"],
            [FREETIME , "digital_chefkoch.csv"]
        ]
    )

    // Check/parse parameter
    if (analog != "") {
        path_csv_analog = folder_analog + csv_files_analog.get(analog)
        console.log(path_csv_analog)
    }
    if (digital != "") {
        path_csv_digital = folder_digital + csv_files_digital.get(digital)
        console.log(path_csv_digital)
    }

    // Define function to load data
    function load_data(csv_file) {
        d3.csv(csv_file)
            .then(function (data) {
                console.log("loaded successfully")

                data.forEach(function (d) {
                    var feed = {ser1: d.Quartal, ser2: Number(d.Verkauf)};
                    console.log("quartal_a " + feed)
                    analogData.push(feed);
                })
            })
            .catch(function (error) {
                console.log("loading error " + error)
            })
    }

    // Load data from .csv if path is set
    if (path_csv_analog != "") {
        load_data(path_csv_analog)
    }
    if (path_csv_digital != "") {
        load_data(path_csv_digital)
    }

    /* Idee
    if (path_csv_digital != "" && path_csv_analog != "") {
        // Load both
        // promise()
    } else if () {
        // Load only digital
        // load_data(path_csv_digital);
    } else if () {
        // Loade only analog
        // load_data(path_csv_analog);
    } else {
        // Nothing
    }*/

    /* Promise()
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
            // Build analogData block (fill array)
            // TODO: filtern; same number of quartals in both files
            var feed = {ser1: d.Quartal, ser2: Number(d.Verkauf)};
            console.log("quartal_a " + feed)
            analogData.push(feed);
        })

        file2Data.forEach(function (d){
            // Build digitalData block (fill array)
            // TODO: filtern; same number of quartals in both files
            var feed = {ser1: d.Quartal, ser2: Number(d.Verkauf)};
            console.log("quartal_d " + feed)
            digitalData.push(feed);
        })

    }).catch(function(err) {
        // handle error
        console.log("loading error" + err)
    })*/

    /* Test print()
    console.log("Testprint")
    console.log("analogData:");
    console.log(analogData);
    console.log("digitalData:");
    console.log(digitalData);*/

    // Visualize diagrams
    // Parameter:
    // analogData -> array OR ""
    // digitalData -> array OR ""
    visualizeLineDiagram(analogData, digitalData);
}



function visualizeLineDiagram(analogData, digitalData) {
    data = []
    // Test
    var aData = analogData
    var dData = digitalData

    console.log("aData " + aData.length)
    console.log("dData " + dData.length)
    // TODO: check, which lines to render
    // code
    /*if (){
        // only digital
    } else if () {
        // only digital
    } else if () {
        // both
    } else {
        // none
    }*/

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
    // TODO: parameter 'data' is obsolete
    // PARAMETER: 'analogData', 'digitalData'
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
    // TODO: visualize one, both or none!?
    // Code:
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
