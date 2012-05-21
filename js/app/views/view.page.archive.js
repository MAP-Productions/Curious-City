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

		getTemplate : function()
		{
			var html =
		
				"<div class='row'>"+
					"<div class='span5 question-image' style='background-image:url(<%= image_url %>)'></div>"+
					"<div class='span7 question-text'>"+
						"<h2><%= text %></h2>"+
					"</div>"+
				"</div>";
			
			return html;
		}

	});

})(curiouscity.module("pages"));