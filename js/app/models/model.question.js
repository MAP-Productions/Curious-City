(function(Questions){

	Questions.Model = Backbone.Model.extend({

		defaults : {
			'imageurl' : 'images/default.jpg'
		},

		url: function()
		{
			return 'php/q?questionid='+this.id;
			//return 'php/ask.php'
		},

		initialize : function()
		{
			if(this.get('imageurl')=='') this.set('imageurl','images/default.jpg')
		},


	});
	
	

})(curiouscity.module("questions"));
