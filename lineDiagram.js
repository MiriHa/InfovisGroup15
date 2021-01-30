// var currentDataTitle; // name of the magazin / newspaper etc.
var detailLevel = 0;
var lineValue // test
var file1Data // test
var file2Data // test

function parser(analog, digital) {
    // Get the title of the current selection; relevant for the tooltip
    function getDataTitle(d){
        currentDataTitle = d.Titel; 
    }

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
    var analogTitle = ""
    var digitalTitle = ""

    var firstDataPoint = 201901
    var lastDataPoint = 202009


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
                file1Data = files[0]
                file2Data = files[1]

                file1Data.slice().reverse().forEach(function (d){
                    // Build analogData block (fill array)
                    if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                        var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                        if(analogSource === ""){
                            analogSource = SOURCE_ANALOG + d.Quellzusatz
                        }
                        if(analogTitle === ""){
                            analogTitle = d.Titel; // getDataTitle(d)  vs. d.Titel
                        }
                        analogData.push(feed);
                    }

                })

                file2Data.slice().reverse().forEach(function (d){
                    // Build digitalData block (fill array)
                    if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                        var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                        if(digitalSource === ""){
                            digitalSource = SOURCE_DIGITAL
                        }
                        if(digitalTitle === ""){
                            digitalTitle = d.Bezeichnung
                        }
                        digitalData.push(feed);
                    }
                })

                visualizeLineDiagram(analogData,digitalData, analogSource, digitalSource, analogTitle, digitalTitle)

            }).catch(function(err) {
                // handle error
                console.log("loading error" + err)
            })
        } else{
            // only analog
            d3.csv(path_csv_analog)
                .then(function (data) {
                    console.log("loaded analog successfully")
                    data.slice().reverse().forEach(function (d) {
                        // Build analogData block (fill array)
                        if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                            var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                            if(analogSource === ""){
                                analogSource = SOURCE_ANALOG + d.Quellzusatz
                            }
                            if(analogTitle === ""){
                                analogTitle = d.Titel; // getDataTitle(d)  vs. d.Titel 
                            }
                            analogData.push(feed);
                        }
                    })


                    visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitle, digitalTitle)
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
                data.slice().reverse().forEach(function (d) {
                    // Build analogData block (fill array)
                    if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                        var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                        if(digitalSource === ""){
                            digitalSource = SOURCE_DIGITAL
                        }
                        if(digitalTitle === ""){
                            digitalTitle = d.Bezeichnung
                        }
                        digitalData.push(feed);
                    }
                })

                visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitle, digitalTitle)
            })
            .catch(function (error) {
                console.log("loading digital error " + error)
            })
    } else {
        // no data
        console.log("parser no data")
        // compute all analog and digital
        Promise.all([
            // Open file(s)
            d3.csv(csv_files_analog.get(SPORT)),
            d3.csv(csv_files_analog.get(NEWS)),
            d3.csv(csv_files_analog.get(HEALTH)),
            d3.csv(csv_files_analog.get(FREETIME)),
            d3.csv(csv_files_digital.get(SPORT)),
            d3.csv(csv_files_digital.get(NEWS)),
            d3.csv(csv_files_digital.get(HEALTH)),
            d3.csv(csv_files_digital.get(FREETIME)),
        ]).then(function(files) {
            console.log("parser loading all successful")
            // files[0] will contain file1.csv
            // files[1] will contain file2.csv
            var fileA1 = files[0]
            var fileA2 = files[1]
            var fileA3 = files[2]
            var fileA4 = files[3]
            var fileD1 = files[4]
            var fileD2 = files[5]
            var fileD3 = files[5]
            var fileD4 = files[7]

            var analogData1 = []
            var analogData2 = []
            var analogData3 = []
            var analogData4 = []

            fileA1.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                    if(analogSource === ""){
                        analogSource = SOURCE_ANALOG
                    }
                    analogData1.push(feed);
                }
            })

            fileA2.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    analogData1.forEach(function(a){
                        if(a.ser1 == d.Monat){
                            var newSer2 = a.ser2+Number(d.VerkaufLinear)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            analogData2.push(feed)
                        }
                    })
                }
            })

            fileA3.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    analogData2.forEach(function(a){
                        if(a.ser1 == d.Monat){
                            var newSer2 = a.ser2+Number(d.VerkaufLinear)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            analogData3.push(feed)
                        }
                    })
                }
            })

            fileA4.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    analogData3.forEach(function(a){
                        if(a.ser1 == d.Monat){
                            var newSer2 = a.ser2+Number(d.VerkaufLinear)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            analogData4.push(feed)
                        }
                    })
                }
            })

            var analogData5 = []
            analogData4.forEach(function(b){
                var feed = {ser1: b.ser1, ser2: (b.ser2/4)};
                analogData5.push(feed)
            })
            analogData = analogData5


            var digitalData1 = []
            var digitalData2 = []
            var digitalData3 = []
            var digitalData4 = []

            fileD1.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                    if(digitalSource === ""){
                        digitalSource = SOURCE_DIGITAL
                    }
                    digitalData1.push(feed);
                }
            })

            fileD2.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    digitalData1.forEach(function(a){
                        if(a.ser1 == d.Monat){
                            var newSer2 = a.ser2+Number(d.KatVisits)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            digitalData2.push(feed)
                        }
                    })
                }
            })

            fileD3.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    digitalData2.forEach(function(a){
                        if(a.ser1 == d.Monat){
                            var newSer2 = a.ser2+Number(d.KatVisits)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            digitalData3.push(feed)
                        }
                    })
                }
            })

            fileD4.slice().reverse().forEach(function (d){
                if(Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    digitalData3.forEach(function(a){
                        if(a.ser1 == d.Monat){
                            var newSer2 = a.ser2+Number(d.KatVisits)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            digitalData4.push(feed)
                        }
                    })
                }
            })

            var digitalData5 = []
            digitalData4.forEach(function(b){
                var feed = {ser1: b.ser1, ser2: (b.ser2/4)};
                digitalData5.push(feed)
            })
            digitalData = digitalData5

            visualizeLineDiagram(analogData,digitalData, analogSource, digitalSource, analogTitle, digitalTitle)

        }).catch(function(err) {
            // handle error
            console.log("loading error" + err)
        })
        visualizeLineDiagram(analogData, digitalData)
    }
}

