
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
		
			"<div class='nav clearfix'><a class='prev pull-left' href='#'><i class='arrow-left'></i> previous</a><a class='next pull-right' href='#'>next <i class='arrow-right'></i></a></div>"+
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