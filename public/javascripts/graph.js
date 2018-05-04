
var chart = dc.pieChart("#test");
var selectrider = dc.selectMenu("#rider-select");
var barChart = dc.barChart("#bar-chart");

d3.json("/data").then(function(experiments) {

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
    .dimension(dateDimension)
    .group(ageGroup)

barChart
 .width(768)
 .height(380)
 .x(d3.scaleTime().domain([minDate, maxDate]))
 .xUnits(d3.timeFormat("%b"))

 .elasticY(true)
 .xAxisLabel('Month')
 .yAxisLabel('Distance Ridden')
 .dimension(dateDimension)
 .barPadding(0.5)
 .outerPadding(0.10)
 .group(distanceGroup)
 .brushOn(false);

selectrider
  .dimension(riderDim)
  .group(riderGroup);

dc.renderAll();
});


 // Create varibale and their id's to use in the html
