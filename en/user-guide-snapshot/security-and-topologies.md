---
title: "Security :: Roboconf Topologies"
layout: page
cat: "ug-snapshot"
id: "security-and-topologies"
menus: [ "users", "user-guide", "Snapshot" ]
---

Security, as a general matter, also depends on the way Roboconf is deployed.  
As a reminder, the overall architecture looks like...

<img src="/resources/img/roboconf-architecture.jpg" alt="Architecture Diagram" class="gs" />

Obviously, this schema relies on a dedicated messaging server (here, Rabbit MQ).  
This is the recommended configuration for production environments.

With such a configuration, the agents and the DM must all *see* the messaging server.  
So, they must all be on a same network, or the messaging server should be on a public address.

Agent will be located on their own machines.  
The DM (Deployment Manager) should not be available on a public address. It should even be located on a secured machine.
Indeed, it provides administration features and should thus remain in a restricted area.
