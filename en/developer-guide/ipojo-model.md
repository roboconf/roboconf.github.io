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
