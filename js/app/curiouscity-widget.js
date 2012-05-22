// This contains the module definition factory function, application state,
// events, and the router.
this.curiouscity = {
	// break up logical components of code into modules.
	module: function()
	{
		// Internal module cache.
		var modules = {};

		// Create a new module reference scaffold or load an existing module.
		return function(name) 
		{
			// If this module has already been created, return it.
			if (modules[name]) return modules[name];

			// Create a module and save it under this name
			return modules[name] = { Views: {} };
		};
	}(),

  // Keep active application instances namespaced under an app object.

app: _.extend({
	
	counter : 0,
	
	//this function is called once all the js files are sucessfully loaded
	init : function()
	{
		console.log('cc widget init')
		
		this.loadQuestionCollection();
	},

	loadQuestionCollection : function()
	{
		var _this = this;
		var Questions = curiouscity.module("questions");
	
		this.questionsCollection = new Questions.Collection({'votingperiod':'od7'});
		$('#ballot>div').spin('small');
		this.questionsCollection.fetch({
			success:function(collection,response)
			{
				$('#ballot>div').spin(false).effect('highlight',{'color':'#49BEE8'},2000);
				_this.makePairs();
				console.log(_this.pairs)
				_this.displayNextPair();
			}
		});
	},
	
	makePairs : function()
	{
		var p = [];
		for(var i = 0 ; i < this.questionsCollection.length ; i++ )
		{
			for(var j = i+1 ; j < this.questionsCollection.length; j++ )
			{
				p.push( _.shuffle( [this.questionsCollection.at(i),this.questionsCollection.at(j)] ) );
			}
		}
		_.shuffle(p);
		this.pairs = p;
	},
	
	displayNextPair : function()
	{
		var Questions = curiouscity.module("questions");
		var leftView = new Questions.Views.Widget({model: this.pairs[ this.counter][0] });
		var rightView = new Questions.Views.Widget({model: this.pairs[this.counter][1] });
		
		$('#left-ballot').html( leftView.render().el );
		$('#right-ballot').html( rightView.render().el );
		
		this.counter++;
	}
	
	
}, Backbone.Events)


};
