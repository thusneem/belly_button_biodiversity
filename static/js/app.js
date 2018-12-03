function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`/metadata/${sample}`).then(function(data) {
    var panel = d3.select("#sample-metadata");
    panel.html("");
    console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        panel
          .append("h6")
          .text(`${key}: ${value}`)
      });   
    
  });
    
} 

    // Use `.html("") to clear any existing metadata
     
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    
    
  
      
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);

  





function buildCharts(sample) {

  //   // @TODO: Use `d3.json` to fetch the sample data for the plots
  url=`/samples/${sample}`;
  d3.json(url).then(function(data) {
    console.log(data);
    
    var sampledata = data;
        
        var bubblechart = [{
          x: sampledata.otu_ids,
          y: sampledata.sample_values,
          mode: 'markers',
          marker: {
            size: sampledata.sample_values,
            color:sampledata.otu_ids              
          }
        }]
        
        
          
        var layout = {
           
            title: 'OTU vs Sample_values',
            showlegend: false,
            yaxis: {
                autorange: true}
            
          };
          
          Plotly.newPlot('bubble', bubblechart, layout);
    
    

  //     // @TODO: Build a Bubble Chart using the sample data


//     // @TODO: Build a Pie Chart
//     // HINT: You will need to use slice() to grab the top 10 sample_values,
//     // otu_ids, and labels (10 each)

    
        var piechart = [{
            values: sampledata.sample_values.slice(0,10),
            labels: sampledata.otu_ids.slice(0,10),
            type: 'pie',
            
          }];
          
          var layout = {
            title: "OTU per Sample",
            yaxis: {
                autorange: true}

          };

        Plotly.newPlot("pie", piechart, layout);
    });
           
  
  }  
        
    
  
function init() {
  //   // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
// Initialize the dashboard
init();
