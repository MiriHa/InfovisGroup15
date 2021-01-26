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
    const csv_files_analog = new Map([
        [SPORT , PATH_ANALOG_SPORT],
        [NEWS , PATH_ANALOG_NEWS],
        [HEALTH , PATH_ANALOG_HEALTH],
        [FREETIME , PATH_ANALOG_FREETIME]
        ]
    )

    const csv_files_digital = new Map([
            [SPORT , PATH_DIGITAL_SPORT],
            [NEWS , PATH_DIGITAL_NEWS],
            [HEALTH , PATH_DIGITAL_HEALTH],
            [FREETIME , PATH_DIGITAL_FREETIME]
        ]
    )

    // Check/parse parameter
    if (analog !== "") {
        path_csv_analog = csv_files_analog.get(analog)
    } else {
        path_csv_analog = null
    }
    if (digital !== "") {
        path_csv_digital = csv_files_digital.get(digital)
    } else {
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
                console.log("loading both successful")
                // files[0] will contain file1.csv
                // files[1] will contain file2.csv
                var file1Data = files[0]
                var file2Data = files[1]

                file1Data.forEach(function (d){
                    // Build analogData block (fill array)
                    if(Number(d.Monat) >= 201909 && Number(d.Monat) <= 202009) {
                        var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                        if(analogSource === ""){
                            analogSource = SOURCE_ANALOG + d.Quellzusatz
                        }
                        if(analogTitel === ""){
                            analogTitel = d.Titel
                        }
                        analogData.push(feed);
                    }

                })

                file2Data.forEach(function (d){
                    // Build digitalData block (fill array)
                    if(Number(d.Monat) >= 201909 && Number(d.Monat) <= 202009) {
                        var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                        if(digitalSource === ""){
                            digitalSource = SOURCE_DIGITAL
                        }
                        if(digitalTitel === ""){
                            digitalTitel = d.Bezeichnung
                        }
                        digitalData.push(feed);
                    }
                })

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
                        //if(Number(d.Monat) >= 201901 && Number(d.Monat) <= 202009) {
                        if(Number(d.Monat) >= 201909 && Number(d.Monat) <= 202009) {
                            var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                            if(analogSource === ""){
                                analogSource = SOURCE_ANALOG + d.Quellzusatz
                            }
                            if(analogTitel === ""){
                                analogTitel = d.Titel
                            }
                            analogData.push(feed);
                        }
                    })


                    visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitel, digitalTitel)
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
                    if(Number(d.Monat) >= 201909 && Number(d.Monat) <= 202009) {
                        var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                        if(digitalSource === ""){
                            digitalSource = SOURCE_DIGITAL
                        }
                        if(digitalTitel === ""){
                            digitalTitel = d.Bezeichnung
                        }
                        digitalData.push(feed);
                    }
                })

                visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitel, digitalTitel)
            })
            .catch(function (error) {
                console.log("loading digital error " + error)
            })
    } else {
        // no data
        visualizeLineDiagram(analogData, digitalData)
    }
}

