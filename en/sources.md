---
title: "Source Code"
layout: page
cat: "main"
id: "sources"
menus: [ "developers", "sources" ]
---

Roboconf's source code is hosted on GitHub.  
See [https://github.com/roboconf](https://github.com/roboconf).


# Building Roboconf

Most of the Roboconf projects are Java projects. They all use Maven to be built.  
Roboconf's web administration is a Javascript project. And Roboconf's web site is built with Jekyll. 
They are the only exceptions.

So, you must have [Maven](http://maven.apache.org/) (version 3) installed to build Roboconf.  
You should also have [NodeJS](http://nodejs.org/), [NPM](https://www.npmjs.org/) and  [Gulp](http://gulpjs.com/) installed.

```tcl 
# Example on Ubuntu
sudo apt-get install npm
sudo npm install gulp -g
```

You must have both installed to build Roboconf source code.  
NPM is used not only to build the web administration, but also the platform. In fact, the platform
embeds the web administration in its archive.

> Note concerning Debian / Ubuntu. The NodeJS executable may be named **nodejs** instead of **node**.  
> If so, go into the **/usr/bin** directory, then type in **ln -s nodejs node**.

For Java projects, such as the platform, the Maven plug-in or Eclipse tools, 
just clone the repository and execute...

```tcl
mvn clean install
```

If you try to compile a tag or a branch, you may have to skip the Checkstyle validation.

```tcl
mvn clean install -Dcheckstyle.skip=true
```

Same thing when you want to compile offline.

```tcl
mvn clean install -o -Dcheckstyle.skip=true
```

When projects use a different build mechanism, it is described in the readme of the project.


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
