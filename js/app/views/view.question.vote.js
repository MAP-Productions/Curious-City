
(function(Questions) {


	Questions.Views.Vote = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question',
		vote : true,
		
		initialize : function()
		{
		
			var blanks = {
				image_url: this.model.get('imageurl'),
				text: this.model.get('question'),
				rank: this.model.get('rank')
			};
			//use template to clone the database items into
			var template = _.template( this.getTemplate() );
			//copy the cloned item into the el
			$(this.el).attr('data-id',this.model.id)
			$(this.el).append( template( blanks ) );
	
		},
		
		render : function( )
		{
			return this;
		},
		
		events : {
			'click .vote' : 'voteThis',
			'mouseover .vote' : 'voteOver',
			'mouseout .vote' : 'voteOut'
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
			console.log('vote on this one:')
			console.log(this)
			
			this.voteOver = {};
			this.voteOut = {};
			
			$('div[data-id='+this.model.id+']').find('.vote').addClass('hover');
			$('#questions').find('.vote').not('.hover').fadeOut();
			$('#questions,#questions-order').find('.vote').not('.hover').remove();
			$('#questions').quicksand('#questions-order>div');
		},
	
		getTemplate : function()
		{
			var html =
		
				"<div class='row' data-test='<%= rank %>'>"+
					"<div class='span5 question-image' style='background-image:url(<%= image_url %>)'></div>";
					if(this.options.vote) html += "<a href='#'><i class='vote'></i></a>";
					html += "<div class='span7 question-text'>"+
						"<h2><%= text %></h2>"+
					"</div>"+
				"</div>";
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));