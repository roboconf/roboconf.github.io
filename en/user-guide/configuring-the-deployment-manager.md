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

There are 2 ways of updating the DM's configuration.  


# Config Admin

If you installed the DM as bundles, you can use *Config Admin* to update the DM's parameters.  
These pages give information about this mechanism.

* [http://wiki.osgi.org/wiki/Configuration_Admin](http://wiki.osgi.org/wiki/Configuration_Admin)
* [http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html](http://felix.apache.org/documentation/subprojects/apache-felix-config-admin.html)
* [http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html](http://www.osgi.org/javadoc/r4v42/org/osgi/service/cm/ConfigurationAdmin.html)

The ID of the managed service for the DM is **net.roboconf.dm.configuration**.


# File Install

If you installed the DM in a Karaf distribution, there are two ways.  
The first one consists in editing (or creating) the **/etc/net.roboconf.dm.configuration.cfg** file.  
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

The second solution consists in using Karaf's web console.  
The parameters can be edited under the **OSGi &gt; Configuration** menu.
Look for the **net.roboconf.dm.configuration** key and double-click it. A dialog will show up
listing all the parameters in a form.


# DM Parameters

The following table summers up all the DM parameters.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| message-server-ip | The IP address and the port of the messaging server. Examples: http://192.168.1.87 (default port), http://192.168.1.89:4048 (with a custom port). | **null** is interpreted as "localhost". | yes |
| message-server-username | The user name for the messaging server. | **null** is interpreted as "guest". | yes |
| message-server-password | The password for the messaging server. | **null** is interpreted as "guest". | yes |
| configuration-directory-location | The directory where applications resources are saved. | - | yes |

<br />

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
