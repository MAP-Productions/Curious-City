(function(Questions) {

	Questions.Collection = Backbone.Collection.extend({

		model : Questions.Model,

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
			this.canvote = data.canvote;
			return data.questions;
		},
		
		comparator : function(question)
		{
			return question.get('rank')
		}
	});

})(curiouscity.module("questions"));
