
(function(Questions) {


	Questions.Views.Vote = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question',
		
		voted : false,
		voted_this : false,
		
		initialize : function()
		{
			curiouscity.app.questionsCollection.on('sorted', this.sorted, this);
		},

		render : function( )
		{
			this.$el.html( _.template( this.getTemplate(), this.model.attributes ) );
			return this;
		},

		
				
		sorted : function()
		{
			var _this = this;
			this.voted = true;
			$(this.el).removeClass('hover');
			$('#questions').find('[data-id='+ this.model.id +']').after(this.render().el).remove();
			
			$('.question-link').off('click').click(function(){
				_this.goToQuestion();
				return false;
			})

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
			curiouscity.app.router.navigate('!/archive/question/'+this.model.id, {trigger:true});
			return false;
		},
		
		voteThis : function()
		{
			console.log('vote on this one:');
			this.voted_this = true;
			var _this = this;
			curiouscity.app.voteOnQuestion();
			$.post('php/vote.php?questionid='+this.model.id, function(data){}); //vote post
			
			this.voteOver = {};
			this.voteOut = {};
			
			//sort divs
			var newOrder = $('#questions>div').clone();
			newOrder = _.sortBy( newOrder, function(div){ return $(div).data('rank') })
			$('#questions').quicksand( newOrder, function(){
				curiouscity.app.questionsCollection.trigger('sorted')
			});
			
			return false;
		},
	
		getTemplate : function()
		{
			var html = '';
			
			if( !this.voted )
			{
				html +=
				"<div class='row' data-id='"+ this.model.id +"' data-rank='<%= rank %>'>"+
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
				"<div class='row'>"+
					"<div class='span5 question-image' style='background-image:url(<%= imageurl %>)'>"+
						"<div class='rank-corner'></div>"+
						"<h2 class='rank-number'><%= rank_string %></h2>"+
					"</div>";
				if(this.voted_this) html += "<a href='#'><i class='vote hover'></i></a>";
				html += "<div class='span7 question-text'>"+
						"<h2><a class='question-link' href='#'><%= question %></a></h2>"+
						"<div class='comment-count'><a href='#' class='question-link'>Discuss <i class='icon-comment'></i></a></div>"+
					"</div>"+
				"</div>";
			}
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));