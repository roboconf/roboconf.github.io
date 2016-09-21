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
They are the only exceptions and are documented at the end of the page.

So, you must have [Maven](http://maven.apache.org/) (version 3) installed to build Roboconf.  
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

For the platform, integration tests are not part of the default build.  
To run them, use...

```tcl
mvn clean install -P it-all
```

When projects use a different build mechanism, it is described in the readme of the project.


# Contributing

Feel free to fork the project and contribute back through push requests. ;)  
These links may help you.

* [Understanding pull requests](https://help.github.com/articles/using-pull-requests)
* [Forking a repository](https://help.github.com/articles/fork-a-repo)
* [Creating a pull request](https://help.github.com/articles/creating-a-pull-request)


# Building / Contributing to the Web Administration

Information related to the development of the web administration (Angular JS) is mentioned in [the
project's read me file](https://github.com/roboconf/roboconf-web-administration).


# Building / Contributing to the Web Site

The web site is powered by [Jekyll](http://jekyllrb.com), [GitHub](http://github.com), 
[Twitter Bootstrap](http://getbootstrap.com) and [Glyph Icons](http://glyphicons.com).

The sources for the web site are hosted on [GitHub](https://github.com/roboconf/roboconf.github.io).  
To contribute modifications, you should fork this repository, patch it and create a pull request.

This [page](developer-guide/web-site-organization.html) explains the Jekyll configuration and the way the web site works.
