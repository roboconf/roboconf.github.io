---
title: "FAQ"
layout: page
id: "ug.snapshot.faq"
menus: [ "users", "user-guide" ]
---

# What is Roboconf?

Roboconf is a deployment tool for the cloud: taking as input the description of a whole application in terms of "components" and "instances".  
From this model, it then takes the burden of launching Virtual Machines (VMs), deploying software on them, resolving dependencies 
between software components, updating their configuration and starting the whole stuff when ready.

Roboconf also handles the application lifecycle: hot reconfiguration (e.g. for elasticity issues) 
and consistency (e.g. maintaining a consistent state when a component starts or stops, even accidentally).


# What are its key points?

Roboconf allows to define a model of the application that one wants to deploy.  
It then offers a vision of this model during deployment and at runtime.

The model and the use of Roboconf are designed to be simple.  
It uses known technologies (Puppet, AMQP, Bash, REST/JSON web services).

Roboconf is asynchronous (the application can be deployed in any order) and IaaS-agnostic (provides plug-ins for
many well-known IaaS, including OpenStack, Amazon WS, Azure, VMWare, as well as a "local" deployment plug-in for
on-premise hosts).

# What are Roboconf pre-requisites?

Roboconf is developed in Java.  
You at least need a JDK 1.6 (Oracle JDK or OpenJDK) to run it.

Although the agent is developed in Java, it would be possible to implement your own agent in your own language.
This could suit constrained environments (such as connected objects). The only requirement is that this agent can
access a messaging server to interact with the Deployment Manager.

The current messaging server is RabbitMQ. It supports a wide variety of clients, implemented in different languages. 

# What are the differences between Roboconf and...

## Some Bash script and SSH

Roboconf could be replaced by some scripts, but the result would be very complicated to maintain.


## Puppet

[Puppet](http://puppetlabs.com/) (using it with a central server) and Roboconf share numbers of common points.  
Roboconf is however designed to be part of an autonomous IaaS. It can instantiate VM on a IaaS, and add or remove
some very easily.

In addition, Puppet maintains the state of resources.  
Roboconf adds reconfiguration, meaning the it can push Puppet configurations. 


## Chef

[Chef](http://docs.opscode.com/) is a deployment solution for cloud infrastructures.  
Like for Puppet, Roboconf adds reconfiguration features. As an example, you ask for something to start, and it will
start only when all the dependencies are resolved and running. This kind of feature is not supported by Chef or Puppet.


## CFEngine

[CFEngine](http://cfengine.com/) is a configuration management system.  
Given intents, CFEngine performs the required operations to reach the expressed state.

Like for Puppet or Chef, Roboconf adds dynamicity and dependency resolution.  
Roboconf can also delegate them the static part while handling the dynamic part.


## Cloudify

[Cloudify](http://www.cloudifysource.org/) is very similar to Roboconf in the sense where you can express
dependencies toward other Software components. The platform will resolve and reconfigure these components
accordingly. The main difference with Roboconf is that Roboconf uses asynchronous messaging to enable communications.
The Deployment Manager is only required during deployments. Reconfiguration is handled automatically by the agents
according to the model rules. Eventually, Roboconf can delegate state maintenance to Puppet, Chef or CFengine.


## JClouds

[JClouds](http://jclouds.apache.org/) is a Java toolkit to manipulate IaaS APIs.  
Although Roboconf does not use it currently, we may implement a IaaS plug-in based on JClouds so that
people get more control over IaaS configuration.
