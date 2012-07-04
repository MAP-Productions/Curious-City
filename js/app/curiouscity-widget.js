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
	
	counter : 1,
	currentVote : 0,
	
	//this function is called once all the js files are sucessfully loaded
	init : function()
	{
		//console.log('cc widget init')
		this.loadQuestionCollection();
	},

	loadQuestionCollection : function()
	{
		
		if(window.vote==-1){
		
		var _this = this;
		var Questions = curiouscity.module("questions");
	
		this.questionsCollection = new Questions.Collection({'votingperiod':'current',
			comparator : function(question)
		{
			return Math.random();
		}
		});
		$('#ballot>div').spin('small');
		this.questionsCollection.fetch({
			success:function(collection,response)
			{
				
				$('#ballot>div').spin(false);
				//_this.makePairs();
				//_this.parseData();
				$('#questions-count').html(_.size(collection));
				$('#tagline').fadeTo(100,1);
				_this.displayPair(0,1);
			
				
			}
		});
		
		}
		else{
		
			this.displayFollowUp();
		
		
		}
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
		for(var i = 0 ; i < votes.length ; i++ ) total += parseInt( votes[i] );
		
		$('#questions-count').html(votes.length);
		$('#tagline').fadeTo(100,1);
		
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
		
		this.currentVote=_.indexOf(_.toArray(this.questionsCollection),question);
		this.counter++;
		
		var thanksView = new Questions.Views.WidgetThanks({model: question})
		
		if(position=='left')
		{
			$('#right-ballot').fadeOut('fast', function(){
				$('#right-ballot').html( thanksView.render().el );
				$('#right-ballot').fadeIn( 'fast', function(){ setTimeout(function(){_this.displayPair(_this.currentVote,_this.counter)},2250) } );
			})
		}
		else
		{
			$('#left-ballot').fadeOut('fast', function(){
				$('#left-ballot').html( thanksView.render().el );
				$('#left-ballot').fadeIn( 'fast', function(){ setTimeout(function(){_this.displayPair(_this.counter,_this.currentVote)},2250) } );
			})
		}
		
	},
	
	displayPair : function(i,j)
	{
	
		if(this.counter<_.size(this.questionsCollection)){
		
		
		var _this = this;
		

		var Questions = curiouscity.module("questions");
	
		this.questionsCollection.at(i).set({'percent':Math.floor(100.0*parseFloat(this.questionsCollection.at(i).get('votes'))/(parseFloat(this.questionsCollection.at(i).get('votes'))+parseFloat(this.questionsCollection.at(j).get('votes'))))});
		this.questionsCollection.at(j).set({'percent':Math.floor(100.0*parseFloat(this.questionsCollection.at(j).get('votes'))/(parseFloat(this.questionsCollection.at(i).get('votes'))+parseFloat(this.questionsCollection.at(j).get('votes'))))});
		
		this.leftView = new Questions.Views.Widget({model: this.questionsCollection.at(i), position:'left' });
		this.rightView = new Questions.Views.Widget({model: this.questionsCollection.at(j), position:'right' });
	
		
	
		$('#left-ballot').fadeOut('fast', function(){
			$('#left-ballot').html( _this.leftView.render().el );
			$('#left-ballot').fadeIn('fast', function(){
				$('#right-ballot').fadeOut('fast', function(){
					$('#right-ballot').html( _this.rightView.render().el );
					$('#right-ballot').fadeIn('fast');
				})
			});
		
		});
		}
		else{
			$.post('php/vote.php?questionid='+ this.questionsCollection.at(this.currentVote).id, function(data){});
			this.displayFollowUp();
		}
		
		

	},
	
	displayFollowUp :function(){
		
		$('#left-ballot').fadeOut('fast');
		$('#right-ballot').fadeOut('fast',function(){
			
			$('#headline').fadeOut('fast',function(){$(this).html('<h3>Thanks for Voting!!</h3>').fadeIn();});
			$('#follow-up').fadeIn();
		});
	
		
	
	},
	
	
	displayNextPair : function()
	{
		var _this = this;
		
		if(this.counter < this.pairs.length)
		{
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
		else
		{
			console.log('this is the end of the line')
		}
	}
	
	
}, Backbone.Events)


};
