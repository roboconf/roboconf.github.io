# Roboconf's Web Site
[![Build Status](https://travis-ci.org/roboconf/roboconf.github.io.svg?branch=master)](https://travis-ci.org/roboconf/roboconf.github.io)
[![License](https://img.shields.io/badge/Creative%20Commons-blue.svg)](http://creativecommons.org/licenses/by/3.0/)
[![Join us on Gitter.im](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/roboconf/roboconf)
[![Web site](https://img.shields.io/badge/website-roboconf.net-b23e4b.svg)](http://roboconf.net)

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

You will find more information on [Github's web site](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/).