---
title: "Configuring the Loggers"
layout: page
id: "ug.0.2.configuring-the-loggers"
menus: [ "users", "user-guide", "0.2" ]
---

Updating the logging configuration is the same thing for both the DM and the agent.

By default, Roboconf classes use the JDK logging (**java.util.logging**).  
However, when deployed in Karaf, logging is configured through Log4J. The bridge is enabled through Pax Logging.
 
To update the logging configuration, simply edit the **etc/org.ops4j.pax.logging.cfg** file in the Karaf installation.  
Here is the default logging configuration that was defined for Roboconf loggers. In Roboconf's custom Karaf distributions,
this snippet is located at the end of the default Karaf logging configuration.

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

> Be careful about log level names.

Roboconf bundles use the JDK logging. Level names include SEVERE, WARNING, INFO, FINE, FINER and FINEST.
However, Log4J use other names. And there is not an exact matching between the levels. The Pax project gives the equivalence
it took on [its web site](https://ops4j1.jira.com/wiki/display/paxlogging/How+to+use+Pax+Logging+in+my+bundles#HowtousePaxLogginginmybundles-JDKLogginga.k.a.java.util.logging). 

We reproduce this table here.

| JDK Logging Level | Log4J Level | Comment |
| :---: | :---: | --- |
| OFF | OFF | - |
| WARNING | WARN | - |
| SEVERE | ERROR | - |
| INFO | INFO | - |
| FINE | DEBUG | - |
| FINER | TRACE | - |
| FINEST | TRACE | - |
| CONFIG | - | CONFIG events are ignored. |
| - | FATAL | No such thing in JDK Logging. | 


In the *cfg* file, you must use Log4J levels.  
They will be converted into levels for the JDK logging.
