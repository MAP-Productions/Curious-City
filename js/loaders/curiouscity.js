/********************************************

	MAIN.JS
	
	VERSION 0.1
	
	LOADS JS FILES


*********************************************/
require.config({
	baseUrl :'js/',
	paths : {
		'order' : 'lib/order',
		'text' : 'lib/text'
	}
})

var loadFiles = [
	'order!lib/jquery-1.7.1.min',

	//libraries
	'order!lib/underscore',
	'order!lib/backbone',
	'order!lib/jquery/ui/js/jquery-ui.min',	



	//core
	'order!app/curiouscity',
	'order!lib/bootstrap',

	//models
	
	'order!app/models/model.question',
	//collections
	
	'order!app/collections/collection.question',
	
	//views
	'order!app/views/view.question.vote',

	
	//plugins
	
		
	
	//app
		
	'order!app/index'
	

	];

require(loadFiles, function(jquery)
{
    console.log('ALL JS LOADED')
});
