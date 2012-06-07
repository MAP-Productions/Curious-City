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
			if(this.votingperiod != false) return 'php/votingqs.php?votingperiod='+this.votingperiod;
			else return 'php/questions.php?order='+this.order;
		},
		
		parse: function(data)
		{
			console.log(data)
			this.canvote = data.canvote;
			this.yourvote = data.yourvote;
			this.current=data.current;
			this.previous=data.previous;
			this.next=data.next;
			return data.questions;
		}
	});

})(curiouscity.module("questions"));
