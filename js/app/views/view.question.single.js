
(function(Questions) {


	Questions.Views.Single = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question-single',
		
		initialize : function()
		{
			
		},
		
		render : function( )
		{

			//use template to clone the database items into
			var template = _.template( this.getTemplate() );
			//copy the cloned item into the el
			$(this.el).html( template( this.model.attributes ) );
			return this;
		},
		
		events : {
			'click .prev' : 'goToPrev',
			'click .next' : 'goToNext'
		},
		
		goToPrev : function()
		{
			console.log('prevvvvv')
			curiouscity.app.goToPrevInArchive();
			return false;
		},
		
		goToNext : function()
		{
			console.log('nexxxxxt')
			curiouscity.app.goToNextInArchive();
			return false
		},
	
		getTemplate : function()
		{
			var html =
		
			"<ul class='pager'><li class='previous'><a href='#' class='prev'>&larr; previous</a></li><li class='next'><a href='#' class'next'>next &rarr;</a></ul>"+
			"<div class='row'>"+

				"<div class='span4'>"+
					"<div class='hero-unit' style='background-image:url(<%= imageurl %>)'></div>"+
				"</div>"+

				"<div class='span8'>"+
					"<h1><%= question %></h1>"+
					"<p>posted by <%= name %></p>"+
					"<div class='question-discussion'></div>"+
				"</div>"+
			
			"</div>";
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));