---
title: "Embedded Support"
layout: page
cat: "ug-last"
id: "target-embedded"
menus: [ "users", "user-guide" ]
---

Embedded support addresses the cases where the machines already exist or are created manually.  
Therefore, it covers existing (physical) machines, devices (such as cards) and virtual machines created
manually (e.g. with Virtual Box).

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-roboconf.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target embedded
```

Or with the native Karaf commands:

```properties
# Here in version 0.7
bundle:install --start mvn:net.roboconf/roboconf-target-embedded/0.7
```

With this configuration, you need to start the agent directly.  
And you will have to pass it some information by hand (like the IP address of the messaging server).  
This is achieved by updating the **net.roboconf.agent.configuration.cfg** file under Karaf's **etc** directory.

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for Embedded Machines
handler = embedded
name = 
description = 
```

Here is a complete description of the parameters for OpenStack.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| handler | Determines the target handler to use | none, must be "embedded" | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
