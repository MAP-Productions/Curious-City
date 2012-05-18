(function(Questions) {

	Questions.Collection = Backbone.Collection.extend({

		initialize : function(options)
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
			console.log(data)
			return data.questions;
		},
		
		comparator : function(question)
		{
			return question.get('rank')
		}
	});

})(curiouscity.module("questions"));
