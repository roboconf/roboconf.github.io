---
title: "Configuring the Loggers"
layout: page
id: "ug.snapshot.configuring-the-loggers"
menus: [ "users", "user-guide" ]
---

By default, Roboconf classes use the JDK logging (**java.util.logging**).  
However, when deployed in Karaf, logging is configured through Log4J. The bridge is enabled though Pax Logging.

So, updating the logging configuration is the same thing for both the DM and the agent.  
Simply edit the **etc/org.ops4j.pax.logging.cfg** file in the Karaf installation.

Here is the default logging configuration.

```properties
# Roboconf appender
log4j.logger.net.roboconf=INFO, roboconf
log4j.appender.roboconf=org.apache.log4j.DailyRollingFileAppender
log4j.appender.roboconf.datePattern='.'yyyy-MM-dd
log4j.appender.roboconf.layout=org.apache.log4j.EnhancedPatternLayout
log4j.appender.roboconf.layout.ConversionPattern=%d{ISO8601} | %-5.5p | %-16.16c{1} | %m%n
log4j.appender.roboconf.file=${karaf.data}/log/roboconf.log
log4j.appender.roboconf.append=true
```
Logs are rotated on a daily basis.
The default logging level for the Roboconf classes is **INFO**.  
All these logs are written in a specific file: **data/log/roboconf.log** (under the Karaf directory).

Editing and saving this file will automatically propagate the new logging configuration.  
You can also use Karaf commands to update the logging configuration. See 
[this section](http://karaf.apache.org/manual/latest/users-guide/log.html#Commands) on Karaf's web site for more information.
