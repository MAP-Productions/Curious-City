
(function(Questions) {


	Questions.Views.Feature = Backbone.View.extend({
	
		tagName : 'div',
		className : 'slide',
	
		render : function()
		{
			var utc = parseInt(this.model.get('dateuploaded'),10) *1000;
			var date = new Date( utc );
			 
			$(this.el).append( _.template(this.getTemplate(), _.extend(this.model.attributes,{date:date.toLocaleDateString() }) ) );
			return this;
		},
		
		events : {
			'click': 'goToTimeline'
		},
		
		goToTimeline : function()
		{
			var link = '!/archive/question/'+this.model.id;
			curiouscity.app.router.navigate(link,{trigger:true});
			return false;
		},
		
		getTemplate : function()
		{
			html = '<div class="slide-text">'+
						'<h1><%= question %></h1>'+
						'<h2>Asked by <%= name %> | Reported by <%= reporter %></h2>'+
						'<p><em>Last updated <%= date %></em></p>'+
					'</div>'+
					'<img src="<%= imageurl %>" alt="">';
			return html;
		}
	});

})(curiouscity.module("questions"));