
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
			
		},
	
		getTemplate : function()
		{
			var html =
		
			"<div class='hero-unit' style='background-image:url(<%= imageurl %>)'>"+
			"</div>"+
			"<h1><%= question %></h1>"+
			"<p>posted by <%= name %></p>"+
			"<div class='row content'>"+
				"<div class='span4'></div>"+
				"<div class='span8'>"+
					"<div class='question-discussion'></div>"+
				"</div>"+
			"</div>";

			return html;
		}
		
	
	});

})(curiouscity.module("questions"));