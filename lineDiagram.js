const TAG = "LineDiagram "

function parser(analog, digital) {
    // Get the title of the current selection; relevant for the tooltip
    function getDataTitle(d) {
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
            [SPORT, PATH_ANALOG_SPORT],
            [NEWS, PATH_ANALOG_NEWS],
            [HEALTH, PATH_ANALOG_HEALTH],
            [FREETIME, PATH_ANALOG_FREETIME]
        ]
    )

    const csv_files_digital = new Map([
            [SPORT, PATH_DIGITAL_SPORT],
            [NEWS, PATH_DIGITAL_NEWS],
            [HEALTH, PATH_DIGITAL_HEALTH],
            [FREETIME, PATH_DIGITAL_FREETIME]
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
        if (path_csv_digital != null) {
            //both
            Promise.all([
                // Open file(s)
                d3.csv(path_csv_analog),
                d3.csv(path_csv_digital),
            ]).then(function (files) {
                console.log(TAG + "- parser: loading both successful")
                // files[0] will contain file1.csv
                // files[1] will contain file2.csv
                var file1Data = files[0]
                var file2Data = files[1]

                file1Data.slice().reverse().forEach(function (d) {
                    // Build analogData block (fill array)
                    if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                        var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                        if (analogSource === "") {
                            analogSource = SOURCE_ANALOG + d.Quellzusatz
                        }
                        if (analogTitle === "") {
                            analogTitle = d.Titel; // getDataTitle(d)  vs. d.Titel
                        }
                        analogData.push(feed);
                    }

                })

                file2Data.slice().reverse().forEach(function (d) {
                    // Build digitalData block (fill array)
                    if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                        var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                        if (digitalSource === "") {
                            digitalSource = SOURCE_DIGITAL
                        }
                        if (digitalTitle === "") {
                            digitalTitle = d.Bezeichnung
                        }
                        digitalData.push(feed);
                    }
                })

                visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitle, digitalTitle)

            }).catch(function (err) {
                console.log(TAG + "- parser: loading error for analog and digital files: " + err)
            })
        } else {
            // only analog
            d3.csv(path_csv_analog)
                .then(function (data) {
                    console.log(TAG + "-parser: loaded analog successfully")
                    data.slice().reverse().forEach(function (d) {
                        // Build analogData block (fill array)
                        if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                            var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                            if (analogSource === "") {
                                analogSource = SOURCE_ANALOG + d.Quellzusatz
                            }
                            if (analogTitle === "") {
                                analogTitle = d.Titel; // getDataTitle(d)  vs. d.Titel
                            }
                            analogData.push(feed);
                        }
                    })


                    visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitle, digitalTitle)
                })
                .catch(function (error) {
                    console.log(TAG + "-parser: loading analog file error " + error)
                })
        }

    } else if (path_csv_digital != null) {
        // only digital
        d3.csv(path_csv_digital)
            .then(function (data) {
                console.log(TAG + "-parser: loaded digital successfully")
                data.slice().reverse().forEach(function (d) {
                    // Build digitalData block (fill array)
                    if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                        var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                        if (digitalSource === "") {
                            digitalSource = SOURCE_DIGITAL
                        }
                        if (digitalTitle === "") {
                            digitalTitle = d.Bezeichnung
                        }
                        digitalData.push(feed);
                    }
                })

                visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitle, digitalTitle)
            })
            .catch(function (error) {
                console.log(TAG + "-parser: loading digital file error " + error)
            })
    } else {
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
        ]).then(function (files) {
            console.log(TAG + "- parser: loading all files successful")
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

            fileA1.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    var feed = {ser1: d.Monat, ser2: Number(d.VerkaufLinear)};
                    if (analogSource === "") {
                        analogSource = SOURCE_ANALOG
                    }
                    analogData1.push(feed);
                }
            })

            fileA2.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    analogData1.forEach(function (a) {
                        if (a.ser1 == d.Monat) {
                            var newSer2 = a.ser2 + Number(d.VerkaufLinear)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            analogData2.push(feed)
                        }
                    })
                }
            })

            fileA3.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    analogData2.forEach(function (a) {
                        if (a.ser1 == d.Monat) {
                            var newSer2 = a.ser2 + Number(d.VerkaufLinear)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            analogData3.push(feed)
                        }
                    })
                }
            })

            fileA4.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    analogData3.forEach(function (a) {
                        if (a.ser1 == d.Monat) {
                            var newSer2 = a.ser2 + Number(d.VerkaufLinear)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            analogData4.push(feed)
                        }
                    })
                }
            })

            var analogData5 = []
            analogData4.forEach(function (b) {
                var feed = {ser1: b.ser1, ser2: (b.ser2 / 4)};
                analogData5.push(feed)
            })
            analogData = analogData5


            var digitalData1 = []
            var digitalData2 = []
            var digitalData3 = []
            var digitalData4 = []

            fileD1.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    var feed = {ser1: d.Monat, ser2: Number(d.KatVisits)};
                    if (digitalSource === "") {
                        digitalSource = SOURCE_DIGITAL
                    }
                    digitalData1.push(feed);
                }
            })

            fileD2.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    digitalData1.forEach(function (a) {
                        if (a.ser1 == d.Monat) {
                            var newSer2 = a.ser2 + Number(d.KatVisits)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            digitalData2.push(feed)
                        }
                    })
                }
            })

            fileD3.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    digitalData2.forEach(function (a) {
                        if (a.ser1 == d.Monat) {
                            var newSer2 = a.ser2 + Number(d.KatVisits)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            digitalData3.push(feed)
                        }
                    })
                }
            })

            fileD4.slice().reverse().forEach(function (d) {
                if (Number(d.Monat) >= firstDataPoint && Number(d.Monat) <= lastDataPoint) {
                    digitalData3.forEach(function (a) {
                        if (a.ser1 == d.Monat) {
                            var newSer2 = a.ser2 + Number(d.KatVisits)
                            var feed = {ser1: d.Monat, ser2: newSer2};
                            digitalData4.push(feed)
                        }
                    })
                }
            })

            var digitalData5 = []
            digitalData4.forEach(function (b) {
                var feed = {ser1: b.ser1, ser2: (b.ser2 / 4)};
                digitalData5.push(feed)
            })
            digitalData = digitalData5

            visualizeLineDiagram(analogData, digitalData, analogSource, digitalSource, analogTitle, digitalTitle)

        }).catch(function (err) {
            console.log(TAG + "- parser: loading all files error" + err)
        })
    }
}


