/********************************************

    CURIOUSCITY.JS
    
    VERSION 0.1
    
    LOADS JS FILES


*********************************************/


require([
    'order!../lib/jquery-1.7.1.min',

    //libraries
    'order!../lib/underscore',
    'order!../lib/backbone',
    'order!../lib/jquery-ui.min',
    'order!../lib/quicksand',
    'order!../lib/bootstrap',
    'order!../lib/jquery.placeholder.min',
    
    //core
    'order!../app/curiouscity',


    //models
    'order!../app/models/model.question',
    'order!../app/models/model.question.ask',
        
    //collections
    'order!../app/collections/collection.question',
    'order!../app/collections/collection.flickr',
    'order!../app/collections/collection.investigation',
    
    //views

    'order!../app/views/view.page.stories',
    'order!../app/views/view.page.about',


    'order!../app/views/view.question.vote',
    'order!../app/views/view.question.previous',
    'order!../app/views/view.question.ask',
    'order!../app/views/view.question.single',
    'order!../app/views/view.question.archive',
    'order!../app/views/view.question.investigated',
    'order!../app/views/view.question.feature',

    'order!../lib/spin',
    'order!../lib/jquery.carousel.min',


    //app
        
    'order!../app/index'
    
    ], function(){});
