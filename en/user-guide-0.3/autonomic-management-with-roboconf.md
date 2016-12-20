---
title: "Autonomic Management"
layout: page
cat: "ug-0-3"
id: "autonomic-management-with-roboconf"
menus: [ "users", "user-guide", "0.3" ]
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


## Schema

This schema summers up the way autonomic management works.  
Detection is delegated to agents. Reactions are managed by the Deployment Manager (DM).

<br />
<img src="/resources/img/autonomic-diagram.png" alt="An overview of the way autonomic management works" />


## Configuration

The configuration is in fact defined in application projects.  
It means every project has its own rules and reactions.

In this perspective, the project structure is enriched with a new directory, called **autonomic**.  
With the **descriptor**, **graph** and **instances** directories, it makes 4. The **autonomic** directory
expects two kinds of files.

* **measures** files include a set of measures to perform by the agent.  
Such a file is associated with a given component in the graph. Hence, we can consider
the autonomic rules as an annotation on a component in the graph.  
These files must be named **&lt;component name&gt;.measures**.

* **rules** files define the actions to undertake by the DM when a measure has reached a given limit.  
Such a file is associated with the whole application. It must be named **rules.cfg**.


## Measures Files

Measures files indicate measures an agent will have to perform regularly on its machine.  
The delay between each check is for the moment hard-coded.

