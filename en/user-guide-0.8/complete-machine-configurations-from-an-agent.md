---
title: "Complete Machine Configurations from an Agent"
layout: page
cat: "ug-0-8"
id: "complete-machine-configurations-from-an-agent"
menus: [ "users", "user-guide", "0.8" ]
---

Deployment targets are generally limited to a properties file.  
However, it is possible to complete them with a script that will be executed by the agent
when it receives it model. Such a script can be used to complete the configuration of the machine.

Typical example: mount and format partitions.  
Indeed, if cloud infrastructures provide block storage, they only create and
configure a disk. But this disk is generally not partitioned, and it need to be
mounted by the operating system.

Scripts executed by the agent address such a use case.  
To proceed, you need to add one or several scripts along with your target definition.

> This is not possible with the web administration.  
> Only deployed targets support this feature.

Here is the structure of your target, with an example.

```properties
# Structure of the deployment archive
├── target1.properties
└── target1/
    ├── agent.script.sh
    └── other resources
```

Your archive may contain several targets.  
Scripts associated with a given target must be located in a sub-directory whose name is
the same than the properties file (in the example: *target1*). There can be several resources
and several scripts. But **only one will be executed**. Other resources or scripts can only be
used as libraries or imports.

The script that is executed **must contain** the following string in its name: `agent.script.`  
The script extension can be anything and use any file extension (bash, python, etc). It must be an executable.  
These scripts do not accept any parameter, the agent executes them but does not pass them any information.

> Scripts executed by an agent should be idempotent.

Imagine a VM is configured to use a persistent disk.  
On the first use, the file system need to be created and mounted. If the VM is deleted and
the disk reused, we do not want to format the disk, we want to reuse it. So, the script should
verify whether the volume is partitioned, and mount it only if necessary.

> It is also possible to [complete machine configurations from the DM](complete-machine-configurations-from-the-dm.html).
