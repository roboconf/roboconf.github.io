---
title: "What is Roboconf?"
layout: page
cat: "main"
id: "what-is-roboconf"
menus: [ "project", "what-is-roboconf" ]
---

Roboconf is both a platform and framework to manage elastic applications in the cloud.  
Elastic applications designate those whose deployment topology may vary over time (e.g. scaling up or down).
Roboconf manages deployments, probes, automatic reactions and reconfigurations. Beyond applications, Roboconf could also be defined as a « PaaS framework »: a solution to build PaaS (Platform as a Service). Most PaaS, such as Cloud Foundry or Openshift, target developers and support application patterns. However, some applications require more flexible architectures or design. Roboconf addresses such cases.

With Roboconf, there is no constraint about the programming language, the kind of application or the operating system. You define what you put in your platform, you specify all the interactions, administration procedures and so on.

Roboconf handles application life cycle: hot reconfiguration (e.g. for elasticity issues) and consistency 
(e.g. maintaining a consistent state when a component starts or stops, even accidentally). This relies on a messaging queue 
(currently [Rabbit MQ](https://www.rabbitmq.com)). Application parts know what they expose to and what they depend on from other parts.
The global idea is to apply to applications the concepts used in component technologies like OSGi. Roboconf achieves this in a non-intrusive
way, so that it can work with legacy Software.

<img src="/resources/img/roboconf-workflow.png" alt="Roboconf's workflow" class="gs" />

Application parts use the message queue to communicate and take the appropriate actions depending on what is deployed or started.
These *appropriate* actions are executed by plug-ins (such as bash or [Puppet](http://puppetlabs.com)). 

<img src="/resources/img/roboconf-architecture-example.jpg" alt="Roboconf's architecture" class="gs" />

Roboconf is distributed technology, based on AMQP 
and REST / JSon. It is IaaS-agnostic, and supports many well-known IaaS (including OpenStack, Amazon Web Services, Microsoft Azure, VMWare, 
as well as a "local" deployment plug-in for on-premise hosts). Please, [refer to the FAQ](user-guide/faq.html) for more details.


## History

Roboconf was created to be the foundations of [Open PaaS](http://open-paas.org/).  
Open PaaS is an Enterprise Social Network, i.e. a platform dedicated to collaborations
within organizations (messaging, groups and projects management, video conference...). The project 
is led by [Linagora](http://linagora.com), which also works on Roboconf in collaboration with the *[Laboratoire Informatique de Grenoble](https://www.liglab.fr/)*.
This entity is part of the Research department in Computer Science and Software Engineering of [Université Joseph Fourier](https://www.ujf-grenoble.fr/),
in Grenoble, France.
  
<strong>Technical requirements</strong> for Open PaaS' foundations were clear.
	
* Support cloud deployments (public, private and hybrid clouds)
* Ensure developers could choose any solution they would (databases, servers, development languages...)
* Provide elasticity mechanisms (automatic load-adaptation...)
* Be fully open-source (as all the solutions used and developed by Linagora).

The real business value for the company was clearly about the applications to run in the cloud.  
At the time (end of 2012), some cloud solutions were emerging, but none of them matched all the criteria above.
Contacts between [Linagora](http://linagora.com) and [Université Joseph Fourier](https://www.ujf-grenoble.fr/) led to
a partnership to prototype such a solution with a focus on industrial applications. Roboconf was born...


## Use Cases

General use cases are listed [here](/slides/general/roboconf-use-cases.html).  
The following list includes cases we illustrated through samples, demos or for real requirements.

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
