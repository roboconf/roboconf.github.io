---
title: "New &amp; Noteworthy"
layout: page
cat: "main"
id: "new-and-noteworthy-0.6"
menus: [ "users", "download" ]
---

This page lists the enhancements and new features brought by Roboconf 0.6.


## HTTP Messaging

Roboconf messaging was reworked to be extensible.  
In addition to RabbitMQ, there is now an implementation based on web sockets, which means RabbitMQ
is not mandatory anymore.

<img src="/resources/img/nn-0.6-http-messaging.png" alt="Roboconf topology with HTTP messaging" class="gs" />

This implementation fits for new beginners and small deployments, but is not
recommended for production environments.
<br /><br />


## Roboconf Commands

This new version introduces Roboconf commands.  
Commands are scripts with Roboconf instructions...

<pre><code class="language-roboconf-commands"># Create a root instance.
Create RootComponent as myRoot

# Create a new instance.
Create component as myInstance under /myRoot

# Replicate a root instance.
Replicate /myRoot as myRoot2

# Rename an instance.
Rename /myRoot2 as myRootCopy

# Associate a root/scoped instance with a given target.
Associate /myRootCopy with 3

# Change the state of an instance.
Change status of /myRoot/myInstance to NOT_DEPLOYED
Change status of /myRoot/myInstance to DEPLOYED_STOPPED
Change status of /myRoot/myInstance to DEPLOYED_STARTED

# Bulk actions.
# These actions are performed on the instance itself and on its children too.
Deploy and start all /myRootCopy
Stop all /myRootCopy
Undeploy all /myRootCopy

# Delete an instance.
Delete /myRootCopy
</code></pre>

... that can be listed and executed from the web console...

<img src="/resources/img/nn-0.6-commands-in-the-web-console.png" alt="Listing executable commands in the web console" class="gs" />

... or used with the autonomic.

<img src="/resources/img/autonomic-diagram.png" alt="A reminder about the way autonomic management works" class="gs" />
<br />


## New DSL for autonomic rules

Autonomic rules have been reworked.  
They now use a small sub-set of the [Drools](http://www.drools.org/) syntax.
The previous syntax is not supported anymore.

<pre><code class="language-roboconf-rules">rule "scale"
	when
		cpuIsTooHigh
	then
		replicateMachine
end
</code></pre>
<br />


## Block Storage with Openstack and AWS

Several options have been added to Roboconf's Openstack and Amazon Web Services drivers.  
Most of these options are related to the creation, reuse and attachment of block storage.

<img src="/resources/img/aws.png" alt="AWS's logo" class="gs" /><br />
<img src="/resources/img/openstack.jpg" alt="Openstack's logo" class="gs" />
<br />


## Efficient multi-IaaS deployments of Docker containers

We have added new variables in the **script** plug-in and in the graph DSL
to manage Docker container across several cloud infrastructures. It in particular
deals with port conflicts and information resolution. 

<img src="/resources/img/docker-containers-managed-by-agents.png" alt="Docker containers managed by Roboconf agents" class="gs" />
<br />

## Miscellaneous

A lot of enhancements have been brought to this new version.  
And many bugs were fixed too. Please, refer to the release notes for details.

* [Platform](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.6)
* [Web Administration](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.6)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.6)
