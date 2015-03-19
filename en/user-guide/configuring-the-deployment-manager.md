---
title: "Configuring the Deployment Manager"
layout: page
id: "ug.snapshot.configuring-the-deployment-manager"
menus: [ "users", "user-guide" ]
---

Once the Deployment Manager (DM) has been installed, it needs to be configured.  
The DM comes with a default configuration that needs to be updated. Even if the configuration is
wrong, the DM will keep on running (in a degraded mode).

The configuration is persisted by the OSGi container.  
It is restored upon restart.


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

# Runtime Parameters

Beyond extensions you can enable or disable dynamically, the DM has parameters that can
be changed without restarting it. There are 3 ways of updating them. 


## Config Admin

If you installed the DM as bundles, you can use *Config Admin* to update the DM's parameters.  
These pages give information about this mechanism.

* [http://wiki.osgi.org/wiki/Configuration_Admin](http://wiki.osgi.org/wiki/Configuration_Admin)
* [http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html](http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html)
* [http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html](http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html)

The ID of the managed service for the DM is **net.roboconf.dm.configuration**.


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
# The IP address and port of RabbitMQ.
# Example: http://192.168.1.87
# Example: http://192.168.1.89:4048
message-server-ip = localhost

# The user name and password to access RabbitMQ.
message-server-username = guest
message-server-password = guest

# The directory where applications resources are stored
configuration-directory-location =
```

> If the configuration is invalid, no error will be shown.  
> And the DM will keep on running. To make sure there is no error, you will have to check the logs
> under **data/logs**.


# DM Parameters

The following table summers up all the DM parameters.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| message-server-ip | The IP address and the port of the messaging server. Examples: http://192.168.1.87 (default port), http://192.168.1.89:4048 (with a custom port). | **null** is interpreted as "localhost". | yes |
| message-server-username | The user name for the messaging server. | **null** is interpreted as "guest". | yes |
| message-server-password | The password for the messaging server. | **null** is interpreted as "guest". | yes |
| configuration-directory-location | The directory where applications resources are saved. | - | yes |


# The Configuration Directory

The configuration directory stores all the application files (graphs, instances, recipes).  
The directory's structure is the following:

	DM's directory/
	├── applications/
	└── instances/

The **applications** directory will be populated every time an application is deployed.

The **instances** directory will contain the states of component instances. Every application will have
its own file storing instances states. These file are read once, on startup of the DM. And for a given application, 
they are written on every instance creation or deletion, or every change on a root instance (usually a VM). This makes
very few write operations (unless you create and delete VMs all the time).

Instance files are updated every time the life cycle of an instance changes.    
It means the DM can restart and restore the state of an application from these files (in fact, on restart,
the DM first reads these files, and then synchronizes instance states with the agents).

The DM can thus be moved from one machine to another.

> As a reminder, the DM can be stopped when it is not used.  
> It does not aim at running all the time. Once initialized, the agents do not need it.

The DM is only an administration interface.  
Making the DM stoppable reduce attack threats on the REST API and makes it quite easy to secure. Besides, 
**it is preferable to run the DM in your internal information system**, rather than putting it on a cloud or 
external host (although it remains possible). 

Since all the DM's applicative configuration is contained in this directory, it is quite simple to prevent information loss.
A periodic backup of the directory is easy to set up. Or the directory can be put on a replicated file system
(e.g. a RAID configuration).

Eventually, system administrators will be able to get information on the instances even when the DM is stopped. The
*instances* files under the **instances** directory contain states, IP addresses and machine IDs (for IaaS dashboards).
