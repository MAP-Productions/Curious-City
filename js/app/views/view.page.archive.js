(function(Pages) {

	Pages.Views.archive = Backbone.View.extend({
		
		className : 'question',
		
		initialize : function()
		{

		},
		
		render : function()
		{
			var blanks = {
				image_url: this.model.get('imageurl'),
				text: this.model.get('question'),
			};
			$(this.el).append( _.template( this.getTemplate(), blanks ) );
			
			return this;
		},

		events : {
			'click .question-link' : 'goToQuestion'
		},
		
		goToQuestion : function()
		{
			curiouscity.app.router.navigate('archive/question/'+this.model.id, {trigger:true});
			return false;
		},

		getTemplate : function()
		{
			var html =
		
				"<div class='row'>"+
					"<div class='span5 question-image' style='background-image:url(<%= image_url %>)'></div>"+
					"<div class='span7 question-text'>"+
						"<h2><a class='question-link' href='#'><%= text %></a></h2>"+
					"</div>"+
				"</div>";
			
			return html;
		}

	});

})(curiouscity.module("pages"));