---
title: "Security :: Auditing web accesses"
layout: page
cat: "ug-snapshot"
id: "security-and-web-access-audits"
menus: [ "users", "user-guide", "Snapshot" ]
---

When [authentication for the web console is enabled](security-and-authentication-in-the-web-console.html),
all the accesses to the REST API and connections to the web socket are registered in a file. This file
can be used for audit purposes:

* Who?
* When?
* Which resources?
* Which parameters?
* From which IP address?
* From which user agent?

The audit traces are managed by a logger.  
It can be configured in the **etc/org.ops4j.pax.logging.cfg** file.  
Here is the appropriate section:

```properties
# Audit accesses to our REST API (when authentication is enabled)
log4j.logger.audit.roboconf.rest.services=ALL, rest
log4j.additivity.audit.roboconf.rest.services=false

log4j.appender.rest=org.apache.log4j.DailyRollingFileAppender
log4j.appender.rest.datePattern='.'yyyy-MM-dd
log4j.appender.rest.layout=org.apache.log4j.EnhancedPatternLayout
log4j.appender.rest.layout.ConversionPattern=%d{ISO8601} | %-5.5p | %m%n
log4j.appender.rest.file=${karaf.data}/log/rest-audit.log
log4j.appender.rest.append=true
```

The base configuration outputs the audit entries in the **data/log/rest-audit.log** file.
Logs are rolled on a daily basis. Due to the way logs are managed by Karaf, we made simple:
the log message is formatted internally by a Roboconf's class. Which means it is not possible to
customize the output of the message. Doing so would imply creating our own (non-standard) log layout.

Notice that the **log4j.additivity.audit.roboconf.rest.services=false** line means all the entries
managed by this log will not appear in other log files. You should keep this lines untouched.

Here is the log levels policy.

* Authorized web access: **INFO**
* Unrecognized target resource: **WARN**
* Unauthorized web access: **ERROR**
* Anonymous access: **ERROR**

By default, the level is **ALL**, but you can filter the entries to output by updating the log level.
No need to restart Karaf, log configuration changes support hot-reconfigurations.