function visualizeLineDiagram(analogData="", digitalData="", analogSource="", digitalSource="", analogTitle="", digitalTitle="") {


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
            .attr("transform", "translate(" + Margin + "," + Margin + ")")
            /* tooltip testing */
            /*.on("mouseover", function (d) {
                console.log("in mouseover")
                var matrix = this.getScreenCTM() // Get the position of the hovered object
                    .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(showTooltip(d)) 
                    .style("left", (window.pageXOffset + matrix.e + 10) + "px")
                    .style("top", (window.pageYOffset + matrix.f - 10) + "px");
            })
            //Remove the tooltip
            .on("mouseout", function (d) {
                console.log("in mouseout")
                tooltip.transition().duration(500).style("opacity", 0);
            });*/

        // Initialise a X axis:
        x = d3.scalePoint().range([0, width]);
        xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(function (d) {

                var year = d.substring(0,4)
                // Format number to date object
                const date = new Date(d.replace(/(\d\d\d\d)(\d\d)/, '$1-$2'))

                // short = short name of the months
                // long = full name of the months
                const month = date.toLocaleString('default', { month: 'short' });

                var new_date
                if (month === "Jan") {
                    if(year === "2020"){
                        new_date = month+"'20"
                    } else if(year === "2019"){
                        new_date = month+"'19"
                    }

                } else {
                    new_date = month
                }
                return new_date
            })
            .tickSize(-height);
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
        var title = "Vergleich von Analog & Digital"
        var label_xAxis = "Verkauf / Besuche"

        // Analog only
        if(analogSource !== "" && digitalSource === ""){
            source += analogSource
            label_xAxis = "Verkauf"
            title = analogTitle
            detailLevel = 1; // relevant for the tooltip

        // Digital only
        } else if(analogSource === "" && digitalSource !== ""){
            source += digitalSource
            label_xAxis = "Besuche"
            title = digitalTitle
            detailLevel = 2; // relevant for the tooltip

        // Digital & Analog
        } else if(analogSource !== "" && digitalSource !== ""){
            source = source + analogSource + ", " + digitalSource
            if(analogTitle !== "" && digitalTitle !== ""){
                title = analogTitle + " vs. " + digitalTitle
            }
            detailLevel = 3;
        }
        // None (Sum diagram of analog + digital)
        else {
            source = ""
        }
      
        /*
        // ------------------------- tooltip: ---------------------------------------------- //
        // append the x line
        chart.append("line")
            .attr("class", "x")
            .style("stroke", "#DBDBDB")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0)
            .attr("y2", height);

        // append the y line
        chart.append("line")
            .attr("class", "y")
            .style("stroke", "#DBDBDB")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("x1", width)
            .attr("x2", width);

        // append the circle at the intersection 
        chart.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", "#DBDBDB")
            .attr("r", 4);

         // place the value at the intersection
        chart.append("text")
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        chart.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // append the rectangle to capture mouse
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function() { chart.style("display", null); })
            .on("mouseout", function() { chart.style("display", "none"); })
            .on("mousemove", mousemove);
        
        function mousemove() {
            var x0 = x.invert(d3.pointer(event,this)[0]),
            //var x0 = scalePointPosition();
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        }

        function scalePointPosition() {
            var xPos = d3.pointer(event, this)[0];
            var domain = x.domain(); 
            var range = x.range();
            var rangePoints = d3.range(range[0], range[1], x.step())
            var yPos = domain[d3.bisect(rangePoints, xPos) -1];
            console.log(yPos);
        }
        
      
        // Create the tooltip div 
        var tooltip = d3.select("#bottomDiagram")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "#39475c")
            .style("border-radius", "8px")
            .style("padding", "8px")
            .style("color", "white")
            .style("position", "absolute")

        // ------------------------- tooltip ---------------------------------------------- //*/

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
            /* tooltip testing */
            /*.on("mouseover", function (d) {
                console.log("in mouseover")
                var matrix = this.getScreenCTM() // Get the position of the hovered object
                    .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(tooltipDetails()) 
                    .style("left", (window.pageXOffset + matrix.e + 10) + "px")
                    .style("top", (window.pageYOffset + matrix.f - 10) + "px");
            })
            //Remove the tooltip
            .on("mouseout", function (d) {
                console.log("in mouseout")
                tooltip.transition().duration(500).style("opacity", 0);
            })*/


        // Label for Source
        svg.append('text')
            .attr('class', 'source')
            .attr('x', Margin / 2)
            .attr('y', height * 1.63)
            .attr('text-anchor', 'start')
            .text(source)

        // TODO highlight month
        var tickWidth = width
        if(aData != 0){
            tickWidth = width/(aData-1)
        } else if(dData != 0){
            tickWidth = width/(dData-1)
        }


        var firstTickWidth = tickWidth/2
        var firstValue = 0.5
        var firstTickEnd = firstTickWidth + firstValue

        if(currentYear == 2019){
            if(currentSliderPosition == 0){
                // 0-firstTick
                var rect = chart.append('rect')
                    .attr("width", firstTickWidth)
                    .attr("height", height)
                    .attr("fill", COLOR_HIGHLIGTH_ANALOG)
                    .attr("opacity", 0.5)
                    .attr("x", firstValue)
            } else{
                //firstTick+(n-1)*tickWidth - firstTick+n*tickWidth
                var value = firstTickEnd+(currentSliderPosition-1)*tickWidth
                var rect = chart.append('rect')
                    .attr("width", tickWidth)
                    .attr("height", height)
                    .attr("fill", COLOR_HIGHLIGTH_ANALOG)
                    .attr("opacity", 0.5)
                    .attr("x", value)
            }
        } else if(currentYear == 2020){
            var value = firstTickEnd+(currentSliderPosition-1)*tickWidth
            var rect = chart.append('rect')
                .attr("width", tickWidth)
                .attr("height", height)
                .attr("fill", COLOR_HIGHLIGTH_ANALOG)
                .attr("opacity", 0.5)
                .attr("x", value)
        }
    }

    /*
    // ------------------------------------------ tooltip --------------------------------------------//
    // Create the details of the tooltip
    function tooltipDetails(){
        var details;
        // only analog data
        if(detailLevel == 1)
        {
            details = ("Kategorie: "  + getMediaName() + "</br>Titel: " + analogTitle);
        } 
        
        // only digital data
        else if(detailLevel == 2)
        {
            details = ("Kategorie: "  + getMediaName() + "</br>Titel: " + digitalTitle);
        } 
        
        // both analog and digital data
        else if(detailLevel == 3)
        {
            details = ("Kategorie: "  + getMediaName() + "</br>Titel 1: " + analogTitle 
                 + "</br>Titel 2: " + digitalTitle);
        }

        // no data
        else 
        {   details = " "
        }

        console.log(details);
        return details;
    }

    // ------------------------------------------ tooltip --------------------------------------------//

    function showTooltip(d){
        var details;
        details = ("Wert: "  + y(d.ser2));
        console.log(details);
        return details;
    }*/

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
}
//Show the sum chart after loading the page for the first time
//visualizeLineDiagram();

// when loading the page load all datasets and calculate sum
parser("","")