(function(Pages) {

	Pages.Views.archive = Backbone.View.extend({
		
		className : 'question',
		
		initialize : function()
		{

		},
		
		render : function()
		{
			
			var c = (this.model.get('commentcount') == 1) ? 'comment': 'comments';

			$(this.el).append( _.template( this.getTemplate(), _.extend(this.model.attributes,{lang:c}) ) );
			
			return this;
		},

		events : {
			'click .question-link' : 'goToQuestion'
		},
		
		goToQuestion : function()
		{
			curiouscity.app.router.navigate('!/archive/question/'+this.model.id, {trigger:true});
			return false;
		},

		getTemplate : function()
		{
			var html =
		
				"<div class='row'>"+
					"<div class='span5 question-image' style='background-image:url(<%= imageurl %>)'></div>"+
					"<div class='span7 question-text'>"+
						"<h2><a class='question-link' href='#'><%= question %></a></h2>"+
						"<div class='comment-count'><a href='#'><%= commentcount %> <%= lang %></a></div>"+
					"</div>"+
				"</div>";
			
			return html;
		}

	});

})(curiouscity.module("pages"));