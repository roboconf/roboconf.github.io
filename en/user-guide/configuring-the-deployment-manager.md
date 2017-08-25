---
title: "Configuring the Deployment Manager"
layout: page
cat: "ug-last"
id: "configuring-the-deployment-manager"
menus: [ "users", "user-guide" ]
---

Once the Deployment Manager (DM) has been installed, it needs to be configured.  
The DM comes with a default configuration that needs to be updated. Even if the configuration is
wrong, the DM will keep on running (in a degraded mode).

> By default, the messaging is set to **idle**.  
> You need to change it to use a real messaging, such as HTTP or RabbitMQ.

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

# The domain.
domain = default
```

> If the configuration is invalid, no error will be shown.  
> And the DM will keep on running. To make sure there is no error, you will have to check the logs
> under **data/logs**.

<br />

# DM Parameters

The following table summers up all the DM parameters.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| messaging-type | The kind of messaging used to interact with agents. Agents should use the same messaging type. | - | yes |
| domain | The domain. See [Roboconf domains](roboconf-domains.html) for more information. Agents should use the same. | - | yes |

<br />

# Installing Additional Bundles

## Installing Target Handlers

By default, no target handler is installed.  
A target handler is in charge of creating and terminating machines in a given infrastructure.
Hence, there is a target handler for Amazon Web Services, one for Openstack, etc. Since not all the
users will use all the supported targets, it is better for everyone to only install and enable the
desired targets.

```properties
# Start Karaf in interactive mode
cd bin
./karaf

# Install the bundles you want (here in version 0.9)
bundle:install --start mvn:net.roboconf/roboconf-target-iaas-openstack/0.9
```

You can also use a specific Karaf command (**roboconf:target**) that will install predefined target handlers into the DM.  
Example:

```properties
# You can type in the 'tab' character after the command name.
# The command indeed provides auto-completion.
roboconf:target docker
```


## Installing DM Listeners or Templating Handlers

To install another DM extension, just proceed like you would deploy any other bundle.  
You can either drop it in Karaf's *deploy* directory, or use Karaf commands to deploy a new bundle.


## Maven Snapshots Resolution

If you install bundles from Maven repositories, and that they are in development versions
(snapshot), you may have to configure the snapshots resolution. By default, Karaf will always pick
up snapshot bundles in the local repository. If no local artifact was found, it will download it
from a remote repository, provided it is referenced in the Maven settings.

When a local artifact exists, it will always be picked up, no matter if more recent snapshots
exist remotely. To force Karaf to pick up the most recent snapshot, edit the **etc/org.ops4j.pax.url.mvn.cfg**
file and add the following property.

```properties
org.ops4j.pax.url.mvn.globalUpdatePolicy = always
```

Please, refer to [this issue](https://github.com/roboconf/roboconf-platform/issues/499) and to
[PAX-URL's wiki](https://ops4j1.jira.com/wiki/display/paxurl/Mvn+Protocol) for more information about this property.
