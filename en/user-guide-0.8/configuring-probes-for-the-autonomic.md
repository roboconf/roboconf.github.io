---
title: "Configuring Probes for the Autonomic"
layout: page
cat: "ug-0-8"
id: "configuring-probes-for-the-autonomic"
menus: [ "users", "user-guide", "0.8" ]
---

In this page, probes refer to the Roboconf features that allow
to throw alarm signals when a threshold is reached or when a resource is starving. Alarms
are propagated to the DM as messages. The DM's decision engine will then determine what to
do of the alarm. 

Probes include a Roboconf monitoring handler and its configuration for a given component.
This configuration is defined in a **.measures** file. Such a file is associated with a
given component in the graph. Hence, we can consider it as an annotation on a component in the graph. 
 
A probe configuration for a Roboconf component must be named **&lt;component name&gt;.measures**.  
It must be located under the **probes** directory in the application (template)'s directory.


## Measures Files

Measures files indicate measures an agent will have to perform regularly on its machine.  
The delay between each check is for the moment hard-coded.

These files use a custom syntax.  
Comments start with the sharp (#) character.

An agent can use several options to measure something.  
The option or extension to use to perform the measure is indicated on the same line than
the measure name. Here is the syntax for the declaration of a measure.

	[EVENT measure-extension measure-name]

Notice that for a given instance, monitoring assertions only run when the instance's status
is DEPLOYED_STARTED, that is to say when Roboconf completed its deployment and its bootstrap.

The next sections describe the available monitoring handlers.


## LiveStatus

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

Notes concerning Nagios3 install (Ubuntu)

```
apt-get install nagios3 check-mk-livestatus xinetd
```
Edit the /etc/nagios3/nagios.cfg, then append the following line:

```
broker_module=/usr/lib/check_mk/livestatus.o /var/lib/nagios3/rw/livestatus
```
Add a new file called "livestatus" in /etc/xinetd.d, with the following content (makes livestatus available on TCP port 50000, you might prefer another one):

```tcl
service livestatus
{
	type = UNLISTED
	port = 50000
	socket_type = stream
	protocol = tcp
	wait = no
	cps = 100 3
	instances = 500
	per_source = 250
	flags = NODELAY
	user = nagios
	server = /usr/bin/unixcat
	server_args = /var/lib/nagios3/rw/livestatus
	# Only_from = 127.0.0.1 
	# Modify this to only allow specific hosts to connect, currently, localhost only
	disable = no
}
```

Restart nagios3 and xinetd services:

```
service nagios3 restart
service xinetd restart
```

Test livestatus / nagios config:

```bash
echo 'get HOSTS' | netcat localhost 50000
```

Note concerning Shinken: livestatus is installed by default, and configured to listen on port 50000. It may be necessary to enable the "livestatus" module: check the Shinken documentation to do so.


## REST

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


## File

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


## Docker

This monitoring handlers allows to verify a given Docker contains runs.  
When a container does not run anymore (while it should, i.e. its status is still DEPLOYED_STARTED),
then this handle will detect it and send an alarm to the DM.

This handler takes a single optional parameter.

```properties
# This is a comment ;)
# These can be seen as probes configurations, all associated with a same Roboconf component.
# The "docker" handler verifies Docker containers are running.

# Notify the DM if 'my-container-name' is not running.
[EVENT docker myRuleName-1]
my-container-name

# Find the container name from the instance name.
[EVENT docker myRuleName-2]
ROBOCONF\_INSTANCE\_NAME

# No container name specified, a default variable is used to find the container name.
[EVENT file myRuleName]
```

Available variables (replaced by Roboconf) are:

- ROBOCONF\_INSTANCE\_NAME: the name of the current instance.
- ROBOCONF\_INSTANCE\_PATH: the path of the current instance.
- ROBOCONF\_CLEAN\_INSTANCE\_PATH: the path of the current instance but with the non-alphanumeric characters being replaced by an underscore.
- ROBOCONF\_CLEAN\_REVERSED\_INSTANCE\_PATH: the reversed path of the current instance and with the non-alphanumeric characters being replaced by an underscore.

Example:

```bash
ROBOCONF_INSTANCE_NAME => my-server
ROBOCONF_INSTANCE_PATH => /VM/my-server
ROBOCONF_CLEAN_INSTANCE_PATH => VM_my_server
ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH => my_server_vm
```

There are the same than those used in the [script plug-in](plugin-script.html).  
When no container name is specified, be it as a hard-coded name or as Roboconf variable, then it is assumed
the name is the ROBOCONF\_CLEAN\_REVERSED\_INSTANCE\_PATH variable.


## Your Own Monitoring Handler

It is possible to write its own monitoring handler.  
A monitoring handler is a Java bundle that can be developed and hot-deployed in your Karaf distribution
for the agent. Please, refer to [the developer guide](../developer-guide/developer-guide.html) for more details.


## Parameterized Measures Files

Measures files can be parameterized.  
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
