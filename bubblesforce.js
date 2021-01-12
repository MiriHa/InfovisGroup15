/*
Create Bubble Diagram
*/

function bubbleChart(){

    
    var width = 660,
    height = 400;

    var center = {x: width/2, y: height/2};


    var categoryCenters ={
        1: {x: width/3, y: height/2},
        2: {x: 2* width/3, y: height/2}
    }


    //x locations of analog titels
    var centerTitelsX = {
        1: 160,
        2: width -160
    }

    var forceStrength = 0.03;

    var svg = null;
    var bubbles = null;
    var labels = null
    var nodes = [];

    function charge(d){
        return -Math.pow(d.radius, 2.0)*forceStrength
    }

    var simulation = d3.forceSimulation()
        .velocityDecay(0.2)
        .force('x', d3.forceX().strength(forceStrength).x(center.x))
        .force('y', d3.forceY().strength(forceStrength).y(center.y))
        .force('charge', d3.forceManyBody().strength(charge))
        .force('collision', d3.forceCollide().radius(d => d.radius + 1))
        .on('tick', ticked);

    simulation.stop();

    //colors?
    // var fillColor = d3.scaleOrdinal()
    //     .domain(["1", "2", "3"])
    //     .range("#1e81b0", "#e28743e", "#e28743e");

    function fillColor(groupid){
        if (groupid==1){
            return "#1e81b0";
        }
        else if(groupid == 2){
            return "#e28743";
        }
        else{
            return "#e28743";
        }
    }



    function createNodes(){
    
        // var maxAmount = d3.max(rawData, function (d){return +d.verkauf;});
        var maxAmount = 13457835

        const radiusScale = d3.scaleSqrt()
            .domain([0, maxAmount])
            .range([0, 80])


        // var radiusScale = d3.scalePow()
        //     .exponent(0.5)
        //     .range([2 ,85])
        //     .domain([0,maxAmount]);

        var myrawNodes = [ 
            {"title":"sport" ,"id": 1, "verkauf":230435, "group":1},
            {"title":"sport" ,"id": 2, "verkauf":13457835,"group":1},
            {"title":"sport" ,"id": 3, "verkauf":789735, "group":1},
            {"title":"sport" ,"id": 1, "verkauf":230435, "group":1},
            {"title":"sport" ,"id": 2, "verkauf":13457835,"group":1},
            {"title":"sport" ,"id": 3, "verkauf":789735, "group":1},
            {"title":"sport" ,"id": 4, "verkauf":2344435, "group":2},
            {"title":"sport" ,"id": 5, "verkauf":9808835, "group":2},
            {"title":"sport" ,"id": 6, "verkauf":2368735, "group":2},
            {"title":"sport" ,"id": 4, "verkauf":2344435, "group":2},
            {"title":"sport" ,"id": 5, "verkauf":9808835, "group":2},
            {"title":"sport" ,"id": 6, "verkauf":2368735, "group":2}
            ];

        //TODO convert raw data/parsed data in to node
        var myNodes = myrawNodes.map(function(d){
            return{
                id: d.id,
                radius : radiusScale(+d.verkauf),
                value: +d.verkauf,
                name: d.title,
                group: d.group,
                x: Math.random() * 460,
                y: Math.random() * 300
            };
        });

        // console.log(myNodes)

        // var myNodes = d3.csv("bubbles_dummydata.csv", function(d) {
        //     return {
        //         id: d.id,
        //         radius : radiusScale(+d.verkauf),
        //         value: +d.verkauf,
        //         name: d.titel,
        //         group: d.group,
        //         x: Math.random() * 600,
        //         y: Math.random() * 500
        //     };
        //   }, function(error, rows) {
        //     console.log(rows);
        //   });


        myNodes.sort(function (a, b) { return b.value - a.value; });

        return myNodes;

    }


    var chart = function chart(selector){
        nodes = createNodes();

        svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        // var elements = svg.selectAll('.bubble')
        //     .data(nodes, function(d){return d.id;})
        //     .enter()
        //     .append('g')

        // bubbles = elements
        //     .append('circle')
        //     .classed('bubble', true)
        //     .attr('r', d => d.radius)
        //     .attr('fill', d => fillColour(d.group))

        // lables = elements
        //     .append('text')
        //     .attr('dy', '.3em')
        //     .style('text-anchor', 'middle')
        //     .style('font-size', 10)
        //     .text(d => d.id)

        bubbles = svg.selectAll('.bubble')
            .data(nodes, function(d) {return d.id});

        var bubblesE = bubbles
        .enter()
        .append('circle')
        .classed('bubble', true)
        .attr('r', function(d) {return d.radius})
        // .attr('fill',  '#1e81b0')
        .attr('fill', function (d) { return fillColor(d.group) })
        //.attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
        .attr('stroke-width', 2)
        //.on('mouseover', showDetail)
        // .on('mouseout', hideDetail);

        var bubblesLab = bubbles
            .enter()
            .append('text')
            .attr('dy', '0.3em')
            .style('text-anchor', 'middle')
            .style('font-size', 10)
            .text(function(d){return d.title})


        bubbles = bubbles.merge(bubblesE)
        bubbles = bubbles.merge(bubblesLab)

        bubbles.transition()
            .duration(20000)
            .attr('r', function (d) { return d.radius; });

        simulation.nodes(nodes)
            .on('tick', ticked)
            .restart();


        splitBubbles()

    };

    //callback function for every simulation tick, positioing of circles

    function ticked() {
        bubbles
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });

        // lables
        //     .attr('x', d => d.x)
        //     .attr('y', d => d.y)
    }


   // Provides a x value for each node to be used with the split by year
  function nodeCatPos(d) {
      //TODO? wat is d.xear here??
      
    return categoryCenters[d.group].x;
    // if (d.group == 1){
    //     return centeranalog
    // }
    // else{
    //     return centerdigital
    // }
  }

  function groupBubbles(){

       // @v4 Reset the 'x' force to draw the bubbles to the center.
    simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

  function splitBubbles() {

    // @v4 Reset the 'x' force to draw the bubbles to their year centers
    simulation.force('x', d3.forceX().strength(forceStrength).x(nodeCatPos));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }

return chart;

}

var myBubbleChart = bubbleChart('#bubbles');

function display(){
    myBubbleChart('#bubbles');
}
 
// d3.csv("bubbles_dummydata.csv", function(data){
//     console.log(data)
//     display(data);
// });
//console.log(dataread)
display();