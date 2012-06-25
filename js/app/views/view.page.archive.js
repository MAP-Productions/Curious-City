(function(Pages) {

	Pages.Views.archive = Backbone.View.extend({
		
		className : 'question',
		
		initialize : function()
		{

		},
		
		render : function()
		{
			var q = this.model.get('question');
			if( q.length > 100 ) this.model.set({'question': q.substring(0,100)+'…'});
			
			var c = (this.model.get('comments') == 1) ? 'comment': 'comments';
			$(this.el).append( _.template( this.getTemplate(), _.extend(this.model.attributes,{lang:c}) ) );
			
			if(this.model.get('imageattribution')) $($(this.el).find('.question-image')[0]).append("<span class='image-credits' ><a target='blank' href='"+this.model.get('imageattribution')+"'>"+this.model.get('imageusername')+"</a></span>");
		
	
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
					"<div class='span4 question-image' style='background-image:url(<%= imageurl %>)'>"+
					"</div>"+
					"<div class='span8 question-text'>"+
						"<h2><a class='question-link' href='#'><%= question %></a></h2>"+
						"<div class='comment-count'><a  class='question-link' href='#'><%= comments %> <%= lang %></a></div>"+
					"</div>"+
				"</div>";
			
			return html;
		}

	});

})(curiouscity.module("pages"));