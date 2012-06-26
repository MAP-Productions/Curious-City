
(function(Questions) {


	Questions.Views.Previous = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question',
		
//		voted : false,
//		voted_this : false,
		
		initialize : function()
		{
			
			_.extend(this,this.options);
			
			
		},

		render : function( )
		{
			
		 	//console.log(this);
			this.$el.html( _.template( this.getTemplate(), this.model.attributes ) );
			if(this.model.get('imageattribution')) $($(this.el).find('.question-image')[0]).append("<span class='image-credits' ><a target='blank' href='"+this.model.get('imageattribution')+"'>"+this.model.get('imageusername')+"</a></span>");
			if(this.model.get('winner')==1)$(this.el).addClass('winner');
			return this;
		},


		
		events : {

			
		},

		
		goToQuestion : function()
		{
			//console.log('go to question!!! '+ this.model.id);
			curiouscity.app.router.navigate('!/archive/question/'+this.model.id, {trigger:true});
			return false;
			
		},

	
		getTemplate : function()
		{
			var html = '';

				html +=
				"<div class='row'>"+
					"<div class='span4 question-image' style='background-image:url(<%= imageurl %>)'>"+
						"<div class='rank-corner'></div>"+
						"<h2 class='rank-number'><%= percent %></h2>"+
					"</div>";
				
				html += "<div class='span8 question-text'>"+
						"<h2><a class='question-link' href='#!/archive/question/"+this.model.id+"' onClick='_gaq.push([\"_trackEvent\", \"CC-Vote\", \"Click on Question\", \"\"]);'><%= question %></a></h2>"+
						"<div class='comment-count'><a href='#!/archive/question/"+this.model.id+"' onClick='_gaq.push([\"_trackEvent\", \"CC-Vote\", \"Click on Discuss\", \"\"]);' class='question-link'>Discuss <i class='icon-comment'></i></a></div>"+
					"</div>"+
				"</div>";
		
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));