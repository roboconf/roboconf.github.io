---
title: "Debugging Roboconf"
layout: page
id: "dg.snapshot.debugging-roboconf"
menus: [ "developers", "developer-guide" ]
---

Roboconf is still under development.  
Besides, it is a distributed application that aims at deploying distributed applications.
Eventually, communication is asynchronous. Therefore, and despite the presence of logs,
Roboconf is really hard to test and debug.

There are three options to debug Roboconf.


## Unit Tests

First, Roboconf is very modular.  
So, most of the features should be testable in a unit fashion. It implies you should be
able to debug specific parts of Roboconf.


## Karaf Debug

Karaf supports launching with JVM arguments to enable remote debug.  
This solution will be documented later.


## Handy Project

Although Roboconf is based on OSGi, it perfectly works in a simple JVM.  
Therefore, you can create your own Java project that depends on all the bundles you need.
Obviously, such a project will not benefit from OSGi features, but it will be enough to
debug the code. It will also not benefit from iPojo features. It means you will have to
inject plug-ins in the agent by hand. Same thing for the target handlers in the DM.

You can find an example of such a project in the [debug-sample](https://github.com/vincent-zurczak/roboconf-debug-sample).  
When you have an **Agent** or a **Manager** object, you can inject whatever you want in it.
