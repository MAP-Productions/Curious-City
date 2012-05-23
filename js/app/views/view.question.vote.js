
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
			'mouseout .vote' : 'voteOut',
			'click .question-link' : 'goToQuestion'
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
			curiouscity.app.router.navigate('!/question/'+this.model.id, {trigger:true});
			return false;
		},
		
		voteThis : function()
		{
			console.log('vote on this one:')
			console.log(this)
			
			curiouscity.app.voteOnQuestion();
			$.post('php/vote.php?questionid='+this.model.id, function(data){}); //vote post
			
			this.voteOver = {};
			this.voteOut = {};
			
			$('div[data-id='+this.model.id+']').find('.vote').addClass('hover');
			$('#questions').find('.vote').not('.hover').fadeOut();
			$('#questions,#questions-order').find('.vote').not('.hover').remove();
			$('#questions').quicksand('#questions-order>div');
			return false;
		},
	
		getTemplate : function()
		{
			var html = '';
			
			if(this.options.vote && !this.options.linked)
			{
				html +=
				"<div class='row' data-test='<%= rank %>'>"+
					"<div class='span5 question-image' style='background-image:url(<%= image_url %>)'></div>"+
					"<a href='#'><i class='vote'></i></a>"+
					"<div class='span7 question-text'>"+
						"<h2><%= text %></h2>"+
					"</div>"+
				"</div>";
			}
			else
			{
				html +=
				"<div class='row' data-test='<%= rank %>'>"+
					"<div class='span5 question-image' style='background-image:url(<%= image_url %>)'></div>"+
					"<div class='span7 question-text'>"+
						"<h2><a class='question-link' href='#'><%= text %></a></h2>"+
					"</div>"+
				"</div>";
			}
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));