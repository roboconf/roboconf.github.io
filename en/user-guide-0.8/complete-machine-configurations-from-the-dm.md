---
title: "Complete Machine Configurations from the DM"
layout: page
cat: "ug-0-8"
id: "complete-machine-configurations-from-the-dm"
menus: [ "users", "user-guide", "0.8" ]
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

And here is an example of `LOCAL.dm.configure.script.sh` script that
install Java, deploys and initializes a Roboconf agents on a fresh VM.
This was tested with Ubuntu 16.04.

> Notice we first ping (and wait) the target machine.  
> Indeed, on EC2, a VM, even once created, may take few seconds to become reachable from the outside.

```properties
#!/bin/bash

# Wait for the target machine to be reachable.
# We try ten times and wait 3 seconds between every ping.
((count = 10))
while [[ $count -ne 0 ]] ; do
    ping -c 1 ${IP_ADDRESS}
    rc=$?
    if [[ $rc -eq 0 ]] ; then
        ((count = 1))
    else
      sleep 3
    fi
    ((count = count - 1))
done


# Decide what to do
if [[ $rc -eq 0 ]] ; then
    echo `say The internet is back up.`
else
    echo `say Timeout.`
    # You may notice a system service that configuration failed
    exit 2
fi


# Configuration
PEM_LOC=~/.ssh/your.pem
VERSION=0.8-1.0-SNAPSHOT
TARGET_ID=iaas-ec2
SSH_OPTIONS="-i $PEM_LOC -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
AGENT_DEB=~/.m2/repository/net/roboconf/roboconf-dist-debian-agent/$VERSION/roboconf-dist-debian-agent-$VERSION.deb


# Do not edit further, unless you know exactly what to change.
# Upload the Debian package for the agent
scp $SSH_OPTIONS $AGENT_DEB ubuntu@${IP_ADDRESS}:
echo "The agent was successfully uploaded."

# Connect to the agent VM
ssh -t $SSH_OPTIONS ubuntu@${IP_ADDRESS} bash <<ENDOFSCRIPT

# Install Java
sudo add-apt-repository ppa:openjdk-r/ppa  
sudo apt-get update
sudo apt-get install openjdk-7-jdk -y
	
# Install the agent
export DEBIAN_FRONTEND="noninteractive"
echo "roboconf-agent roboconf-agent/target select $TARGET_ID" | sudo debconf-set-selections
sudo dpkg -i roboconf*.deb

ENDOFSCRIPT

echo "Installation and configuration of the agent completed successfully."
```
