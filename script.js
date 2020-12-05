function visualizeSlider(){
    
    var width = 960,
        height = 500;

    var circumference_r = 100;

    var drag = d3.drag()
        .subject(function (d) { return d; })
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    var svg = d3.select("#sliderContainer").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    var container = svg.append("g");

    var circumference = container.append('circle')
        .attr('r', circumference_r)
        .attr('class', 'circumference');

    handle = [{
        x: 0,
        y: -circumference_r
    }];

    var handle_circle = container.append("g")
        .attr("class", "dot")
            .selectAll('circle')
        .data(handle)
            .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) { return d.x })
        .attr("cy", function (d) { return d.y })
        .call(drag);

    
}

function dragstarted(d) {
    console.log("sliderDragStarted", d);
    d3.event.sourceEvent.stopPropagation();
    d3.select(this)
      .classed("dragging", true);
}

function dragged(d) {
    d_from_origin = Math.sqrt(Math.pow(d3.event.x, 2) + Math.pow(d3.event.y, 2));

    alpha = Math.acos(d3.event.x / d_from_origin);

    d3.select(this)
      .attr("cx", d.x = circumference_r * Math.cos(alpha))
      .attr("cy", d.y = d3.event.y < 0 ? -circumference_r * Math.sin(alpha) : circumference_r * Math.sin(alpha));
}


function dragended(d) {
    d3.select(this)
      .classed("dragging", false);
}



function visualizeBubbles() {

}



visualizeSlider();

