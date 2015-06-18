(function($){
    $(document).ready(function(){
	$('#submit').click(function() {
	    $('#text').empty();
	    var drug = $('#drug').val();
   	    var url = 'https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct="' + drug + '"';
	    var reaction = [];
	    $.get(url, function(data) {
		var reactions = data.results[0].patient.reaction		
		for (i = 0; i < reactions.length; i++) {
		    $('#text').append('<div id=drug"' + i  + '">' + reactions[i].reactionmeddrapt + '</div>');		    
		}
	    });	    
	})
    })
})(jQuery);
