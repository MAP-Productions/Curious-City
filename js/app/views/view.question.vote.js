
(function(Questions) {


	Questions.Views.Vote = Backbone.View.extend({
			
		
		tagName : 'li',
		className: 'item-map-popup',
		
		initialize : function()
		{
		
			var blanks = {
				begin_lat : this.model.get('begin_lat').toString().substring(0,5),
				begin_lng : this.model.get('begin_lng').toString().substring(0,5),
				end_lat : this.model.get('end_lat').toString().substring(0,5),
				end_lng : this.model.get('end_lng').toString().substring(0,5)
			};
			//use template to clone the database items into
			var template = _.template( this.getTemplate() );
			//copy the cloned item into the el
			$(this.el).append( template( blanks ) );
	
		},
		

		render : function( )
		{
			return this;
		},
	
		getTemplate : function()
		{
			
			var html =
			
			"<div class='question'>"+
				"<div class='row'>"+
					"<div class='span5 question-image' style='background-image:url(<%= image_url %>)'></div>"+
					"<a href='#'><i class='vote'></i></a>"+
					"<div class='span7 question-text'>"+
						"<h2><%= text %></h2>"+
					"</div>"+
				"</div>"+
			"</div>";
			
			
			
			/*
			var html =	"<span class='question-prompt' ><h1>What are you curious about?</h1></span>";
			html += "<span class='step-one' ><a>Step 1: question</a></span>";
			html += "<span class='step-one' ><a>Step 2: contact</a></span>";
			html += "<span class='step-one' ><a>Step 3: preview</a></span>";
			html +="<div class='question-form-wrapper'>"+
						"<div class='question-form-1'></div>"+
						"<div class='question-form-2`'></div>"+
						"<div class='question-form-3'></div>";
			*/
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));