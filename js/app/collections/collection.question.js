(function(Questions) {

	Questions.Collection = Backbone.Collection.extend({

	

			initialize : function(options)
		{
			_.extend(this,options);

		},
		
		url: function()
		{
			return 'php/questions.php?votingperiod='+this.votingperiod;
		},
		
		parse: function(data)
		{
			return data.questions;
		
		}
		


	});

})(curiouscity.module("questions"));
