---
title: "Roboconf Commands Scheduling"
layout: page
cat: "ug-snapshot"
id: "roboconf-commands-scheduling"
menus: [ "users", "user-guide", "Snapshot" ]
---

Roboconf allows to schedule the execution of [commands](roboconf-commands.html).  
As an example, you may want to launch a new server instance every week morning and stop
it the evening, when people go home.

Scheduling can be managed through the web administration.  
The **scheduler** top menu lists all the jobs. It is also possible to find the jobs
associated with a specific application.

<img src="/resources/img/roboconf-scheduling-04.png" alt="Listing scheduled jobs" class="gs" />

Scheduled jobs associate:

1. A Roboconf application.
2. A Roboconf command file (a set of Roboconf instructions).
3. A [CRON](https://en.wikipedia.org/wiki/Cron) expression to specify the period.

<img src="/resources/img/roboconf-scheduling-01.png" alt="Scheduling a new job" class="gs" />

The underlying engine used by Roboconf is [Quartz](http://www.quartz-scheduler.org/).  
Although the web administration provides a visual editor to build CRON expressions, you may want to
[verify the syntax](http://www.quartz-scheduler.org/documentation/quartz-2.1.x/tutorials/crontrigger.html),
as Quartz is very strict about it. In case of error, the web administration will tell you.

<img src="/resources/img/roboconf-scheduling-02.png" alt="Scheduling a new job with the editor" class="gs" />

Jobs can be edited or deleted, but cannot be suspended.

<img src="/resources/img/roboconf-scheduling-03.png" alt="Reading properties of a job" class="gs" />
