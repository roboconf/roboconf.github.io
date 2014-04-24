---
title: "Embedded Support"
layout: page
id: "ug.snapshot.iaas-embedded"
menus: [ "users", "user-guide" ]
---

Embedded support addresses the cases where the machines already exist or are created manually.  
Therefore, it covers existing (physical) machines, devices (such as cards) and virtual machines created
manually (e.g. with Virtual Box).

With this configuration, you need to start the agent directly.  
And you will have to pass it some information by hand (like the IP address of the messaging server).
The most simple solution is to update the startup script of the agent.

Sample **iaas.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for Embedded Machines
iaas.type = embedded
```
