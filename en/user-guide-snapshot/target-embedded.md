---
title: "Embedded Support"
layout: page
cat: "ug-snapshot"
id: "target-embedded"
menus: [ "users", "user-guide", "Snapshot" ]
---

Embedded support addresses the cases where the machines already exist or are created manually.  
Therefore, it covers existing (physical) machines, devices (such as cards) and virtual machines created
manually (e.g. with Virtual Box).

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-the-dm.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target embedded
```

Or with the native Karaf commands:

```properties
# Here in version %v_SNAP%
bundle:install --start mvn:net.roboconf/roboconf-target-embedded/%v_SNAP%
```

With this configuration, you need to start the agent directly.  
And you will have to pass it some information by hand (like the IP address of the messaging server).  
This is achieved by updating the **net.roboconf.agent.configuration.cfg** file under Karaf's **etc** directory.

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for Embedded Machines
handler = embedded
id = a unique identifier
name = 
description = 
```

Here is a complete description of the parameters for Embedded.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| handler | Determines the target handler to use | none, must be "embedded" | yes |
| id | A unique identifier for the target properties. | - | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| embedded.ip | A list of comma-separated IP addresses, that refer to hosts with roboconf agents installed (an IP will be automatically selected when needed, and user-data transferred there using scp). | - | no |
| scp.user | A scp user name, to transfer user-data to a remote host referenced in the IP list (see embedded.ip). | ubuntu | no |
| scp.keyfile | A scp key file (.pem or so), to transfer user-data to a remote host referenced in the IP list (see embedded.ip): when no key file is specified, ~/.ssh/id_rsa and ~/.ssh/id_dsa are used. | - | no |
| scp.agent.configdir | The directory that contains agent configuration on the remote host. | /etc/roboconf-agent | no |

