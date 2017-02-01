---
title: "Autonomic Management"
layout: page
cat: "ug-0-7"
id: "autonomic-management-with-roboconf"
menus: [ "users", "user-guide", "0.7" ]
---

Autonomic management is an experimental feature of Roboconf.  
It consists in two parts:

* On one side, agents retrieve metrics on their local node.  
These metrics are compared against some values given in the agent's configuration.
If they exceed, equal or are lower than given values (depending on the configuration rules),
agents send a notification to the DM.
* On the other side, when the DM receives such a notification, it checks its configuration
to determine which action to undertake. This can go from a single log entry, to e-mail notification
or even replicating a service on another machine. 

> Autonomic management is complementary to usual monitoring tools.  
> One does not replace the other.

This schema summers up the way autonomic management works.  
Detection is delegated to agents. Reactions are managed by the Deployment Manager (DM).

<br />
<img src="/resources/img/autonomic-diagram.png" alt="An overview of the way autonomic management works" />

You can report to the following documentation for details:

* [Configuring probes](configuring-probes-for-the-autonomic.html)
* [Specifying automatic reactions](specifying-automatic-reactions.html)


## Activation

On the agent side, autonomic is handled in the **roboconf-agent-monitoring** bundle.  
So, you can disable autonomic management by stopping or uninstalling this bundle.

On the DM, you have nothing to do.  
Reacting to agent messaging is the normal job of the DM.

> The DM can usually be stopped when it is not used.  
> However, it has to run ALL the time when autonomic management is used.
