---
title: "FAQ"
layout: page
cat: "ug-last"
id: "faq"
menus: [ "users", "user-guide", "0.4" ]
---

## What is Roboconf?

Roboconf is a deployment tool for distributed applications.  
It is in particular adapted to deployments in cloud infrastructures, but not only.
Roboconf takes as input the description of a whole application in terms of "components" and "instances".
  
From this model, it then takes the burden of launching Virtual Machines (VMs), deploying software on them, resolving dependencies 
between software components, updating their configuration and starting the whole stuff when ready. Roboconf also handles the 
application life cycle: hot reconfiguration (e.g. for elasticity issues) and consistency (e.g. maintaining a consistent state 
when a component starts or stops, even accidentally).


## What are its key points?

Roboconf allows to define a model of the application that one wants to deploy.  
It then offers a vision of this model during deployment and at runtime.

The model and the use of Roboconf are designed to be simple.  
This project tries to not reinvent the wheel, by using and relying on several well-known technologies
(Puppet, AMQP, Bash, REST/JSON web services...).

Roboconf is asynchronous (the application parts can be deployed in any order) and IaaS-agnostic (provides plug-ins for
many well-known IaaS, including OpenStack, Amazon WS, Azure, VMWare, as well as an *embedded* deployment plug-in for
on-premise hosts). The asynchronous mechanisms Roboconf supports allow to add and remove dynamically application parts. 
Other application parts are then updated and/or reconfigured depending on what happened there.


## Is Roboconf open source?

Yes, Roboconf is open source.  
See the [license page](../license.html) for more information.


## What are Roboconf pre-requisites?

Roboconf is developed in Java.  
You at least need a JDK 1.7 (Oracle JDK or OpenJDK) to run it.

Although the agent is developed in Java, it would be possible to implement your own agent in your own language.
This could suit constrained environments (such as connected objects). The only requirement is that this agent can
access a messaging server to interact with the Deployment Manager.

The current messaging server is RabbitMQ. It supports a wide variety of clients, implemented in different languages. 


## What does Roboconf bring in addition to classics like Bash and SSH?

Roboconf could be replaced by some scripts executed by hand, but the result would be very complicated to maintain.  
In fact, Roboconf recipes can use bash scripts. Roboconf only plugs dynamicity behind script invocations.


## What is Roboconf's position with respect to standards?

In terms of concepts, Roboconf is very close from [TOSCA](http://en.wikipedia.org/wiki/OASIS_TOSCA).  
We should investigate this deeper in the future, since Roboconf may be seen as a deployment orchestrator.


## How about Puppet, Chef or CFEngine?

[Puppet](http://puppetlabs.com/), [Chef](http://docs.opscode.com/) and [CFEngine](http://cfengine.com/) are various
deployment solutions. Roboconf does not pretend to be a concurrent, but instead, a complement to these solutions. 
The real key feature of Roboconf is the asynchronous exchanges to adapt and deploy concurrently Software components. How
Roboconf concretely deploys something (once the asynchronous thing worked) is delegated to plug-ins. For the moment, we have
a Bash and a Puppet plug-ins. It means Roboconf receipts can be either bash scripts or Puppet modules.

No plug-in has been developed for Chef and CFEngine (yet), but we have this in mind.  
This plug-in approach allows to use and mix various solutions in a deployment. It also
makes Roboconf an extensible solution that can fit various requirements.


## Are there concurrent solutions to Roboconf?

Yes, you can take a look at [Cloudify](http://getcloudify.org/), [Right Scale](http://www.rightscale.com/), [Scalr](http://www.scalr.com/)
and the OW2 project [Sirocco](http://wiki.sirocco.ow2.org/xwiki/bin/view/Main/WebHome).  
You may also be interested by [JClouds](http://jclouds.apache.org/), which is a Java toolkit to manipulate IaaS APIs.
