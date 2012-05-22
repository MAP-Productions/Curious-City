jQuery(function($)
{
	
	// Shorthand the application namespace
	var Curiouscity	 = curiouscity.app;
	
	Curiouscity.init();

	$('#how-it-works-expander').click(function(){
		$('#how-it-works').toggleClass('hide')
	})
	
	$('#nav-about').click(function(){

		console.log( $("#questions-order>div") )

		$("#questions").quicksand( $("#questions-order>div"),{
			attribute: "data-id"
		});
	})
	

	
});
var disqus_developer = 1;