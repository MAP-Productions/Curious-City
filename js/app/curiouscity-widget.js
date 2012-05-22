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
				$('#ballot>div').spin(false);
				_this.makePairs();
				_this.parseData();
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
	
	parseData : function()
	{
		var votes = this.questionsCollection.pluck('votes');
		var total = 0;
		for(var i = 0 ; i < votes.length ; i++ )
			total += parseInt( votes[i] );
		
		_.each(_.toArray(this.questionsCollection), function(question){
			question.set('percent', Math.floor(question.get('votes')/total*100) )
		})
		
	},
	
	voteOnQuestion : function(questionID, position)
	{
		var _this = this;
		var Questions = curiouscity.module("questions");
		var question = this.questionsCollection.get(questionID);
		//$.post('php/vote.php?questionid='+ questionID, function(data){}); //vote post
		
		var thanksView = new Questions.Views.WidgetThanks({model: question})
		
		if(position=='left')
		{
			$('#right-ballot').fadeOut('fast', function(){
				$('#right-ballot').html( thanksView.render().el );
				$('#right-ballot').fadeIn( 'fast', function(){ setTimeout(function(){_this.displayNextPair()},5000) } );
			})
		}
		else
		{
			$('#left-ballot').fadeOut('fast', function(){
				$('#left-ballot').html( thanksView.render().el );
				$('#left-ballot').fadeIn( 'fast', function(){ setTimeout(function(){_this.displayNextPair()},5000) } );
			})
		}
		
		//this.displayNextPair();
	},
	
	displayNextPair : function()
	{
		var _this = this;
		var Questions = curiouscity.module("questions");
		this.leftView = new Questions.Views.Widget({model: this.pairs[ this.counter][0], position:'left' });
		this.rightView = new Questions.Views.Widget({model: this.pairs[this.counter][1], position:'right' });
		
		$('#left-ballot').fadeOut('fast', function(){
			$('#left-ballot').html( _this.leftView.render().el );
			$('#left-ballot').fadeIn('fast', function(){
				$('#right-ballot').fadeOut('fast', function(){
					$('#right-ballot').html( _this.rightView.render().el );
					$('#right-ballot').fadeIn('fast');
				})
			});
			
		})
		
		
		
		this.counter++;
	}
	
	
}, Backbone.Events)


};
