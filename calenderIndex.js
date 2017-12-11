(function() {

  var margin = { top: 15, left: 0, right: 0, bottom: 0},
    height = 40 - margin.top - margin.bottom,
    width = 900 - margin.left - margin.right;

  var svg = d3.select("#calIndex")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xPositionScale = d3.scaleBand()
    .domain(["0", "1", "2", "3", "4", "5", "6"])
    .range([350, 800])
    .padding(0.2);

  var colorScale = d3.scaleQuantize()
      .domain([0, 6])
      .range(['#ffffff','#fee5d9','#fcbba1','#fc9272','#fb6a4a','#de2d26','#a50f15']);

  d3.queue()
    .defer(d3.csv, "Data/index.csv", function(d) {
      d.no = +d.no
      return d
    })
    .await(ready);


  function ready(error, datapoints) {
    console.log(datapoints)

    svg.selectAll("rect")
        .data(datapoints)
        .enter().append("rect")
        .attr("height", 17)
        .attr("width", 17 )
        .attr("y", 0)
        .attr("x", function(d, i) { return xPositionScale(d.no)})
        .attr("fill", function(d) { return colorScale(d.no)})
        .attr("stroke", 'black')

    svg.selectAll("text")
        .data(datapoints)
        .enter().append("text")
        .attr("y", 14)
        .attr("x", function(d, i) { return xPositionScale(d.no)})
        .text(function(d) { return d.no })
        .attr("dx", 25)
        .attr("font-size", 14)
        .attr("fill", 'black')
        .attr("font-family", "Helvetica")


    svg.append("text")
        .attr("y", 14)
        .attr("x", 0)
        .text("Number of shootings happend on a certain day:")
        .attr("font-size", 16)
        .attr("fill", 'black')
        .attr("font-family", "Helvetica")
    }
  
})();