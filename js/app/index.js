jQuery(function($)
{
	
	// Shorthand the application namespace
	var Curiouscity	 = curiouscity.app;
	
	Curiouscity.init();

	$('#how-it-works-expander').click(function(){
		$('#how-it-works-expander i').toggleClass('down');
		$('#how-it-works').toggleClass('open');
		
		if( $('#how-it-works').hasClass('open') ) $('#how-it-works').show('blind',{direction:'vertical'},500);
		else $('#how-it-works').hide('blind',{direction:'vertical'},500);
		return false;
	})

	
});
