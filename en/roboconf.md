---
title: "What is Roboconf?"
layout: page
cat: "main"
id: "what-is-roboconf"
menus: [ "project", "what-is-roboconf" ]
---

Roboconf is a distributed solution to deploy distributed applications.
It is a deployment tool for the cloud, but not only. It allows to describe distributed applications
and handles deployment automatically of the entire application, or of a part of it. Consequently, Roboconf supports scale-up
and scale-down natively. Its main force is the support of dynamic (re)configuration. This provides a lot of flexibility and
allows elastic deployments.

Roboconf takes as input the description of a whole application in terms of "components" and "instances".
From this model, it then takes the burden of launching Virtual Machines (VMs), deploying software on them, resolving dependencies
between software components, updating their configuration and starting the whole stuff when ready.

Roboconf handles application life cycle: hot reconfiguration (e.g. for elasticity issues) and consistency
(e.g. maintaining a consistent state when a component starts or stops, even accidentally). This relies on a messaging queue
(currently [Rabbit MQ](https://www.rabbitmq.com)). Application parts know what they expose to and what they depend on from other parts.
The global idea is to apply to applications the concepts used in component technologies like OSGi. Roboconf achieves this in a non-intrusive
way, so that it can work with legacy Software.

Application parts use the message queue to communicate and take the appropriate actions depending on what is deployed or started.
These *appropriate* actions are executed by plug-ins (such as bash or [Puppet](http://puppetlabs.com)).

Roboconf is distributed technology, based on AMQP
and REST / JSon. It is IaaS-agnostic, and supports many well-known IaaS (including OpenStack, Amazon Web Services, Microsoft Azure, VMWare,
as well as a "local" deployment plug-in for on-premise hosts).

## Use Cases

The following are use cases Roboconf has illustrated through samples.
The sources for these samples will be soon available on GitHub.

* **Legacy LAMP**: a classic web application based on an Apache load balancer, a web application deployed on Tomcat and MySQL as the database.
The interest is to see how it is easy to add and remove new Tomcat servers. Tomcat instances are configured right after deployment. The connection
to MySQL is established at runtime and the load balancing configuration is updated on the fly.

* **M2M / IoT**: deploy and interconnect Software elements on embedded devices and in the cloud.
The use case that was studied is about home sensors that send big data to analysis tools (such as [Hadoop](http://hadoop.apache.org/) or
[Storm](http://storm.incubator.apache.org/) for real-time computation) deployed on the cloud. New devices can appear
or disappear and everything gets reconfigured in consequence. As a reminder, M2M means *machine to machine* and IoT *Internet of Things*.

* **Open PaaS**: an open-source Social Networking Service deployed in the cloud.
[Open PaaS](http://open-paas.org) is a project which aims at developing a web collaboration suite for companies and organizations.
It uses [NodeJS](http://nodejs.org/), [NPM](http://www.npmjs.org/) and various other Software ([Redis](http://redis.io/), [MongoDB](http://www.mongodb.org/), LDAP, etc).
