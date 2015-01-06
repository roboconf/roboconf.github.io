---
title: "In-Memory Support"
layout: page
id: "ug.snapshot.target-in-memory"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation to run agents in memory.    

> This implementation has no interest for production environments.  

The in-memory target acts as a simulation mode.  
When it is asked to create a VM, this implementation launches a new agent instance (as a new
iPojo instance). These agents mock extensions, which means no script or Puppet module is used.
Instead, life cycle actions (deploy, start, etc.) result in a log entry and nothing more.

In-memory support is useful for...

* ... experimenting with Roboconf (tutorials).
* ... debugging Roboconf's internal mechanisms.
* ... testing (unit and integration tests).

Sample **target.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for in-memory
target.id = in-memory
```

This target handler does not have any specific property.
