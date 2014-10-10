---
title: "Working with Roboconf"
layout: page
id: "ug.0.1.working-with-roboconf"
menus: [ "users", "user-guide", "0.1" ]
---

## Creating a Roboconf Application

A Roboconf application is a Roboconf package to deploy a distributed application with Roboconf.  
It must contain configuration files for Roboconf, with some resources.

Create the following file structure:

	YourApplication/
	├── descriptor
	│   └── application.properties
	├── graph
	│   ├── main.graph
	└── instances
    	└── init.instances

+ Complete the [application properties](application-descriptor.html) file.
+ Define the Software components you will deploy in [the graph model](graph-definition.html).
+ For every component, create a sub-directory under **graph** and add [the resources](graph-resources.html)
for the Roboconf plug-in that will handle the life cycle of component instances. IaaS configurations are the
most simple to handle. The configuration of other components will depend on the chosen plug-in (Bash, Puppet...).
+ Eventually, and if necessary, add [initial instances](instances-description.html) in the **init.instances** file.


## Deploying It

Once you have created your Roboconf application, you have two means to deploy it.  
It is assumed here you already have installed Roboconf's parts (the DM, the messaging server, the
web administration) and that you have prepared virtual images on the IaaS.

* First, package it as a ZIP file and upload it with the web administration.
* If the application is quite heavy (as an example, if it contains large binaries), you may prefer
to upload it by your own means (such as FTP) on the same machine than the DM. The DM's REST API
allows to load an application from the local disk.

Once deployed, the application will be listed in the web administration application.


## Monitoring It

Monitoring is for the moment very basic with Roboconf.  
Every agent regularly sends heart beats to the DM. So, the only thing Roboconf monitors now
is whether agents (and thus the remote hosts) are alive.

> It is planned to go deeper in the monitoring features.  
> First, remote host's state will be checked (memory, CPU, available disk space...).
> Then, it will be extended to applicative levels. Which tools will be used (Nagios, Cacti...)
> is not known at this time.
