(function(Questions){

	Questions.Model = Backbone.Model.extend({

		defaults : {
			'imageurl' : 'images/default.jpg'
		},

		url: function()
		{
			return 'php/ask.php'
		},

		initialize : function()
		{
			console.log('question model init')
			console.log(this)
			if(this.get('imageurl')=='') this.set('imageurl','images/default.jpg')
			
		},


	});
	
	

})(curiouscity.module("questions"));
