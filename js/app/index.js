jQuery(function($)
{
	// Shorthand the application namespace
	var Curiouscity	 = curiouscity.app;
	
	Curiouscity.init();



	$('#how-it-works-expander').click(function(){
		$('#how-it-works').toggleClass('hide')
	})
});
