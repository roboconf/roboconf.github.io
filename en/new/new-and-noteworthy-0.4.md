---
title: "New &amp; Noteworthy"
layout: page
cat: "main"
id: "new-and-noteworthy-0.4"
menus: [ "users", "download" ]
---

This page lists the enhancements and new features brought by Roboconf 0.4.


## Debian Packages

You can now install Roboconf's manager and agents in (almost) a single command-line thanks to Debian packages.

> sudo apt-get install roboconf-dm  
> sudo apt-get install roboconf-agent

<img src="/resources/img/nn-0.4-debian-packages-for-roboconf.jpg" alt="Debian packages for Roboconf" class="gs" />
<br />


## Docker Enhancements

<br />
<img src="/resources/img/nn-0.4-enhanced-docker-support.png" alt="Enhanced Docker support" />
<br /><br />

* New parameters to generate a Docker image for Roboconf.
* Create Docker containers locally or on a remote VM created by Roboconf.
* Support Docker options and privileges for Docker containers.
* Better performances.

<br />

## Web Administration

The web administration was completely reworked.  

* Listing provides handy shortcuts and information.
* Better feedback about possible actions.

<img src="/resources/img/nn-0.4-web-admin-app-listing.png" alt="Listing applications" class="gs" />

<br />
Instances management was improved.
<br />
<img src="/resources/img/nn-0.4-web-admin-instances.png" alt="Listing instances in an application" class="gs" />

<br />
Available actions and display were reviewed.
<br />
<img src="/resources/img/nn-0.4-web-admin-instance-state.png" alt="Managing a given instance" class="gs" />

<br />
Instance creation is now possible.
<br />
<img src="/resources/img/nn-0.4-web-admin-new-instances.png" alt="Creating new instances in an application" class="gs" />

<br />
The menu was reduced and made contextual.
<br />
<img src="/resources/img/nn-0.4-web-admin-contextual-menu.png" alt="Contextual menu" class="gs" />


## Application Templates

Applications are now all created from a skeleton (or template).  
Upload a ZIP defining an application and instantiate it as many as times as you want.

<img src="/resources/img/nn-0.4-web-admin-new-application.png" alt="Create a new application from a template" class="gs" />

<br />
Applications and application templates are managed separately.
<br />
<img src="/resources/img/nn-0.4-web-admin-app-templates-listing.png" alt="Listing application templates" class="gs" />


## Apache Storm Tutorial

A tutorial was written to show how one can deploy a light &laquo; Big Data &raquo; stack based on [Apache Storm](https://storm.apache.org/).  
It explains the basis of Storm, how its deployment is managed by Roboconf and how to run it.

<img src="/resources/img/nn-0.4-apache-storm-with-roboconf.png" alt="Apache Storm with Roboconf" class="gs" />


## Miscellaneous

A lot of enhancements have been brought to this new version.  
And many bugs were fixed too. Please, refer to the release notes for details.

* [Platform](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.4)
* [Web Administration](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.4)
* [Eclipse Tooling](https://github.com/roboconf/roboconf-eclipse/issues?utf8=%E2%9C%93&q=milestone%3A0.4)
