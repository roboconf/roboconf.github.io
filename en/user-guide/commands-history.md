---
title: "Commands History"
layout: page
cat: "ug-last"
id: "commands-history"
menus: [ "users", "user-guide" ]
---

Roboconf commands are introduce [on this page](roboconf-commands.html).  
There are kinds of scripts with instructions for Roboconf.

Commands can be executed in various contexts:

* On demand, in the web administration.
* By the scheduler.
* In reaction to autonomic events.
* By other commands.

All the executions of the commands are stored in a local SQL database.  
The default solution is H2. The database's location is under Karaf's data directory.

> You can obviously replace this database by a bigger one if you want.  
> Just edit the data source in the **etc/org.ops4j.datasource-roboconf-dm.cfg** file.
> [This link](/en/developer-guide/database-support-in-karaf.html) might help too.

The commands history can be queried through the REST API.  
There are also dedicated pages in the web console.

<img src="/resources/img/global-commands-history.png" alt="Global commands history" class="gs" />

Each execution saves...

* ... the application name
* ... the command name
* ... the execution date and duration
* ... what triggered the execution
* ... the execution's result (OK, OK with commands that were skipped, error)
* ... a more precise context (e.g. the scheduled job that triggered the execution) 
