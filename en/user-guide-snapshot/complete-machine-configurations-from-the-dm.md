---
title: "Complete Machine Configurations from the DM"
layout: page
cat: "ug-snapshot"
id: "complete-machine-configurations-from-the-dm"
menus: [ "users", "user-guide", "Snapshot" ]
---

Deployment targets are generally limited to a properties file.  
However, it is possible to complete them with a script that will be executed by the DM once the
infrastructure driver (« the target handler ») has completed its task.
Such a script can be used to complete the configuration of the machine.

Typical example: bare-metal servers.  
Unlike other kinds of infrastructures that Roboconf supports, there is no base
image. Such an option could be used to do whatever is necessary, including connect in SSH to
the remote server and install a Roboconf agent on it.

We can also use such a solution to complete the configuration of any infrastructure
Roboconf supports, for very specific requirements.

Scripts executed by the DM address such a use case.  
To proceed, you need to add one or several scripts along with your target definition.

> This is not possible with the web administration.  
> Only deployed targets support this feature.

Here is the structure of your target, with an example.

```properties
# Structure of the deployment archive
├── target1.properties
└── target1/
    ├── dm.configure.script.sh
    └── other resources
```

Your archive may contain several targets.  
Scripts associated with a given target must be located in a sub-directory whose name is
the same than the properties file (in the example: *target1*). There can be several resources
and several scripts. But **only one will be executed**. Other resources or scripts can only be
used as libraries or imports.

The script that is executed **must contain** the following string in its name: `dm.configure.script.`  
The script extension can be anything and use any file extension (bash, python, etc). It must be an executable.  
These scripts do accept parameters, provided by the DM as environment variables.

* `${IP_ADDRESS}`: the IP address of the machine, retrieved by the target handler from the infrastructure.
* `${APPLICATION_NAME}`: the name of the application this machine is part of.
* `${SCOPED_INSTANCE_PATH}`: the path of the scoped instance this machine is associated with.
* `${DOMAIN}`: the domain this machine is part of. 
* `${USER_DATA}`: the user data, ready to be written (as an example) in a file.  

> Scripts executed by the DM should be idempotent.  
> It is also possible to [complete machine configurations from an agent](complete-machine-configurations-from-an-agent.html).

The given example has one drawback: the *dm.configure.script.sh* file will also be sent to the agent to be executed.
To prevent this situation, there is a prefix that can be set for resources that should not be sent to an agent: `local.`
(no matter the case).

Applied to our example...

```properties
# Structure of the deployment archive
├── target1.properties
└── target1/
    ├── LOCAL.dm.configure.script.sh
    ├── LOCAL.config.file
    ├── scripts.that.will.be.sent.to.agents.sh
    └── other resources
```