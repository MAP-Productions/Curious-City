
(function(Questions) {


	Questions.Views.Submit = Backbone.View.extend({
			
		
		tagName : 'div',
		className: 'question-submit',
		
		initialize : function(options)
		{
			_.extend(this,options);

			var blanks = {
	
			};
			
			this.step=1;
			
			//use template to clone the database items into
			var template = _.template( this.getTemplate() );
			//copy the cloned item into the el
			$(this.el).append( template( blanks ) );
		},
		

		render : function( )
		{
			return this.el;
		},
		events : {
			
			'click .submit-next': 'next',
			'click .submit-final': 'post',
			'click .submit-back': 'back'
		
		},
		
		back: function(){
			if(this.step==2){
				this.model.set({text:$(this.el).find('.submit-question-text')[0].value});
				$('#question-form-2').fadeOut('fast',function(){
					$('#question-form-1').fadeIn('fast');	
				});
				this.step--;
			}
			if(this.step==3){
				this.model.set({text:$(this.el).find('.submit-question-text')[0].value});
				$('#question-form-3').fadeOut('fast',function(){
					$('#question-form-2').fadeIn('fast');	
				});
				this.step--;
			}
			
			
			$('.submit-step').removeClass('submit-step-selected');
			$('#submit-step-'+this.step).addClass('submit-step-selected');
		},
		
		next: function(){
			if(this.step==1){
				this.model.set({question:$(this.el).find('.submit-question-text')[0].value});
				$('#question-form-1').fadeOut('fast',function(){
					$('#question-form-2').fadeIn('fast');	
				});
				this.step++;
			}
			else if (this.step==2){
			
				this.model.set({name:$(this.el).find('.submit-name-text')[0].value});
				this.model.set({email:$(this.el).find('.submit-email-text')[0].value});
				this.model.set({phone:$(this.el).find('.submit-phone-text')[0].value});
				
				$(this.el).find('#submit-question-preview').html(this.model.get('question'));
				$(this.el).find('#submit-name-preview').html('posted by '+this.model.get('name'));
				
				$('#question-form-2').fadeOut('fast',function(){
					
					
					$('#question-form-3').fadeIn('fast');	
				});
				this.step++;
			}
			
			
			$('.submit-step').removeClass('submit-step-selected');
			$('#submit-step-'+this.step).addClass('submit-step-selected');
		},
		post: function(){
		
			console.log('posting questions');
			
			this.model.save();
			$('#question-form-3').fadeOut('fast',function(){
					
					
					$('#question-form-4').fadeIn('fast');	
				});
		
		
		},
	
		getTemplate : function()
		{
			var html ="<span id='submit-step-1' class='submit-step-selected submit-step' >Step 1: question</span>";
			html += "<span  id='submit-step-2' class='submit-step' >Step 2: contact</span>";
			html += "<span  id='submit-step-3' class='submit-step' >Step 3: preview</span>";
			html +="<div class='question-form-wrapper'>"+
						
						"<div id='question-form-1'  class='question-form'><h1>What do you wonder about Chicago,the region, or the people who live here?</h1>"+
						"<input class = 'submit-question-text' type='text'/><input class='submit-next' type='submit' value='Next'/></div>"+
						"<div id='question-form-2'  class='question-form'><h1>If your question is chose and we need to follow up, let us know how to contact you.</h1>"+
							"<label for='submit-name-text'>Name*</label><input id = 'submit-name-text' class = 'submit-name-text' type='text'/>"+
							"<label for='submit-email-text'>Email*</label><input id = 'submit-email-text' class = 'submit-email-text' type='email'/>"+
							"<label for='submit-phone-text'>Phone</label><input id = 'submit-phone-text' class = 'submit-phone-text' type='tel'/>"+
							"<input class='submit-next' type='submit' value='Next'/>"+
							"<br><a class='submit-back'>back</a>"+
						"</div>"+
						"<div id='question-form-3' class='question-form'><h1>Double check your question</h1>"+
							"<span><h2 id='submit-question-preview'></h1></span>"+
							"<span id='submit-name-preview'></h5></span>"+
							"<input class='submit-final' type='submit' value='Submit'/>"+
							"<br><a class='submit-back'>back</a>"+
						"</div>"+
						"<div id='question-form-4'  class='question-form'><h1>Thanks! Your question was submitted</h1>"+
							"<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar turpis vitae justo porta vulputate. Curabitur et leo cursus lectus fringilla porttitor. Nunc placerat, lorem vitae  placerat porta, est sapien sollicitudin diam, at scelerisque dolor magna nec quam.</span>"+
						"</div>"+
					"</div>";
			
			
			return html;
		}
		
	
	});

})(curiouscity.module("questions"));