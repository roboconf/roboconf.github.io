---
title: "Configuring the Deployment Manager"
layout: page
cat: "ug-0-1"
id: "configuring-the-deployment-manager"
menus: [ "users", "user-guide", "0.1" ]
---

Once the Deployment Manager (DM) has been installed, it needs to be configured.
The DM stores its configuration in a directory. By default, this directory is located under the user directory.

```properties
# On Linux systems
cd /home/username/roboconf_dm
```

It is also possible to specify the location of this directory with the **ROBOCONF_DM_DIR** environment variable.
It must point to the directory's absolute path. When you start the DM for the first time, and if the DM's directory does not exist,
then the DM creates it with a default configuration. So, you can start the DM first and then update the generated configuration if necessary.

The directory's structure is the following:

	DM's directory/
	├── applications/
	├── conf/
	│   └── configuration.properties
	└── instances/

The **applications** directory will be populated every time an application is deployed.

The **instances** directory will contain the states of component instances. Every application will have
its own file storing instances states. These file are read once, on startup of the DM. And for a given application,
they are written on every instance creation or deletion, or every change on a root instance (usually a VM). This makes
very few write operations (unless you create and delete VMs all the time).

The **conf** directory contains the configuration of the DM.
The **configuration.properties** file contains three key/value pairs for the messaging server (Rabbit MQ).

```properties
# The IP address of the messaging server (required).
# A port can be added at the end, e.g. localhost:11021
messaging.ip = localhost

# The user name to connect to the messaging server (required).
messaging.username = guest

# The password to connect to the messaging server (required).
messaging.password = guest
```

The DM only needs this directory.
It means the DM can restart and restore its state from these files.

The DM can thus be moved from one machine to another.
If it crashes, it can restart easily.

> Last, but not least, the DM can be stopped when it is not used.
> It does not aim at running all the time. Once initialized, the agents do not need it.

The DM is only an administration interface.
Making the DM stoppable reduce attack threats on the REST API and makes it quite easy to secure. Besides, and as a reminder,
it is preferable to run the DM in your internal information system, rather than putting it on a cloud or external host (although it remains possible).

Since all the DM configuration is contained in its directory, it is quite simple to prevent information loss.
A periodic backup of the directory is quite simple to set up. Or the directory can be put on a replicated file system
(e.g. a RAID configuration).

Eventually, system administrators will be able to get information on the instances even when the DM is stopped. The
*instances* files under the **instances** directory contain states, IP addresses and machine IDs (for IaaS dash boards).
