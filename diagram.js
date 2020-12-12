const sample = [
    {
        month: 'Jan',
        value: 78
    },
    {
        month: 'Feb',
        value: 75
    },
    {
        month: 'Mar',
        value: 68
    },
    {
        month: 'Apr',
        value: 67
    },
    {
        month: 'May',
        value: 65
    },
    {
        month: 'Jun',
        value: 65
    },
    {
        month: 'Jul',
        value: 61
    },
    {
        month: 'Aug',
        value: 60
    },
    {
        month: 'Sep',
        value: 59
    },
    {
        month: 'Okt',
        value: 70
    },
    {
        month: 'Nov',
        value: 80
    },
    {
        month: 'Dec',
        value: 100
    }
];

const svg = d3.select('svg');
const svgContainer = d3.select('#upperDiagramm');

const margin = 80;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;

const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

const xScale = d3.scaleBand()
    .range([0, width])
    .domain(sample.map((s) => s.month))
    .padding(0.4)

const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

const makeYLines = () => d3.axisLeft()
    .scale(yScale)

chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

chart.append('g')
    .call(d3.axisLeft(yScale));

chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
    )

const barGroups = chart.selectAll()
    .data(sample)
    .enter()
    .append('g')

barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.month))
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => height - yScale(g.value))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
            .attr('opacity', 0)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', (a) => xScale(a.month) - 5)
            .attr('width', xScale.bandwidth() + 15)

        const y = yScale(actual.value)

        line = chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)

        barGroups.append('text')
            .attr('class', 'divergence')
            .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) + 30)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .text((a, idx) => {
                const divergence = (a.value - actual.value).toFixed(1)

                let text = ''
                if (divergence > 0) text += '+'
                text += `${divergence}%`

                return idx !== i ? text : '';
            })

    })
    .on('mouseleave', function () {
        d3.selectAll('.value')
            .attr('opacity', 1)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.month))
            .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
    })

barGroups
    .append('text')
    .attr('class', 'value')
    .attr('x', (a) => xScale(a.month) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.value) + 30)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.value}`)

svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Fälle')

svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Monate')

svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Corona Fälle ')

svg.append('text')
    .attr('class', 'source')
    .attr('x', width - margin / 2)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'start')
    .text('Quelle: spiegel-online.de')
