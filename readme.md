# Roboconf's Web Site
[![Build Status](https://travis-ci.org/roboconf/roboconf.github.io.svg?branch=master)](https://travis-ci.org/roboconf/roboconf.github.io)
[![License](https://img.shields.io/badge/license-Creative%20Commons-blue.svg)](http://creativecommons.org/licenses/by/3.0/)
[![Join us on Gitter.im](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg)](https://gitter.im/roboconf/roboconf)
[![Web site](https://img.shields.io/badge/website-roboconf.github.io-b23e4b.svg)](https://roboconf.github.io)

This repository contains the sources for Roboconf's web site.  
On every commit, a [routine](http://jekyllrb.com/) is executed. It generates static HTML files and hosts 
them on [GitHub pages](https://pages.github.com/).

<img src="https://roboconf.github.io/resources/img/readme_website.png" alt="Roboconf's web site overview" />


## Building the Web Site

To build the web site locally, you can use Docker...

```
cd roboconf.github.io/
docker run --rm --label=jekyll --volume=$(pwd):/srv/jekyll -it -p 4000:4000 jekyll/jekyll jekyll serve
```

... or you can install [Jekyll](http://jekyllrb.com/) directly on your machine.  
Then, use...

* `bundle exec jekyll serve -w` to run a web server locally.
* `bundle exec jekyll build` to simply generate static HTML files.
* `sudo bundle install` to resolve problems about missing gems or dependencies.

You will find more information on [Github's web site](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/).
