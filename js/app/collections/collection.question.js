(function(Questions) {

	Questions.Collection = Backbone.Collection.extend({

<<<<<<< HEAD
	

		initialize : function(options)
=======
			initialize : function(options)
>>>>>>> html
		{
			_.extend(this,options);
			console.log('questions collection init')
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
