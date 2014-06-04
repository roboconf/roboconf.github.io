---
title: "Source Code"
layout: page
id: "main.sources"
menus: [ "developers", "sources" ]
---

Roboconf's source code is hosted on GitHub.  
See [https://github.com/roboconf/roboconf](https://github.com/roboconf/roboconf)  
Related projects can be found [here](https://github.com/roboconf).

# Building Roboconf

You must have [Maven](http://maven.apache.org/) installed to build Roboconf.  
Maven 3 is generally used, but it should also work with Maven 2.  
Clone the main repository and execute

	mvn clean install

You can then get...

* ... the deployment manager under **roboconf-dm-webapp/target** (it is a WAR file).
* ... the agent under **roboconf-agent/target** (it is a ZIP file).

To test Roboconf, you also need [Roboconf's web administration](https://github.com/roboconf/roboconf-web-administration).  
Roboconf's web applications use another build system since they were developed with Javascript technologies.  
Follow the instructions given in the readme of these sub-projects to build them.

# Contributing

Feel free to fork the project and contribute back through push requests. ;)

These links may help you.

* [Understanding pull requests](https://help.github.com/articles/using-pull-requests)
* [Forking a repository](https://help.github.com/articles/fork-a-repo)
* [Creating a pull request](https://help.github.com/articles/creating-a-pull-request)

# Contributing to the Web Site

The web site is powered by [Jekyll](http://jekyllrb.com), [GitHub](http://github.com), 
[Twitter Bootstrap](http://getbootstrap.com) and [Glyph Icons](http://glyphicons.com).

The sources for the web site are hosted on [GitHub](https://github.com/roboconf/roboconf.github.io).  
To contribute modifications, you should fork this repository, patch it and create a pull request.

This [page](developer-guide/web-site-organization.html) explains the Jekyll configuration and the way the web site works.
