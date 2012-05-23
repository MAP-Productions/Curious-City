(function(Questions){

	Questions.Model.Ask = Backbone.Model.extend({

		defaults : {
			'imageurl' : 'images/default.jpg',
			'commentcount' : 1
		},

		url: function()
		{
			return 'php/ask.php';
		},

		initialize : function()
		{
		},


	});
	
	

})(curiouscity.module("questions"));
