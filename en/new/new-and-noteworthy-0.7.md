---
title: "New &amp; Noteworthy"
layout: page
cat: "main"
id: "new-and-noteworthy-0.7"
menus: [ "users", "download" ]
---

This page lists the enhancements and new features brought by Roboconf 0.7.


## RPM Packages

RPM packages are now available to install Roboconf on CentOS, Fedora and related systems.


## Docker Images

Docker images for Roboconf are now available on [Docker Hub](https://hub.docker.com).


## Scheduled Execution of Roboconf Commands

Roboconf commands (which are scripted admin instructions) can now be executed through
planification. The web administration allows to associate CRON expressions with these commands.


## Eclipse Tooling

Eclipse tools were drastically improved.  
Text editors now provide auto-completion features. 

There are also on-the-fly validators...

... and a new graphical modeler for graph(s).


## Handle Broken Connections to RabbitMQ

Sometimes, connections between RabbitMQ and Roboconf clients (DM and agents) can be broken.  
Roboconf now supports these situations by automaically reconnecting when it happens.


## Documentation Generators Completed

Documentation generators were completed.  
They can now output [FOP stylesheets](https://xmlgraphics.apache.org/fop/) and PDF documents.


## Miscellaneous

A lot of enhancements have been brought to this new version.  
And many bugs were fixed too. Please, refer to the release notes for details.

* [Platform](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Web Administration](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.7)

