
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
		
		voteThis : function()
		{
			this.undelegateEvents();
			this.$el.find('.vote').addClass('hover');
			curiouscity.app.voteOnQuestion( this.model.id, this.options.position )
		},
	
		getTemplate : function()
		{
			var html =
			
				"<div class='ballot-image' style='background-image:url(<%= imageurl %>)'></div>"+
				"<a href='#' onClick='_gaq.push([\"_trackEvent\", \"CC-Widget-Vote\", \"Vote\", \"\"]);'><i class='vote'></i></a>"+
				"<div class='text'>"+
					"<p><%= question %></p>"+
				"</div>";
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));