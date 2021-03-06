---
title: "Configuring the Loggers"
layout: page
cat: "ug-0-6"
id: "karaf-commands-for-roboconf"
menus: [ "users", "user-guide", "0.6" ]
---

The Karaf distributions for Roboconf come with dedicated Karaf commands.  
They come in addition to [those already available](https://karaf.apache.org/manual/latest/)
with Karaf. They are available from the Karaf command line.

> For the moment, only the DM has commands.

This page lists and explains these additional commands.

* [roboconf:target](#roboconftarget)
* [roboconf:set-log-level](#roboconfset-log-level)
* [roboconf:gather-logs](#roboconfgather-logs)


## roboconf:target

This command allows you to install a Roboconf target in a single command line.  

Syntax: `roboconf:target <target-name>`  
Auto-completion is available to indicate the known targets.  
Unknown targets will have to be installed manually (e.g. with the **bundle:install** command).


## roboconf:set-log-level

Karaf provides different means to change log levels.  
However, all of them require to access the Karaf instance. As an example, to change the
log level of a given Roboconf agent, you must first connect to its host (e.g. with SSH)
and then need to modify a file or use the Karaf command line.

The **set-log-level** command (from Roboconf) allows you to update log levels of the Roboconf
loggers for one or several agents in a single command line. It avoids to connect to remote hosts.

Syntax: `roboconf:set-log-level <log-level> <application-name> <scoped-instance-name>`  
Auto-completion is available for log levels, application and scoped instance names.  
Notice the scoped instance name is optional. When not specified, all the scoped instances will be
updated.

> Reminder: a scoped instance is an instance associated with a Roboconf agent (their installer is **target**).  
> Example: a VM is a scoped instance.

Log levels are those of Java Logging: OFF, SEVERE, WARNING, INFO, FINE, FINER, FINEST, ALL, CONFIG.  
This command **relies on the messaging server** to propagate the request to the agent(s). When received
by the agent, this one overwrites its logging configuration with the new value. Notice this command only
modifies the Roboconf loggers (`net.roboconf.*`).


## roboconf:gather-logs

Roboconf is a distributed applications.  
Beyond the DM, there are also agents. Each one has its own logs. There are many solution to gather distributed logs.
The **gather-logs** command (from Roboconf) allows you to gather such logs when you need it. It primary use is for
debug and diagnostic. It avoids to setup a complex stack for one-shot needs.

Syntax: `roboconf:gather-logs <application-name> <scoped-instance-name>`  
Auto-completion is available for application and scoped instance names.  
Notice the scoped instance name is optional. When not specified, logs from all the scoped instances will be
retrieved.

> Reminder: a scoped instance is an instance associated with a Roboconf agent (their installer is **target**).  
> Example: a VM is a scoped instance.

This command **relies on the messaging server** to propagate the request to the agent(s). When received
by the agent, this one reads the **karaf.log** and **roboconf.log** files and sends them back to the DM.
The DM will store them in the system's temporary directory, under **roboconf-logs**. A specific directory is created
for every application, and a sub-directory for every scoped instance.

Remember that Karaf overwrites the location of the temporary directory.  
You should look under the **data/tmp** directory if you installed it by hand, or under **/var/lib/roboconf...** if you
installed it with Debian packages.
