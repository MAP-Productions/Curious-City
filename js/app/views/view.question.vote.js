
(function(Questions) {


	Questions.Views.Vote = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question',
		
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
			'click' : 'getID'
		},
		
		getID : function()
		{
			console.log(this.model.get('rank'))
		},
	
		getTemplate : function()
		{
			
			var html =
		
				"<div class='row' data-test='<%= rank %>'>"+
					"<div class='span5 question-image' style='background-image:url(<%= image_url %>)'></div>"+
					"<a href='#'><i class='vote'></i></a>"+
					"<div class='span7 question-text'>"+
						"<h2><%= text %></h2>"+
					"</div>"+
				"</div>";
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));