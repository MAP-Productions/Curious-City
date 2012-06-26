jQuery(function($)
{
	
	// Shorthand the application namespace
	var Curiouscity	 = curiouscity.app;
	
	
	
	$('#how-it-works-expander').click(function(){
		$('#how-it-works-expander i').toggleClass('down');
		$('#how-it-works').toggleClass('open');
		
		if( $('#how-it-works').hasClass('open') ) $('#how-it-works').show('blind',{direction:'vertical'},500);
		else $('#how-it-works').hide('blind',{direction:'vertical'},500);
		return false;
	})
	
	
	$('.archive-key a').click(function(){
		console.log( $(this).data('filter') )
		var filter = $(this).data('filter');
		
		$('#archive-questions').find('.question:not(.question-status-'+filter+')').hide();
		$('#archive-questions .question-status-'+filter).show();
		
		
		return false;
	})
	
	
	if(firstTime) _.delay(function(){ $('#how-it-works-expander').trigger('click');},1000);
	Curiouscity.init();
	
});
