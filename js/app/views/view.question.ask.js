
(function(Questions) {


	Questions.Views.Ask = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question-submit',
		
		initialize : function(options)
		{
			console.log('question view init')
			this.model= new Questions.Model.Ask();
			
			_.extend(this,options);
			var blanks = {};
			this.step = 1;
			$(this.el).append( _.template( this.getTemplate(), blanks ) );
		},
		
		render : function()
		{
			return this;
		},
		events : {
			
			'click .submit-next': 'next',
			'click .submit-final': 'post',
			'click .submit-back': 'back',
			'click .submit-flickr-search': 'flickrSearch',
		},
		flickrSearch: function(){
			
			var _this=this;
			this.collection = new Questions.Collection.Flickr({query:$(this.el).find('.submit-flickr-query')[0].value});
			this.collection.fetch({success:function(collection,response){
				 $('#flickr-search').fadeOut('fast').empty().fadeIn();
				_.each(_.toArray(collection),function(model){
					
					var url=	"http://farm"+model.get('farm')+".staticflickr.com/"+model.get('server')+"/"+model.get('id')+"_"+model.get('secret')+"_s.jpg";
				    var attribution = "http://www.flickr.com/photos/"+model.get('owner')+"/"+model.get('id');
				    $('#flickr-search').append('<img data-attribution="'+attribution+'" class="flickr-image" src="'+url+'" />');
				});
				
				
				$('#flickr-search').find('.flickr-image').click(function(){
				
				$('#flickr-search').find('.flickr-image').removeClass('flickr-image-selected');
					$(this).addClass('flickr-image-selected');
					_this.model.set({'imageurl':$(this).attr('src')});
					_this.model.set({'imageattribution':$(this).data('attribution')});
				
				});
				
				
				
				console.log(response);
				console.log(collection);
			}});
		
		},
		back: function()
		{
			if(this.step==2){
				this.model.set({text:$(this.el).find('.submit-question-text')[0].value});
				$('#question-form-2').fadeOut('fast',function(){
					$('#question-form-1').fadeIn('fast');
					$('#ask-flash .super h1').html('What do you wonder about Chicago,the region, or the people who live here?');
					$('#ask-flash .sub h5').html('Please write your question');
				});
				this.step--;
			}
			if(this.step==3){
				this.model.set({text:$(this.el).find('.submit-question-text')[0].value});
				$('#question-form-3').fadeOut('fast',function(){
					$('#question-form-2').fadeIn('fast');
					$('#ask-flash .super h1').html('Add a photo to your question!');
					$('#ask-flash .sub h5').empty();
				});
				this.step--;
			}
			
			
			$('.step'+(this.step+1)).removeClass('active');
			$('.step'+this.step).addClass('active');
		},
		
		next: function()
		{
			if(this.step == 1)
			{
				this.model.set({question:$(this.el).find('.submit-question-text')[0].value});
				this.model.set({name:$(this.el).find('.submit-name-text')[0].value});
				this.model.set({email:$(this.el).find('.submit-email-text')[0].value});
				
				$('#question-form-1').fadeOut('fast',function(){
					$('#question-form-2').fadeIn('fast');
					$('#ask-flash .super h1').html('Add a photo to your question!');
					$('#ask-flash .sub h5').empty();
				});
				
				this.step++;
			}
			else if (this.step==2)
			{
			
				
				
				$(this.el).find('#submit-question-preview').html('"'+ this.model.get('question') +'"');
				$(this.el).find('#submit-name-preview').html('posted by '+this.model.get('name'));
				
				$('#question-form-2').fadeOut('fast',function(){
					$('#question-form-3').fadeIn('fast');
					$('#ask-flash .super h1').html('Double check your question');
					$('#ask-flash .sub h5').empty();
				});
				this.step++;
			}
			
			
			$('.step'+(this.step-1)).removeClass('active');
			$('.step'+this.step).addClass('active');
		},
		post: function()
		{
		
			console.log('posting questions');
			
			this.model.save();
			$('#question-form-3').fadeOut('fast',function(){
				$('#ask-flash .super h1').html('Thanks! Your question was submitted');
				$('#question-form-4').fadeIn('fast');	
			});
		
		},
	
		getTemplate : function()
		{
			var html = 
			
			"<div class='row'>"+
				"<div class='span5 submit-sequence'>"+
					"<ul>"+
						"<li class='step1 active'>Step 1: Question</li>"+
						"<li class='step2'>Step 2: Add Media</li>"+
						"<li class='step3'>Step 3: Preview</li>"+
					"</ul>"+
					"<div class='phone-submit'><img class='submit-cell' src='images/cell.png'/>Submit with your phone!<br />Call Curious City 1.800.789.7752</div>"+
				"</div>"+
				"<div class='span7'>"+
					"<div class='question-form-wrapper'>"+
						"<div id='question-form-1' class='question-form'>"+
							"<textarea class='submit-question-text span7'></textarea>"+
							"<label for='submit-name-text'>Name<input id = 'submit-name-text' class = 'submit-name-text' type='text'/></label>"+
							"<label for='submit-email-text'>Email<input id = 'submit-email-text' class = 'submit-email-text' type='email'/></label>"+
							
							"<button class='btn submit-next'>Next</button>"+
						"</div>"+
						"<form id='question-form-2'  class='question-form hide'>"+
							"<input id = 'submit-flickr-query' class = 'submit-flickr-query' type='tel'/><button class='submit-flickr-search btn'>Search Flickr</button>"+
							"<div id='flickr-search'></div>"+
							"<button class='submit-next btn'>Next</button>"+
							"<a class='submit-back'>  back</a>"+
						"</form>"+
						"<form id='question-form-3' class='question-form hide'>"+
							"<div class='well'><h2 id='submit-question-preview'></h2></div>"+
							"<div id='submit-name-preview'></div>"+
							"<button class='submit-final btn btn-primary'>Submit</button>"+
							"<a class='submit-back'>  back</a>"+
						"</form>"+
						"<div id='question-form-4'  class='question-form hide'>"+
							"<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar turpis vitae justo porta vulputate. Curabitur et leo cursus lectus fringilla porttitor. Nunc placerat, lorem vitae  placerat porta, est sapien sollicitudin diam, at scelerisque dolor magna nec quam.</span>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));