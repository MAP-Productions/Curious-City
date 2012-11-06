
(function(Investigation) {


	Investigation.Views.Single = Backbone.View.extend({
	
		tagName : 'li',
		className : 'investigation-story',
	
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
			html = '<div class="investigation-question"><h4><a href="#"><%= question %></a></h4></div>'+
					'<div class="investigation-image" style="background-image:url(<%= imageurl %>)">'+
						'<div class="investigation-overlay">'+
							'<div class="pull-right investigation-comments"><%= updatecount %> updates</div>'+
							'<div class="investigation-info-left">'+
								'<div class="">Asked by: <%= name %> / Reporting with: <%= reporter %></div>'+
								'<div class=""><%= date %></div>'+
							'</div>'+
						'</div>'+
					'</div>';
			return html;
		}
	
	});

})(curiouscity.module("investigation"));