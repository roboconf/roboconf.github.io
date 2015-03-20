# Roboconf's Web Site

[![Build Status](https://travis-ci.org/roboconf/roboconf.github.io.svg?branch=master)](https://travis-ci.org/roboconf/roboconf.github.io)

Website: [http://roboconf.net](http://roboconf.net)  
Roboconf is licensed under the terms of the **Apache License v2**.  
The web site documentation is licensed under [Creative Commons](http://creativecommons.org/licenses/by/3.0/).

This repository contains the sources for Roboconf's web site.  
On every commit, a [routine](http://jekyllrb.com/) is executed. It generates static HTML files and host 
them on [GitHub pages](https://pages.github.com/).

To build the web site locally, you must install [Jekyll](http://jekyllrb.com/).    
Then, use...

	jekyll serve -w

... to run a web server locally, or... 

	jekyll build

... to simply generate static HTML files.  
When using Jekyll on your own machine, you may have errors about missing gems or dependencies.

	sudo gem install jemoji
	sudo gem install github-pages
