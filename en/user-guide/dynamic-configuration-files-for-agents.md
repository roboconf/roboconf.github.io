---
title: "Dynamic Configuration Files for Agents"
layout: page
cat: "ug-last"
id: "dynamic-configuration-files-for-agents"
menus: [ "users", "user-guide" ]
---

Generally, when a VM is created by Roboconf, the image
already contains a configured agent. Some parameters are passed to this agent
by the DM through user data. The way data are retrieved by the agent depend on
the infrastructure (Openstack and Amazon EC2 provide one of the easiest solution).

Once the agent retrieved all the information passed by the DM, it updates its
configuration files (**etc/net.roboconf.agent.configuration.cfg** and messaging stuff). However, it sometimes
happen an agent needs to inject similar information in other configuration files.

It is the case, as an example, when one uses [Apache Decanter](https://karaf.apache.org/manual/decanter/latest-1/).  
The JMX collector allows the definition of custom keys. Let's imagine we want to inject
values collected from JMX probes in an Elastic Search cluster. Along with all the collected
information, we would like to specify sources meta data (which agent sent these data).

We can do this by using injection in templates configuration files.  
This has to be done when you pre-install the agent in the base image for your VMs.  
Assuming we want to create **etc/org.apache.karaf.decanter.collector.jmx-local.cfg**, proceed as follows:

1. Create a **org.apache.karaf.decanter.collector.jmx-local.cfg.tpl** file under **etc/roboconf/cfg-injection**.
2. Prepare the content of this file.
3. You can use mark-ups that will be replaced by the agent.

    * `<domain>`: the agent/messaging domain.
    * `<application-name>`: the name of the application this agent is associated with.
    * `<scoped-instance-path>`: the path of the scoped instance this agent is associated with. 
    * `<ip-address>`: the agent's IP address, as exchanged with other agents.

<br />
Here is an example of such a file.

```properties
#
# Decanter Local JMX collector configuration
#

# Name/type of the JMX collection
type = jmx-local

# URL of the JMX MBeanServer.
# local keyword means the local platform MBeanServer or you can specify to full JMX URL
# like service:jmx:rmi:///jndi/rmi://hostname:port/karaf-instance
url = local

# Username to connect to the JMX MBeanServer
#username=karaf

# Password to connect to the JMX MBeanServer
#password=karaf

# Object name filter to use. Instead of harvesting all MBeans, you can select only
# some MBeans matching the object name filter
object.name = java.lang:*,*

# You can add any custom field that the collector will "forward" to the dispatcher
# For instance:
#
# my=stuff
#
source = agent
application = <application-name>
scoped-instance = <scoped-instance-path>
```

When the agent starts and/or is reconfigured, it will regenerate the configuration file
while replacing the mark-ups by the right values. Notice templates for configuration files **must** have
the **.cfg.tpl** extension.
