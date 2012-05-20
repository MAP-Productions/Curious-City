(function(Questions){

	Questions.Model = Backbone.Model.extend({

		defaults : {

			
		},

		url: function()
		{
			return 'php/ask.php'
		},

		initialize : function()
		{
			console.log('question model init')
		},


	});
	
	

})(curiouscity.module("questions"));
