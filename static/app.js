
// This function will create the new charts.
function buildCharts(newSample) {
	d3.json(`/sample_detail/${newSample}`).then(pie_data => {
		console.log(pie_data);

		var data = [{
		  values: pie_data.map(r => r.value),
		  labels: pie_data.map(r => r.otu_label),
		  text: pie_data.map(r => r.otu_id),
		  type: 'pie'
		}];

		var layout = {
		  showlegend: false
		};

		Plotly.newPlot('pie', data, layout);

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

