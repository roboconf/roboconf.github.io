---
title: "Roboconf Architecture"
layout: page
id: "ug.snapshot.roboconf-architecture"
menus: [ "users", "user-guide" ]
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
