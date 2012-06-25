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
	'order!lib/jquery-ui.min',	
	'order!lib/quicksand',	


	//core
	'order!app/curiouscity',
	'order!lib/bootstrap',

	//models
	
	'order!app/models/model.question',
	'order!app/models/model.question.ask',
		
	//collections
	
	'order!app/collections/collection.question',
	'order!app/collections/collection.flickr',
	'order!app/collections/collection.investigation',
	
	//views
	'order!app/views/view.question.vote',
	'order!app/views/view.question.previous',
	'order!app/views/view.question.ask',
	'order!app/views/view.question.single',
	'order!app/views/view.page.about',
	'order!app/views/view.page.archive',
	'order!app/views/view.page.stories',
	'order!app/views/view.investigation.single',

	'order!lib/spin',	

	//app
		
	'order!app/index'
	

	];

require(loadFiles, function(jquery)
{
    console.log('ALL JS LOADED')
});
