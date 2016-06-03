---
title: "Code Organization"
layout: page
cat: "dg-snapshot"
id: "code-organization"
menus: [ "developers", "developer-guide" ]
---

Roboconf's source code is located among several Git repositories.  
The way these projects were defined is related to their scope and the way we release these
various parts.

## Git Repositories

* [Roboconf-parent](https://github.com/roboconf/roboconf-parent) contains the root POM for all the Maven projects related to Roboconf.
It contains common configuration for plug-ins, as well as information about the development team and release management.

* [Roboconf-platform](https://github.com/roboconf/roboconf-platform) contains all the modules related to the platform.  
This includes the OSGi bundles and user-ready distributions (for the moment, based on Apache Karaf). All the core and
runtime modules are hosted in this repository.

* [Roboconf-maven-plugin](https://github.com/roboconf/roboconf-maven-plugin) *(deprecated)* contains the sources for the Roboconf Maven plug-in. 
The plug-in has since moved into the platform repository. We keep this repository to hold the tag for the Maven plug-in 0.2.

* [Roboconf-eclipse](https://github.com/roboconf/roboconf-eclipse) contains Eclipse plug-ins for Roboconf.  
It relies on Eclipse Tycho. And the build result is not supposed to be published to Maven Central (this is related to the way Tycho works
and to the resulting size, that can be important depending on what we want).

* [Roboconf-web-administration](https://github.com/roboconf/roboconf-web-administration) is a web application to manage Roboconf.  
It is based on Javascript technologies (Angular JS and related).

* [Roboconf-system-installers](https://github.com/roboconf/roboconf-system-installers) contains sources to build
installers (Linux scripts, RPM and Debian packages for the Karaf distributions, etc).

* [Roboconf-dockerfile](https://github.com/roboconf/roboconf-dockerfile) contains a Dockerfile to build (Docker) images
for both the DM and agents.

* [Roboconf-examples](https://github.com/roboconf/roboconf-examples) contains examples of Roboconf applications.

* [Roboconf.github.io](https://github.com/roboconf/roboconf.github.io) contains the source for this web site.  
There are turned into a set of HTML pages by [Jekyll](http://jekyllrb.com), and hosted on [GitHub pages](https://pages.github.com/).

* [Language-roboconf](https://github.com/roboconf/language-roboconf) contains a JS package for the support of Roboconf's DSL
in [Atom.io](https://atom.io/).

* [Roboconf-maven-archetype](https://github.com/roboconf/roboconf-maven-archetype) defines a Maven archetype to create Roboconf applications.
Since it will not be upgraded very often, it was placed in its own repository. Just like for the **roboconf-parent**, it will be released
on demand and independently of the Roboconf roadmap.

* [Roboconf-release-scripts](https://github.com/roboconf/roboconf-release-scripts) contains the scripts to release Roboconf.  
They allow to automate most of the release process.

* [Roboconf-occi-extensions](https://github.com/roboconf/roboconf-occi-extensions) contains OCCI extensions for Roboconf.
They were built upon the [OCCIware](https://github.com/occiware) project and allowed to build a part of the Eclipse tooling.


## Impact on Releases

**Every Git repository implies a distinct release process.**.  
Although there are dependencies between them, their release is an independent process.

**Roboconf-parent** aims at being as stable as possible.  
It should almost never be modified (once a year seems reasonable).

**Roboconf-platform** is a multi-module project.  
**All these modules must be released together. They must have the same version.**

**Roboconf-maven-plugin**, **Roboconf-system-installers**, **Roboconf-dockerfile** and **Roboconf-eclipse** depend on modules from **Roboconf-platform**.  
But still, they can be managed and released independently.

**Roboconf.github.io** does not need to be *released*.  
It does not make sense. The web site contains documentation for the current and the old versions.

**Roboconf-web-administration** is downloaded and packaged into an OSGi bundle during **Roboconf-platform**'s build.  
So, releasing it does not make sense. However, it may a good idea to tag it from time to time.

**Roboconf-examples** does not aim at being released.  
As for the web administration, only tagging would make sense.

> Other repositories do not need to be released.


## Maven Modules

Here is an overview of the **Maven hierarchy** for Roboconf (not the file hierarchy).  

	roboconf-parent
	│
	├── roboconf-platform-parent
	│   ├── roboconf-core
	│   ├── roboconf-iaas-api
	│   ├── roboconf-iaas-*
	│   ├── roboconf-plugin-api
	│   ├── roboconf-plugin-*
	│   ├── roboconf-messaging
	│   ├── roboconf-dm
	│   ├── roboconf-dm-rest-api
	│   ├── roboconf-dm-rest-client
	│   └── roboconf-maven-plugin
	│
	├── roboconf-maven-archetype
	└── roboconf-eclipse-parent
    	└── ...


Some Git repositories, like **Roboconf.github.io**, **Roboconf-web-administration** and **Roboconf-examples** do not
contain Maven modules. Here is a little description of some platform modules.


* **roboconf-core**: the common module, that can be reused in external projects (Maven plug-in, 
Eclipse plug-ins, etc). It contains the model parsing and management, plus various utilities.
This module must have the minimum of dependencies. Currently, it has no dependency.

* **roboconf-dm**: the business logic of the Deployment Manager.  
It embeds an implementation of the REST API.

* **roboconf-dm-rest-api**: the REST API exposed by the DM.  
It contains utilities to transform Java beans into JSon.

* **roboconf-dm-rest-client**: a Java REST client for the DM's REST API.

* **roboconf-dm-webapp**: a packaging of the DM into a web application (WAR) for Tomcat and other
application servers.

* **roboconf-target-api**: the API to implement to support a given deployment target.  
In Roboconf's model, a target is very often a root instance. A root instance could also be
an existing host, or a device. So, a target plug-in does not only handle a cloud infrastructure.

* **roboconf-target-\***: implementations for deployment targets.

* **roboconf-messaging-api**: the API to implement a new messaging solution.  
It includes the message definitions, the interface to interact with a given messaging server
and their implementations. This bundle also provides the business API for messaging. It is
used by both the DM and agents.

* **roboconf-messaging-\***: the implementations of the messaging API.

* **roboconf-plugin-api**: the API to implement for a new Roboconf plug-in.

* **roboconf-plugin-\***: all the implementations of Roboconf plug-ins.

