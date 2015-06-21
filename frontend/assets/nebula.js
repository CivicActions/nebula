(function($){
  $(document).ready(function(){
    sessionStorage.clear();
    var drugChart;
    var count = 0;
    $('#add-to-list').click(function() {
      
      $('#added-meds').append('<input type="checkbox" checked="checked" value="'
			      + $('#drug').val()
			      + '" class="added-drug '
			      + $('#drug').val() + '">'
			      + $('#drug').val());

      $('#error').empty();
      var symptom = $('#symptom').val();
      var url;

      $.each($('.added-drug'), function(term) {
	term = $(this).val();
	
	url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search='
	  + term + '&count=patient.reaction.reactionmeddrapt.exact';

	$.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data) {
	    var reactions = data.results;
	    console.log(data.results);
	    
	    for (i = 0; i < 10; i++) {
		sessionStorage.setItem('drugname-' + reactions[i]['term'], reactions[i]['term']);
		sessionStorage.setItem('drugcount-' + reactions[i]['count'], reactions[i]['count']);
	    }
	    setTimeout(barGraph(), 1000);
	  },
	  error: function(data) {
	    $('#error').append('No results.');
	  }
	});

      });
      
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
	datasets: [{
	  label: "Drug results",
	  fillColor: 'rgba(' + color + ', ' + color + ',' + color + ', 2)',
	  strokeColor: 'rgba(' + color + ', ' + color + ',' + color + ', 1)',
	  data: drugCount,
	}]
      };

      var ctx = document.getElementById("drug-chart").getContext("2d");
      if (count > 0) {
	drugChart.destroy();
      }
      count += 1;
      drugChart = new Chart(ctx).Bar(datamap);     
    }
    
  })
})(jQuery);
