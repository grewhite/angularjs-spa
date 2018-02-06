## Project Overview

This is an older AngularJS (1) web application.  This project was built for fun. 

## Project Set-up

If you have Node.js, Ruby and Compass installed, please go to ##Already Installed. 

###Node.js
	Install Node.js with npm (package manager for Node): http://nodejs.org/.
	Make sure you restart your computer after you install Node.js

	Open up your terminal

###Yeoman
npm install -g yo

###Sass and Compass and Git
	Make sure you have installed Node.js, git and Ruby and Compass (if you plan to use Compass).

	Install Sass: http://sass-lang.com/tutorial.html.

	Install Ruby:
                http://rubyinstaller.org/

                [x] Add Ruby executables to your PATH

	Install Compass: http://compass-style.org/install/.
                gem update --system
                gem install compass

	Install http://git-scm.com/

                [x] Run Git from the WIndows Command Prompt
                
                [x] Checkout as-is, commit as-is

	RESTART MACHINE


WHAT YOU NEED TODO....

##Environment first time set-up 

1. Navigate in your terminal to the where you have checked out the project folder.

2. Install yarn:  front-end package manager (https://yarnpkg.com/en/).

3. Install bower to manage code libraries listed in the current directory's bower.json.
	yarn install

5. Install Grunt. Grunt manages dev tasks.
	npm install -g grunt-cli
	npm install grunt

6. Now install all the dependencies (listed in package.json)
	npm install

7. You should be good to go. Launch the site.
	grunt serve

8. To stop the server: Ctrl + C , followed by Y

Grunt is used for running specified tasks during development. It's also used for 
creating builds.

###Currently the following common tasks are included: 

* Watch/compile Sass/Compass modules into CSS, 
* Watch/lint CSS/JS code, 
* Optimize images, 
* Generate sharp vector icons to all devices, 
* Generate dynamic build headers 
* Run unit tests in different browsers.
* Parse CSS and add vendor-prefixed CSS properties
* Monitor changes in the file system and refresh the browser
* Replace strings on build. (paths in the index.html file.)



##Already Installed

1. Navigate in your terminal to the where you have checked out the project folder.

2. Install bower to manage code libraries listed in the current directory's bower.json.
	yarn install

3. Install Grunt. Grunt manages dev tasks.
	npm install grunt

4. Now install all the dependencies (listed in package.json)
	npm install

5. You should be good to go. Launch the site.
	grunt serve




## Dev Build Process

    1. Make updates locally.



### Local Web Server using node.js


	
	pulled this out:

	    "grunt-contrib-imagemin": "~0.3.0",