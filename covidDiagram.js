// Data
const data_monthly = [
    {ser1: "Jan", ser2: 5.0},
    {ser1: "Feb", ser2: 79.0},
    {ser1: "Mär", ser2: 71808.0},
    {ser1: "Apr", ser2: 163009.0},
    {ser1: "Mai", ser2: 183410.0},
    {ser1: "Jun", ser2: 195418.0},
    {ser1: "Jul", ser2: 210399.0},
    {ser1: "Aug", ser2: 244802.0},
    {ser1: "Sep", ser2: 292913.0},
    {ser1: "Okt", ser2: 531790.0},
    {ser1: "Nov", ser2: 1069912.0},
    {ser1: "Dez", ser2: 1760520.0}
];

const data_new = [
    {ser1: "Jan", ser2: 5.0},
    {ser1: "Feb", ser2: 74.0},
    {ser1: "Mär", ser2: 71729.0},
    {ser1: "Apr", ser2: 91201.0},
    {ser1: "Mai", ser2: 20401.0},
    {ser1: "Jun", ser2: 12008.0},
    {ser1: "Jul", ser2: 14981.0},
    {ser1: "Aug", ser2: 34403.0},
    {ser1: "Sep", ser2: 48111.0},
    {ser1: "Okt", ser2: 238877.0},
    {ser1: "Nov", ser2: 538122.0},
    {ser1: "Dez", ser2: 690608.0}
]

// set the dimensions and margins of the graph
const Margin = DIAGRAM_MARGIN;
const width = DIAGRAM_WIDTH - Margin;
const height = DIAGRAM_HEIGHT - Margin;


d3.select("#caseCheck")
    .property('checked', true)
    .on('change', changeCase)

function changeCase() {
    console.log("changecase")
    console.log("current Case: " + currentCase)

    if (currentCase == TOTAL_CASE) {
        currentCase = MONTH_CASE
        shownCaseButton = TOTAL_CASE
        var svg = d3.select("#topDiagram").selectAll("svg").remove()
        update()
    } else {
        currentCase = TOTAL_CASE
        shownCaseButton = MONTH_CASE
        var svg = d3.select("#topDiagram").selectAll("svg").remove()
        update()
    }

}

var tooltip_covid = d3.select("#topDiagram")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip_covid")
    .style("background-color", COLOR_WHITE)
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("color", "#39475c")
    .style("position", "absolute")

