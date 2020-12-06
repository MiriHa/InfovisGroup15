
/**
 * VISUALIZE SLIDER
 */

    var margin = {top: 10, right:100, bottom: 30, left: 60};
    var width = 600,
        height = 300;

    var circumference_handle = 12;
    var circumference_r = 120; 
    var circumference_inner = 100;

    var drag = d3.drag()
        .subject(function (event, d) { return event, d; })
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    var svg = d3.select("#bubbleChartContainer").append("svg")
        .attr("id", "sliderContainer")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width}, ${height/2})`);

    var container = svg.append("g")
        .attr("id", "sliderGroup");
        

    var circumference = container.append('circle')
        .attr("id", "sliderCircle")
        .attr('r', circumference_r)
        .attr('class', 'circumference');

    handle = [{
        x: 0,
        y: -circumference_r
    }];

    handle_circle = container.append("g")
        .attr("id", "sliderHandle")
        .attr("class", "handle")
        .selectAll('circle')
        .data(handle)
        .enter().append("circle")
        .attr("r", circumference_handle)
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .call(drag);

    var innerContainer = container.append("g")
        .attr("id", "innerCircle");

    var inner_circle = innerContainer.append("circle")
        .attr("id", "innerCircle")
        .attr("class", "circle")
        .attr("r", circumference_inner)
        .attr("cx", function(d) {return d.x})
        .attr("cy", function(d) {return d.y})

    var circleLableTime = innerContainer.append("text")
        .attr("x", function (d) {return d.x-3})
        .attr("y", function(d) {return d.y})
        .attr("dy", ".35em")
        .text("text");

    

function dragstarted(event, d) {
    //console.log("sliderDragStarted", d, event);
    event.sourceEvent.stopPropagation();
    d3.select(this)
        .classed("dragging", true);
}

function dragged(event, d) {
    d_from_origin = Math.sqrt(Math.pow(event.x, 2) + Math.pow(event.y, 2));

    alpha = Math.acos(event.x / d_from_origin);

    d3.select(this)
        .attr("cx", d.x = circumference_r * Math.cos(alpha))
        .attr("cy", d.y = event.y < 0 ? -circumference_r * Math.sin(alpha) : circumference_r * Math.sin(alpha));
}

function dragended(event, d) {
    d3.select(this)
        .classed("dragging", false);
}

/**
 * VISUALIZE SLIDER END
 */






function visualizeBubbles() {

}

