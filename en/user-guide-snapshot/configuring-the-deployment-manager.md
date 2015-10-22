---
title: "Configuring the Deployment Manager"
layout: page
cat: "ug-snapshot"
id: "configuring-the-deployment-manager"
menus: [ "users", "user-guide", "Snapshot" ]
---

Once the Deployment Manager (DM) has been installed, it needs to be configured.  
The DM comes with a default configuration that needs to be updated. Even if the configuration is
wrong, the DM will keep on running (in a degraded mode).

The configuration is persisted by the OSGi container.  
It is restored upon restart.

> Configuration parameters can be changed at runtime, without rebooting.

This configuration is made of two parts:

* First, there is the configuration of the DM itself.  
It is associated with the PID **net.roboconf.dm.configuration**.

* Then, there is the configuration of its messaging (the way it will interact with
agents). The associated PID depends on the messaging type specified in the DM's configuration.
As an example, if the DM uses RabbitMQ, then the PID will be **net.roboconf.messaging.rabbitmq**.
Generally, messaging configurations should have PIDs that begin with **net.roboconf.messaging**.

There are 2 ways of updating the DM's configuration.  
Configuring the messaging is discussed on [this page](configuring-the-messaging.html).

<br />

# Runtime Parameters

The DM has parameters that can be changed without restarting it.  
There are 3 ways of updating them. 


## Config Admin

If you installed the DM as bundles, you can use *Config Admin* to update the DM's parameters.  
These pages give information about this mechanism.

* [http://wiki.osgi.org/wiki/Configuration_Admin](http://wiki.osgi.org/wiki/Configuration_Admin)
* [http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html](http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html)
* [http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html](http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html)

The ID of the managed services for the agent match the PIDs given before.


## Karaf's Administration Console

If you installed the Karaf distribution for the DM, then there is web console which is preinstalled.  
Open your web browser and go to [http://localhost:8181/system/console/configMgr](http://localhost:8181/system/console/configMgr)
(assuming you run the DM locally). Default credentials are *karaf/karaf*.

In the table, search for **net.roboconf.dm.configuration** and click it.  
A dialog will show up where you will be able to update the configuration. Once done, click **Save**
and the new configuration will be pushed into the DM. It will then setup a new messaging client and reload
applications from the configuration directory.

> If the configuration is invalid, no error will be shown in the console.  
> And the DM will keep on running. To make sure there is no error, you will have to check the logs
> under **data/logs**.


## File Install

If you installed the DM in a Karaf distribution, you can also update the configuration by editing a file.  
This file is called (and located) **/etc/net.roboconf.dm.configuration.cfg**.  
A sample is given below.

```properties
# The type of messaging we use: RabbitMQ.
messaging-type = rabbitmq
```

> If the configuration is invalid, no error will be shown.  
> And the DM will keep on running. To make sure there is no error, you will have to check the logs
> under **data/logs**.

<br />

# DM Parameters

The following table summers up all the DM parameters.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| messaging-type | The kind of messaging used by the agent. Agent should use the same messaging type. | - | yes |

<br />

# Installing the Target Handlers

By default, no target handler is installed.  
A target handler is in charge of creating and terminating machines in a given infrastructure.
Hence, there is a target handler for Amazon Web Services, one for Openstack, etc. Since not all the
users will use all the supported targets, it is better for everyone to only install and enable the
desired targets.

```properties
# Start Karaf in interactive mode
cd bin
./karaf

# Install the bundles you want (here in version 0.2)
bundle:install mvn:net.roboconf/roboconf-target-iaas-openstack/0.2

# Install other targets if you want
# ...

# List all the bundles
bundle:list
```

This will display something like...

```
roboconf-dm > bundle:list
START LEVEL 100 , List Threshold: 50
 ID | State    | Lvl | Version        | Name
--------------------------------------------------------------------------------------------
 37 | Active   |  80 | 1.12.0         | Apache Felix iPOJO
 38 | Active   |  80 | 1.12.0         | Apache Felix iPOJO Gogo Command
 39 | Active   |  80 | 1.12.0         | Apache Felix iPOJO Composite
 40 | Active   |  80 | 1.12.0         | Apache Felix iPOJO API
 43 | Active   |  80 | 1.18.1         | jersey-core
 44 | Active   |  80 | 1.18.1         | jersey-server
 45 | Active   |  80 | 1.18.1         | jersey-servlet
 46 | Active   |  80 | 1.18.1         | jersey-multipart
 47 | Active   |  80 | 1.6            | MIME streaming extension
 48 | Active   |  80 | 2.3.1          | Jackson-core
 49 | Active   |  80 | 2.3.1          | jackson-databind
 50 | Active   |  80 | 2.3.1          | Jackson-annotations
 51 | Active   |  80 | 2.3.1          | Jackson-JAXRS-base
 52 | Active   |  80 | 2.3.1          | Jackson-JAXRS-JSON
 53 | Active   |  80 | 0.2.0.SNAPSHOT | Roboconf :: Core
 54 | Active   |  80 | 0.2.0.SNAPSHOT | Roboconf :: Messaging
 55 | Active   |  80 | 0.2.0.SNAPSHOT | Roboconf :: Deployment Manager :: REST Commons
 56 | Active   |  80 | 0.2.0.SNAPSHOT | Roboconf :: Deployment Manager :: REST Services
 57 | Active   |  80 | 0.2.0.SNAPSHOT | Roboconf :: Deployment Manager
 58 | Active   |  80 | 0.2.0.SNAPSHOT | Roboconf :: Deployment Manager :: Web Administration
 59 | Active   |  80 | 0.2.0.SNAPSHOT | Roboconf :: Target :: API
 60 | Resolved |  80 | 0.2.0.SNAPSHOT | Roboconf :: Target :: Docker
 61 | Resolved |  80 | 0.2.0.SNAPSHOT | Roboconf :: Target :: Embedded
 62 | Resolved |  80 | 0.2.0.SNAPSHOT | Roboconf :: Target :: Azure IaaS
 63 | Resolved |  80 | 0.2.0.SNAPSHOT | Roboconf :: Target :: EC2 IaaS
 64 | Resolved |  80 | 0.2.0.SNAPSHOT | Roboconf :: Target :: OpenStack IaaS
 65 | Resolved |  80 | 0.2.0.SNAPSHOT | Roboconf :: Target :: VMWare IaaS
105 | Active   |  80 | 1.7.0          | Apache Felix iPOJO WebConsole Plugins
```

```properties
# Identify the ID of the bundle associated with your target.
# Let's take EC2 in this case. It bundle ID is 63. We start it...
bundle:start 63

# The target handler for EC2 is now started and registered into the DM.
```

You can also use a specific Karaf command (**roboconf:target**) that will install predefined target handlers into the DM.  
Example:

```properties
# You can type in the 'tab' character after the command name.
# The command indeed provides auto-completion.
roboconf:target docker
```
