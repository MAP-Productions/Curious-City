
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
			if(this.model.get('previous')==-1)$(this.el).find('.previous').hide();
			if(this.model.get('next')==-1)$(this.el).find('.next').hide();
			
			return this;
		},
		
		events : {
		
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
		
			"<ul class='pager'><li class='previous'><a href='#!/archive/question/<%= previous %>'>&larr; previous</a></li><li class='next'><a href='#!/archive/question/<%= next %>'>next &rarr;</a></ul>"+
			"<div class='row'>"+

				"<div class='span4'>"+
					"<div class='hero-unit question-image' style='height: 30px;background-image:url(<%= imageurl %>)'></div>"+
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