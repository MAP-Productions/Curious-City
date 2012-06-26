
(function(Investigation) {


	Investigation.Views.Single = Backbone.View.extend({
	
		tagName : 'li',
		className : 'investigation-story',
	
		render : function()
		{
			$(this.el).append( _.template(this.getTemplate(), this.model.attributes) )
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
			html = 
			
				'<div class="investigation-question"><h4><a href="#"><%= question %></a></h4></div>'+
				'<div class="investigation-image" style="background-image:url(<%= imageurl %>)">'+
					'<div class="investigation-overlay">'+
						'<div class="pull-right investigation-comments"><%= comments %> updates</div>'+
						'<div class="investigation-info-left">'+
							'<div class="">Asked by: <%= name %> / Reporting with: someone</div>'+
							'<div class="">June 25, 2012</div>'+
						'</div>'
					'</div>'+
				'</div>';
			
			return html;
		}
	
	});

})(curiouscity.module("investigation"));