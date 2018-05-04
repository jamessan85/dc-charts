
var chart = dc.pieChart("#test");
var selectrider = dc.selectMenu("#rider-select");
var barChart = dc.lineChart("#bar-chart");

d3.json("/data").then(function(experiments) {

    ages = []
    for (var i = 0; i <experiments.length; i++) {
        ages.push(experiments[i].Age);
    }

    d3.select(".chart")
      .selectAll("div")
      .data(ages)
        .enter()
        .append("div")
        .style("width", function(d) { return d + "px"; })
        .text(function(d) { return d; });


  var ndx = crossfilter(experiments)

  var parseDate = d3.timeParse("%Y-%m-%d");

    experiments.forEach(function (d){
        d.date = parseDate(d["Date"]);
        d.year = d.date.getFullYear();
        d.Name = d["Name"];
        d.age = d["Age"];
    })

    // dimensions
    dateYear = ndx.dimension(function(d) {
        return d.year
    })

    dateDimension = ndx.dimension(function(d) {
        return d.date
    })

    riderDim = ndx.dimension(function(d) {
        return d.Name
    })

    // groups
    distanceGroup = dateDimension.group().reduceSum(function(d) {
            return d["Distance"];
    });

    distanceYearGroup = dateYear.group().reduceSum(function(d) {
            return d["Distance"];
    });

    ageGroup = dateYear.group().reduceSum(function(d) {
        return d.age
    })

    riderGroup = riderDim.group();

    var minDate = dateDimension.bottom(1)[0].date;

    var maxDate = dateDimension.top(1)[0].date;

chart
    .width(768)
    .height(480)
    .innerRadius(100)
    .dimension(dateYear)
    .group(distanceYearGroup)

barChart
 .width(500)
 .height(380)
 .x(d3.scaleTime().domain([minDate, maxDate]))
 .xUnits(d3.timeFormat("%b"))
 .elasticY(true)
 .xAxisLabel('Month')
 .yAxisLabel('Distance Ridden')
 .dimension(dateDimension)
 .group(distanceGroup)
 .brushOn(true);

selectrider
  .dimension(riderDim)
  .group(riderGroup);



dc.renderAll();


});







 // Create varibale and their id's to use in the html
