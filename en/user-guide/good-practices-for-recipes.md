---
title: "Good Practices for Recipes"
layout: page
cat: "ug-last"
id: "good-practices-for-recipes"
menus: [ "users", "user-guide" ]
---

Writing recipes is the most difficult part when using Roboconf.  
To prevent some issues, there are some good practices to follow.

## Recipes should stick with Local Actions

Recipes should avoid notifying other servers or remote elements.  
They should only execute local commands. For remote actions, you should rely on
Roboconf notifications.


### Example

Let's consider the following use case: 

* Several kinds of applications.
* A registry to list instances of these applications.  
We would like our registry to be notified every time an instance of an application appears or disappears.

One way to achieve that is the following (partial) graph.

```roboconf
app1 {
	installer: script;
	imports: registry.ip;
}

app2 {
	installer: script;
	imports: registry.ip;
}

# ...

appN {
	installer: script;
	imports: registry.ip;
}

registry {
	installer: script;
	exports: ip;
}
``` 

The application's scripts would then make REST invocations to the registry API.  
That would work, but it may lead to inconsistencies in Roboconf.


### Under the Hood

There are two assumptions under Roboconf.

1. Stopping an element stops its children too.  
But the scripts of the children are not invoked by the Roboconf agent. 
BUT notifications are sent to indicate these elements were stopped.
This hypothesis is optimistic. It was taken for performance reasons.

2. Stopping the VM does not imply the agent.  
When a VM is stopped by Roboconf, the DM does not send anything to the agent. It asks the infrastructure
to directly kill or stop the VM. No script is executed on the VM. BUT notifications are sent to indicate
the VM elements were stopped and undeployed.

> There would be other alternatives to this solution, but they keep on introducing infinite new problems.    
> The solution based on the infrastructure is the most simple at all levels.


### Problem

Knowing these facts, one can easily understand the previous graph may result in inconsistencies.  
The registry may consider an application instance is still running while it was stopped by Roboconf.
**The solution to that is to make recipes stick with local actions.** Remote ones should be handled
through Roboconf notifications (i.e. dependency changes).


### Solution

The solution is simple: **invert control**.  
Let's consider the following graph.

```roboconf
facet app {
	exports: kind;
}

app1 {
	installer: script;
	facets: app;
	exports: kind = app1;
}

app2 {
	installer: script;
	facets: app;
	exports: kind = app2;
}

# ...

appN {
	installer: script;
	facets: app;
	exports: kind = appN;
}

registry {
	installer: script;
	imports: app.*;
}
```

Here, application scripts only handle the life cycle of their application.  
They do not contact the registry. On the other hand, the registry's scripts are in charge of
registering and unregistering all the applications. Roboconf guarantees the right notifications
will be sent.

In terms of maintenance and granularity, one may remove the registry component without having to
modify the application scripts. This approach guarantees loose coupling between components and high cohesion for
their recipes.
