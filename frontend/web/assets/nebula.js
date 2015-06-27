(function($){

  // Load the Visualization API and the barchart package.
  google.load('visualization', '1.0', {'packages':['corechart']});

  var mapDrugsIntoColorIndices = {};

  // Set a callback to run when the Google Visualization API is loaded.
  // 

  // Callback that creates and populates a data table,
  // instantiates the bar chart, passes in the data and
  // draws it.
  function drawChart(colors, data) {    
    // Create the data table.
    var numBars = data.length;
    var computedHeight = 28 * numBars;
    var data = google.visualization.arrayToDataTable(data);
    // Set chart options
    var options = {
//      height: window.innerWidth *2.0,
      height: computedHeight,
      legend: {position: 'bottom'},
//      bar: {groupWidth: '60%'},
      title: 'Reported Side Effects',
      subtitle: 'From OpenFDA Adverse Events Database',
      chartArea: {'top': 0, 'width': '50%', 'float': 'right'},
      colors: colors,
      isStacked: true,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('drug-chart'));
    chart.draw(data, options);
    $(window).resize(function() {
      options.height = window.innerWidth / 1.2;
      chart.draw(data, options);
    });
  }

  // Callback that creates and populates a data table,
  // instantiates the bar chart, passes in the data and
  // draws it.
  function drawPieChart(colors, data) {    
    // Create the data table.
    var data = google.visualization.arrayToDataTable(data);
    // Set chart options
    var options = {
      title: 'Relative Reported Number of Prescriptions',
      subtitle: 'From AHRQ MEPS Data',
      height: 400,
      width: 400,
      legend: {position: 'bottom'},
      colors: colors,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
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

  $(document).ready(function(){

    // Build our autocomplete
    $.ajax({
      url: "https://api.sideeffect.io/rx.json",
      dataType: 'json',
    }).success(function(data) {
      var source = $.map(data, function(term) {
        return term
      });

      $("#drug").autocomplete({
	source: source
      });	      
    });
    
    sessionStorage.clear();

    var drugChart;
    var count = 0;

    // Add predicatable color patterns for bars.
    var silver = '#F7F7F7';
    var grain = '#CECECE';
    var rain = '#75787b';
    var chrono = '#5D6B75';
    var ocean = '#007FAA';
    var sky = '#3FA9F5';
    var grass = '#00A159';

    var silver2 = '#e2dfdf';
    var grain2 = '#Cfdfdf';
    var rain2 = '#799999';
    var chrono2 = '#5b6e7b';
    var ocean2 = '#007777';
    var sky2 = '#3Fffff';
    var grass2 = '#00cccc';

    var silver3 = '#787878';
    var grain3 = '#Cacaca';
    var rain3 = '#75587b';
    var chrono3 = '#5D2222';
    var ocean3 = '#005aaA';
    var sky3 = '#3FaAdd';
    var grass3 = '#039051';


    var bgColor = [ocean, grass, rain, sky, grain, chrono,
		   ocean2, grass2, rain2, sky2, grain2, chrono2,
		   ocean3, grass3, rain3, sky3, grain3, chrono3,
		   ocean, grass, rain, sky, grain, chrono,
		   ocean2, grass2, rain2, sky2, grain2, chrono2,
		   ocean3, grass3, rain3, sky3, grain3, chrono3
	];

    
    // Load our saved searches.
    loadSaved();

    $('#add-to-list').click(function() {
      if($('#drug').val().length){
	appendItems();
	addItems();

      }
      else{	
	loadSaved();
      }
    });

    // Used for grabbing url query.
    function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	  results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    } 
    
    function appendItems() {
      
      // Build our checkbox toggles.
      if ($('.added-drug').length != -1) {
	var checks = $('.added-drug').length;	
      }
      else {
	var checks = 0;	
      }

      // Build fron query if it exists.
      if (getParameterByName('saved') && count == 0) {
	
	var savedItems = getParameterByName('saved');
	var savedItemsArr = savedItems.split(' ');
	
	for(i = 0; i < savedItemsArr.length; i++) {
	  $('#added-meds').append('<div class="checkholder" id="' + savedItemsArr[i] + '"><input type="checkbox" checked="checked" value="'
			    + savedItemsArr[i]
			    + '" class="added-drug '
			    + savedItemsArr[i] + '">'
			    + savedItemsArr[i]
			    + '<div class="check-color" data-color="' + bgColor[i] + '" style="background: ' + bgColor[i]  + '"></div></div>');
	  // Here we maintain the color mapping to match the HTML status. 
	  mapDrugsIntoColorIndices[savedItemsArr[i]] = i;
	}
	count++;
	
      }
      // Build from input.
      else {
	
	$('#added-meds').append('<div class="checkholder" id="' + $('#drug').val() + '"><input type="checkbox" checked="checked" value="'
			  + $('#drug').val()
			  + '" class="added-drug '
			  + $('#drug').val() + '">'
			  + $('#drug').val()
			  + '<div class="check-color" data-color="' + bgColor[checks] + '" style="background: ' + bgColor[checks]  + '"></div></div>');
	  // Here we maintain the color mapping to match the HTML status. 
	  mapDrugsIntoColorIndices[$('#drug').val()] = checks;
      }
      
      var urlBase = window.location.origin + '?saved=';
      var queryItems = [];
      $('.added-drug').each(function(){
	queryItems.push($(this).val());
	
      });
      
      varlinkUrl = urlBase + queryItems.join('+');	
      sessionStorage.setItem('link', JSON.stringify(varlinkUrl));
      if(sessionStorage.getItem('link')){
	link = sessionStorage.getItem('link');
	sanitizedLink = link.replace(/"/g, '')
	$('#link-save').html('<h3>Link to this search:</h3> ' + '<a href="' + sanitizedLink + '">' + sanitizedLink + '</a>');
	
      }

      // This limits the colors allowed by the graph to checkboxes that are on - keeps things in sync.
      var revisedPalette = [];
      $('.check-color').each(function() {
	if($(this).siblings().prop("checked")) {	  
	  
	  revisedPalette.push($(this).attr('data-color'));
	}
//	sessionStorage.setItem('colorscheme', JSON.stringify(revisedPalette));	  
      });      
    }

    $(document).change(function() {
      $('.added-drug').each(function(){
	$(this).click(function(){
	  addItems();
	});   
      });

      // This limits the colors allowed by the graph to checkboxes that are on - keeps things in sync.
      var devisedPalette = [];
      $('.check-color').each(function() {
	if($(this).siblings().prop("checked")) {	  
	  
	  devisedPalette.push($(this).attr('data-color'));
	}
      });
    });
    
    
    function addItems() {	
      $('#error').empty();
      var symptom = $('#symptom').val();
      var url;
      $('#clear-all').removeClass('hidden');
      $.each($('.added-drug'), function(term) {

	// We only want to pull in terms that correspond to a checked box.
	if($(this).is(":checked")) {
	  term = $(this).val();


// Possibly this syntax sill work...
//	  url = 'https://api.sideeffect.io/rx.json?search=' + term;

// But at present this must be used...
	  url = 'https://api.sideeffect.io/rx/' + term;

// Note: This is the 
//	  url = 'https://api.fda.gov/drug/event.json?api_key=rv4OOon6fPJOHBbFHClUOs3BRGSbAEUdg3ACp2pu&search='
//	    + term + '&limit=5&count=patient.reaction.reactionmeddrapt.exact';


// I have to revert this to get non-zero data to make the pie-chart show up.
//	  url2 = 'https://api.sideeffect.io/rx.json?ahrq="' + term + '"';
	  url2 = 'https://api.sideeffect.io/rx.json?ahrq=' + term;

	  $.ajax({
	    url: url,
	    type: 'GET',
	    term: term,
	    success: function(data) {
// Comment out this line if you are going directly against the OpenFDA API --- its header returns JSON,
// whereas ours returns a string that must be parsed
	      data = JSON.parse(data);
	      
	      var reactions = data.results;
	      // I will store drug, symtomp, count objects in here in order to have all data.
	      var triplets = [];
	      for (i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		triplets.push( { drug: this.term,
				 symptom: reactions[i]['term'],
				 count: reactions[i]['count']});
	      }
	      
	      sessionStorage.setItem(term, JSON.stringify(triplets));

	      setTimeout(buildGraph(), 200);
	    },
	    error: function(data) {
	      $('.checkholder').each(function() {
		var keySearch = $(this).attr('id');
		console.log(keySearch);
		
		if(sessionStorage.getItem(keySearch) == null) {
		  $(this).remove();
		  
		}
	      })
	      $('#error').append("We are unable to show data for this drug because we can't normalize the usage data when compared to other drugs. For specific adverse effects please refer to other sources.<br /><br />");
	    }
	  }); 

	  $.ajax({
	    url: url2,
	    type: 'GET',
	    term: term,
	    success: function(data) {
	      
	      var reactions = data;
	      var doubles = [];
	      json = JSON.parse(data);	      
	      drug = term;
	      count = json['ahrq_sample'];
	      doubles.push(
		drug,count
	      );
	      sessionStorage.setItem('name-use-count-' + term, JSON.stringify(doubles));

	      setTimeout(buildGraph(), 200);
	    },
	    error: function(data) {
	      $('.checkholder').each(function() {
		console.log($(this).attr('id'));
		var keySearch = $(this).attr('id');
		
		if(sessionStorage.getItem(keySearch) == null) {
		  $(this).remove();
		  
		}
	      })
	      
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

    function loadSaved() {
      // Load our saved query string
      if(sessionStorage.getItem('loadeddata') !== "yes" && getParameterByName('saved')) {
	appendItems();
	addItems();
	sessionStorage.setItem('loadeddata', JSON.stringify('yes'));
      }      
    }
    
    function buildGraph() {
      // We can't use just flat arrays here.  Each drugName must contain an array as it's entry, which is the 
      // mapping from Symptom to count that we need.
      var allData = [];
      var tempData = [];


      // Now sort the colors based on the actual drug in the doublesGrab array...
      barchartColorOrder = [];


 // This was necessary to work with FireFox, the code above worked in other browsers
      for (var i = 0; i < sessionStorage.length; i++) {
	var key = sessionStorage.key(i);
// This needs to be refactored.  We probably shouldn't use drug names as keys -- we should have one key for
// all drugs, which won't be that hard.
	if (
	    !(key.lastIndexOf("name-use", 0) === 0) &&
	   (key != "loadeddata") &&
	   (key != "link")) {
	  var triplets = JSON.parse(sessionStorage.getItem(key));
	  tempData[key] = triplets;
	  var index = mapDrugsIntoColorIndices[key];
	  var color = bgColor[index];
	  barchartColorOrder.push(color ? color : "red");
	}
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
      
      delete allSymptoms['undefined'];    
      allSymptomsAsArray = sortObjectByValue(allSymptoms);
      
      // Now that we need to build a time series for each symptom in the proper order
      var symptomKeys = [];
      for (var k in allSymptomsAsArray) {
	symptomKeys.push(allSymptomsAsArray[k][0]);
	
      }
      
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
	
      }

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
	    if (typeof mycount != 'number') {
	      debugger;
	      mycount = 0;
            } 
	    timeSeries.push(mycount);
	  } else {
	    timeSeries.push(0);
	  }
	}
	datax.push(timeSeries);
      }

      drugs.unshift('Drug');
      datax.unshift(drugs);
      drawChart(barchartColorOrder, datax);

      var pieData = [];
      var doublesGrab = [];
      
// I don't believe this will work with FireFox.  I believe we will
// have to use the pattern that I added above...

// Furthermore, there is no guarantee that this will bring back the 
// data in any paricular order---therefore the sanitizedColors array,
// which is an order, is not guaranteed to match.
// The solution is to either compute the order of the colors from the 
// doublesGrab array, or to sort the doublesGrab array into the 
// same order as the colors (which requires a drug-to-color mapping.)
      for (var key in sessionStorage) {	
	if(key.indexOf('name-use-') != -1){
	  if(sessionStorage.getItem(key) !== null){	      
	    doublesGrab.push(JSON.parse(sessionStorage.getItem(key)));
	    
	  }
	}
      }
      var dataForPie = [];      
      var columns = ['axis1', 'axis2'];
      
      for (i = 0; i < doublesGrab.length; i++) {
	doublesGrab[i][1] = parseInt(doublesGrab[i][1]);	
      }

      doublesGrab.unshift(columns);      
      // Now sort the colors based on the actual drug in the doublesGrab array...
      piechartColorOrder = [];
      // The first record in doublesGrab is a weird "axis1, axis2" thing..
      for (i = 1; i < doublesGrab.length; i++) {
	var index = mapDrugsIntoColorIndices[doublesGrab[i][0]];
	if (typeof index == 'undefined') {
	  debugger;
	}
	var color = bgColor[index];
	piechartColorOrder[i] = color ? color : "red";
      }
      piechartColorOrder.shift("red");
      drawPieChart(piechartColorOrder, doublesGrab);
      
    }

    $('input').keypress(function (e) {
      var key = e.which;
      if(key == 13)  // the enter key code
      {
	$('#add-to-list').click();
      }
    });

    $('#clear-all').click(function() {
      $('.checkholder').remove();
      $('#drug-chart').empty();
      $('#link-save').empty();
      $('#clear-all').addClass('hidden');
      sessionStorage.clear();
    });
  })
})(jQuery);
