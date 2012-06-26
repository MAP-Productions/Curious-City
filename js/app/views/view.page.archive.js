(function(Pages) {

	Pages.Views.archive = Backbone.View.extend({
		
		className : 'question',
		
		initialize : function()
		{

		},
		
		render : function()
		{
			var q = this.model.get('question');
			if( q.length > 80 ) this.model.set({'question': q.substring(0,80)+'…'});
			
			var c = (this.model.get('comments') == 1) ? 'comment': 'comments';
			$(this.el).append( _.template( this.getTemplate(), _.extend(this.model.attributes,{lang:c}) ) );
			
			if(this.model.get('imageattribution')) $($(this.el).find('.question-image')[0]).append("<span class='image-credits' ><a target='blank' href='"+this.model.get('imageattribution')+"'>"+this.model.get('imageusername')+"</a></span>");
		
			if(this.model.get('badge') != '')
			{
				$(this.el).addClass( 'question-status-'+this.model.get('badge') );
				$(this.el).find('.badge-column').html('<i class="badge-'+ this.model.get('badge')+'"></i>');
			}
		
	
			return this;
		},

		events : {
			'click .question-link' : 'goToQuestion',
			'mouseover' : 'over',
			'mouseout' : 'out'
		},
		
		over : function()
		{
			this.$el.addClass('hoverstate');
		},
		out : function()
		{
			this.$el.removeClass('hoverstate');
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
					"<div class='span7 question-text'>"+
						"<h2><a class='question-link' href='#'><%= question %></a></h2>"+
						"<div class='comment-count'><a  class='question-link' href='#'><%= comments %> <%= lang %></a></div>"+
					"</div>"+
					"<div class='span1 badge-column'></div>"+
					
				"</div>";
			
			return html;
		}

	});

})(curiouscity.module("pages"));