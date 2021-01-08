function parser(analog, digital) {

    // Variables
    let path = "./data/"
    var analogData = []
    var digitalData = []
    var path_csv_analog = null
    var path_csv_digital = null

    // Dictionary of all .csv files (aka data sets)
    // TODO: check all file names
    const csv_files_analog = new Map([
        [SPORT , "analog/data_zeitschrif_klettern.csv"],
        [NEWS , "analog/data_zeitschrif_klettern.csv"],
        [HEALTH , "analog/data_zeitschrif_klettern.csv"],
        [FREETIME , "analog/data_zeitschrif_klettern.csv"]
        ]
    )
    // TODO: check all file names
    const csv_files_digital = new Map([
            [SPORT , "analog/data_zeitschrif_klettern.csv"],
            [NEWS , "analog/data_zeitschrif_klettern.csv"],
            [HEALTH , "analog/data_zeitschrif_klettern.csv"],
            [FREETIME , "analog/data_zeitschrif_klettern.csv"]
        ]
    )


    // Check/parse parameter
    if (analog != "") {
        path_csv_analog = path + csv_files_analog.get(analog)
        console.log(path_csv_analog)
    } else {
        // TODO: if parameter is empty => no rendering
        // code
        path_csv_analog = null
    }
    if (digital != "") {
        path_csv_digital = path + csv_files_digital.get(digital)
        console.log(path_csv_digital)
    } else {
        // TODO: if parameter is empty => no rendering
        // code
        path_csv_digital = null
    }


    if (path_csv_analog != null) {
        if(path_csv_digital != null){
            //both
            Promise.all([
                // Open file(s)
                d3.csv(path_csv_analog),
                d3.csv(path_csv_digital),
            ]).then(function(files) {
                // files[0] will contain file1.csv
                // files[1] will contain file2.csv
                var file1Data = files[0]
                var file2Data = files[1]
                console.log("file1" + file1Data)
                console.log("file2" +file2Data)

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
                visualizeLineDiagram(analogData,digitalData)

            }).catch(function(err) {
                // handle error
                console.log("loading error" + err)
            })
        } else{
            // only analog
            d3.csv(path_csv_analog)
                .then(function (data) {
                    console.log("loaded analog successfully")
                    data.forEach(function (d) {
                        // Build analogData block (fill array)
                        // TODO: filtern; same number of quartals in both files
                        var feed = {ser1: d.Quartal, ser2: Number(d.Verkauf)};
                        console.log("quartal_a " + feed)
                        analogData.push(feed);
                        console.log("after push: " + analogData.length)
                    })
                    console.log("after for each: " + analogData.length)

                    visualizeLineDiagram(analogData, digitalData)
                })
                .catch(function (error) {
                    console.log("loading analog error " + error)
                })
        }

    } else if (path_csv_digital != null) {
        // only digital
        d3.csv(path_csv_digital)
            .then(function (data) {
                console.log("loaded digital successfully")
                data.forEach(function (d) {
                    // Build analogData block (fill array)
                    // TODO: filtern; same number of quartals in both files
                    var feed = {ser1: d.Quartal, ser2: Number(d.Verkauf)};
                    console.log("quartal_a " + feed)
                    digitalData.push(feed);
                })

                visualizeLineDiagram(analogData, digitalData)
            })
            .catch(function (error) {
                console.log("loading digital error " + error)
            })
    }
    // Test print()
    /*console.log("analogData in parser");
    console.log(analogData);
    var a = analogData
    console.log("a")
    console.log(a)
    console.log("length: ")
    console.log(analogData.length)
    console.log("an 0")
    console.log(analogData[0])
    console.log("an 1")
    console.log(analogData[1])
    console.log("digitalData");
    console.log(digitalData);

    // Visualize data/diagram
    visualizeLineDiagram(analogData, digitalData);*/
}



function visualizeLineDiagram(analogData, digitalData) {

    // set the dimensions and margins of the graph
    const Margin = 80;
    const width = 1000 - 2 * Margin;
    const height = 600 - 2 * Margin;

    var x
    var xAxis
    let chart
    var y
    var yAxis

    // Remove old diagram
    var svg = d3.select("#bottomDiagram").selectAll("svg").remove()
    // append the svg object to the body of the page
    var svg = d3.select("#bottomDiagram")
        .append("svg")

    var aData = analogData.length
    var dData = digitalData.length

    console.log("analogData lengt1 : ")
    console.log(analogData.length)
    //console.log("aData 1 : " + analogData.length)
    console.log("analogData: ")
    console.log(analogData)
    //console.log("aData " + aData)
    console.log("analogData lengt2 : ")
    console.log(analogData.length)

    //if(!analogData && !digitalData)
    if (aData === 0 && dData === 0) {
        console.log("no data")
        // none
        // only remove diagram
    } else {
        // remove diagram and...
        // Init Chart
        initChart();

        if (aData > 0 && dData === 0) {
            console.log("only analog data")
            axes(analogData);
            line(analogData);

        } else if (aData === 0 && dData > 0) {
            console.log("only digital data")
            axes(digitalData);
            line(digitalData);

        } else if (aData > 0 && dData > 0) {
            console.log("both data")
            // both
            // TODO
        }
    }


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


    function initChart() {
        chart = svg.append('g')
            .attr("transform", "translate(" + Margin + "," + Margin + ")");

        // Initialise a X axis:
        //var x = d3.scaleLinear().range([0,width]);
        x = d3.scalePoint().range([0, width]);
        xAxis = d3.axisBottom().scale(x);
        chart.append('g')
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "myXaxis")

        // Initialize an Y axis
        y = d3.scaleLinear().range([height, 0]);
        yAxis = d3.axisLeft().scale(y);
        chart.append('g')
            .attr("class", "myYaxis")
    }

    function axes(data) {
        x.domain(data.map((s) => s.ser1))
        chart.selectAll(".myXaxis")
            .transition()
            .duration(2000)
            .attr('class', 'tick_Scales')
            .call(xAxis);

        // create the Y axis
        y.domain([0, d3.max(data, function (d) {
            return d.ser2
        })]);
        chart.selectAll(".myYaxis")
            .transition()
            .duration(2000)
            .attr('class', 'tick_Scales')
            .call(yAxis);
    }

    function line(data) {
        // Create a visualizeLineDiagram selection: bind to the new data
        var u = chart.selectAll(".lineTest")
            .data([data], function (d) {
                return d.ser1
            });

        // visualizeLineDiagram the line
        // TODO: visualize one, both or none!?
        // Code:
        u
            .enter()
            .append("path")
            .attr("class", "lineTest")
            .merge(u)
            .transition()
            .duration(2000)
            .attr("d", d3.line()
                .x(function (d) {
                    return x(d.ser1);
                })
                .y(function (d) {
                    return y(d.ser2);
                }))
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2.5)
    }
}