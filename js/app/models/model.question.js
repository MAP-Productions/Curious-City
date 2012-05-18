(function(Questions){

	Questions.Model = Backbone.Model.extend({

		defaults : {

			
		},

		url: function()
		{
			return 'php/submit.php'
		},

		initialize : function()
		{
			console.log('question model init')
		},


	});
	
	

})(curiouscity.module("questions"));
