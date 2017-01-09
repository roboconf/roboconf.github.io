---
title: "Security: JMX Configuration"
layout: page
cat: "ug-snapshot"
id: "security-and-jmx-configuration"
menus: [ "users", "user-guide", "Snapshot" ]
---

JMX configuration is controlled in the **etc/org.apache.karaf.management.cfg ** file.
You can control the port, the security realm and the JMX URL.

By default, the address is **service:jmx:rmi:///jndi/rmi://localhost:1099/karaf-root**.  
You can find more information on [Karaf's web site](https://karaf.apache.org/manual/latest/#_monitoring_and_management_using_jmx).

In Roboconf, the JMX server is now installed by default.  
To install it, just type in `feature:install management`. 
