---
title: "In-Memory Support"
layout: page
id: "ug.snapshot.target-in-memory"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation to run agents in memory.    

> This implementation has no interest for production environments.  
> However, it is really useful to debug Roboconf.

When it is asked to create a VM, this implementation launches an agent instance into
a distinct thread. Depending on the plug-ins the agent uses, this can lead to permissions issues.
As an example, the Puppet plug-in requires root permissions to work. When someone uses this
implementation, he or she should use the logger plug-in.  

Sample **target.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for in-memory
target.id = in-memory
```

This target handler does not have any specific property.
