---
title: "Security: Roboconf Agents"
layout: page
cat: "ug-snapshot"
id: "security-and-agents"
menus: [ "users", "user-guide", "Snapshot" ]
---

Roboconf agents use the same basis than the DM: Apache Karaf.  
So, they should follow the same principles to be secured.

This pages only deals with the specifics for agents.


## Network interface

Generally, agents try to find their IP address.  
This address is then exchanged and passed to other agents so that applications
can interact with this VM.

However, it often happens in production environments that a VM has several network interfaces.
Generally, there is one dedicated to administration and another one for application flows.
This is why the agent allows to specify the network interface to use when searching for the
IP address.

Just edit the **net.roboconf.agent.configuration.cfg** file under Karaf's **etc** directory.
The property to modify is called **network-interface**. Its value by default is **eth0**.
If the specified interface does not exist, the picked up IP will be the host's default one.
