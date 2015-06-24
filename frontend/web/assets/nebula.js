
// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
// 

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(colors,data) {

    // Create the data table.
    var data = google.visualization.arrayToDataTable(data );
    // Set chart options
    var options = {
        width: 800,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
	colors: colors,
        isStacked: true
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('drug-chart'));
    chart.draw(data, options);
}
// Sorts (descending), an object that has numeric keys
function sortObjectByValue(obj) {
	var sortable = [];
	for (var k in obj) {
	    sortable.push([k, obj[k]]);
         }
	sortable.sort(function(a, b) {return b[1] - a[1]});
	return sortable;
}


(function($){
    $(window).resize(function(){
	    barGraph();
	});

  $(document).ready(function(){
    sessionStorage.clear();
    var drugChart;
    var count = 0;
    
    // Add predicatable color patterns for bars.
    var red = 'rgba(255,0,0,0.7)';
    var green = 'rgba(0,255,0,0.7)';
    var blue = 'rgba(0,0,255,0.7)';
    var grey = 'rgba(192,192,192,0.7)';
    var yellow = 'rgba(255,255,0,0.7)';
    var cerise = 'rgba(255,0,255,0.7)';
    var ran1 = 'rgba(255,255,0,0.7)';
    var ran2 = 'rgba(0,255,255,0.7)';
    var ran3 = 'rgba(100,0,255,0.7)';
    var ran4 = 'rgba(0,100,255,0.7)';
    var ran5 = 'rgba(50,50,255,0.7)';
    var ran6 = 'rgba(200,20,255,0.7)';
    var ran7 = 'rgba(150,20,155,0.7)';
    var ran8 = 'rgba(60,150,55,0.7)';
    var ran9 = 'rgba(200,220,55,0.7)';

 
    var bgColor = ['red', 'green', 'blue', 'grey', 'yellow', 'cerise',
		   'ran1', 'ran2', 'ran3', 'ran4','ran5', 'ran6', 'ran7',
		   'ran8', 'ran9','red', 'green', 'blue', 'grey', 'yellow',
		   'cerise', 'ran1', 'ran2', 'ran3','ran4', 'ran5',
		   'ran6', 'ran7', 'ran8', 'ran9',
		   'red', 'green', 'blue', 'grey', 'yellow', 'cerise',
		   'ran1', 'ran2', 'ran3', 'ran4', 'ran5', 'ran6', 'ran7',
		   'ran8', 'ran9', 'red', 'green', 'blue', 'grey', 'yellow',
		   'cerise', 'ran1', 'ran2', 'ran3', 'ran4', 'ran5',
		   'ran6', 'ran7', 'ran8', 'ran9'];
 
    var bgColorCodes = ['red', 'green', 'blue', 'grey', 'yellow'];

    
    $('#add-to-list').click(function(){
      if($('#drug').val().length){
	appendItems();
	addItems();
      }
      
    });
    
    $(document).change(function(){
      $('.added-drug').each(function(){
	$(this).click(function(){
	  addItems();
	  
	});   
      });  
    });
    
    function appendItems() {
      // Build our checkbox toggles.

      if ($('.added-drug').length != -1) {
	var checks = $('.added-drug').length;	
      }
      else {
	var checks = 0;	
      }
      $('#text').append('<div class="checkholder"><input type="checkbox" checked="checked" value="'
			+ $('#drug').val()
			+ '" class="added-drug '
			+ $('#drug').val() + '">'
			+ $('#drug').val()
			+ '<div class="check-color" style="background: ' + bgColor[checks]  + '"></div></div>');

    }
    function addItems() {	
      
      $('#error').empty();
      var symptom = $('#symptom').val();
      var url;

      $.each($('.added-drug'), function(term) {
	term = $(this).val();
	// We only want to pull in terms that correspond to a checked box.
	if($(this).is(":checked")) {
	  
	  url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search='
	    + term + '&limit=5&count=patient.reaction.reactionmeddrapt.exact';

	  $.ajax({
	    url: url,
	    type: 'GET',
	    term: term,
	    success: function(data) {
	      var reactions = data.results;
	      // I will store drug, symtomp, count objects in here in order to have all data.
	      var triplets = [];
	      for (i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		triplets.push( { drug: this.term,
				 symptom: reactions[i]['term'],
				 count: reactions[i]['count']});
	      }
	      sessionStorage.setItem(term,JSON.stringify(triplets));
	      setTimeout(barGraph(), 200);
	    },
	    error: function(data) {
	      $('#error').append("We are unable to show data for this drug because we can't normalize the usage data when compared to other drugs. For specific adverse effects please refer to other sources.<br /><br />");
	    }
	  });
	} else {
	  // If it isn't checked, remove the key so that it doesn't display in graph.
	  sessionStorage.removeItem(term);	  
	}
      });
      $('#drug').val('');
      
    };
    
    function barGraph() {

      // We can't use just flat arrays here.  Each drugName must contain an array as it's entry, which is the 
      // mapping from Symptom to count that we need.
      var allData = [];
      var randomColorFactor = function(){ return Math.round(Math.random()*255)};
      var tempData = [];
      for (var key in sessionStorage) {
	var triplets = JSON.parse(sessionStorage.getItem(key));
	tempData[key] = triplets;
      }

      // Now we need to build a list of symptoms in a fixed order.
      var allSymptoms = [];
      for (var k in tempData) {
	var triplets = tempData[k];
	
	for(var okey in triplets) {
	  var obj = triplets[okey];
	  
	  if (obj.symptom in allSymptoms) {
	    allSymptoms[obj.symptom] += obj.count;
	  }
	  else {
	    allSymptoms[obj.symptom] = obj.count;
	  }
	}
      }

      allSymptomsAsArray = sortObjectByValue(allSymptoms);
      // Now that we need to build a time series for each symptom in the proper order
      var symptomKeys = [];
      for (var k in allSymptomsAsArray) {
	  symptomKeys.push(allSymptomsAsArray[k][0]);
      }
      
      var colorCount = 0;
      for (var k in tempData) {
	var timeSeries = [];
	for (var n = 0; n < symptomKeys.length; n++) {
	  var i = 0;
	  var triplets = tempData[k];
	  var mycount = undefined;
	  for (i = 0; i < triplets.length; i++) {
	    var triplet = triplets[i];
	    if ((triplet.drug == k) && (triplet.symptom == symptomKeys[n])) {
	      mycount = triplet.count;
	    }
	  }
	  
	  if (mycount) {
	    timeSeries.push(mycount);
	  } else {
	    timeSeries.push(0);
	  }

	}
	
 	allData.push({
	  label: k,
	  fillColor: bgColor[colorCount],
	  strokeColor: '#888',
	  data: timeSeries,
	});
	colorCount++;	
      }

      var datamap = {
	  labels: symptomKeys,
	datasets: allData,
      };

    var datax = [];
      var drugs = Object.keys(tempData);
      for (var n = 0; n < symptomKeys.length; n++) {
	  var timeSeries = [];
	  timeSeries.push(symptomKeys[n]);
	  for (var k in tempData) {
	      var i = 0;
	      var triplets = tempData[k];
	      var mycount = undefined;
	      for (i = 0; i < triplets.length; i++) {
		  var triplet = triplets[i];
		  if ((triplet.drug == k) && (triplet.symptom == symptomKeys[n])) {
		      mycount = triplet.count;
		  }
	      }
	      if (mycount) {
		  timeSeries.push(mycount);
	      } else {
		  timeSeries.push(0);
	      }
	  }
	datax.push(timeSeries);
      }

    drugs.unshift('Drug');
    datax.unshift(drugs);
    drawChart(bgColorCodes,datax);
      
    /*
      var ctx = document.getElementById("drug-chart").getContext("2d");
      if (count > 0) {
	// Force chart rebuild whdn items are added.
	drugChart.destroy();
      }
      count += 1;
      drugChart = new Chart(ctx).StackedBar(datamap, {
	responsive : true
      });     
    */
    }
    
  })
})(jQuery);
