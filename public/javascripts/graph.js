
var chart = dc.pieChart("#test");
var selectrider = dc.selectMenu("#rider-select");

d3.json("/data").then(function(experiments) {

  var ndx = crossfilter(experiments)

  var parseDate = d3.timeParse("%Y-%m-%d");

    experiments.forEach(function (d){
        d.date = parseDate(d["Date"]);
        d.year = d.date.getFullYear();
        d.Name = d["Name"];
    })

    // dimensions
    runDimension = ndx.dimension(function(d) {
        return d.year
    })

    riderDim = ndx.dimension(function(d) {
        return d.Name
    })

    // groups
    speedSumGroup = runDimension.group().reduceSum(function(d) {
            return d["Distance"];
    });

    var riderGroup = riderDim.group();

  chart
    .width(768)
    .height(480)
    .innerRadius(100)
    .dimension(runDimension)
    .group(speedSumGroup)
    // workaround for #703: not enough data is accessible through .label() to display percentages

  selectrider
      .dimension(riderDim)
      .group(riderGroup);

    dc.renderAll();
});


 // Create varibale and their id's to use in the html