These files use a custom syntax.  
Comments start with the sharp (#) character.  
Every measure must have a unique name.

An agent can use several options to measure something.  
The option or extension to use to perform the measure is indicated on the same line than
the measure name. Here is the syntax for the declaration of a measure.

	[EVENT measure-extension measure-name]


### LiveStatus

We can use **LiveStatus** (which is the protocol used by Nagios and Shinken).  
This allows to query a local Nagios or Shinken agent. We simply write a live status request.

```properties
# This is a comment ;)
# These can be seen as probes configurations, all associated with a same Roboconf component.
# The "nagios" handler should also work with Shinken.

# A simple query for Live Status, Nagios' protocol.
[EVENT nagios myRuleName-80]
GET hosts
Columns: host_name accept_passive_checks acknowledged
Filter: accept_passive_checks = 1

# A Nagios query AND the location of the Nagios instance.
[EVENT nagios myRuleName-2]
Nagios configuration at http://192.168.15.4
GET hosts
Columns: host_name
Filter: host_name = toto

# A Nagios query AND the location and port of the Nagios instance.
[EVENT nagios myRuleName-3]
Nagios configuration at http://192.168.15.4:50001
GET hosts
Columns: host_name
```

### REST

An agent can query a REST service.  
The result can be interpreted as an integer or as a string.

```properties
# This is a comment ;)
# These can be seen as probes configurations, all associated with a same Roboconf component.
# There must be a space between all the words / operators.

# Check the result returned by a REST / HTTP service.
[EVENT rest myRuleName-1]
Check http://google.fr THAT value > 0

# Check the result returned by a REST / HTTP service.
[EVENT rest myRuleName-2]
Check http://google.fr THAT something == "else"
```

The following operators are supported.

| Operator | Numeric Only |
| :------: | :----------: |
| = | no |
| == | no |
| < | yes |
| > | yes |
| <= | yes |
| >= | yes |


### File

An agent can check the local file system.  
Depending on the existence of a file or a directory, or based on the absence
of a given file, a notification will be sent to the DM. 

```properties
# This is a comment ;)
# These can be seen as probes configurations, all associated with a same Roboconf component.
# The "file" handler considers indifferently files and directories.

# Notify the DM if a file exists and delete it.
[EVENT file myRuleName-1]
Delete if exists /tmp/ta-daaaaa

# Notify the DM if a file exists.
[EVENT file myRuleName-2]
/tmp/ta-daaaaa-2

# Notify the DM if a file does NOT exist.
[EVENT file myRuleName]
Notify if not exists /tmp/a-directory-to-not-delete
```

> For a given component, one can define several measures.  
> For a given component, it is possible to mix measure extensions.

Each measure is performed independently of the others.  
It means every result that match the rule results in a message sent to the DM.

How combinations are checked (i.e. react only if this rule and this other one are verified) is
not the job of the agent. The agent measures and notify when needed. It is not up to it to interpret
these measures. This will be up to the Deployment Manager.


## Parametrized Measures Files

Measures files can be parametrized.  
It means values can be externalized in a properties file.

This an be used, for the moment, for environment switch (test, production, etc).  
It will also be used **later** to update and inject new values for the agent.

Let's take an example.  
Here is the content of the **my-component.measures** file.  
It contains two variables whose value will be injected from a properties file.
They are here called *a-directory-to-not-delete* and *accept_passive_checks*. They are
wrapped between {% raw %}`{{` and `}}`{% endraw %} (like Mustache does).

```properties
# A simple query for Live Status, Nagios' protocol.
[EVENT nagios myRuleName-nagios]
GET hosts
Columns: host_name accept_passive_checks acknowledged
{% raw %}Filter: accept_passive_checks = {{ accept_passive_checks }}{% endraw %}

# Notify the DM if a file does NOT exist.
[EVENT file myRuleName-for-file]
{% raw %}Notify if not exists /tmp/{{ a-directory-to-not-delete }}{% endraw %}
```

And here is the content of the **my-component.measures.properties** file.

```properties
accept_passive_checks = 1
a-directory-to-not-delete = roboconf
```


## Rules Files

Rules files contain the reactions to undertake by the DM when a measure verified a given rule
on the agent side.

> For the moment, the DM implementation is very basic.  
> It reacts to every message. There is no complex event processing or real rule engine for the moment.

These files use a custom syntax. **This syntax may change later, in particular if we had
to switch to real rule engine.**  
Comments start with the sharp (#) character.

The syntax is the following one...

	[REACTION measure-name reaction-handler]
	Optional parameters for the handler

There are 4 available handlers.  

* **Log**: to log an entry. There is no parameter.
* **Mail**: to send an e-mail. It accepts only one parameter, which is an e-mail address.
* **Replicate-Service**: to replicate a component on a new machine. It takes a chain of component names as parameter.
* **Delete-Service**: to delete a component that was replicated. It takes a component name as parameter. 
 
Let's see an example with 4 different reactions to 4 different measures.

```properties
# This is a comment ;)
# This files gathers all the reactions for a given application.

# When "event-1" is triggered, replicate a service.
# The service is instantiated given the path on the next line.
# Each path segment designates a component name. Here, it means we will create...
# ... a new VM, with a new Tomcat, with a new instance of War 1.
[reaction event-1 Replicate-Service]
/vm/tomcat/war1

# When "event-2" is triggered, delete a service.
# The service to delete is associated with the component described on the next line (war1).
# The entire VM will be deleted. Only VM that were created with "Replicate-Service" can be
# deleted by "Delete-Service".
[reaction event-2 Delete-Service]
war1

# When "event-3" is triggered, send an e-mail.
[reaction event-3 Mail]
Subject: event-3 was detected
Put the e-mail content here.
The subject line is optional.

# When "event-4" is triggered, log an entry.
[reaction event-4 Log]
```

To send an e-mail, you have to create a properties file.  
For the moment, it must be located in the rules directory, and be called *rules.cfg.properties*.
It must contain all the mail configuration. Here is a sample.

```properties
# From... to...
mail.from: dm@roboconf.net
mail.to: someone@domain.com

# SMTP configuration
mail.user: me
mail.password: mypassword
mail.smtp.host: my.mail.server
mail.smtp.port: 1234

# SSL configuration
mail.smtp.auth: true
mail.smtp.starttls.enable: true
mail.smtp.ssl.trust: my.mail.server
```

See **javax.mail** properties for more details.


## Activation

On the agent side, autonomic is handled in the **roboconf-agent-monitoring** bundle.  
So, you can disable autonomic management by stopping or uninstalling this bundle.

On the DM, you have nothing to do.  
Reacting to agent messaging is the normal job of the DM.

> The DM can usually be stopped when it is not used.  
> However, it has to run ALL the time when autonomic management is used.
