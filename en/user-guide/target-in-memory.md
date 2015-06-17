---
title: "In-Memory Support"
layout: page
cat: "ug-snapshot"
id: "target-in-memory"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation to run agents in memory.

> This implementation has no interest for production environments.

To install it, open the DM's interactive mode and type in...

```properties
# Here in version 0.3 (with its dependencies)
bundle:install mvn:net.roboconf/roboconf-plugin-api/0.4
bundle:install mvn:net.roboconf/roboconf-agent/0.4
bundle:install mvn:net.roboconf/roboconf-target-in-memory/0.4
bundle:start <bundle-id1> <bundle-id2> <bundle-id3>
```

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

```properties
# Configuration file for in-memory
target.id = in-memory
```

Here is a complete description of the parameters for Amazon Web Services.

| Property | Description | Default | Mandatory
| --- | --- | --- | --- |
| target.id | Determines the target handler to use | none, must be "in-memory" | yes |
| in-memory.delay | The delay (in milliseconds) to wait for before instantiating a new agent in memory. | 0 | yes |
