---
title: "Roboconf Concepts"
layout: page
cat: "ug-0-3"
id: "roboconf-concepts"
menus: [ "users", "user-guide", "0.3" ]
---

Roboconf is made up of several blocks.

* The **Deployment Manager** (or DM) is a web application in charge of managing
Virtual Machines (or VM) and the agents.  
It acts as an interface to the set of VMs or devices. It is also in charge of instantiating VMs.

* The **Agent** is a Software component that must be deployed on every VM and device
on which Roboconf must deploy or control something.  
Agents use plug-ins to delegate the manipulation of Software instances. As an example, there are a 
Bash and a Puppet plug-ins. Roboconf does not reinvent the wheel, it tries to reuse existing and robust 
solutions. Roboconf agents communicate with each other through the messaging server.

* The **Messaging Server** is the key component that enable communications between
the DM and the agents.  
The DM and the agents always communicate asynchronously through this server.

* Eventually, a **REST client** is required to control the DM.  
Roboconf comes with a web application which provides a user interface to interact
with the DM through REST. If one wants to use or develop another client, the REST API 
is described in the [developer guide](../developer-guide/developer-guide.html). 

In terms of model and configuration files, Roboconf has the following concepts.

* The **application** descriptor contains meta-information about the application.  
Name, version qualifier, description and so on.

* The **graph** is in fact a set of graphs.  
It define Software components which go from the (virtual) machine to the application package. The
graph defines **containment** relations (a WAR application is deployed **over** a Tomcat server) and
**runtime** relations (the WAR application **needs** a MySQL database). **The graph is a set of rules 
that will be used at runtime.**

* If the graph defines relations between components, **instances** represent concrete components.  
As an example, you could have defined a Tomcat component in the graph, and have two instances, one deployed
on a machine A, and another one on machine B. These would be two instances of a same component. The rules
that apply to them are deduced from the graph, but they have their own configuration.
