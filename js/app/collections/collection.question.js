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
			if(this.votingperiod != false) 'php/questions.php?votingperiod='+this.votingperiod;
			return 'php/questions.php';
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