function visualizeLineDiagram(analogData="", digitalData="", analogSource="", digitalSource="", analogTitel="", digitalTitel="") {


    // set the dimensions and margins of the graph
    const Margin = 80;
    const width = 580 - Margin;
    const height = 300 - Margin;

    var x
    var xAxis
    let chart
    var y
    var yAxis

    // Always remove old diagram
    var svg = d3.select("#bottomDiagram").selectAll("svg").remove()

    var aData = analogData.length
    var dData = digitalData.length

    if (aData === 0 && dData === 0){

        svg = d3.select("#bottomDiagram").append("svg")
        initChart();

        analogData = [
            {ser1: "201909", ser2: 10},
            {ser1: "201910", ser2: 100},
            {ser1: "201911", ser2: 10},
            {ser1: "201912", ser2: 30},
            {ser1: "202001", ser2: 400},
            {ser1: "202002", ser2: 200},
            {ser1: "202003", ser2: 50},
            {ser1: "202004", ser2: 100},
            {ser1: "202005", ser2: 200},
            {ser1: "202006", ser2: 300},
            {ser1: "202007", ser2: 400},
            {ser1: "202008", ser2: 500},
            {ser1: "202009", ser2: 10}]

        digitalData = [
            {ser1: "201909", ser2: 20},
            {ser1: "201910", ser2: 200},
            {ser1: "201911", ser2: 20},
            {ser1: "201912", ser2: 20},
            {ser1: "202001", ser2: 200},
            {ser1: "202002", ser2: 200},
            {ser1: "202003", ser2: 20},
            {ser1: "202004", ser2: 200},
            {ser1: "202005", ser2: 200},
            {ser1: "202006", ser2: 200},
            {ser1: "202007", ser2: 200},
            {ser1: "202008", ser2: 200},
            {ser1: "202009", ser2: 20}]
        
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

    } else {
        // remove diagram and...
        // append the svg object to the body of the page
        svg = d3.select("#bottomDiagram").append("svg")

        // Init Chart
        initChart();

        if (aData > 0 && dData === 0) {
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


    function initChart() {
        chart = svg.append('g')
            .attr("transform", "translate(" + Margin + "," + Margin + ")");

        // Initialise a X axis:
        x = d3.scalePoint().range([0, width]);
        xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(function (d) {

                // Format number to date object
                const date = new Date(d.replace(/(\d\d\d\d)(\d\d)/, '$1-$2'))

                // short = short name of the months
                // long = full name of the months
                const month = date.toLocaleString('default', { month: 'short' });

                var new_date
                if (month === "Jan") {
                    new_date = month+"'20"

                } else if (month === "Sep") {
                    if (date.getFullYear() === 2019) {
                        new_date = month + "'19"
                    } else {
                        new_date = month
                    }
                } else {
                    new_date = month
                }
                return new_date
            });
        chart.append('g')
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "myXaxis")

        // Initialize an Y axis
        y = d3.scaleLinear().range([height, 0]);
        yAxis = d3.axisLeft()
            .scale(y)
            .tickFormat(function (d) {
                    if ((d / 1000000) >= 1) {
                        d = d / 1000000 + "M";
                    } else if ((d / 1000) >= 1) {
                        d = d / 1000 + "K";
                    }
                return d;
                });
        chart.append('g')
            .attr("class", "myYaxis")

        // Check label data
        var source = "Quelle: "
        var title = "Summe Analog & Digital"
        var label_xAxis = "Verkauf/Visits"

        // Analog only
        if(analogSource !== "" && digitalSource === ""){
            source += analogSource
            label_xAxis = "Verkauf"
            title = analogTitel

        // Digital only
        } else if(analogSource === "" && digitalSource !== ""){
            source += digitalSource
            label_xAxis = "Visits"
            title = digitalTitel

        // Digital & Analog
        } else if(analogSource !== "" && digitalSource !== ""){
            source = source + analogSource + ", " + digitalSource
            title = analogTitel + " / " + digitalTitel
        }
        // None (Sum diagram of analog + digital)
        else {
            source = ""
        }
      
        /* testing */
        var tooltip = d3.select("#bottomDiagram")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "#39475c")
        .style("border-radius", "8px")
        .style("padding", "8px")
        .style("color", "white")
        .style("position", "absolute")

        // Label for yAxis
        svg.append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - Margin)
            .attr('y', Margin / 8)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text(label_xAxis)

        // Label for xAxis
        svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + Margin)
            .attr('y', height + Margin * 1.5)
            .attr('text-anchor', 'middle')
            .text('Monate')

        // Label for Title
        svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + Margin)
            .attr('y', 30)
            .attr('text-anchor', 'middle')
            .text(title)
             /* testing */
            .on("mouseover", function (d) {
                console.log("in mouseover")
                var matrix = this.getScreenCTM() // Get the position of the hovered bubbles
                    .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
                tooltip.transition().duration(200).style("opacity", .9);
                var currentText = "Hello" 
                tooltip.html(currentText)
                    .style("left", (window.pageXOffset + matrix.e + 10) + "px")
                    .style("top", (window.pageYOffset + matrix.f - 10) + "px");
            })
            //Remove the tooltip
            .on("mouseout", function (d) {
                console.log("in mouseout")
                tooltip.transition().duration(500).style("opacity", 0);
            })


        // Label for Source
        svg.append('text')
            .attr('class', 'source')
            .attr('x', Margin / 2)
            .attr('y', height * 1.63)
            .attr('text-anchor', 'start')
            .text(source)
    }

    function axes(data) {
        x.domain(data.map((s) => s.ser1))
        chart.selectAll(".myXaxis")
            .attr('class', 'tick_Scales')
            .call(xAxis)

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
            .attr('class', 'tick_Scales')
            .call(xAxis)

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

    function tooltipDetails(){
        var details = "Tooltip details:" + getMediaName();
        console.log(details);
    }

        
}
//Show the sum chart after loading the page for the first time
visualizeLineDiagram();