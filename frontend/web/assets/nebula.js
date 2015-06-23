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
	  + term + '&limit=5&count=patient.reaction.reactionmeddrapt.exact';

	$.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data) {
	    var reactions = data.results;	    
	    for (i = 0; i < reactions.length; i++) {
	      sessionStorage.setItem('drugname-' + term, term);
	      sessionStorage.setItem('drugsymptom-' + reactions[i]['term'], reactions[i]['term']);
	      sessionStorage.setItem('drugcount-' + reactions[i]['count'], reactions[i]['count']);
	    }
	    setTimeout(barGraph(), 200);
	  },
	  error: function(data) {
	    $('#error').append('No results.');
	  }
	});

      });
      
    });
    
    function chunk(arr, len) {

      var chunks = [],
	  i = 0,
	  n = arr.length;

      while (i < n) {
	chunks.push(arr.slice(i, i += len));
      }

      return chunks;
    }
    
    function barGraph() {
      var drugName = [];
      
      var drugSymptom = [];
      var numSymptom = [];
      var numSymptomRaw = [];
      var allData = [];
      var randomColorFactor = function(){ return Math.round(Math.random()*255)};
      
      for (var key in sessionStorage) {
	if(key.indexOf('drugname-') != -1) {	
	  drugName.push(sessionStorage.getItem(key));
	}

	if(key.indexOf('drugsymptom-') != -1) {
	  drugSymptom.push(sessionStorage.getItem(key));
	}
	
	if(key.indexOf('drugcount-') != -1) {
	  numSymptomRaw.push(sessionStorage.getItem(key));
	  
	}	
      }
      numSymptom = chunk(numSymptomRaw, 5);
      console.log(numSymptom);
      
      for (i = 0; i < drugName.length; i++) {

	allData.push({
	  label: drugName,
	  fillColor: 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)',
	  strokeColor: 'yellow',
	  data: numSymptom[i],
	});
	console.log(allData);	
      }   
      
      var datamap = {
	labels: drugSymptom,
	datasets: allData,
      };
      
      var ctx = document.getElementById("drug-chart").getContext("2d");
      if (count > 0) {
	drugChart.destroy();
      }
      count += 1;
      drugChart = new Chart(ctx).StackedBar(datamap, {
	responsive : true
      });     
    }
    
  })
})(jQuery);
