---
title: "About Target Support"
layout: page
cat: "ug-0-6"
id: "about-target-support"
menus: [ "users", "user-guide", "0.6" ]
---

Roboconf can deploy an application on various targets.  
This includes cloud infrastructures (IaaS) or other kinds of targets.  
It can even deploy a part of an application on a given IaaS and some other parts on other IaaS.
This makes Roboconf suitable for hybrid deployments. Thus, you can deploy applications in the cloud,
in your (self-hosted) information system or even on embedded systems (connected devices, internet of things...).

> Target features may vary from one infrastructure to another.  
> These features are implemented depending on our own requirements. Obviously, they can be extended if necessary.


## Overview

Roboconf is about applications.  
Applications are made up of instances, each instance having a component which defines its
behavior with respect to other components. Some of these components designates machines, being
virtual or physical. Containers, such as Docker containers, are included in this definition as well.

These specific "*scoped*" instances can be recognized because their installer is called **target**.  
To create, delete, and more generally, manage the life cycle of such a machine, Roboconf's **target** installer
needs additional information. As an example, creating a machine on Amazon Web Services or creating a Docker container
is not exactly the same thing (not the same means, not the same API, not the same libraries).

To specify the configuration and the library to perform the configuration, a scoped instance must be associated with a target.
A target includes the identifier of a "*target handler*" library and some properties to indicate how to configure the machine.

A target is defined by:

* A **handler**, which points to a **target handler** (an OSGi bundle to deploy in Roboconf).
* A **name** (optional), that will be more explicit for users.
* A **description** (optional), that will help users to understand it.
* Various properties, that depend on the **handler**.

Beyond its properties, a target aims at being associated with *scoped* instances.  
This association is made per application. Every time you create a new application, you should configure the associations
between its scoped instances and targets. It is also possible to set a given target as the default for a given application.

When a scoped instance is not associated with any target, and that you try to deploy it, then Roboconf will use this default
target to deploy the instance. 

**Multi-IaaS** (for hybrid cloud) is handled by defining several scoped instances and by associating them
with different targets. Thus, one can target an Openstack infrastructure, while another one can be deployed on Amazon Web Services. 


## Web Definition and Management

Since version 0.5, deployment targets can be defined and associated with applications through the web console.  
This includes:

* Creating and editing the properties of a target.
* Deleting a target, provided it is not currently used (nor referenced) by an application.
* Associating a target with a specific instance of a given application.
* Defining a target as the default one for an application.


## Predefined Targets

Although targets can now be defined in the web administration, it remains possible to embed
predefined targets in deployment archives. Notice that these targets and their associations can
be modifiable with the web console.

For every predefined target, the definition follows the same schema.
In the graph model, root components are associated with hardware elements. This can be virtual machines (VMs),
existing machines or devices. These root components must be associated with the **target** installer.  

When Roboconf will parse the model, it will know recognize this installer and then search for the IaaS configuration.  
It means the resources directory associated with this root component MAY contain a **target.properties** file.

All the predefined instances of this same component will use this target.  
Subsequently created instances will use the default one associated with the application. 

	graph
	├── your-graph-model.graph
	├── ...
	└── "root component" directory
	    └── target.properties

The deployment manager will analyze the properties and deduce which target handler pick up.  
It will then pick up the right client library to create the VM. Most of the target implementations
of Roboconf rely on virtual images (or AMI or appliance). It means Roboconf creates a virtual machine
from a template and properties given in the IaaS properties.
