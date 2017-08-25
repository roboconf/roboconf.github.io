---
title: "Roboconf Architecture"
layout: page
cat: "ug-0-8"
id: "roboconf-architecture"
menus: [ "users", "user-guide", "0.8" ]
---

Roboconf relies on 3 elements: the DM, agents and a messaging server (RabbitMQ).  
VM designate Virtual Machines or any kind of machine (server, device...). 

<img src="/resources/img/roboconf-architecture.jpg" alt="Architecture Diagram" class="gs" />

* The **Deployment Manager** (or DM) is in charge of managing
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
Depending on the Roboconf messaging implementation, this server may be available
in the DM itself.

Multi-target and hybrid deployments are supported.
This can be used for critical periods (load increase) or for migration purpose.  
It can also serve strategic objectives (like data security and privacy issues).

The next diagram illustrates this with some cloud infrastructures.
It only shows interaction between Roboconf parts, and not between the parts of the applications that Roboconf deploys. 

<img src="/resources/img/roboconf-architecture-example.jpg" alt="Sample Architecture Diagram" class="gs" />

The overall idea is that the agents run remotely (e.g. in the cloud), while the DM (Deployment Manager)
can run in a secured area. The DM is indeed a administration tool that requires a safer installation. 
