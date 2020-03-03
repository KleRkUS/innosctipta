### Test task made for Innoscripta by Villevald Vladislav

Frontend: React.js  
Backend: Yii2  
Database: MySQL  
Module bundler: Webpack 4  

Uploaded on Heroku  
Free database hosted on remotemysql.com  

DIRECTORY STRUCTURE
-------------------

      assets/             contains assets definition
      config/             contains application configurations
      controllers/        contains Web controller classes
      models/             contains model classes
      runtime/            contains files generated during runtime
      src/                contains source files for React
      vendor/             contains dependent 3rd-party packages
      views/              contains view files for the Web application
      web/                contains the entry script and Web resources


DEFAULT USER DATA
-----------------
# Username: admin
# Password: admin


SCRIPTS FOR BUNDLING
-------------------------------

Development:
- npm run dev

Production: 
- npm run build


SERVER SETTINGS
---------------

HTTP: Apache_2.4  
PHP: PHP_7.3  
MySQL: MySQL-8.0x64  


QUICK START
-----------
Route: http://domain/First/Second  
Controller: controllers/FirsController.php  
Action: actionSecond  
View: views/First/*name*.php  

React is mounted in each view separately, exclude 
views that is too simple to use it  

Axios send requests to Api actions, which is highlighted
in comments with @Api Action

Webpack bundles are in web/webassets folder

Uncomment two commented lines in web/index.php to work in dev mode 


EXCUSES
-------

User authorization is made in the easiest way, without hashing password
and access levels, using only session variable.  
Sorry, that was the easiest and fastest way, so I decided to do that, cause 
login is just a minor feature in this task.  
This is the way..
