---
title: "Monitoring"
layout: page
cat: "ug-snapshot"
id: "monitoring-applications-deployed-with-roboconf"
menus: [ "users", "user-guide", "Snapshot" ]
---

Monitoring applications deployed with Roboconf (application servers, databases...) still needs to be addressed.  
What can be done easily right now is monitoring VMs created by Roboconf.

Here is a list of tools that might be used for this, in combination with Roboconf features
(such as [DM's templating](dm-templating.html)).

* [Apache Decanter](https://karaf.apache.org/manual/decanter/latest-1/). A [tutorial](tutorial-monitoring-roboconf-with-apache-decanter.html) is available on the web site.
* [Netdata](https://github.com/firehol/netdata).
* [Vector](https://github.com/Netflix/vector).
* [hawt.io](https://github.com/hawtio/hawtio) for system and JVM metrics.

We do not recommend using tools like Nagios as they are not suitable for dynamic
environments (every addition / removal of a host currently requires restarting some services).
