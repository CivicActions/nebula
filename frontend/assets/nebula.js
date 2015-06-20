(function($){
  $(document).ready(function(){
    $('#add-to-list').click(function() {

      $('#added-meds').append('<input type="checkbox" checked="checked" value="' + $('#drug').val() + '" class="added-drug ' + $('#drug').val() + '">' + $('#drug').val());
    })

    $('#my-symptom').click(function() {
      $('#error').empty();
      var drug = $('#drug').val();
      var symptom = $('#symptom').val();
      var url;
      
      var addedDrug = $('.added-drug');
      var drugArray = [];

      $.each(addedDrug, function(term, mapDrugs, mapDrugsStr, mapNumbers, mapNumbersStr, datamap) {
	
	var drugStringRaw = drugArray.join();
	var drugString = drugStringRaw.replace(',', '');
	var drugFinal = drugString.substring(0, drugString.length - 1);
	mapDrugs = [];
	mapNumbers = [];
	mapDrugsStr = '';
	mapNumbersStr = '';
	/*
	 * This is code they we may want to revisit for showing drugs taken
	 * in conjunction with searched drug(s) that are assoicated with symptom search.
	 */
	/*
	  url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search="' + drug + '"&count=patient.reaction.reactionmeddrapt.exact';
	  
	  if (drugFinal.length){
	  url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search="' + drug + '+' + drugFinal + '"&count=patient.reaction.reactionmeddrapt.exact';
	  }

	  }
	  
	  if(symptom.length){
	  url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search="' + symptom + '"&count=patient.drug.medicinalproduct.exact';
	  }
	  
	  if(drug.length && symptom.length){
	  url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search="' + drug + '"+AND+"' + symptom + '"&count=patient.drug.medicinalproduct.exact';
	  }
	*/
	
	term = $(this).val();
	
	url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search=' + term + '+AND+' + symptom + '&count=patient.drug.medicinalproduct.exact';
	console.log(url);

	$.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data) {
	    
	    var reactions = data.results
	    
	    for (i = 0; i < reactions.length; i++) {

	      if (term.toUpperCase() == reactions[i]['term']){
		
		$('#text').append('<div id="drug-' + i + '">' + reactions[i]['term'] + ' ' +  symptom +' reports: ' + reactions[i]['count'] +'</div>');

		mapDrugsStr += term + ',';
		mapNumbersStr += reactions[i]['count'] + ',';
	     }
	      
	    }
	    
	    mapDrugsStr = mapDrugsStr.substring(0, mapDrugsStr.length - 1);
	    mapNumbersStr = mapNumbersStr.substring(0, mapNumbersStr.length - 1);
	    console.log(mapDrugsStr);
	    console.log(mapNumbersStr);
	    
	    datamap = {
		
	      labels: [mapDrugsStr],

	      datasets: [
		{
		  label: "My First dataset",
		  fillColor: 'rgba(' + color + ', ' + color + ',' + color + ', 2)',
		  strokeColor: 'rgba(' + color + ', ' + color + ',' + color + ', 1)',
		  pointColor: 'rgba(' + color + ', ' + color + ',' + color + ', 1)',
		  pointStrokeColor: "#fff",
		  pointHighlightFill: "#fff",
		  pointHighlightStroke: 'rgba(' + color + ', ' + color + ',' + color + ', 1)',
		  data: [mapNumbersStr],
		},

	      ]
	    };

	    var options = {
	      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	      scaleBeginAtZero : true,

	      //Boolean - Whether grid lines are shown across the chart
	      scaleShowGridLines : true,

	      //String - Colour of the grid lines
	      scaleGridLineColor : "rgba(0,0,0,.05)",

	      //Number - Width of the grid lines
	      scaleGridLineWidth : 1,

	      //Boolean - Whether to show horizontal lines (except X axis)
	      scaleShowHorizontalLines: true,

	      //Boolean - Whether to show vertical lines (except Y axis)
	      scaleShowVerticalLines: true,

	      //Boolean - If there is a stroke on each bar
	      barShowStroke : true,

	      //Number - Pixel width of the bar stroke
	      barStrokeWidth : 2,

	      //Number - Spacing between each of the X value sets
	      barValueSpacing : 5,

	      //Number - Spacing between data sets within X values
	      barDatasetSpacing : 1,

	      //String - A legend template
	      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	    };

	    var ctx = document.getElementById("drug-chart").getContext("2d");
	    var drugChart = new Chart(ctx).Bar(datamap, options);	
	    
	  },
	  error: function(data) {
	    $('#error').append('No results.');
	  }
	});
      });
      var color = 220;
      
    })
    
  })
})(jQuery);
