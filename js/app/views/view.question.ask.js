
(function(Questions) {


    Questions.Views.Ask = Backbone.View.extend({
            
        
        tagName : 'div',
        className: 'question-submit',
        
        initialize : function(options)
        {
            var _this=this;
            this.model= new Questions.Model.Ask();
            $('.good-question-link').show();
            $('#ask-flash .super h1').html('What do you wonder about Chicago, the region, or the people who live here?');
            $('#ask-flash .sub h5').html('Please type your question below');
                    
            this.model.on('error', this.validationError, this);
            
            _.extend(this,options);
            
            var blanks;
            if(!_.isUndefined(this.ask)) blanks = {ask: decodeURIComponent(this.ask)    };
            else blanks ={ask:$('.submit-question-text')[0].value};
            $(this.el).append( _.template( this.getTemplate(), blanks ) );
            this.step=1;

        },
        
        render : function()
        {
            //$('#ask-submit').fadeOut('fast');
            return this;
        },
        events : {
            'click #ask-next':'next',
            'click #ask-back':'back',
            'click .submit-flickr-search': 'flickrSearch',
            'focus #question-form-1 input, #question-form-1 textarea' : 'removeErrors'
        },
        flickrSearch: function(){
            
            var searchQuery;
            var _this=this;

            $('#flickr-search').spin('small');
            this.collection = new Questions.Collection.Flickr({query:$(this.el).find('.submit-flickr-query')[0].value});
            this.collection.fetch({success:function(collection,response){
            $('#flickr-search').spin(false);
                
            $('#flickr-search').fadeOut('fast').empty().fadeIn();
            _.each(_.toArray(collection),function(model){
                var url = "http://farm"+model.get('farm')+".staticflickr.com/"+model.get('server')+"/"+model.get('id')+"_"+model.get('secret')+"_m.jpg";
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
                
                
                
                
            }});
            return false;
        },


        loadStep:function(){
            if(this.step==1){
        
                $('#ask-back').hide();
                $('#ask-next').html('Next');
                $('#ask-modal').find('h3').html("We need a few details to add your question...");

            }
            else if(this.step==2){
                this.advance=true;
                this.model.set({
                        question:$('.ask-text')[0].value,
                        name:$(this.el).find('.submit-name-text')[0].value,
                        email:$(this.el).find('.submit-email-text')[0].value,
                        email_confirm:$(this.el).find('.submit-email-confirm-text')[0].value,
                        neighborhood:$(this.el).find('.submit-neighborhood-text')[0].value,
                        anonymous : $('#anonymous').is(':checked') ? 1 : 0
                });
                if(this.advance){
                    $('#ask-back').fadeIn('fast');
                    $('#ask-modal').find('h3').html("Illustrate your question with an image from flickr...");

                }
                else this.step--;


            }else if(this.step==3){
                $('#ask-next').html('Looks good!');
                $('#ask-modal').find('h3').html("Check to make sure everything looks good!");

                $(this.el).find('#submit-question-preview').html(this.model.get('question'));
                $(this.el).find('#submit-name-preview').html('posted by '+ ((this.model.get('anonymous') == 1) ? 'anonymous' : this.model.get('name')));
                $(this.el).find('.image-preview').css('background-image','url('+ this.model.get('imageurl')+')');

            }else if(this.step==4){
                $('#ask-modal').find('h3').html("Thanks for submitting your question!");
                var cats="";
                _.each($('#category-choices input'),function(el){
                    if($(el).is(':checked')){
                        if(cats==="") cats = $(el).data('title').replace(/-/g," ");
                        else cats = cats+","+$(el).data('title').replace(/-/g," ");
                    }
                });

                this.model.set({'categories':cats});
                this.model.save({},{
                    success: function( model, response ){
                        console.log(model,response);
                        curiouscity.app.router.navigate( "!/archive/question/"+model.id, { trigger: true });
                    }
                });
                $('#ask-back').hide();
                $('#ask-next').html("Close");

            }else if(this.step==5){
                DISQUS.dtpl.actions.fire( 'thread.subscribe', this.model.get( 'email' ) );
                $( '#ask-modal' ).modal( 'hide' );
                $( '#submit-question-text' ).attr( 'value', '' );
            }
            return false;

        },


        back: function()
        {
            $('#question-form-'+this.step).addClass('hide');
            this.step--;
            $('#question-form-'+this.step).removeClass('hide');
            this.loadStep();
            return false;
        },
        
        next: function()
        {
            $('.error').removeClass('error');
            this.step++;
            this.loadStep();
            if(this.advance){
                var lastStep=this.step-1;
                $('#question-form-'+lastStep).addClass('hide');
                $('#question-form-'+this.step).removeClass('hide');
            }
            
            
            return false;
        },
        
        removeErrors : function(el)
        {
            $(el.target).closest('.error').removeClass('error');
        },

        validationError : function(model, error)
        {
            
            $(error).addClass('error');
            
            this.advance = false;
        },
    
        getTemplate : function()
        {
            var html =
                    "<div class='modal-header'>"+
                        "<button class='close' data-dismiss='modal'>×</button>"+
                        "<h3>We just need a few more details...</h3>"+
                    "</div>"+
                    "<div class='modal-body'>"+
                        "<div id='question-form-1' class='question-form'>"+
                            "<div class='control-group'><label for='ask-text'>Your question</label><textarea class='ask-text' placeholder='What do you wonder about Chicago, the region or its people that you want WBEZ to investigate?'><%=ask%></textarea></div>"+
                            "<div class='control-group neighborhood'><label for='submit-neighborhood-text'>What Chicago neighborhood (e.g. Pilsen) or town (e.g. Berwyn) do you live in?</label><input id = 'submit-neighborhood-text' class = 'short-input submit-neighborhood-text' type='text'/></div>"+
                            "<div class='control-group name-text'><label for='submit-name-text'>Name</label><input id = 'submit-name-text' class = 'short-input submit-name-text' type='text'/></div>"+
                            "<label class='checkbox'><input type='checkbox' id='anonymous'  onClick='_gaq.push([\"_trackEvent\", \"CC-Submission\", \"Select Anonymous\", \"\"]);' > <i class='icon-user'></i> remain anonymous? <i>Your contact information and email are never shared</i></label>"+
                            "<div class='control-group email-main'><label for='submit-email-text'>Email</label><input id = 'submit-email-text' class = 'short-input submit-email-text' type='email'/></div>"+
                            "<div class='control-group email-confirm'><label for='submit-email-confirm-text'>Confirm Email</label><input id = 'submit-email-confirm-text' class = 'short-input submit-email-confirm-text' type='email'/></div>"+
                        "</div>"+
                        "<form id='question-form-2'  class='question-form hide'>"+
                            "<div class='input-append'>"+
                                "<input id = 'submit-flickr-query' class = 'submit-flickr-query' type='tel'/><button class='submit-flickr-search btn'  onClick='_gaq.push([\"_trackEvent\", \"CC-Submission\", \"Search Flickr\", \"\"]);' >Search Flickr</button>"+
                            "</div>"+
                            "<ul id='flickr-search' class='well thumbnails'></ul>"+
                        
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

                            "</div><br>"+
                            "<h4>And add some tags to your question to make it easier to find:</h4><br>"+
                            "<div id='category-choices'>"+
                                "<label class='checkbox' title='Human Behavior / Human Relations / Culture / Arts / Education / Sports'><input type='checkbox' data-title='how-we-live'  ><b>How we live</b></label>"+
                                "<label class='checkbox' title='Past Events / Past People / Past Places / Historical Myths'><input type='checkbox' data-title='history' ><b>History</b></label>"+
                                "<label class='checkbox' title='Nature / Animals / Sustainability / Science'><input type='checkbox' data-title='environment' ><b>Environment</b></label>"+
                                "<label class='checkbox' title='Money / Business'><input type='checkbox' data-title='economy' ><b>Economy</b></label>"+
                                "<label class='checkbox' title='Politics / Government / Law'><input type='checkbox' data-title='governance' ><b>Governance</b></label>"+
                                "<label class='checkbox' title='Transportation / Infrastructure / Technology'><input type='checkbox' data-title='urban-planning' ><b>Urban Planning</b></label>"+
                                "<label class='checkbox' title='Experiential / Day in the life' ><input type='checkbox' data-title='whats-it-like-to'><b>What's it like to... </b></label>"+
                            "</div>"+
                        "</form>"+
                        "<div id='question-form-4'  class='question-form hide'>"+
                            "<span><h2>What happens now?</h2></span><br>"+
                                "<ul>"+
                                    "<li>Your question will now live in the <a href='#!/archive/recent'> question archive</a>. Anyone can comment on, or maybe even answer your question there.</li><br>"+
                                    "<li>WBEZ is constantly mining the question archive and selecting questions for voting. If your question makes it into a <a href='#!/vote'>voting round</a>, we'll contact you via the email address you provided.</li><br>"+
                                    "<li>Winning questions are investigated by WBEZ reporters online and on air at WBEZ 91.5fm each Wednesday on <a href='http://www.wbez.org/programs/afternoon-shift-steve-edwards' onclick='window.open(this.href); return false;'  >The Afternoon Shift</a>.</li>"+
                                "</ul>"+
                        "</div>"+
                    "</div>"+
                    "<div class='modal-footer'>"+
                        "<a id='ask-back' href='#' class='btn' style='display:none;'>Back</a>"+
                        "<a id='ask-next' href='#' class='submit-next btn btn-primary'>Next</a>"+
                    "</div>";
            return html;
        }
        
    
    });

})(curiouscity.module("questions"));