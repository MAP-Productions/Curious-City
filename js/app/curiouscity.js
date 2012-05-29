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
	
	loadDisqus : function()
	{
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
		
	},

	loadVoteQuestions : function()
	{
		DISQUS.reset({
			reload: true,
			config: function () {  
			this.page.identifier = "vote";
			this.page.url = "http://example.com/#!/vote";
			}
		});
		$('#discussion-headline').html("What are people saying about this question");
		$('.focus').fadeOut('fast',function(){
			$(this).removeClass('focus');
			$('#vote-page').addClass('focus').fadeIn('fast',function(){
				$('#discussion').show();
				});
		});
		
		//only load once per visit
		if( !this.questionsCollection )
		{
			var _this = this;
			var Questions = curiouscity.module("questions");
		
			this.questionsCollection = new Questions.Collection({'votingperiod':'od7',
		
		comparator : function(question)
		{
			return question.get('rank')
		}});
			$('#vote-page').spin();
			this.questionsCollection.reset();
			this.questionsCollection.fetch({
				success:function(collection,response)
				{
					$('#vote-page').spin(false);
					_this.displayVoteQuestions();
					console.log(collection)
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
			console.log('--you cannot vote :(')
			_.each( _.toArray( this.questionsCollection ),function(question){
				var questionView = new Questions.Views.Vote({model:question,vote:true});
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
		

		$('.focus').fadeOut('fast',function(){
			$(this).removeClass('focus');
			$('#archive-page').addClass('focus').fadeIn('fast',function(){
				$('#discussion').hide();
				});
		});

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

		$('.focus').removeClass('focus').fadeOut('fast', function(){
			$('#question-page').empty();
			$('#question-page').spin().addClass('focus').fadeIn('fast',function(){
				var Questions = curiouscity.module("questions");
				var question = new Questions.Model({id:questionID});
				question.fetch({
					success : function()
					{
						_this.renderQuestion( question );
					}
				});
				
			})
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
		$('#vote-page .super h1').html('Find out final results Wednesdays on <a href="http://www.wbez.org/programs/afternoon-shift-steve-edwards" target="blank">The Afternoon Shift</a> on <a href="http://wbez.org" target="blank" >WBEZ 91.5</a>');
		$('#vote-page .sub h5').html('Thanks for Voting! Here’s how the votes are stacking up so far.');
		
	},
	

	

	
}, Backbone.Events)


};
