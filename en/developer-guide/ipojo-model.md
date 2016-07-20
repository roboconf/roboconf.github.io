---
title: "The iPojo Model"
layout: page
cat: "dg-snapshot"
id: "ipojo-model"
menus: [ "developers", "developer-guide" ]
---

[iPojo](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo.html) is the component model Roboconf uses to ease OSGi development.  
All the bundles that use iPojo contain a **metadata.xml** file. Not all the bundles need iPojo. As an
example, **roboconf-core** is a usual bundle that only exports libraries. It does not define any OSGi service.
The reason why we put all the iPojo meta-data in a XML file and not in Java annotations, is that Roboconf uses
several technologies, and that several of them come with annotations (Jersey, Jackson, iPojo, etc). 
So, we decided to use as less annotations as possible to prevent mixes.

It is not in the scope of this page to introduce iPojo.  
It only lists the various iPojo components we have and their relations.


## DM Distribution

The DM has two extension points.

* One is about `ITargetHandler`s (defined in **roboconf-target-api**).
* The second one is about `IDmListener`s (defined in **roboconf-dm**).

The following UML diagram illustrates the components we have and their relations.  
DM listeners do not appear but work the same way than target handlers (with their own extension-point in the DM).

<br />
<img src="/resources/img/ipojo-dm.png" alt="The iPojo model on the DM's side" />

<br />

Basically, every (deployment) target handler is associated with an iPojo component (same thing for DM listeners).  
All the target handlers implement a same interface. They are injected into the DM's component. We can see this
as an extension mechanism, with all the benefits of OSGi (class loader isolation, hot deployment...).
The DM component can run even when there is no target handler (and no DM listener).

When the DM's component is started, it is injected in another component, called **roboconf-dm-rest-component**.
This last component depends on the DM and on the OSGi HTTP service (not represented here since it is not an iPojo
component). This component is in charge of registering and if necessary, unregistering, REST resources in 
the HTTP server of the OSGi container.

iPojo guarantees that all the dependencies are available and started.  
It means that if the REST resources are registered, then there is a (Roboconf) manager behind to handle the requests.  


## Agent Distribution

A similar organization can be found on the agent's side.
Here is a UML diagram that illustrates the components we have and their relations.  

<br />
<img src="/resources/img/ipojo-agent.png" alt="The iPojo model on the agent's side" />

<br />

Basically, every plug-in is associated with an iPojo component.  
All the plug-ins implement a same interface. They are injected into the agent's component. We can see this
as an extension mechanism, with all the benefits of OSGi (class loader isolation, hot deployment...).
The agent component can run even when there is no plug-in.

When the agent's component is started, it is injected in another component, called **roboconf-agent-monitoring**.
This last component is in charge of querying local applications to detect potential issues. And it needs the agent
to reuse its messaging client.

> We may have created an iPojo component for messaging clients, but for historical reasons,
> we kept everything in the agent (and in the DM). By having a component for the messaging client,
> we could have directly shared the messaging client between these two bundles.

A specific thing on the agent is that **there are 2 agent use cases**.  
By default, agents are launched and configured through Karaf. However, the **in-memory** target
creates and configures agent instances on the fly (and through iPojo factories). In both cases, it
is the same Java class behind. Only its configuration changes.


## Roboconf Messaging

In addition to these extensions points, which are either specific to the DM or to agents,
there is an extension point in the Roboconf messaging.  
**This is clearly the most complex part of Roboconf. It is used by both the DM and agents.**

Roboconf allows to...

* ... change the messaging implementation at runtime.
* ... change the configuration of a messaging implementation at runtime.

When we say at runtime, it means that you only need to update the configuration files and
it is automatically propagated and reconfigured. And the extension point for messaging implementations was designed
to support this. So, what is complex is not creating a new messaging implementation. What is complex is not the way
the DM and agents use the messaging. What is complex is the glue between these 2 layers.

<br />
<img src="/resources/img/ipojo-messaging.png" alt="A big picture of the messaging in Roboconf" class="gs" />
<br /><br />

However, the essential part is to remember that **there is an extension point to plug new messaging implementations**, and that
this extension is based on iPojo. Notice it does not register messaging clients but factories to create messaging clients.
The diagram below gives a more detailed overview of the way messaging is implemented. Again, this is clearly the most complex part of Roboconf.

<br />
<img src="/resources/img/ipojo-messaging-detailed.png" alt="A more detailed picture of the messaging in Roboconf" class="gs" />
<br />

It mixes iPojo and casual Java. This mechanism works in both OSGi and non-OSGi environments. The way reconfigurable clients
get the registry for messaging factories is quite simple in fact: they check whether there are in an OSGi environment. If so,
they get the registry from the OSGi service registry. Such a service was registered by our iPojo configuration. When we are
outside OSGi, a registry has to be set by hand in the code. Roboconf provides shortcuts for that.
