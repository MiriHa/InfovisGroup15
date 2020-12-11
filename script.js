
/**
 * VISUALIZE SLIDER
 */

    var margin = {top: 10, right:100, bottom: 30, left: 60};

    var circumference_handle = 12;
    var circumference_r = 120; 
    var circumference_inner = 100;

    var width = 600,
    //  width = (radiuas+ margin)*
        height = 300,
        radians = 0.0174532925
        //Value for the MonthTicks
        tickStart = circumference_r + 18,
        tickLength = -26,
        MonthLabelRadius = circumference_r + 24,
        MonthLabelYOffset = 5;

        //TODO these are WRONG! DO it again
                    // 0,   30,            60,         90,  
    var tickphiright_right = [0, 0.5235987755,  1.04719755, 1.570796325, 
                        //120,       150,          180
                        2.0943951,  2.617993875,  3.14159265,
                        //210,         240,       270
                        3.665191425,  4.1887902,  4.712388975,
                        //300,         330
                        5.23598775,   5.759586525   ]


                          //0  Jan        30  Feb          60 Mär
     var tickphiright = [ 4.712388975,  5.23598775,   5.759586525,
                        //90 Apr    120   Mai    150  Jun     180 Junly
                         0,       0.5235987755,  1.04719755, 1.570796325, 
                        //210 Aug       240 Sep     270 Okt
                        2.0943951,  2.617993875,  3.14159265,
                        //300 NOv       330 Dez      
                        3.665191425,  4.1887902  ]

    var monthNames = ["Januray", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    
    //Define Drag for the slider, functions at the end
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
        
    var face = container.append("g")
        .attr('id','scale-face');
        
    //Scale for the MonthTick scale
    var tickScale = d3.scaleLinear()
        .range([0,330])
        .domain([0,11]);
    
    //Make the Monthticks     
    face.selectAll('.tick')
        .data(d3.range(0,12))
                .enter()
                .append('line')
                .attr('class', 'tick')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', tickStart)
                .attr('y2', tickStart + tickLength)
                .attr('transform', function(d){ 
                    return 'rotate('+tickScale(d) + ')';
                 });
    
    //Make the Month Lable on top
    var lable = face.append('text')
            .attr("id", "MonthLabelJan")
            .text("January")
            .attr('x', 0 - 25)
            .attr('y', - tickStart -1.5);
   
    /* Month lables, currently numbers
    face.selectAll('.monthLabel')
                 .data(d3.range(3,13,3))
                 .enter()
                 .append('text')
                 .attr('class', 'monthLabel')
                 .attr('text-anchor', 'middle')
                 .attr('x', function(d){
                            return MonthLabelRadius*Math.sin(tickScale(d)*radians);
                 })
                 .attr('y', function(d){
                            return -MonthLabelRadius*Math.cos(tickScale(d)*radians) + MonthLabelYOffset;
                 })
                 .text(function(d){
                     return d;
                 });
    */
    
    //Make the round Slider bar
    var circumference = container.append('circle')
        .attr("id", "sliderCircle")
        .attr('r', circumference_r)
        .attr('class', 'circumference');

                 
    handle = [{
        x: 0,
        y: -circumference_r
    }];

    //Slider handle
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


    //Make the inner Circle that displays Month and Corona Cases
    var inner_circle = innerContainer.append("circle")
        .attr("id", "innerCircle")
        .attr("class", "circle")
        .attr("r", circumference_inner)
        //uncaught error, d is undefined
        //.attr("cx", function(d) {return d.x})
        //.attr("cy", function(d) {return d.y})

    var circleLableTime = innerContainer.append("text")
        .attr("id","text")
        //.attr("x", function (d) {return d.x-3})
        //.attr("y", function(d) {return d.y})
        .attr("dy", ".35em")
        .text("Texttext");
        
        

//Functions to handle the Slider drag
function dragstarted(event, d) {
    event.sourceEvent.stopPropagation();
    d3.select(this)
        .classed("dragging", true);
}

function dragged(event, d) {
    d_from_origin = Math.sqrt(Math.pow(event.x, 2) + Math.pow(event.y, 2));

    var cosalph = event.x / d_from_origin

    alpha = Math.acos(cosalph);

    d3.select(this)
        .attr("cx", d.x = circumference_r * Math.cos(alpha))
        .attr("cy", d.y = event.y < 0 ? -circumference_r * Math.sin(alpha) : circumference_r * Math.sin(alpha));
    }


function dragended(event, d) {
    d3.select(this)
        .classed("dragging", false);
    
    //Find the Phi degree of the HandlePosition and compare it to Phi-values of the MarkTicks
    var cosPhi = (d.x / circumference_r)
    var sinPhi = - (d.x / circumference_r)
    var phi = 0

    if (d.y >= 0){
        phi = Math.acos(cosPhi)
        //phi = Math.asin(sinPhi)
    }
    else {
        phi = 2*Math.PI - Math.acos(cosPhi)
        //phi = 2*Math.PI - Math.asin(sinPhi)
    }

    //Finde the closest Tick:
    var closestPhi = tickphiright[0];
    var diff = Math.abs(phi - closestPhi);
    var postion = 0

    for (var val = 0; val < tickphiright.length; val++){
        var newdiff = Math.abs (phi - tickphiright[val]);
        if (newdiff < diff) {
            diff = newdiff;
            closestPhi = tickphiright[val];
            postion = val;
        }
    }

    //Set/Snap handle to closest TickMark:
    d3.select(this)
        .attr("cx", d.x = circumference_r * Math.cos(closestPhi))
        .attr("cy", d.y =circumference_r * Math.sin(closestPhi));


    //Set the MOnth Lable
    d3.select("#MonthLabelJan")
        .text(monthNames[postion])

    //console.log("phi", phi, "CosPhi:", cosPhi, "Cosin", sinPhi)
    //console.log("phi degree", phi* 360/(2*Math.PI))
    //console.log("closest", closestPhi, x_closest, y_closest)


}

/**
 * VISUALIZE SLIDER END
 */






function visualizeBubbles() {

}

