/*
Create Bubble Diagram
*/

json1 = {
    "bubbles": [{
        "id": 1,
        "x": 350,
        "y": 310,
        "r": 90,
        "c": "#e28743", /* orange */
        "label": "analog",
        "img" : ""
    }, {
        "id": 2,
        "x": 550,
        "y": 310,
        "r": 90,
        "c": "#1e81b0", /* blue */
        "label": "digital",
        "img" : ""
    }, 
    //analog
    {
        "id": 3,
        "x": 350,
        "y": 100,
        "r": 90,
        "c": "#e28743", /* orange */
        "label": "Health",
        "img": "health.png"

    }, {
        "id": 4,
        "x": 150,
        "y": 190,
        "r": 90,
        "c": "#e28743", /* orange */
        "label": "News",
        "img": "newsPaper_icon.png"

    }, {
        "id": 5,
        "x": 150,
        "y": 410,
        "r": 90,
        "c": "#e28743", /* orange */
        "label": "freetime",
        "img": "music.PNG"
    }, 
    {
        "id": 6,
        "x": 350,
        "y": 510,
        "r": 90,
        "c": "#e28743", /* orange */
        "label": "sports",
        "img": "sport.PNG"
    }, 
    //digital
    {
        "id": 7,
        "x": 550,
        "y": 510,
        "r": 90,
        "c": "#1e81b0", /* blue */
        "label": "sports",
        "img": "sport.PNG"
    }, {
        "id": 8,
        "x": 550,
        "y": 100,
        "r": 90,
        "c": "#1e81b0", /* blue */
        "label": "Health",
        "img": "health.png"
    }, {
        "id": 9,
        "x": 750,
        "y": 190,
        "r": 90,
        "c": "#1e81b0", /* blue */
        "label": "News",
        "img": "newsPaper_icon.png"
    }, {
        "id": 10,
        "x": 750,
        "y": 410,
        "r": 90,
        "c": "#1e81b0", /* blue */
        "label": "freetime",
        "img": "music.PNG"
    }
    ]
}

function bubbleChart(){
    
    var width = 960,
    height = 800;

    var center = {x: width/2, y: height/2};

    var categoryCenters = {
        2020: {x: width/3, y: height/2},
        2021: {x: 2* width/3, y: height/2}
    }

    //x locations of analog titels
    var centerTitelsX = {
        2020: 160,
        2021: width -160
    }

    var forceStrength = 0.02;

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
        // .force('charge', d3.forceManyBody().strength(charge))
        // .on('tick', ticked);
        .force('charge', d3.forceManyBody().strength(charge))
        .force('collision', d3.forceCollide().radius(d => d.radius + 1));

    simulation.stop();

    //colors?
    var fillColor = d3.scaleOrdinal()
    .domain(['digital', 'analog'])
    .range('#1e81b0', '#e28743e');

    function createNodes(rawData){
    
        var maxAmount = d3.max(rawData, function (d){return +d.verkauf;});

        const radiusScale = d3.scaleSqrt()
            .domain([0, maxSize])
            .range([0, 80])


        // var radiusScale = d3.scalePow()
        //     .exponent(0.5)
        //     .range([2 ,85])
        //     .domain([0,maxAmount]);

        //TODO convert raw data/parsed data in to node
        var myNodes = rawData.map(function(d){
            return{
                id: d.id,
                radius : radiusScale(+d.verkauf),
                value: +d.verkauf,
                name: d.titel,
                group: d.group,
                x: Math.random() * 600,
                y: Math.random() * 500
            };
        });

        // myNodes.sort(function (a, b) { return b.value - a.value; });

        return myNodes;

    }


    var chart = function chart(selector, rawData){
        nodes = createNodes(rawData);

        svg = d3.select(selector)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        
        const elements = svg.selectAll('.bubble')
            .data(nodes, d=> d.id)
            .enter()
            .append('g')

        bubbles = elements
            .append('circle')
            .classed('bubble', true)
            .attr('r', d => d.radius)
            .attr('fill', d => fillColour(d.group))

        lables = elements
            .append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .style('font-size', 10)
            .text(d => d.id)

        // var bubblesE = bubbles.enter().append('circle')
        // .classed('bubble', true)
        // .attr('r', 0)
        // .attr('fill', function (d) { return fillColor(d.group); })
        // //.attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
        // .attr('stroke-width', 2)
        // //.on('mouseover', showDetail)
        // // .on('mouseout', hideDetail);

        // bubbles = bubbles.merge(bubblesE)

        bubbles.trasition()
            .duration(2000)
            .attr('r', function (d) { return d.radius; });

        simulation.nodes(nodes)
            .on('tick', ticked)
            .restart();

        // groupBubbles();

    };

    //callback function for every simulation tick, positioing of circles

    function ticked() {
        bubbles
          .attr('cx', function (d) { return d.x; })
          .attr('cy', function (d) { return d.y; });

        lables
            .attr('x', d => d.x)
            .attr('y', d => d.y)
    }

    return chart;

}

let myBubbleChart = bubbleChart();

function display(data){
    myBubbleChart('#bubbles', data);
}

dataread = d3.csv('bubbles_dummydata.csv');
console.log(dataread)
display(dataread);


//    // Provides a x value for each node to be used with the split by year
//   function nodeYearPos(d) {
//       //TODO? wat is d.xear here??
//     return categoryCenters[d.year].x;
//   }

//   function groupBubbles(){
//     hideYearTitles()

//        // @v4 Reset the 'x' force to draw the bubbles to the center.
//     simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

//     // @v4 We can reset the alpha value and restart the simulation
//     simulation.alpha(1).restart();
//   }

//   function splitBubbles() {
//     showYearTitles();

//     // @v4 Reset the 'x' force to draw the bubbles to their year centers
//     simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));

//     // @v4 We can reset the alpha value and restart the simulation
//     simulation.alpha(1).restart();
//   }

//   function hideYearTitles() {
//     svg.selectAll('.year').remove();
//   }

//   function showYearTitles() {
//     // Another way to do this would be to create
//     // the year texts once and then just hide them.
//     var yearsData = d3.keys(yearsTitleX);
//     var years = svg.selectAll('.year')
//       .data(yearsData);

//     years.enter().append('text')
//       .attr('class', 'year')
//       .attr('x', function (d) { return yearsTitleX[d]; })
//       .attr('y', 40)
//       .attr('text-anchor', 'middle')
//       .text(function (d) { return d; });
//   }

//   chart.toggleDisplay = function (displayName) {
//     if (displayName === 'year') {
//       splitBubbles();
//     } else {
//       groupBubbles();
//     }
//   };


//   // return the chart function from closure.
// //   return chart;
// // }

// var myBubbleChart = bubbleChart();