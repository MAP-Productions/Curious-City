// This contains the module definition factory function, application state,
// events, and the router.
this.curiouscity = {
	
	module: function(){
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

	app: _.extend({
		
		init : function(){
			this.archive = new Array();
			this.loadDisqus();
			voteData.yourvote=cookie.yourvote;
			
			this.startRouter();
			this.isLoaded = true;
		},
		
		startRouter: function(){
			var _this = this;
			var Router = Backbone.Router.extend({
				routes: {
					""														:	'loadMain',
					'!/about/:hash'									:	'loadPageLocation',
					'!/:page'											:	'loadPage',
					'!/archive/question/:questionID'		:	'goToArchiveQuestion',
					'!/vote/current'									:	'goToVoting',
					'!/previous/:id'									:	'goToPrevious',
					'!/archive/:order'								:	'goToArchive'
				},
				
				initialize: function() {
					return this.bind('all', this._trackPageview);
				  },
				  _trackPageview: function() {
					var url;
					url = Backbone.history.getFragment();
					return _gaq.push(['_trackPageview', "/" + url]);
				  },
				
				loadMain: function()
				{
					$('#nav-vote').addClass('nav-focus');
					this.navigate('!/vote/current',{trigger:false});
					this.goToVoting();
				},
				loadPage : function(page){console.log(page),_this.loadPage(page) },
				loadPageLocation : function(hash)
				{
					var r = this;
					_this.loadPage('about');
					window.location.hash=hash;
					_.delay( function(){r.navigate('!/about/faq')}, 1000);
				},
				goToArchiveQuestion : function(questionID)
				{
					$('.nav-focus').removeClass('nav-focus');
					$('#nav-archive').addClass('nav-focus');
					_this.loadSingleQuestion(questionID)
				},
				goToArchive : function(order)
				{
					$('.nav-focus').removeClass('nav-focus');
					$('#nav-archive').addClass('nav-focus');
					_this.loadArchiveQuestions(order)
				},
				goToVoting : function()
				{
					$('.nav-focus').removeClass('nav-focus');
					$('#nav-vote').addClass('nav-focus');
					_this.loadVoteQuestions()
				},
				goToPrevious : function(id){ _this.loadPrevious(id) }
			
			});
	
			this.router = new Router();
			Backbone.history.start();
		},
		
		loadPage : function(page){
		
			
			$('.focus').hide();
			$('.focus').removeClass('focus');
			$('#'+page+'-page').addClass('focus').show();
			$('.nav-focus').removeClass('nav-focus');
			switch(page)
			{
				case 'vote':
					$('#nav-vote').addClass('nav-focus');
					$('#discussion-headline').html("What people are saying about this round:");
					this.showDiscussion();
					this.loadVoteQuestions();
					break;
				case 'investigations':
					$('#nav-investigations').addClass('nav-focus');
					this.hideDiscussion();
					this.loadInvestigations();
					break;
				case 'ask':
					$('#nav-ask').addClass('nav-focus');
					this.showDiscussion();
					this.loadAsk();
					break;
				case 'archive':
					$('#nav-archive').addClass('nav-focus');
					this.hideDiscussion();
					this.loadArchiveQuestions('recent');
					break;
				case 'about':
					$('#nav-about').addClass('nav-focus');
					this.hideDiscussion();
					break;
				default :
			}
					
		},
		
		hideDiscussion : function()
		{
			if( $("#discussion").is(':visible') ) $('#discussion').fadeOut();
		},
		showDiscussion : function()
		{
			if( $("#discussion").is(':hidden') ) $('#discussion').fadeIn();
		},
	
	
		/******* INVESTIGATIONS PAGE **********/
		loadInvestigations : function()
		{
			if( _.isUndefined( this.investigations) )
			{
				$('#investigate-list').spin();
				var Inv = curiouscity.module('investigation');
				this.investigations = new Inv.Collection();
				console.log(this.investigations)
			}
		},
	
	
	
		/******* VOTE PAGE **********/
		
		loadVoteQuestions : function(){
			this.router.navigate("!/vote/current");
			this.questionID=-1;
			$('#discussion-headline').html("What people are saying about this round:");
			$('.focus').hide().removeClass('focus');
			$('#vote-page').addClass('focus').show();
			$('#discussion').show();

			//only load once per visit
			if( !this.questionsCollection){
				var Questions = curiouscity.module("questions");
				this.questionsCollection = new Questions.Collection(voteData.questions,{
					comparator : function(question){
						return question.get('rank')
					}
				});
				
				if(_.isUndefined(this.questionsCollection.get(voteData.yourvote))) this.questionsCollection.canvote=true;
				else this.questionsCollection.canvote=false;
				
				
				this.questionsCollection.current=voteData.current;
				this.questionsCollection.previous=voteData.previous;
				this.questionsCollection.yourvote=voteData.yourvote;
				this.questionsCollection.previousWinner=voteData.previousWinner;
	
	
					
						DISQUS.reset({
							reload: true,
							config: function () {  
								this.page.identifier = _this.questionsCollection.current.title;
							}
						});
						
	
						this.displayVoteQuestions();
						if(this.questionsCollection.canvote==0){
							$('#vote-page .super h1').html("Thanks for voting! ");
							$('#vote-page .sub h5').html("Tune in Wednesdays to <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' target='blank'>The Afternoon Shift</a> on <a href='http://www.wbez.org' target='blank'>WBEZ 91.5</a> to hear updates and find out final results. Follow our investigations via <a target='blank' href='http://facebook.com/curiouscityproject' >Facebook</a> and <a target='blank' href='https://twitter.com/#!/WBEZCuriousCity'>Twitter</a>. Here’s how the votes are stacking up so far:<br>");
						}
						else{
								$('#vote-page .super h1').html("Which should we investigate next? ");
								$('#vote-page .sub h5').html("Select the question you’d most like answered.");
						
						}
						$('#previous-winner').find('h2').html("LAST WEEK'S WINNER!");
						
						console.log(this.questionsCollection);
						$('#previous-winner').find('h5').html('<a href ="#!/previous/'+this.questionsCollection.previous.id+'" >"'+this.questionsCollection.previousWinner.question.substr(0,100)+'..."</a>');
				
				
				
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
		
		displayVoteQuestions : function(){
	
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
		
		voteOnQuestion : function(){
			console.log('voted!!!!!')
			$('#vote-page .super h1').html("Thanks for voting! ");
			$('#vote-page .sub h5').html("Tune in Wednesdays to <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' target='blank'>The Afternoon Shift</a> on <a href='http://www.wbez.org' target='blank'>WBEZ 91.5</a> to hear updates and find out final results. Follow our investigations via <a target='blank' href='http://facebook.com/http://www.facebook.com/curiouscityproject' >Facebook</a> and <a target='blank' href='https://twitter.com/#!/WBEZCuriousCity'>Twitter</a>. Here’s how the votes are stacking up so far:<br>");
			
		},
	
	
		/********** PREVIOUS VOTE PAGE ***********/
		
		loadPrevious : function(id){	
			this.router.navigate("!/previous/"+id);	
			this.questionID=-1;
			var _this=this;
			$('#previous-winner-question').empty();
			$('#previous-questions').empty();
			
			$('#discussion-headline').html("What people are saying about this round:");
			$('.focus').hide().removeClass('focus');
			$('#previous-vote-page').addClass('focus').show();
			$('#discussion').show();
			
	
			var Questions = curiouscity.module("questions");
			this.previousCollection = new Questions.Collection({votingperiod:id},{
				comparator : function(question){
					return question.get('rank')
				}
			});
			
			$('#previous-vote-page').spin();
			this.previousCollection.reset();
			this.previousCollection.fetch({
				success:function(collection,response)
				{
				
					DISQUS.reset({
						reload: true,
						config: function () {  
							this.page.identifier = _this.previousCollection.votingperiod;
						}
					});
					
					$('#previous-vote-page').spin(false);
					_this.displayPreviousQuestions();
				}
			});
		},
		
		displayPreviousQuestions : function(){
			
			
			var Questions = curiouscity.module("questions");
			var _this=this;
				_.each( _.toArray( this.previousCollection ),function(question){
					var questionView = new Questions.Views.Previous({model:question});
					if( question.get('winner')==1) {
						console.log('we have a winner');
						$('#previous-winner-question').append(questionView.render().el);
						console.log($('#previous-winner-question'));
					}
					else $('#previous-questions').append(questionView.render().el);
					
				});
				console.log(this.previousCollection);
				$('#previous-period-title').html("Week of "+this.previousCollection.current.title);
				
				$('#voting-date-next').html("Voting for "+this.previousCollection.next.title+" <i class='arrow right'></i>"  ).unbind().click(function(){
					 if(_this.previousCollection.next.id=='current') _this.loadVoteQuestions();
					 else _this.loadPrevious(_this.previousCollection.next.id);
					return false;
				});
				
		
				
				
				if(this.previousCollection.previous.id != -1){
					$('#voting-date-previous').html("<i class='arrow left'></i>  Voting for "+this.previousCollection.previous.title).attr('href','#!/previous/'+this.previousCollection.previous.id);
				}
				else $('#voting-date-previous').empty();
		},
		
		/******* ASK A QUESTION PAGE **********/
		
		loadAsk : function(  ){
			console.log('curious eh?: submitttt');
			$('#discussion').fadeOut();
			var Questions = curiouscity.module("questions");
			
			this.askView = new Questions.Views.Ask();
			$('#ask-form').html(this.askView.render().el);
		},
		
		
		
		/******* QUESTION ARCHIVE PAGE **********/
		
		loadArchiveQuestions : function(order){
			
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
		
		displayArchiveQuestions : function(archive){
			console.log('display vote questions')
			var Pages = curiouscity.module('pages');
			_.each( _.toArray(archive) ,function(question){
				var questionView = new Pages.Views.archive({model:question});
				$('#archive-page #archive-questions').append(questionView.render().el);
			});
		},
		
		
		
		/******* SINGLE QUESTION PAGE **********/
			
		loadSingleQuestion : function( questionID ){
		
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
					_this.displaySingleQuestion( question );
				}
			});
					
		
			return false;
		},
		
		displaySingleQuestion : function( model ){
			$('#question-page').spin(false);
			var Questions = curiouscity.module("questions");
			var questionView = new Questions.Views.Single({model:model})
			$('#question-page').html(questionView.render().el)
		},
		
		
		/****** DISQUS *********/
		
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
		
		}, Backbone.Events)

};
