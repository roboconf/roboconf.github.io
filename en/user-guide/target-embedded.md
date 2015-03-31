---
title: "Embedded Support"
layout: page
id: "ug.snapshot.target-embedded"
menus: [ "users", "user-guide" ]
---

Embedded support addresses the cases where the machines already exist or are created manually.  
Therefore, it covers existing (physical) machines, devices (such as cards) and virtual machines created
manually (e.g. with Virtual Box).

To install it, open the DM's interactive mode and type in...

```properties
# Here in version 0.3
bundle:install mvn:net.roboconf/roboconf-target-embedded/0.3
bundle:start <bundle-id>
```

With this configuration, you need to start the agent directly.  
And you will have to pass it some information by hand (like the IP address of the messaging server).  
This is achieved by updating the **net.roboconf.agent.configuration.cfg** file under Karaf's **etc** directory.

Sample **target.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for Embedded Machines
target.id = embedded
```

This kind of target does not have any specific property.