// Create a function that takes a dataset as input and update the plot:
function update() {
    var data = data_monthly
    if (currentCase == MONTH_CASE) {
        data = data_new
    } else {
        data = data_monthly
    }

    var svg = d3.select("#topDiagram").selectAll("svg").remove()
    // append the svg object to the body of the page
    svg = d3.select("#topDiagram").append("svg")

    // Init Chart
    const chart = svg.append('g')
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("transform", "translate(" + Margin + "," + Margin + ")");

    // Initialise the X axis:
    let x = d3.scalePoint().range([0, width]);
    let xAxis = d3.axisBottom()
        .scale(x)
        // TODO: decide if
        // vertical lines
        .tickSize(-height);

    chart.append('g')
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")

    // Initialize the Y axis
    let y = d3.scaleLinear().range([height, 0]);
    let yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat(function (d) {
            if ((d / 1000) >= 1) {
                d = d / 1000 + "K";
            }
            return d;
        });
    chart.append('g')
        .attr("class", "myYaxis")

    // Create the X axis:
    x.domain(data.map((s) => s.ser1))
    chart.selectAll(".myXaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(xAxis);

    // create the Y axis
    y.domain([0, d3.max(data, function (d) {
        return Number(d.ser2)
    })]);
    chart.selectAll(".myYaxis")
        .transition()
        .duration(1000)
        .attr('class', 'tick_Scales')
        .call(yAxis);

    // Create a update selection: bind to the new data
    let u = chart.selectAll(".lineTest")
        .data([data], function (d) {
            return d.ser1
        });

    // Add area
    u.enter()
        .append("path")
        .data([data], function (d) {
            return d.ser1
        })
        .attr("fill", "darkred")
        .attr("stroke", "none")
        .attr("fill-opacity", .65)
        .attr("d", d3.area()
            .x(function (d) {
                return x(d.ser1);
            })
            .y0(height)
            .y1(function (d) {
                return y(d.ser2);
            }))

    // Add line
    u.enter()
        .append("path")
        .data([data], function (d) {
            return d.ser1
        })
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) {
                return x(d.ser1);
            })
            .y(function (d) {
                return y(d.ser2);
            }))

    // Horizontal Lines
    const makeYLines = () => d3.axisLeft()
        .scale(y)

    chart.append('g')
        .attr('class', 'grid')
        .attr("opacity", 0.4)
        .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
        )

    // Label for yAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', -(height / 2) - Margin)
        .attr('y', Margin / 8)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Fälle')

    // Label for xAxis
    svg.append('text')
        .attr('class', 'label')
        .attr('x', width / 2 + Margin)
        .attr('y', height + Margin * 1.5)
        .attr('text-anchor', 'middle')
        .text('Monate')

    // Title
    var title = "Corona-Fälle insgesamt (Deutschland 2020)"
    if (currentCase == TOTAL_CASE) {
        title = "Corona-Fälle insgesamt (Deutschland 2020)"
    } else {
        title = "Monatliche Corona Neuinfekionen (Deutschland 2020)"
    }

    svg.append('text')
        .attr('class', 'title')
        .attr('x', width / 2 + Margin)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .text(title)

    // Source
    svg.append('text')
        .attr('class', 'source')
        .attr('x', Margin / 2)
        .attr('y', height * 1.63)
        .attr('text-anchor', 'start')
        .text('Quelle: https://data.europa.eu/euodp/en/data/dataset/covid-19-coronavirus-data')

    highlightMonth()
    prepareDataForTooltip()


    /**
     * Preparation of all data that should be displayed in tooltip
     */
    function prepareDataForTooltip() {
        var year = currentYear
        const date = new Date(year, currentSliderPosition, 1);
        const month = date.toLocaleString('default', {month: 'long'});

        var datapoint = ""
        if (currentCase == MONTH_CASE) {
            datapoint = data_new[currentSliderPosition].ser2
        } else {
            datapoint = data_monthly[currentSliderPosition].ser2
        }

        tooltipForHighlight(month, datapoint)
    }


    /**
     * When hovering over the highlight rect the tooltpip should be made visible
     * @param month Name of current month
     * @param datapoint Data value
     */
    function tooltipForHighlight(month, datapoint) {
        var positionLeft = 170
        chart.selectAll(".highlight-covid")
            .on('mouseover', function () {
                console.log("mouse over rect")
                var dia = d3.select("topDiagram")
                var mouse = d3.pointer(event, dia.node());
                console.log("mouseover: " + mouse)
                tooltip_covid.transition().duration(100).style("opacity", 0.9);
                if (currentSliderPosition < 9) {
                    tooltip_covid
                        .html(tooltipText(month, datapoint))
                        .style("left", mouse[0] + 5 + "px")
                        .style("top", mouse[1] + 5 + "px")
                } else {
                    tooltip_covid
                        .html(tooltipText(month, datapoint))
                        .style("left", mouse[0] - positionLeft + "px")
                        .style("top", mouse[1] + 5 + "px")
                }


            })
            .on('mousemove', function () {
                var dia = d3.select("bottomDiagram")
                var mouse = d3.pointer(event, dia.node());
                tooltip_covid.transition().duration(100).style("opacity", 0.9);
                if (currentSliderPosition < 8) {
                    tooltip_covid
                        .html(tooltipText(month, datapoint))
                        .style("left", mouse[0] + 5 + "px")
                        .style("top", mouse[1] + 5 + "px")
                } else {
                    tooltip_covid
                        .html(tooltipText(month, datapoint))
                        .style("left", mouse[0] - positionLeft + "px")
                        .style("top", mouse[1] + 5 + "px")
                }
            })
            .on('mouseout', function () {
                console.log("mouse leave rect")
                tooltip_covid.transition().duration(400).style("opacity", 0);
            });
    }

    /**
     * Prepares the text that should be visible in tooltip
     * @param month Name of current month
     * @param datapoint Data value
     * @returns {string} Formated text
     */
    function tooltipText(month, datapoint) {
        var monthText = "<b>" + month + ":</b>"
        var dataText = "<p> " + datapoint.toString() + "</p>"

        return monthText + dataText
    }


    /**
     * Highlights the in slider selected month, and also the depending one of the other year
     */
    function highlightMonth() {
        console.log("highlight month covid")
        var tickWidth = width / (data_monthly.length - 1)
        var drawTickWidth = tickWidth / 2


        var firstTickWidth = drawTickWidth / 2
        var firstValue = 0.5
        var firstTickEnd = firstTickWidth + firstValue

        if (currentYear == 2020) {
            if (currentSliderPosition == 0) {
                // 0-firstTick
                drawRect(firstValue, firstTickWidth)
            } else if (currentSliderPosition == 11) {
                var value = firstTickEnd + (currentSliderPosition - 1) * tickWidth + drawTickWidth
                drawRect(value, firstTickWidth)
            } else {
                //firstTick+(n-1)*tickWidth - firstTick+n*tickWidth
                var value = firstTickEnd + (currentSliderPosition - 1) * tickWidth + drawTickWidth
                drawRect(value, drawTickWidth)
            }
        }
    }

    /**
     * Draws a rectangle at
     *
     * @param xValue x-position of rect
     * @param width Widht of rect
     */
    function drawRect(xValue = 0, width = tickWidth) {
        var color = COLOR_HIGHLIGTH_MONTH
        var opacity = OPACITY_HIGHLIGHT_MONTH
        chart.append('rect')
            .attr("class", "highlight-covid")
            .attr("x", xValue)
            .attr("width", width)
            .attr("height", height)
            .attr("fill", color)
            .attr("opacity", opacity)
    }
}

update();
/*
    !DO NOT DELETE!
*/