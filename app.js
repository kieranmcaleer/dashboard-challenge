function populateDropdown(){
    d3.json("samples.json").then( function(data){
        console.log(data)
        var select=document.getElementById('selDataset');
        var samples =data.samples
        samples.forEach(function (arrayItem) {
            var id = arrayItem.id;
            var el = document.createElement("option");
            el.textContent = id;
            el.value = id;
            select.appendChild(el)
        })
    })
}

function gatherData(){
    d3.json("samples.json").then( function(data){
        var selected_id = d3.select('#selDataset').property("value");
        var samples = data.samples
        var metadata = data.metadata
        samples.forEach(function (arrayItem) {
            var id = arrayItem.id;

            if(id==selected_id){
                var sample_values = arrayItem.sample_values
                var otu_ids = arrayItem.otu_ids
                var otu_labels = arrayItem.otu_labels
                var reversed_samples = sample_values.slice(0, 10).reverse()
                var reversed_ids = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
                var reversed_labels = otu_labels.slice(0, 10).reverse()
                var bar_data = [
                    {
                        y: reversed_ids,
                        x: reversed_samples,
                        hovermode: reversed_labels,
                        type: "bar",
                        orientation:'h'
                    }
                ];
                var bar_layout = {
                    margin: { t:30, l: 150}
                };
                Plotly.newPlot("bar", bar_data,bar_layout);
                var bubble_values=[{
                    x: otu_ids,
                    y: sample_values,
                    text: otu_labels,
                    mode: "markers",
                    marker: {
                        size: sample_values,
                        color: otu_ids,
                        colorscale: "Jet"
                    }
                }]
                var layout = {
                    title: `Data for  ${selected_id}`,
                    margin: { t:0},
                    hovermode: "closest",
                    xaxis: {title: "OTU ID"},
                    margin: { t: 30}
                };
                Plotly.newPlot("bubble", bubble_values, layout);


                
            };
        })
        metadata.forEach(function (arrayItem) {
            var id = arrayItem.id;

            if(id==selected_id){
                document.getElementById("sample-metadata").innerHTML = `id: ${arrayItem.id}<br> ethnicity: ${arrayItem.ethnicity}<br> gender: ${arrayItem.gender}<br> age: ${arrayItem.age}<br> location: ${arrayItem.location}<br> bbtype: ${arrayItem.bbtype}<br> wfreq: ${arrayItem.wfreq}  `
               
            }
        })

    })

}


populateDropdown();
document.getElementById("selDataset").addEventListener("change",  gatherData);
