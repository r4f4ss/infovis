/********************************************/
/*Gráfico de área*/
/********************************************/

 var margin = {top: 20, right: 55, bottom: 30, left: 40},
          width  = 1000 - margin.left - margin.right,
          height = 500  - margin.top  - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .rangeRound([height, 0]);

      var stack = d3.layout.stack()
          .offset("zero")
          .values(function (d) { return d.values; })
          .x(function (d) { return x(d.label); })
          .y(function (d) { return d.value; });

      var area = d3.svg.area()
          .interpolate("cardinal")
          .x(function (d) { return x(d.label); })
          .y0(function (d) { return y(d.y0); })
          .y1(function (d) { return y(d.y0 + d.y); });

      var color = d3.scale.ordinal()
          .range(["#001c9c","#101b4d","#475003","#9c8305","#d3c47c"]);

      var svg = d3.select("body").append("svg")
          .attr("width",  width  + margin.left + margin.right)
          .attr("height", height + margin.top  + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.csv("data/exemplo.csv", function (error, data) {

        var labelVar = 'quarter';
        var varNames = d3.keys(data[0])
            .filter(function (key) { return key !== labelVar;});

        color.domain(varNames);

        var seriesArr = [], series = {};
        varNames.forEach(function (name) {
          series[name] = {name: name, values:[]};
          seriesArr.push(series[name]);
        });

        data.forEach(function (d) {
          varNames.map(function (name) {
            series[name].values.push({label: d[labelVar], value: +d[name]});
          });
        });

        x.domain(data.map(function (d) { return d.quarter; }));

        stack(seriesArr);

        y.domain([0, d3.max(seriesArr, function (c) { 
            return d3.max(c.values, function (d) { return d.y0 + d.y; });
          })]);

        var selection = svg.selectAll(".series")
          .data(seriesArr)
          .enter().append("g")
            .attr("class", "series");

        selection.append("path")
          .attr("class", "streamPath")
          .attr("d", function (d) { return area(d.values); })
          .style("fill", function (d) { return color(d.name); })
          .style("stroke", "grey");
      });