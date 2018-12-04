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
          var level = data.WFREQ ;
      console.log(level);
      var degrees = 9-level,
        radius = .5;
        console.log(degrees);
      var radians = degrees * Math.PI / 9;
      console.log(radians);
      var x = radius * Math.cos(radians);
      console.log(x);
      var y = radius * Math.sin(radians);
      console.log(y);
      // Path: may have to change to create a better triangle
      var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
      var path = mainPath.concat(pathX,space,pathY,pathEnd);
      var data = [{ type: 'scatter',
        x: [0], y:[0],
          marker: {size: 28, color:'850000'},
          showlegend: false,
          name: 'speed',
          text: level,
          hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9,50],
        rotation: 90,
        text: ['8-9','7-8','6-7','5-6' ,'4-5','3-4','2-3','1-2','0-1',''],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(14, 145, 0, .5)','rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                              'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                              'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                              'rgba(239, 235, 220,.5)','rgba(247, 245, 237, .5)','rgba(255, 255, 255, 0)']},
        labels: ['8-9','7-8','6-7','5-6' ,'4-5','3-4','2-3','1-2','0-1',''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }];
      
      var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
              color: '850000'
            }
          }],
        title: '<b>Belly button washing frequency</b> <br> scrubs per week',
        height: 1000,
        width: 1000,
        xaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                  showgrid: false, range: [-1, 1]}
      };
      
      Plotly.newPlot('gauge', data, layout);
        
        
  });
    
} 

    
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
          text:sampledata.otu_labels,
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
