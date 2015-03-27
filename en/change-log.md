---
title: "Change Log"
layout: page
id: "main.download.changelog"
menus: [ "users", "download" ]
---

This page summers up the features and main changes brought by the various Roboconf versions.


<!--
## Version 0.3

Roboconf 0.3 brings performance enhancements for cloud deployments.  
Machine creation goes faster than before, and their configuration is
done asynchronously and in parallel. It results that big deployments
are performed more quickly.

The team also worked on reusability issues for recipes. We set up a Github
organization called [Roboconf-recipes](https://github.com/roboconf-recipes) to
share tested recipes. Feel free to use them and contribute.

Eventually, we improved tooling support, by completing our Maven plug-in, by creating
a documentation generator, and by upgrading existing editors, like [Atom.io](https://atom.io/),
to support Roboconf's DSL.

Browse the [new &amp; noteworthy page](new/new-and-noteworthy-0.3.html) for this release.
-->


## Version 0.2

Roboconf 0.2 is the first **OSGi**fied version of Roboconf.

Both the DM and the agent are OSGi applications. And both are packaged as Karaf distributions.  
This version is also more robust, more modular and easily extensible.
The Roboconf DSL was also completed and is now stable.

* Supported *targets*: Amazon EC2, Microsoft Azure, Openstack, VMWare, Docker and on-premise hosts.
* Available plug-ins: Bash, File, Puppet, Logger.


## Version 0.1

Version 0.1 is the first stable release of Roboconf.  

In this version, the **Deployment Manager** (DM) is a web application that can be deployed in any application server.  
And the Roboconf **agent** is a stand-alone Java application.

* Supported *targets*: Amazon EC2, Microsoft Azure, Openstack, VMWare and on-premise hosts.
* Available plug-ins: Bash, Puppet, Logger.
