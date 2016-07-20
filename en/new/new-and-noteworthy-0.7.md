---
title: "New &amp; Noteworthy"
layout: page
cat: "main"
id: "new-and-noteworthy-0.7"
menus: [ "users", "download" ]
---

This page lists the enhancements and new features brought by Roboconf 0.7.


## RPM Packages

RPM packages are now available to install Roboconf on CentOS, Fedora and related systems.

> yum install roboconf-dm  
> yum install roboconf-agent

<img src="/resources/img/nn-0.7-rpm-packages-for-roboconf.jpg" alt="RPM packages for Roboconf" class="gs" />


## Docker Images

Docker images for Roboconf are now available on [Docker Hub](https://hub.docker.com/u/roboconf/).

> docker pull roboconf/roboconf-dm  
> docker run...

<img src="/resources/img/nn-0.7-docker-images-for-roboconf.jpg" alt="Docker images for Roboconf" class="gs" />


## Scheduled Execution of Roboconf Commands

Roboconf commands (which are scripted admin instructions) can now be executed through scheduling.  
The web administration allows to associate CRON expressions with these commands.

<img src="/resources/img/nn-0.7-scheduling-for-commands.jpg" alt="Scheduled execution of Roboconf commands" class="gs" />


## Eclipse Tooling

Eclipse tools were drastically improved.  
Text editors now provide auto-completion features.

<img src="/resources/img/nn-0.7-eclipse-editor-with-auto-completion.jpg" alt="Auto-completion in Eclipse" class="gs" />

There are also on-the-fly validators...

<img src="/resources/img/nn-0.7-eclipse-editor-with-validation.jpg" alt="Validation on-the-fly in Eclipse" class="gs" />

... and a new graphical modeler for graph(s).

<img src="/resources/img/nn-0.7-eclipse-graphical-modeler.jpg" alt="Graphical modeler in Eclipse" class="gs" />

This last editor was created within the scope of the [OCCIware](http://www.occiware.org) project.  
This project aims at improving cloud standards thanks to [OCCI](http://occi-wg.org), an open specification
managed by [the OGF community](https://www.ogf.org). OCCIware includes the development of tools in relation with modeling approaches.


## Handle Broken Connections to RabbitMQ

Sometimes, connections between RabbitMQ and Roboconf clients (DM and agents) can be broken.  
Roboconf now supports these situations by automatically reconnecting when it happens.

<img src="/resources/img/nn-0.7-auto-reconnect.png" alt="Handle broken connections with RabbitMQ" class="gs" />


## Documentation Generators Completed

Documentation generators were completed.  
They can now output [FOP stylesheets](https://xmlgraphics.apache.org/fop/) and PDF documents.

<img src="/resources/img/nn-0.7-doc.png" alt="Generate project documentation in PDF" class="gs" />


## Miscellaneous

A lot of enhancements have been brought to this new version.  
And many bugs were fixed too. Please, refer to the release notes for details.

* [Platform](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Web Administration](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.7)

