function parser(analog, digital) {

    console.log("Parser:")
    console.log(analog)
    console.log(digital)

    // Variables
    var analogData = []
    var digitalData = []
    var path_csv_analog = null
    var path_csv_digital = null

    var analogSource = ""
    var digitalSource = ""
    var analogTitel = ""
    var digitalTitel = ""

    // Dictionary of all .csv files (aka data sets)
    // TODO: check all file names
    const csv_files_analog = new Map([
        [SPORT , PATH_ANALOG_SPORT],
        [NEWS , PATH_ANALOG_NEWS],
        [HEALTH , PATH_ANALOG_HEALTH],
        [FREETIME , PATH_ANALOG_FREETIME]
        ]
    )
    // TODO: check all file names
    const csv_files_digital = new Map([
            [SPORT , PATH_DIGITAL_SPORT],
            [NEWS , PATH_DIGITAL_NEWS],
            [HEALTH , PATH_DIGITAL_HEALTH],
            [FREETIME , PATH_DIGITAL_FREETIME]
        ]
    )


    // Check/parse parameter
    if (analog != "") {
        path_csv_analog = csv_files_analog.get(analog)
        console.log(path_csv_analog)
    } else {
        // TODO: if parameter is empty => no rendering
        // code
        path_csv_analog = null
    }
    if (digital != "") {
        path_csv_digital = csv_files_digital.get(digital)
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
                console.log("loading both successfull")
                // files[0] will contain file1.csv
                // files[1] will contain file2.csv
                var file1Data = files[0]
                var file2Data = files[1]
                console.log("file1" + file1Data)
                console.log("file2" +file2Data)

                file1Data.forEach(function (d){
                    // Build analogData block (fill array)
                    // TODO: filtern; same number of quartals in both files
                    if(Number(d.Quartal) >= 20171 && Number(d.Quartal) <= 20203) {
                        var feed = {ser1: d.Quartal, ser2: Number(d.Verkauf)};
                        if(analogSource === ""){
                            analogSource = SOURCE_ANALOG + d.Quellzusatz
                        }
                        if(analogTitel === ""){
                            analogTitel = d.Titel
                        }
                        console.log("quartal_a " + feed)
                        analogData.push(feed);
                    }

                })

                file2Data.forEach(function (d){
                    // Build digitalData block (fill array)
                    // TODO: filtern; same number of quartals in both files
                    if(Number(d.Quartal) >= 20171 && Number(d.Quartal) <= 20203) {
                        var feed = {ser1: d.Quartal, ser2: Number(d.KatVisits), titel: d.Bezeichnung};
                        if(digitalSource === ""){
                            digitalSource = SOURCE_DIGITAL
                        }
                        if(digitalTitel === ""){
                            digitalTitel = d.Bezeichnung
                        }
                        console.log("quartal_d " + feed)
                        digitalData.push(feed);
                    }

                })

                //


                console.log("analogData got:")
                console.log(analogData)

                console.log("digitalData got:")
                console.log(digitalData)

                visualizeLineDiagram(analogData,digitalData, analogSource, digitalSource, analogTitel, digitalTitel)

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
                        if (Number(d.Quartal) >= 20171 && Number(d.Quartal) <= 20203) {
                            var feed = {ser1: d.Quartal, ser2: Number(d.Verkauf)};
                            if(analogSource === ""){
                                analogSource = SOURCE_ANALOG + d.Quellzusatz
                            }
                            if(analogTitel === ""){
                                analogTitel = d.Titel
                            }
                            console.log("quartal_a " + feed)
                            analogData.push(feed);
                        }
                    })


                    visualizeLineDiagram(analogData,digitalData, analogSource, digitalSource, analogTitel, digitalTitel)
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
                    if (Number(d.Quartal) >= 20171 && Number(d.Quartal) <= 20203) {
                        var feed = {ser1: d.Quartal, ser2: Number(d.KatVisits)};
                        if(digitalSource === ""){
                            digitalSource = SOURCE_DIGITAL
                        }
                        if(digitalTitel === ""){
                            digitalTitel = d.Bezeichnung
                        }
                        console.log("quartal_a " + feed)
                        digitalData.push(feed);
                    }
                })

                visualizeLineDiagram(analogData,digitalData, analogSource, digitalSource, analogTitel, digitalTitel)
            })
            .catch(function (error) {
                console.log("loading digital error " + error)
            })
    } else {
        // no data
        visualizeLineDiagram(analogData, digitalData)
    }
}



function visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitel, digitalTitel) {

    // set the dimensions and margins of the graph
    const Margin = 60;
    const width = 600 - 2 * Margin;
    const height = 350 - 2 * Margin;

    var x
    var xAxis
    let chart
    var y
    var yAxis

    // always remove old diagram
    var svg = d3.select("#bottomDiagram").selectAll("svg").remove()


    var aData = analogData.length
    var dData = digitalData.length

    console.log("analogData length : " + aData)
    console.log("digitalData length : " + dData)

    if (aData === 0 && dData === 0) {
        console.log("no data to draw")
        // only remove diagram
    } else {
        // remove diagram and...
        // append the svg object to the body of the page
        var svg = d3.select("#bottomDiagram")
            .append("svg")
        // Init Chart
        initChart();

        if (aData > 0 && dData === 0) {
            console.log("draw only analog data")
            axes(analogData);
            line(analogData, ANALOG);

        } else if (aData === 0 && dData > 0) {
            console.log("draw only digital data")
            axes(digitalData);
            line(digitalData, DIGITAL);

        } else if (aData > 0 && dData > 0) {
            // both
            console.log("both data")
            var max = 0
            analogData.forEach(function (a){
                if(a.ser2 > max){
                    max = a.ser2
                }
            })

            digitalData.forEach(function (d){
                if(d.ser2 > max){
                    max = d.ser2
                }
            })

            axesSpecial(analogData, max)
            line(analogData, ANALOG)
            line(digitalData, DIGITAL)
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

    var source = "Quelle: "
    if(analogSource !== "" && digitalSource === ""){
        source += analogSource
    } else if(analogSource === "" && digitalSource !== ""){
        source += digitalSource
    } else if(analogSource !== "" && digitalSource !== ""){
        source = source + analogSource + ", " + digitalSource
    }

    // Source
    svg.append('text')
        .attr('class', 'source')
        .attr('x', width - Margin / 2)
        .attr('y', height + Margin * 1.7)
        .attr('text-anchor', 'start')
        .text(source)


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

    function axesSpecial(data, yMax) {
        x.domain(data.map((s) => s.ser1))
        chart.selectAll(".myXaxis")
            .transition()
            .duration(2000)
            .attr('class', 'tick_Scales')
            .call(xAxis);

        // create the Y axis
        y.domain([0, yMax]);
        chart.selectAll(".myYaxis")
            .transition()
            .duration(2000)
            .attr('class', 'tick_Scales')
            .call(yAxis);
    }

    function line(data, aOrD) {
        // Create a visualizeLineDiagram selection: bind to the new data
        var u = chart.selectAll("." + aOrD)
            .data([data], function (d) {
                return d.ser1
            });

        var color

        if(aOrD === ANALOG){
            color = COLOR_ANALOG
        } else{
            color = COLOR_DIGITAL
        }

        // visualizeLineDiagram the line
        // Code:
        u
            .enter()
            .append("path")
            .attr("class", aOrD)
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
            .attr("stroke", color)
            .attr("stroke-width", 2.5)
    }
}