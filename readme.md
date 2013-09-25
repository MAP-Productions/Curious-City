## Production Install

Tested on Linux version 2.6.18-028stab101.1 with Apache/2.2.22. Be sure mod_rewrite module is installed. htaccess file may need to be modified if app is not run from root directory.

### Using ssh and git

Clone repository into web directory and checkout stable branch.

```bash
cd /path/to/web
git clone https://github.com/MAP-Productions/Curious-City.git .
git checkout master
```

Copy htaccess and index dist files.

```bash
cp .htaccess.dist .htaccess
cp index.html.dist index.html
```

To install PHP:

Copy php/config.php.dist to php/config.dist and enter appropriate credentials

Set up cron job to run php/questions_update.php

///////////////

The Curious City web application is a JavaScript application structured within the Backbone.js framework:

http://backbonejs.org/

The backend uses Google Docs Spreadsheets API:

https://developers.google.com/google-apps/spreadsheets/

The connection to the Google Docs API is managed within the gdata directory:

Curious-City / gdata / library / Zend



