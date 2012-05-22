
(function(Questions) {


	Questions.Views.Widget = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question',
		vote : true,
		
		initialize : function()
		{
			
		},
		
		render : function( )
		{

			//copy the cloned item into the el
			$(this.el).html( _.template( this.getTemplate(), this.model.attributes ) );
			
			return this;
		},
		
		events : {
			'click .vote' : 'voteThis',
			'mouseover .vote' : 'voteOver',
			'mouseout .vote' : 'voteOut',
		},
		
		voteOver : function()
		{
			this.$el.addClass('hover');
			this.$el.find('.vote').addClass('hover')
		},
		
		voteOut : function()
		{
			this.$el.removeClass('hover');
			this.$el.find('.vote').removeClass('hover')
		},
		
		goToQuestion : function()
		{
			console.log('go to question!!! '+ this.model.id);
			curiouscity.app.router.navigate('question/'+this.model.id, {trigger:true});
			return false;
		},
		
		voteThis : function()
		{
			console.log('vote on this one:')
			console.log(this)
			
			$.post('php/vote.php?questionid='+this.model.id, function(data){}); //vote post
			
		},
	
		getTemplate : function()
		{
			var html =
			
				"<div class='ballot-image' style='background-image:url(<%= imageurl %>)'></div>"+
				"<a href='#'><i class='vote'></i></a>"+
				"<div class='text'>"+
					"<p><%= question %></p>"+
				"</div>";
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));