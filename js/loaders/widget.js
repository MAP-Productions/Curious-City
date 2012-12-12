/********************************************

    MAIN.JS
    
    VERSION 0.1
    
    LOADS JS FILES


*********************************************/
require([
    'order!../lib/jquery-1.7.1.min',

    //libraries
    'order!../lib/underscore',
    'order!../lib/backbone',
    'order!../lib/jquery-ui.min',

    //core
    'order!../app/curiouscity-widget',
    'order!../lib/bootstrap',

    //models
    'order!../app/models/model.question',
    //collections
    
    'order!../app/collections/collection.question',
    
    //views
    'order!../app/views/view.widget.single',
    'order!../app/views/view.widget.thanks',

    'order!../lib/spin',

    //app
        
    'order!../app/index-widget'

    ], function(){});
