(function(Investigation) {

	Investigation.Collection = Backbone.Collection.extend({

		isLoaded : false,
		target : '#investigate-list',
		views : [],

		url: function(){ return 'php/questions.php?investigated=1'; },
		
		initialize : function()
		{
			var _this = this;
			this.on('reset', this.renderCollection, this);
			this.fetch();
		},
		
		renderCollection : function()
		{
			var _this = this;
			$('#investigate-list').spin(false);
			
			this.isLoaded = true;
			$(this.target).empty();
			_.each(_.toArray(this), function(question){
				console.log(question)
				var v = new Investigation.Views.Single({model:question});
				_this.views.push(v);
				$(_this.target).append(v.render().el);
			})
		},
		
		parse: function(data)
		{
			return data.questions;
		}

	});

})(curiouscity.module("investigation"));
