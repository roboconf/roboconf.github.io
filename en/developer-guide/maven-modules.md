---
title: "Maven Modules"
layout: page
id: "dg.snapshot.maven-modules"
menus: [ "developers", "developer-guide" ]
---

Roboconf's main repository is a multi-module Maven project.  
This page gives a short description of every module.

* **parent**: the project's parent.

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

* **roboconf-iaas-api**: the API to implement to support a given IaaS.  
In Roboconf's model, a IaaS is in fact a root instance. A root instance could also be
an existing host, or a device. So, a IaaS plug-in does not only handle a cloud infrastructure.

* **roboconf-iaas-***: IaaS implementations.

* **roboconf-messaging**: all the stuff related to messaging.  
It includes the message definitions, the interface to interact with a given messaging server
and their implementations. For the moment, there is only one implementation for RabbitMQ. If
other implementations had to appear, then this module may have to be split.

* **roboconf-plugin-api**: the API to implement for a new Roboconf plug-in.  

* **roboconf-plugin-***: all the implementations of Roboconf plug-ins.

> For the moment, the DM loads all the IaaS implementations within the same class loader.  
> In the same way, an agent loads all the plug-ins in a same class loader.  
> It is planned to migrate to OSGi before the end of Summer 2014.
