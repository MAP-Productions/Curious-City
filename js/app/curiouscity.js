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
		
	//this function is called once all the js files are sucessfully loaded
	init : function()
	{
		this.archive = new Array();
		this.loadDisqus();
		this.startRouter();
		this.isLoaded = true
	},
	
	loadDisqus : function(){
		$('#disqus-add-comment').click(function(){ $('#dsq-reply').fadeIn();});
		$('#disqus-sort-popular').click(function(){ 
			$('#disqus-sort-newest').addClass('disqus-sort-unselected').removeClass('disqus-sort-selected');
			$('#disqus-sort-popular').removeClass('disqus-sort-unselected').addClass('disqus-sort-selected');;
			DISQUS.dtpl.actions.fire('thread.sort', 'best');
		});
		$('#disqus-sort-newest').click(function(){ 
			$('#disqus-sort-popular').addClass('disqus-sort-unselected').removeClass('disqus-sort-selected');
			$('#disqus-sort-newest').removeClass('disqus-sort-unselected').addClass('disqus-sort-selected');
			DISQUS.dtpl.actions.fire('thread.sort', 'newest');
		});
	},
	
	disqusCommentInserted: function(){
		if(this.questionID!=-1) $.post('php/comment.php?new=true&questionid='+this.questionID, function(data){}); 
	},
	
	disqusCommentDeleted: function(){
		if(this.questionID!=-1)$.post('php/vote.php?questionid='+this.questionID, function(data){});
	},
	
	
	startRouter: function()
	{
		var _this = this;
		var Router = Backbone.Router.extend({
			routes: {
				""								:	'loadMain',
				'!/:page'							:	'loadPage',
				'!/archive/question/:questionID'	:	'goToArchiveQuestion',
				'!/vote/:votingPeriod'	:	'goToVotingPeriod',
				'!/archive/:order'	:	'goToArchive'
			},
			
			loadMain: function(){ this.navigate('!/vote/current',{trigger:true}) },
			loadPage : function(page){ _this.loadPage(page) },
			
			goToArchiveQuestion : function(questionID){ _this.goToArchiveQuestion(questionID) },
			goToArchive : function(order){ _this.loadArchiveQuestions(order) },
			goToVotingPeriod : function(votingPeriod){ _this.loadVoteQuestions(votingPeriod) }
		
		});

		this.router = new Router();
		Backbone.history.start();
	},
	

	loadPage : function(page)
	{
	
		
		$('.focus').hide();
		$('.focus').removeClass('focus');
		$('#'+page+'-page').addClass('focus').show();
		switch(page)
		{
			case 'vote':
				$('#discussion-headline').html("What people are saying about this round:");
				$('#discussion').fadeIn();
				this.loadVoteQuestions();
				break;
			case 'stories':
			
				break;
			case 'ask':
				this.loadAsk();
				break;
			case 'archive':
				$('#discussion').fadeOut();
				this.loadArchiveQuestions('recent');
				break;
			case 'about':
				break;
			default :
		}
				

	
		/*
		var _this = this;
		$('.focus').fadeOut('fast',function(){
			$(this).removeClass('focus');
			console.log('fade in: #'+page);
			
			$('#'+page+'-page').addClass('focus').fadeIn('fast',function(){
				// calls made once the page div is visible and ready to display whatever
				switch(page)
				{
					case 'vote':
						$('#discussion-headline').html("What are people saying this round");
						$('#discussion').fadeIn();
						_this.loadVoteQuestions();
						break;
					case 'stories':
					
						break;
					case 'ask':
						_this.loadAsk();
						break;
					case 'archive':
						$('#discussion').fadeOut();
						_this.loadArchiveQuestions('recent');
						break;
					case 'about':
						break;
					default :
				}
				
			});
		})
		
		*/
		
	},

	loadVoteQuestions : function()
	{
		this.questionID=-1;

		
		this.questionID=-1;
		
		$('#discussion-headline').html("What people are saying about this round:");
		$('.focus').hide().removeClass('focus');
		$('#vote-page').addClass('focus').show();
		$('#discussion').show();
	
		
		//only load once per visit
		if( !this.questionsCollection )
		{
			var _this = this;
			var Questions = curiouscity.module("questions");
		
			this.questionsCollection = new Questions.Collection({'votingperiod':'current',
		
		comparator : function(question)
		{
			return question.get('rank')
		}});
			$('#vote-page').spin();
			this.questionsCollection.reset();
			this.questionsCollection.fetch({
				success:function(collection,response)
				{
				
					DISQUS.reset({
						reload: true,
						config: function () {  
							this.page.identifier = _this.questionsCollection.votingperiod;
						}
					});
					
					$('#vote-page').spin(false);
					_this.displayVoteQuestions();
					if(collection.canvote==0){
						$('#vote-page .super h1').html("Thanks for voting! ");
						$('#vote-page .sub h5').html("Tune in Wednesdays to <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' target='blank'>The Afternoon Shift</a> on <a href='http://www.wbez.org' target='blank'>WBEZ 91.5</a> to hear updates and find out final results. Follow our investigations via <a target='blank' href='http://facebook.com/curiouscity' >Facebook</a> and <a target='blank' href='https://twitter.com/#!/WBEZCuriousCity'>Twitter</a>. Here’s how the votes are stacking up so far:<br>");
					}
					else{
							$('#vote-page .super h1').html("Which should we investigate next? ");
							$('#vote-page .sub h5').html("Select the question you’d most like answered.");
					
					}
					$('#previous-winner').find('h2').html("LAST WEEK'S WINNER!");
					$('#previous-winner').find('h5').html('<a href ="#!/archive/question/'+collection.previousWinner.id+'" >"'+collection.previousWinner.question.substr(0,100)+'..."</a>');
			
				}
			});
		}
		else{
		
		DISQUS.reset({
						reload: true,
						config: function () {  
							this.page.identifier = _this.questionsCollection.votingperiod;
						}
					});
					
			}
		
	},
	
	displayVoteQuestions : function()
	{
	
	
		var Questions = curiouscity.module("questions");
		if( this.questionsCollection.canvote )
		{
			console.log('--you can vote! :)')
			_.each( _.shuffle( _.toArray( this.questionsCollection ) ),function(question){
				
				var questionView = new Questions.Views.Vote({model:question,voted:false, attributes:{'data-id':question.id,'data-rank':question.get('rank')}});
				$('#questions').append(questionView.render().el);
			});
			/*
			_.each( _.toArray( this.questionsCollection ),function(question){
				var questionView = new Questions.Views.Vote({model:question,vote:true, linked:true});
				$('#questions-order').append(questionView.render().el);
			});
			*/
		}
		else
		{
			console.log('--you cannot vote :(');
			var _this = this;
			_.each( _.toArray( this.questionsCollection ),function(question){
				var questionView = new Questions.Views.Vote({model:question,voted:true, voted_this: _this.questionsCollection.yourvote==question.id });
				$('#questions').append(questionView.render().el);
				//questionView.delegateEvents();
			});
		}
	},

	loadAsk : function(  )
	{
		console.log('curious eh?: submitttt');
		$('#discussion').fadeOut();
		var Questions = curiouscity.module("questions");
		
		this.askView = new Questions.Views.Ask();
		$('#ask-form').html(this.askView.render().el);
	},
	
	loadArchiveQuestions : function(order)
	{
		
		// reload archive each time the page is loaded
		console.log('load archive: '+order)
		

		$('.focus').hide().removeClass('focus');
		$('#discussion').hide();
		$('#archive-page').addClass('focus').show();


		var _this = this;
		if(order=='popular'){
			if(!this.popularArchive||true){
				var Questions = curiouscity.module("questions");
				this.popularArchive = new Questions.Collection({'votingperiod':false,"order":order});
				$('#archive-page #archive-questions').empty();
				$('#archive-page #archive-questions').spin();
				this.popularArchive.fetch({
					success:function(collection,response){
						$('#archive-page #archive-questions').spin(false);
						_this.displayArchiveQuestions(collection);
					}	
				});
			}
			else {
				$('#archive-page #archive-questions').empty();
				this.displayArchiveQuestions(this.popularArchive);
			}
		
		}
		else{
			if(!this.recentArchive||true){
				var Questions = curiouscity.module("questions");
				this.recentArchive = new Questions.Collection({'votingperiod':false,"order":order});
				$('#archive-page #archive-questions').empty();
				$('#archive-page #archive-questions').spin();
				this.recentArchive.fetch({
					success:function(collection,response){
						$('#archive-page #archive-questions').spin(false);
						_this.displayArchiveQuestions(collection);
					}	
				});
			}
			else {
				$('#archive-page #archive-questions').empty();
				this.displayArchiveQuestions(this.recentArchive);
			}
		}
		
	},
	
	displayArchiveQuestions : function(archive)
	{
		console.log('display vote questions')
		var Pages = curiouscity.module('pages');
		_.each( _.toArray(archive) ,function(question){
			var questionView = new Pages.Views.archive({model:question});
			$('#archive-page #archive-questions').append(questionView.render().el);
		});
	},
	
	goToArchiveQuestion : function( questionID )
	{
	
		this.questionID=questionID;
		var _this = this;
		
		DISQUS.reset({
			reload: true,
			config: function () {  
			this.page.identifier = "question-"+questionID;  
			this.page.url = "http://example.com/#!/question/"+questionID;
			}
		});
		window.scroll(0,0); 
		$('#discussion').fadeIn();
		$('#discussion-headline').html("What are people saying about this question");
		
		
		$('.focus').removeClass('focus').hide();
		
		$('#question-page').empty();
		
		$('#question-page').addClass('focus').show().spin();
		var Questions = curiouscity.module("questions");
		var question = new Questions.Model({id:questionID});
		question.fetch({
			success : function()
			{
				_this.renderQuestion( question );
			}
		});
				
	
		return false;
	},
	
	renderQuestion : function( model )
	{
	
	
		$('#question-page').spin(false);
		var Questions = curiouscity.module("questions");
		var questionView = new Questions.Views.Single({model:model})

		
		$('#question-page').html(questionView.render().el)
	},
	
	voteOnQuestion : function()
	{
		console.log('voted!!!!!')
		$('#vote-page .super h1').html("Thanks for voting! ");
		$('#vote-page .sub h5').html("Tune in Wednesdays to <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' target='blank'>The Afternoon Shift</a> on <a href='http://www.wbez.org' target='blank'>WBEZ 91.5</a> to hear updates and find out final results. Follow our investigations via <a target='blank' href='http://facebook.com/curiouscity' >Facebook</a> and <a target='blank' href='https://twitter.com/#!/WBEZCuriousCity'>Twitter</a>. Here’s how the votes are stacking up so far:<br>");
		
	},
	

	

	
}, Backbone.Events)


};
