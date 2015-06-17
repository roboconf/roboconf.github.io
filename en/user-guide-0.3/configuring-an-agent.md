---
title: "Configuring an Agent"
layout: page
cat: "ug-0-3"
id: "configuring-an-agent"
menus: [ "users", "user-guide", "0.3" ]
---

Once the agent has been installed, you have to configure it.  
If the target is a IaaS (a cloud infrastructure), you only have to specify one thing, the target ID. 
All the other parameters will be set dynamically by the DM or the IaaS itself.

The agent comes with a default configuration that needs to be updated. Even if the configuration is
wrong, the agent will keep on running (in a degraded mode).

The configuration is persisted by the OSGi container.  
It is restored upon restart.

There are 2 ways of updating the agent's configuration.  


# Config Admin

If you installed the agent as bundles, you can use *Config Admin* to update the agent's parameters.  
These pages give information about this mechanism.

* [http://wiki.osgi.org/wiki/Configuration_Admin](http://wiki.osgi.org/wiki/Configuration_Admin)
* [http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html](http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html)
* [http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html](http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html)

The ID of the managed service for the agent is **net.roboconf.agent.configuration**.


# File Install

If you installed the agent in a Karaf distribution, there are two ways.  
The first one consists in editing (or creating) the **/etc/net.roboconf.agent.configuration.cfg** file.  
A sample is given below.

```properties
# The IP address and port of RabbitMQ.
# Example: http://192.168.1.87
# Example: http://192.168.1.89:4048
message-server-ip = localhost

# The user name and password to access RabbitMQ.
message-server-username = guest
message-server-password = guest


# The target ID.
# Depending on its value, the following parameters may be read from
# another location than this file. This is the case for Amazon Web Services
# Microsoft Azure and Openstack.
#
# Possible values are:
# 	* iaas-ec2
# 	* iaas-openstack
# 	* iaas-vmware
# 	* iaas-azure
# 	* embedded
#
target-id = 

# The application name.
application-name = 

# The name of the root instance associated with this agent.
root-instance-name = 

# The IP address of the agent.
# This is useful if the machine has several network interfaces.
ip-address-of-the-agent = 
```

The second solution consists in using Karaf's web console.  
The parameters can be edited under the **OSGi &gt; Configuration** menu.
Look for the **net.roboconf.agent.configuration** key and double-click it. A dialog will show up
listing all the parameters in a form.


# Agent Parameters

The following table summers up all the agent parameters.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| message-server-ip | The IP address and the port of the messaging server. Examples: http://192.168.1.87 (default port), http://192.168.1.89:4048 (with a custom port). | **null** is interpreted as "localhost". | yes |
| message-server-username | The user name for the messaging server. | **null** is interpreted as "guest". | yes |
| message-server-password | The password for the messaging server. | **null** is interpreted as "guest". | yes |
| target-id | The target ID. Some cloud infrastructures provide mechanisms to store information for the VM. On some IaaS, the DM passes information to the agent through these means. It implies that a part of the agent configuration is read from an external location. | See the next section. | yes |
| application-name | An agent is associated with a single application. | Depending on the target ID, its value can be retrieved from *user data*. | yes |
| root-instance-name | Within an application, machines are represented by a root instance. This parameter is the name of the instance associated with this agent. | Depending on the target ID, its value can be retrieved from *user data*. | yes |
| ip-address-of-the-agent | The IP address of the agent's machine. | This is useful if the machine has several network interfaces. | no |

These parameters are persisted and restored upon restart.  
However, depending on the target ID, some values may be overridden.


# Target ID

The target ID indicates on which target the agent runs.  
Normally, the agent parameters should be hard-written in configuration files. However, each agent has its own configuration.
Some settings are the same for all the agents (such as the messaging parameters). And some others are specific.
The couple **application name** and **root instance name** are unique. Two agents cannot have the same values for these 2 parameters.

Instead of hard-coding these parameters, it is possible to let them blank. And the DM will pass them to the agents.
This is only possible in cloud infrastructures, since they support, in one way or another, a mechanism of *user data*. When one
creates a VM (virtual machine) from a virtual image, it is possible to pass data to the new VM. Once the VM is running, it can access these data and do whatever it needs with.  

Let's take an example with Amazon Web Services.  
We assume we created a virtual image with a Roboconf agent. This one was partially configured. It has the right target ID.
Other settings are invalid or incomplete.

1. In the DM, we have a root instance called "my-root" in the "my app" application.  
It is associated with a component that designates an EC2 VM.
2. We request the DM to create the "my root" instance.  
It calls the right API in EC2 and sets user data for the new VM 
(application name = my app, root-instance-name = my-root, plus the messaging parameters).
3. Once the VM is up, the agent starts, the OSGi configuration is injected in the agent.
5. Since the target ID is **iaas-ec2**, the agent then reads the user data in EC2, thus completing its configuration.

User data override the following parameters.

* message-server-ip
* message-server-username
* message-server-password
* application-name
* root-instance-name
* ip-address-of-the-agent

User data are used with almost all the cloud infrastructures.  
The only IaaS it does not work with is the **embedded** one.

> If the agent took its configuration in user data, you can update the parameters AFTER the agent started through
> *Config Admin* or through the *.cfg file.

Notice that if you stop the agent and restart it, and that its target ID involves user data, 
the agent will once again read these user data.
