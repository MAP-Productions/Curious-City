
(function(Questions) {


	Questions.Views.Ask = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question-submit',
		
		initialize : function(options)
		{
			console.log('question view init')
			this.model= new Questions.Model.Ask();
			$('.good-question-link').show();
			$('#ask-flash .super h1').html('What do you wonder about Chicago, the region, or the people who live here?');
			$('#ask-flash .sub h5').html('Please type your question below');
					
			this.model.on('error', this.validationError, this);
			
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
			'focus #question-form-1 input, #question-form-1 textarea' : 'removeErrors'
		},
		flickrSearch: function(){
			
			var _this=this;
			$('#flickr-search').spin('small');
			this.collection = new Questions.Collection.Flickr({query:$(this.el).find('.submit-flickr-query')[0].value});
			this.collection.fetch({success:function(collection,response){
				$('#flickr-search').spin(false);
				
				 $('#flickr-search').fadeOut('fast').empty().fadeIn();
				_.each(_.toArray(collection),function(model){
					
					var url=	"http://farm"+model.get('farm')+".staticflickr.com/"+model.get('server')+"/"+model.get('id')+"_"+model.get('secret')+"_m.jpg";
				    var attribution = "http://www.flickr.com/photos/"+model.get('owner')+"/"+model.get('id');
				    var username = model.get('ownername');
				   
				   $('#flickr-search').append('<li><a href="#" class="thumbnail"><img  data-username="'+username+'"  data-attribution="'+attribution+'" class="flickr-image" src="'+url+'" /></a></li>');
				});
				
				
				$('#flickr-search').find('.thumbnail').click(function(){
				
					$('#flickr-search').find('.thumbnail').removeClass('flickr-image-selected');
					$(this).addClass('flickr-image-selected');
					_this.model.set({'imageurl':$(this).find('.flickr-image').attr('src')});
					_this.model.set({'imageattribution':$(this).find('.flickr-image').data('attribution')});
					_this.model.set({'imageusername':$(this).find('.flickr-image').data('username')});
					
					return false;
				});
				
				
				
				console.log(response);
				console.log(collection);
			}});
			return false;
		},
		back: function()
		{
			
			if(this.step==2){
				this.model.set({text:$(this.el).find('.submit-question-text')[0].value});
				$('#question-form-2').fadeOut('fast',function(){
					$('#question-form-1').fadeIn('fast');
					$('#ask-flash .super h1').html('What do you wonder about Chicago,the region, or the people who live here?');
					$('#ask-flash .sub h5').html('Please write your question');
					$('.good-question-link').show();
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
			window.scroll(0,0); 
			return false;
		},
		
		next: function()
		{
			
			this.advance = true;
			$('.error').removeClass('error');
			if(this.step == 1)
			{
				$('.good-question-link').hide();
				console.log('validate this')
				console.log('advance: '+ this.advance)
				this.model.set({
					question:$(this.el).find('.submit-question-text')[0].value,
					name:$(this.el).find('.submit-name-text')[0].value,
					email:$(this.el).find('.submit-email-text')[0].value,
					email_confirm:$(this.el).find('.submit-email-confirm-text')[0].value,
					neighborhood:$(this.el).find('.submit-neighborhood-text')[0].value,
					anonymous : $('#anonymous').is(':checked') ? 1 : 0
				});
				console.log('advance: '+ this.advance)
				
				if(this.advance)
				{
					$('#question-form-1').fadeOut('fast',function(){
						$('#question-form-2').fadeIn('fast');
						$('#ask-flash .super h1').html('Add a photo to your question!');
						$('#ask-flash .sub h5').empty();
					});
					this.step++;
				}
			}
			else if (this.step==2)
			{
				console.log(this.model)
			
				$(this.el).find('#submit-question-preview').html(this.model.get('question'));
				$(this.el).find('#submit-name-preview').html('posted by '+ ((this.model.get('anonymous') == 1) ? 'anonymous' : this.model.get('name')));
				$(this.el).find('.image-preview').css('background-image','url('+ this.model.get('imageurl')+')');
				
				$('#question-form-2').fadeOut('fast',function(){
					$('#question-form-3').fadeIn('fast');
					$('#ask-flash .super h1').html('Double check your question:');
					$('#ask-flash .sub h5').empty();
				});
				this.step++;
			}
			
			
			$('.step'+(this.step-1)).removeClass('active');
			$('.step'+this.step).addClass('active');
			window.scroll(0,0); 
			return false;
		},
		
		removeErrors : function(el)
		{
			$(el.target).closest('.error').removeClass('error')
		},
		
		post: function()
		{
		
			console.log('posting questions');
			
			this.model.save();
			$('#question-form-3').fadeOut('fast',function(){
				$('#ask-flash .super h1').html('Thanks! Your question was submitted.');
				$('#question-form-4').fadeIn('fast');	
				$('#left-col1').fadeOut('fast', function(){
					$('#left-col2').fadeIn();
				});
			});
			return false;
		},

		validationError : function(model, error)
		{
			console.log('validation error')
			console.log(model)
			console.log(error)
			
			$(error).addClass('error');
			
			this.advance = false;
		},
	
		getTemplate : function()
		{
			var html = 
			
			"<div class='row'>"+
				"<div class='span4 submit-sequence'>"+
					"<div id='left-col1'>"+
						"<ul class='unstyled'>"+
							"<li class='step1 active'>Step 1: Question</li>"+
							"<li class='step2'>Step 2: Add Image</li>"+
							"<li class='step3'>Step 3: Preview</li>"+
						"</ul>"+
						"<div class='phone-submit'><img class='submit-cell' src='images/cell.png'/>Submit with your phone!<br />Call Curious City 1.888.789.7752</div>"+
					"</div>"+
				
					"<div id='left-col2' class='hide'>"+
						"<ul class='unstyled'>"+
							"<li><a href='#!/vote'>See the Questions up for Voting now <i class='arrow right'></i></a></li>"+
							"<li><a href='#!/archive'>Browse Other Questions <i class='arrow right'></i></a></li>"+
						"</ul>"+
					"</div>"+
				
				"</div>"+
				"<div class='span8'>"+
					"<div class='question-form-wrapper'>"+
						"<div id='question-form-1' class='question-form'>"+
							"<div class='control-group'><textarea class='submit-question-text span8'></textarea></div>"+
							"<div class='control-group neighborhood'><label for='submit-neighborhood-text'>What Chicago neighborhood (e.g. Pilsen) or town (e.g. Berwyn) do you live in?<input id = 'submit-neighborhood-text' class = 'short-input submit-neighborhood-text' type='text'/></label></div>"+
							"<div class='control-group name-text'><label for='submit-name-text'>Name<input id = 'submit-name-text' class = 'short-input submit-name-text' type='text'/></label></div>"+
							"<label class='checkbox'><input type='checkbox' id='anonymous'  onClick='_gaq.push([\"_trackEvent\", \"CC-Submission\", \"Select Anonymous\", \"\"]);' > <i class='icon-user'></i> remain anonymous? <i>Your contact information and email are never shared</i></label>"+
							"<div class='control-group email-main'><label for='submit-email-text'>Email<input id = 'submit-email-text' class = 'short-input submit-email-text' type='email'/></label></div>"+
							"<div class='control-group email-confirm'><label for='submit-email-confirm-text'>Confirm Email<input id = 'submit-email-confirm-text' class = 'short-input submit-email-confirm-text' type='email'/></label></div>"+
							
							"<button class='btn submit-next btn-primary'>Next</button>"+
						"</div>"+
						"<form id='question-form-2'  class='question-form hide'>"+
							"<div class='input-append'>"+
								"<input id = 'submit-flickr-query' class = 'submit-flickr-query' type='tel'/><button class='submit-flickr-search btn'  onClick='_gaq.push([\"_trackEvent\", \"CC-Submission\", \"Search Flickr\", \"\"]);' >Search Flickr</button>"+
							"</div>"+
							"<ul id='flickr-search' class='well thumbnails'></ul>"+
							"<a class='submit-back'>Back</a>"+
							"<button class='submit-next btn btn-primary'>Next</button>"+
						"</form>"+
						"<form id='question-form-3' class='question-form hide'>"+
							"<div class='row'>"+
								"<div class='span3'>"+
									"<div class='image-preview'></div>"+
								"</div>"+
								"<div class='span4'>"+
									"<h2 id='submit-question-preview'></h2>"+
									"<div id='submit-name-preview'></div>"+
								"</div>"+
							"</div><br><br>"+
							"<a class='submit-back'>Back</a>"+
							"<button class='submit-final btn btn-primary'>Looks good!</button>"+
						"</form>"+
						"<div id='question-form-4'  class='question-form hide'>"+
							"<span><h3>What happens now?</h3></span><br><br>"+
								"<ul>"+
									"<li>Your question will now live in the <a href='#!/archive/recent'> question archive</a>. Anyone can comment on, or maybe even answer your question there.</li><br>"+
									"<li>WBEZ is constantly mining the question archive and selecting questions for voting. If your question makes it into a <a href='#!/vote'>voting round</a>, we'll contact you via the email address you provided.</li><br>"+
									"<li>Winning questions are investigated by WBEZ reporters online and on air at WBEZ 91.5fm each Wednesday on <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' onclick='window.open(this.href); return false;'  >The Afternoon Shift</a>.</li>"+
									"</ul>"+	
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>";
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));