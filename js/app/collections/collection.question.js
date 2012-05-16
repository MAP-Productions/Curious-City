(function(Questions) {

	Questions.Collection = Backbone.Collection.extend({

	

		initialize : function()
		{

		},
		
		url: function()
		{
			return 'js/data/votingquestions.js';
		},
		
		parse: function(data)
		{
			return data.questions;
		
		}
		


	});

})(curiouscity.module("questions"));
