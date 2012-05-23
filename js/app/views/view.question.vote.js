
(function(Questions) {


	Questions.Views.Vote = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question',
		vote : true,
		
		initialize : function()
		{
		
			//copy the cloned item into the el
			$(this.el).attr('data-id',this.model.id)
	
		},
		
		render : function( )
		{
			$(this.el).append( _.template( this.getTemplate(), this.model.attributes ) );
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
					"<div class='span5 question-image' style='background-image:url(<%= imageurl %>)'></div>"+
					"<a href='#'><i class='vote'></i></a>"+
					"<div class='span7 question-text'>"+
						"<h2><%= question %></h2>"+
					"</div>"+
				"</div>";
			}
			else
			{
				html +=
				"<div class='row' data-test='<%= rank %>'>"+
					"<div class='span5 question-image' style='background-image:url(<%= imageurl %>)'>"+
						"<div class='rank-corner'></div>"+
						"<h2 class='rank-number'><%= rank_string %></h2>"+
					"</div>"+
					"<i class='vote'></i>"+
					"<div class='span7 question-text'>"+
						"<h2><a class='question-link' href='#'><%= question %></a></h2>"+
						"<div class='comment-count'><a href='#'>Discuss <i class='icon-comment'></i></a></div>"+
					"</div>"+
				"</div>";
			}
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));