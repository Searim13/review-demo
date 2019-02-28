
// This function will create the new charts.
function buildCharts(newSample) {
	d3.json(`/sample_detail/${newSample}`).then(pie_data => {
		console.log(pie_data);

		var data = [{
		  values: pie_data.map(r => r.value).slice(0, 10),
		  labels: pie_data.map(r => r.otu_label).slice(0, 10),
		  text: pie_data.map(r => r.otu_id).slice(0, 10),
		  type: 'pie'
		}];

		var layout = {
		  showlegend: false
		};

		Plotly.newPlot('pie', data, layout);


		var trace1 = {
		  x: pie_data.map(r => r.otu_id),
		  y: pie_data.map(r => r.value),
		  text: pie_data.map(r => r.otu_label),
		  mode: 'markers',
		  marker: {
		    size: pie_data.map(r => r.value),
		    color: pie_data.map(r => r.otu_id),
		    colorscale: "Earth"
		  }
		};

		var data = [trace1];

		var layout = {
		  title: 'Fancy Bubbles',
		  showlegend: false,
		  height: 600,
		};

		Plotly.newPlot('bubble', data, layout);



	});
}

// This is called everytime the sample from the dropdown changes
function optionChanged(newSample) {
	console.log(`You selected ${newSample}`);
	buildCharts(newSample);
}

// This will happen when page is loaded! 
d3.json('/samples').then(flask_data => {
	d3.select('#selDataset')
	  .selectAll('option')
	  .data(flask_data)
	  .enter()
	  .append('option')
	  .text(r => r.SAMPLE)
	  .attr('value', r => r.SAMPLE);

	buildCharts(flask_data[0].SAMPLE);
});

