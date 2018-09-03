function plot_parallel(d){
				

	        	document.getElementById('vis').style.display = 'block';
	        	document.getElementById('vis').innerHTML ="<h1>Título do gráfico</h1>"
				  var chart = d3.parsets()
				      .dimensions(atributos);
				      
				var vis = d3.select("#vis").append("svg")
				    .attr("width", chart.width())
				    .attr("height", chart.height());

				if(d.name=="a"){
					file_in="data/sim_tratada.csv";
				}
				else{
					file_in="data/sim_tratada_mod.csv";
				}

				d3.csv(file_in, function(error, csv) {
				  vis.datum(csv).call(chart);
				});

}
function remove_plot(){
	d3.select("vis").remove();
}

/********************************************/
/*Gráfico de barras*/
/********************************************/

var data = [{
                "name": "a",
                "value": 20,
        },
            {
                "name": "b",
                "value": 12,
        },
            {
                "name": "c",
                "value": 19,
        },
            {
                "name": "d",
                "value": 5,
        },
            {
                "name": "e",
                "value": 16,
        },
            {
                "name": "f",
                "value": 26,
        },
            {
                "name": "g",
                "value": 30,
        }];

        //sort bars based on value
        data = data.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };

        var width = 350 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#graphic").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.value;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.name;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("fill", "#EE0000")
            .attr("width", function (d) {
                return x(d.value);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });

        var barsAt = svg.selectAll(".bar")
        	.on("click", function(d) {	

        		nomeGlobal=d;
	        	plot_parallel(d);


	        	var modal = document.getElementById('myModal');
	        	var btn = document.getElementById("myBtn");
	        	var span = document.getElementsByClassName("close")[0];
	        	modal.style.display = "block";

				span.onclick = function() {
	    			modal.style.display = "none";
	    			document.getElementById('vis').innerHTML ='<div id="vis"><noscript><img src="parsets.png"></noscript></div>';
				}

				window.onclick = function(event) {
				    if (event.target == modal) {
				        modal.style.display = "none";
				        document.getElementById('vis').innerHTML ='<div id="vis"><noscript><img src="parsets.png"></noscript></div>';
				    }
				}
        	});