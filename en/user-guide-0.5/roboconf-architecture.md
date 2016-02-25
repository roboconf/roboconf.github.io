---
title: "Roboconf Architecture"
layout: page
cat: "ug-0-5"
id: "roboconf-architecture"
menus: [ "users", "user-guide", "0.5" ]
---

Roboconf relies on 3 elements: the DM, agents and a messaging server (RabbitMQ).  
VM designate Virtual Machines or any kind of machine (server, device...). 

<img src="/resources/img/roboconf-architecture.jpg" alt="Architecture Diagram" class="gs" />

Multi-target and hybrid deployments are supported.
This can be used for critical periods (load increase) or for migration purpose.  
It can also serve strategic objectives (like data security and privacy issues).

The next diagram illustrates this with some cloud infrastructures.
It only shows interaction between Roboconf parts, and not between the parts of the applications that Roboconf deploys. 

<img src="/resources/img/roboconf-architecture-example.jpg" alt="Sample Architecture Diagram" class="gs" />

The overall idea is that the agents run remotely (e.g. in the cloud), while the DM (Deployment Manager)
can run in a secured area. The DM is indeed a administration tool that requires a safer installation. 
