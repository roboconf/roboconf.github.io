---
title: "Web Administration"
layout: page
cat: "ug-0-1"
id: "web-administration"
menus: [ "users", "user-guide", "0.1" ]
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


## Overview

[This page](web-administration-screenshots.html) shows screenshots of the web administration through a simple scenario.  
Notice that this page includes quite a lot of pictures and may be heavy to load.