// Create the tooltip div
var tooltip_line = d3.select("#bottomDiagram")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip_line")
    .style("background-color", COLOR_YEAR)
    .style("border-radius", "5px")
    .style("padding", "5px") 
    .style("color", COLOR_BACKGROUND_LIGHT)
    .style("text-align", "left")
    .style("position", "absolute")
    
/**
 * All stuff to draw line diagram with all features
 * @param analogData Data to show
 * @param digitalData Data to show
 * @param analogSource Source of analog data
 * @param digitalSource Source of digital data
 * @param analogTitle Title of analog data
 * @param digitalTitle Title of digital data
 */
function visualizeLineDiagram(analogData = "", digitalData = "", analogSource = "", digitalSource = "", analogTitle = "", digitalTitle = "") {
    // set the dimensions and margins of the graph
    const Margin = DIAGRAM_MARGIN;
    const width = DIAGRAM_WIDTH - Margin;
    const height = DIAGRAM_HEIGHT - Margin;

    var x
    var xAxis
    let chart
    var y
    var yAxis

    // Always remove old diagram
    var svg = d3.select("#bottomDiagram").selectAll("svg").remove()

    var aData = analogData.length
    var dData = digitalData.length


    // append the svg object to the body of the page
    svg = d3.select("#bottomDiagram").append("svg")

    // Init Chart
    initChart();

    // depending on the data decide what to do
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
        analogData.forEach(function (a) {
            if (a.ser2 > max) {
                max = a.ser2
            }
        })

        digitalData.forEach(function (d) {
            if (d.ser2 > max) {
                max = d.ser2
            }
        })

        axesSpecial(analogData, max)
        line(analogData, ANALOG)
        line(digitalData, DIGITAL)
    }

    highlightMonth();
    yearIndicator();
    prepareDataForTooltip()


    /**
     * Preparation of all data that should be displayed in tooltip
     */
    function prepareDataForTooltip() {
        var year = currentYear
        const date = new Date(year, currentSliderPosition, 1);
        const month = date.toLocaleString('default', {month: 'long'});
        console.log("selected month = " + month)
        var analog19 = ""
        var analog20 = ""
        var digital19 = ""
        var digital20 = ""
        var currentSelectedMonth = currentSliderPosition + 1
        var monthNumber = currentSelectedMonth.toString()
        if (currentSelectedMonth < 10) {
            monthNumber = "0" + currentSelectedMonth
        }

        if (aData > 0 && dData === 0) {
            analogData.forEach(function (d) {
                if (d.ser1 === ("2019" + monthNumber)) {
                    analog19 = d.ser2
                } else if (d.ser1 === ("2020" + monthNumber)) {
                    analog20 = d.ser2
                }
            })
        } else if (aData === 0 && dData > 0) {
            digitalData.forEach(function (d) {
                if (d.ser1 === ("2019" + monthNumber)) {
                    digital19 = d.ser2
                } else if (d.ser1 === ("2020" + monthNumber)) {
                    digital20 = d.ser2
                }
            })
        } else if (aData > 0 && dData > 0) {
            // both
            analogData.forEach(function (d) {
                if (d.ser1 === ("2019" + monthNumber)) {
                    analog19 = d.ser2
                } else if (d.ser1 === ("2020" + monthNumber)) {
                    analog20 = d.ser2
                }
            })
            digitalData.forEach(function (d) {
                if (d.ser1 === ("2019" + monthNumber)) {
                    digital19 = d.ser2
                } else if (d.ser1 === ("2020" + monthNumber)) {
                    digital20 = d.ser2
                }
            })
        }

        tooltipForHighlight(month, currentSelectedMonth, year, analog19, analog20, digital19, digital20)
    }

    /**
     * When hovering over the highlight rect the tooltpip should be made visible
     *
     * @param month Name of current month
     * @param monthNumber Number of current month as we know (Jan-01;Dec-12)
     * @param year Selected year
     * @param analog19 Datapoint of analog data of the month in 2019
     * @param analog20 Datapoint of analog data of the month in 2020
     * @param digital19 Datapoint of digital data of the month in 2019
     * @param digital20 Datapoint of digital data of the month in 2020
     */
    function tooltipForHighlight(month, monthNumber, year, analog19, analog20, digital19, digital20) {
        var positionLeft = 175

        chart.selectAll(".highlight")
            .on('mouseover', function () {
                console.log("mouse over rect")
                var dia = d3.select("bottomDiagram")
                var mouse = d3.pointer(event, dia.node());
                console.log("mouseover: " + mouse)
                tooltip_line.transition().duration(100).style("opacity", 0.9);
                if(currentSliderPosition < 4){
                    tooltip_line
                        .html(tooltipText(month, monthNumber, year, analog19, analog20, digital19, digital20))
                        .style("left", mouse[0] + 5 + "px")
                        .style("top", mouse[1] + 5 + "px")
                } else if(currentSliderPosition > 8){
                    tooltip_line
                        .html(tooltipText(month, monthNumber, year, analog19, analog20, digital19, digital20))
                        .style("left", mouse[0] + 5 + "px")
                        .style("top", mouse[1] + 5 + "px")
                } else {
                    tooltip_line
                        .html(tooltipText(month, monthNumber, year, analog19, analog20, digital19, digital20))

                    tooltip_line
                        .style("left", mouse[0] - positionLeft + "px")
                        .style("top", mouse[1] + 5 + "px")
                }


            })
            .on('mousemove', function () {
                var dia = d3.select("bottomDiagram")
                var mouse = d3.pointer(event, dia.node());
                tooltip_line.transition().duration(100).style("opacity", 0.9);
                if(currentSliderPosition < 4){
                    tooltip_line
                        .html(tooltipText(month, monthNumber, year, analog19, analog20, digital19, digital20))
                        .style("left", mouse[0] + 5 + "px")
                        .style("top", mouse[1] + 5 + "px")
                }else if(currentSliderPosition > 8){
                    tooltip_line
                        .html(tooltipText(month, monthNumber, year, analog19, analog20, digital19, digital20))
                        .style("left", mouse[0] + 5 + "px")
                        .style("top", mouse[1] + 5 + "px")
                } else {
                    tooltip_line
                        .html(tooltipText(month, monthNumber, year, analog19, analog20, digital19, digital20))

                    tooltip_line
                        .style("left", mouse[0] -positionLeft + "px")
                        .style("top", mouse[1] + 5 + "px")
                }
            })
            .on('mouseout', function () {
                console.log("mouse leave rect")
                tooltip_line.transition().duration(400).style("opacity", 0);
            });
    }

    /**
     * Prepares the text that should be visible in tooltip
     *
     * @param month Name of current month
     * @param monthNumber Number of current month as we know (Jan-01;Dec-12)
     * @param year Selected year
     * @param analog19 Datapoint of analog data of the month in 2019
     * @param analog20 Datapoint of analog data of the month in 2020
     * @param digital19 Datapoint of digital data of the month in 2019
     * @param digital20 Datapoint of digital data of the month in 2020
     *
     * @returns {string} Formated text
     */
    function tooltipText(month, monthNumber, year, analog19, analog20, digital19, digital20) {
        var monthText = "<b >" + month + "</b>"
        var year19 = "<tr><td>2019</td>"
        var emptyCell19 = "<tr><td></td>"
        if (year == 2019) {
            year19 = "<tr class='selected_year'><td>2019</td>"
            emptyCell19 = "<tr class='selected_year'><td></td>"
        }

        var year20 = "<tr><td>2020</td>"
        var emptyCell20 = "<tr><td></td>"
        if (year == 2020) {
            year20 = "<tr class='selected_year'><td>2020</td>"
            emptyCell20 = "<tr class='selected_year'><td></td>"
        }

        var noDataString = "keine Daten vorhanden"

        if ((analog19 !== "" || analog20 !== "") && digital19 === "" && digital20 === "") {
            if (monthNumber > 9) {
                var ana19 = "<td class='analog_text'>" + analog19 + "</td></tr>"
                var ana20 = "<td>" + noDataString + "</td></tr>"
                return monthText + "<table>" + year19 + ana19 + year20 + ana20 + "</table>"
            } else {
                var ana19 = "<td class='analog_text'>" + analog19 + "</td></tr>"
                var ana20 = "<td class='analog_text'>" + analog20 + "</td></tr>"
                return monthText + "<table>" + year19 + ana19 + year20 + ana20 + "</table>"
            }
        } else if (analog19 === "" && analog20 === "" && (digital19 !== "" || digital20 !== "")) {
            if (monthNumber > 9) {
                var dig19 = "<td class='digital_text'>" + digital19 + "</td></tr>"
                var dig20 = "<td>" + noDataString + "</td></tr>"
                return monthText + "<table>" + year19 + dig19 + year20 + dig20 + "</table>"
            } else {
                var dig19 = "<td class='digital_text'>" + digital19 + "</td></tr>"
                var dig20 = "<td class='digital_text'>" + digital20 + "</td></tr>"
                return monthText + "<table>" + year19 + dig19 + year20 + dig20 + "</table>"
            }
        } else if ((analog19 !== "" || analog20 !== "") && (digital19 !== "" || digital20 !== "")) {
            if (monthNumber > 9) {
                var ana19 = "<td class='analog_text'>" + analog19 + "</td></tr>"
                var ana20 = "<td>" + noDataString + "</td></tr>"
                var dig19 = "<td class='digital_text'>" + digital19 + "</td></tr><br>"
                return monthText + "<table>" + year19 + ana19 + emptyCell19 + dig19 + year20 + ana20 + "</table>"
            } else {
                var ana19 = "<td class='analog_text'>" + analog19 + "</td></tr>"
                var ana20 = "<td class='analog_text'>" + analog20 + "</td></tr>"
                var dig19 = "<td class='digital_text'>" + digital19 + "</td></tr><br>"
                var dig20 = "<td class='digital_text'>" + digital20 + "</td></tr>"
                return monthText + "<table>" + year19 + ana19 + emptyCell19 + dig19 + year20 + ana20 + emptyCell20 + dig20 + "</table>"
            }
        }
    }


    /**
     * Highlights the in slider selected month, and also the depending one of the other year
     */
    function highlightMonth() {
        var tickWidth = width
        if (aData != 0) {
            tickWidth = width / (aData - 1)
        } else if (dData != 0) {
            tickWidth = width / (dData - 1)
        }

        var firstTickWidth = tickWidth / 2
        var firstValue = 0.5
        var firstTickEnd = firstTickWidth + firstValue

        var valueOther
        var value

        if (currentYear === 2019) {
            console.log(TAG + "- visualize: highlight in year 2019")
            if (currentSliderPosition === 0) {
                // 0-firstTick
                drawRect(firstValue, firstTickWidth, true)

                valueOther = firstTickEnd + (currentSliderPosition + 12 - 1) * tickWidth
                drawRect(valueOther, tickWidth, false)

            } else {
                //firstTick+(n-1)*tickWidth - firstTick+n*tickWidth
                value = firstTickEnd + (currentSliderPosition - 1) * tickWidth
                drawRect(value, tickWidth, true)

                if (currentSliderPosition < 8) {
                    valueOther = firstTickEnd + (currentSliderPosition + 12 - 1) * tickWidth
                    drawRect(valueOther, tickWidth, false)

                } else if (currentSliderPosition === 8) {
                    valueOther = firstTickEnd + (currentSliderPosition + 12 - 1) * tickWidth
                    drawRect(valueOther, firstTickWidth, false)
                }
            }
        } else if (currentYear === 2020) {
            console.log(TAG + "- visualize: highlight in year 2020")
            if (currentSliderPosition < 8) {
                value = firstTickEnd + (currentSliderPosition + 12 - 1) * tickWidth
                drawRect(value, tickWidth, true)

                if (currentSliderPosition === 0) {
                    drawRect(firstValue, firstTickWidth, false)
                } else {
                    valueOther = firstTickEnd + (currentSliderPosition - 1) * tickWidth
                    drawRect(valueOther, tickWidth, false)
                }
            } else if (currentSliderPosition === 8) {
                value = firstTickEnd + (currentSliderPosition + 12 - 1) * tickWidth
                drawRect(value, firstTickWidth, true)

                valueOther = firstTickEnd + (currentSliderPosition - 1) * tickWidth
                drawRect(valueOther, tickWidth, false)
            } else {
                valueOther = firstTickEnd + (currentSliderPosition - 1) * tickWidth
                drawRect(valueOther, tickWidth, false);
            }
        }

        /**
         * Draws a rectangle at
         * @param xValue x-position of rect
         * @param width Widht of rect
         * @param current If it's of the current selected year
         */
        function drawRect(xValue = 0, width = tickWidth, current = true) {
            var color = COLOR_HIGHLIGTH_MONTH
            var opacity = OPACITY_HIGHLIGHT_MONTH
            if (!current) {
                color = COLOR_HIGHLIGTH_MONTH_OTHER_YEAR
                opacity = OPACITY_HIGHLIGHT_MONTH_OTHER_YEAR
            }
            chart.append('rect')
                .attr("class", "highlight")
                .attr("x", xValue)
                .attr("width", width)
                .attr("height", height)
                .attr("fill", color)
                .attr("opacity", opacity)
        }
    }

    /**
     * Draws a line when a new year starts and display year
     */
    function yearIndicator() {
        var tickWidth = width
        if (aData != 0) {
            tickWidth = width / (aData - 1)
        } else if (dData != 0) {
            tickWidth = width / (dData - 1)
        }

        var yPosition = -5
        var xPosition = 5
        var strokeWidth = 10

        var year19 = chart.append('g').attr("class", "2019")
        year19.append('line')
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", height)
        year19.append('text')
            .attr('class', 'year')
            .attr('text-anchor', 'left')
            .attr("x", xPosition)
            .attr("y", yPosition)
            .text('2019')

        var firstTickWidth = tickWidth / 2
        var firstValue = 0.5
        var firstTickEnd = firstTickWidth + firstValue

        var year20 = chart.append('g').attr("class", "2020")
        var value20 = firstTickEnd + (12 - 1) * tickWidth + firstTickWidth
        year20.append('line')
            .attr("id", "line_year")
            .attr("x1", value20)
            .attr("x2", value20)
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke-width", strokeWidth)
        year20.append('text')
            .attr('class', 'year')
            .attr('text-anchor', 'left')
            .attr("x", value20 + xPosition)
            .attr("y", yPosition)
            .text('2020')
    }

    /**
     * Initializes chart with all necessary stuff
     */
    function initChart() {
        chart = svg.append('g')
            .attr("transform", "translate(" + Margin + "," + Margin + ")")

        // Initialise a X axis:
        x = d3.scalePoint().range([0, width]);
        xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(function (d) {

                var year = d.substring(0, 4)
                // Format number to date object
                const date = new Date(d.replace(/(\d\d\d\d)(\d\d)/, '$1-$2'))

                // short = short name of the months
                // long = full name of the months
                const month = date.toLocaleString('default', {month: 'short'});

                var new_date = month

                return new_date
            })
            // draw vertical lines
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
        if (analogSource !== "" && digitalSource === "") {
            source += analogSource
            label_xAxis = "Verkauf"
            title = analogTitle

            // Digital only
        } else if (analogSource === "" && digitalSource !== "") {
            source += digitalSource
            label_xAxis = "Besuche"
            title = digitalTitle

            // Digital & Analog
        } else if (analogSource !== "" && digitalSource !== "") {
            source = source + analogSource + ", " + digitalSource
            if (analogTitle !== "" && digitalTitle !== "") {
                title = analogTitle + " vs. " + digitalTitle
            }
        }
        // None (Sum diagram of analog + digital)
        else {
            source = ""
        }

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
            .attr('class', 'tick_Scales')
            .call(yAxis);

        // draws horizontal lines
        const makeYLines = () => d3.axisLeft()
            .scale(y)

        chart.append('g')
            .attr('class', 'grid')
            .attr("opacity", 0.4)
            .call(makeYLines()
                .tickSize(-width, 0, 0)
                .tickFormat('')
            )
    }

    function axesSpecial(data, yMax) {
        x.domain(data.map((s) => s.ser1))
        chart.selectAll(".myXaxis")
            .attr('class', 'tick_Scales')
            .call(xAxis)

        // create the Y axis
        y.domain([0, yMax]);
        chart.selectAll(".myYaxis")
            .attr('class', 'tick_Scales')
            .call(yAxis);
        // draws horizontal lines
        const makeYLines = () => d3.axisLeft()
            .scale(y)

        chart.append('g')
            .attr('class', 'grid')
            .attr("opacity", 0.4)
            .call(makeYLines()
                .tickSize(-width, 0, 0)
                .tickFormat('')
            )
    }

    function line(data, aOrD) {
        // Create a visualizeLineDiagram selection: bind to the new data
        var u = chart.selectAll("." + aOrD)
            .data([data], function (d) {
                return d.ser1
            });

        var color

        if (aOrD === ANALOG) {
            color = COLOR_ANALOG
        } else {
            color = COLOR_DIGITAL
        }

        // visualizeLineDiagram the line
        u
            .enter()
            .append("path")
            .attr("class", aOrD)
            .merge(u)
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

// when loading the page load all datasets and calculate sum
parser("", "")
