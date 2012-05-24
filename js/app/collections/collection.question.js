(function(Questions) {

	Questions.Collection = Backbone.Collection.extend({
		
		votingperiod : true,
		model : Questions.Model,

		initialize : function(options)
		{
			_.extend(this,options);
			console.log('questions collection init')
		},
		
		url: function()
		{
			if(this.votingperiod != false) return 'php/questions.php?votingperiod='+this.votingperiod;
			else return 'php/questions.php?order='+this.order;
		},
		
		parse: function(data)
		{
			console.log(data)
			this.canvote = data.canvote;
			return data.questions;
		}
	});

})(curiouscity.module("questions"));
