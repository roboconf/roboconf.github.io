---
title: "In-Memory Support"
layout: page
cat: "ug-snapshot"
id: "target-in-memory"
menus: [ "users", "user-guide", "Snapshot" ]
---

Roboconf has a target implementation to run agents in memory.    

> This implementation has no interest for production environments.

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-the-dm.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target in-memory
```

Or with the native Karaf commands:

```properties
# Here in version %v_SNAP% (with its dependencies)
bundle:install --start mvn:net.roboconf/roboconf-plugin-api/%v_SNAP%
bundle:install --start mvn:net.roboconf/roboconf-agent/%v_SNAP%
bundle:install --start mvn:net.roboconf/roboconf-target-in-memory/%v_SNAP%
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
handler = in-memory
name = 
description = 

# The delay (in ms) to wait between the request to create an agent
# and the moment it is created. This helps to simulate the time
# necessary to launch a virtual machine.
# in-memory.delay = 0

# Execute real recipes? False by default.
#in-memory.execute-real-recipes = false

# Force an IP address for the in-memory agent.
#in-memory.ip-address-of-the-agent = 
```

Here is a complete description of the parameters for Amazon Web Services.

| Property | Description | Default | Mandatory
| --- | --- | --- | --- |
| handler | Determines the target handler to use | none, must be "in-memory" | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| in-memory.delay | The delay (in milliseconds) to wait for before instantiating a new agent in memory. | 0 | no |
| in-memory.execute-real-recipes | Indicate whether agents should execute the real recipes or simulate them. By default, they simulate them. | false | no |
| in-memory.ip-address-of-the-agent | Force the agent to use this IP address as its own. Let it empty to let the agent guess it. | If recipes are simulated, and that no value is set, then *localhost* is used. If real recipes are used, there is no default value. | no |
