(function($){
  $(document).ready(function(){
    $('#add-to-list').click(function() {

      $('#added-meds').append('<input type="checkbox" checked="checked" value="' + $('#drug').val() + '" class="added-drug ' + $('#drug').val() + '">' + $('#drug').val());
    })

    $('#my-symptom').click(function() {
      $('#error').empty();
      var symptom = $('#symptom').val();
      var url;

      $.each($('.added-drug'), function(term) {
	term = $(this).val();
	
	url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search=' + term + '+AND+' + symptom + '&count=patient.drug.medicinalproduct.exact';

	$.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data) {
	    
	    var reactions = data.results;
	    
	    
	    for (i = 0; i < reactions.length; i++) {

	      if (term.toUpperCase() == reactions[i]['term']){

		sessionStorage.setItem('drugname-' + reactions[i]['term'], reactions[i]['term']);
		sessionStorage.setItem('drugcount-' + reactions[i]['count'], reactions[i]['count']);

		$('#text').append('<div class="drug-wrap"><span class="drug-term">' + reactions[i]['term'] + '</span> <span class="drug-symptoms">' +  symptom + '</span> <span class="drug-reports">' + reactions[i]['count'] + '</span></div>');

	      }
	      
	    }
	    
	  },
	  error: function(data) {
	    $('#error').append('No results.');
	  }
	});
      });
      setTimeout(barGraph(), 2000);
      ; 
    });

    
    function barGraph() {
      color = 220;
      
      drugName = [];
      drugCount = [];

      for (var key in sessionStorage) {

	if(key.indexOf('drugname-') != -1) {
	  drugName.push(sessionStorage.getItem(key));
	}
	if(key.indexOf('drugcount-') != -1) {
	  drugCount.push(sessionStorage.getItem(key));
	}

      }

      datamap = {
	
	labels: drugName,

	datasets: [
	  {
	    label: "My First dataset",
	    fillColor: 'rgba(' + color + ', ' + color + ',' + color + ', 2)',
	    strokeColor: 'rgba(' + color + ', ' + color + ',' + color + ', 1)',
	    pointColor: 'rgba(' + color + ', ' + color + ',' + color + ', 1)',
	    pointStrokeColor: "#fff",
	    pointHighlightFill: "#fff",
	    pointHighlightStroke: 'rgba(' + color + ', ' + color + ',' + color + ', 1)',
	    data: drugCount,
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
      
    }
    
  })
})(jQuery);
