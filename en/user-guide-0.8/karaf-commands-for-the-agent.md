---
title: "Karaf Commands for the Agent"
layout: page
cat: "ug-0-8"
id: "karaf-commands-for-the-agent"
menus: [ "users", "user-guide", "0.8" ]
---

The Karaf distributions for Roboconf agents come with dedicated Karaf commands.  
They come in addition to [those already available](https://karaf.apache.org/manual/latest/)
with Karaf. They are available from the Karaf command line.

This page lists and explains these additional commands.

* [roboconf:reload-config](#roboconfreload-config)
* [roboconf:info](#roboconfinfo)
* [roboconf:agent-status](#roboconfagent-status)
* [roboconf:cancel-recipe](#roboconfcancel-recipe)


## roboconf:reload-config

This command allows you to force an agent to reload its configuration.  

Syntax: `roboconf:reload-config`  
No parameter is expected.


## roboconf:info

This command displays the Roboconf version(s) available as well as information about the
environment (Karaf version, JVM, operating system...). Roughly, it is an enhanced version
of the `info` command.

Syntax: `roboconf:info`  
No parameter is expected.


## roboconf:agent-status

This command allows to retrieve the status of an agent.  
This command indicates how many messages are waiting to be processed, and whether a recipe
(script, Puppet module...) is running or not.

Syntax: `roboconf:agent-status`  
No parameter is expected.  
If several agents are deployed (e.g. for in-memory agents), then all the statuses are displayed.


## roboconf:cancel-recipe

This command allows to cancel the execution of a recipe.  
If a Roboconf agent started a recipe (script, Puppet module...), and that for some reason,
a user wants to interrupt its execution, it is possible to use this command. 

Syntax: `roboconf:cancel-recipe`  
By default, no parameter is expected.  
When there are several agents (e.g. for in-memory agents), it is possible to pass parameters.

Syntax: `roboconf:cancel-recipe <application-name> <scoped-instance-name>`
Auto-completion is available for application and scoped instance names.  
Notice the scoped instance name is optional. When not specified, logs from all the scoped instances will be
retrieved.

> Reminder: a scoped instance is an instance associated with a Roboconf agent (their installer is **target**).  
> Example: a VM is a scoped instance.
