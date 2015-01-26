---
title: "Web Administration"
layout: page
id: "ug.snapshot.web-administration"
menus: [ "users", "user-guide" ]
---

Roboconf is a distributed application.  
Communication between the DM and the agents is performed through a messaging server.
The DM exposes a REST API to receive commands and propagate them as messages to the agents. 
Roboconf's [web administration](https://github.com/roboconf/roboconf-web-administration) is a 
web application in charge of exposing a user interface for this REST API. 
It is developed with AngularJS. It allows to use most of the available features, including:

* Upload and load a Roboconf application.
* List the applications managed by the DM.
* Deploy, start, stop and undeploy Software components (including virtual machines).
* Create and destroy component instances.

By default, the web administration is packaged as an OSGi (web) bundle in the DM's Karaf distribution.  
It is also possible to run it from somewhere else.


## Screenshots

[This page](web-administration-screenshots.html) shows screenshots of the web administration through a simple scenario.  
Notice that this page includes quite a lot of pictures and may be heavy to load.


## Known Issues

We once experienced an issue with application upload.  
When a user clicked the **upload** button, nothing happened. This random problem seemed to
be due to a problem with Twitter Bootstrap, which was not displaying a modal window. You can find
information about [this issue on our issue tracker](https://github.com/roboconf/roboconf-web-administration/issues/15).

A workaround was implemented, just in case it had to happen again.  
There is a dedicated route to access a safety upload page in the console.
In your web browser, just access the **/#/upload** route, and you will see this safety page.
It really looks like what is (or would be) displayed in the modal dialog Twitter Bootstrap is supposed to show.

<img src="/resources/img/roboconf--web-administration--safety-upload-page.jpg" alt="Safety Upload Page" class="gs" />
