---
title: "Using Docker on the Agent's side"
layout: page
cat: "ug-snapshot"
id: "using-docker-on-the-agent-side"
menus: [ "users", "user-guide", "Snapshot" ]
---

## Using Docker with Roboconf

There are several ways of using Docker with Roboconf.  

1\. One usage consists in using Docker in replacement of Virtual Machines.
This is particularly useful for tests and local deployments. For such a use case,
please refer to the [Docker target](target-docker.html) documentation.

2\. Another use case consists in having Docker containers running on remote VMs.  
Roboconf can create these VMs, as well as Docker containers on it. There are two ways
of achieving it.

A way to do that is to still rely on the [Docker target](target-docker.html).  
With this approach, you consider remote Docker containers as *VMs into VMs*. It
means Docker containers will have a Roboconf agent running it. Said differently,
it works the same way than local Docker deployments, except the Docker API's end-point
is located remotely.

To achieve this, you must have Docker installed in your virtual image (for the agent).  
And you need to indicate in your **target.properties** file that the Docker API's end-point
is located on a machine that will be created by Roboconf.

```properties
# Basic information
handler = docker
name = 
description = 

# "ip" will be injected y Roboconf and resolved to the target machine.
# Pre-condition: this machine must have been created by Roboconf.
# If not, just put the IP address by hand in the file.
docker.endpoint = http://{{ ip }}:4243
# ...
```

3\. The third use case is probably the one that interests Docker users.  
Indeed, the two previous ones are more interesting for Roboconf users (e.g. for tests).

This third approach consists in having Roboconf agents managing Docker containers.  
These Docker contains do not contain any Roboconf agent. They just run with what users want.

Let's discuss this third option in details.


## Docker Containers maintained by Roboconf Agents

To give the maximum control to users, this approach relies on scripts and usual Docker commands.  
Roboconf only plugs dynamic and remote configuration to Docker containers. Compared to [Docker-Compose](https://docs.docker.com/compose/),
it allows to run multi-container applications on several machines that can be created dynamically. Indeed, with Compose,
you either need to run these containers locally or to hard-code machine IP addresses.

With Roboconf, you will be able to add or remove machines and create new containers without having to
modify your Docker configuration.
Notice your virtual images (the one with the Roboconf agent) should have Docker installed.
Or you can obviously install it with Roboconf, but it will be more efficient to pre-install it.

Everything rely on [the Roboconf script plug-in](plugin-script.html).  
Let's take Bash scripts as an example. The magic thing relies on some environment variables Roboconf
can inject.


**deploy.sh**

```bash
# Deploy => Get the image, if necessary.
docker pull your-image-id
```


**start.sh**

The start phase has two requirements:

* Guarantee Docker containers will have different names.
* Provide safe port mapping if we want them to be accessible from other machines without any conflict.

Roboconf provides a solution for both cases.

```bash
# Start => Launch a container.
# To guarantee name uniqueness, let Roboconf provides a unique (and readable) name to your container.
# Do not rely on container IDs (or that will make your scripts more complex).
docker run your-image-id -name ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH} -your-docker-options
``` 

Then, there is a port mapping.  
Since these ports will be used by other containers, you need to declare them as exported variables
in the graph. And to notify Roboconf that it has to generate them, use the random notation.

<pre><code class="language-roboconf">
TomcatContainer {
	installer: script;

	exports: ip;
	exports: random[port] httpPort;
	exports: random[port] ajpPort;
}
</code></pre>

In the **start.sh** script, you will then perform the port mapping.

```bash
docker run your-image-id \
           -name ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}
           -p 8080:${httpPort}
           -p 8009:${ajpPort}
           -your-docker-options
```

Roboconf guarantees that for a given VM (Roboconf agent), random ports will not
conflict. And since these ports are exchanged by Roboconf as dependency information, other
containers will be able to access them from the outside.


**stop.sh**

```bash
# Stop can be followed by undeploy OR start.
# Given the way our start script works, it is better to stop the container and delete it.
docker kill ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH} && docker rm ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}
``` 


**undeploy.sh**

We could delete the image from the Docker repository.  
However, most of the time, it will not be necessary. So, this script is not mandatory.


**update.sh**

Here it is.  
When you use [Docker-Compose](https://docs.docker.com/compose/), it configures dependencies before
launching the containers. Roboconf does the same (or almost), except it will start containers as soon as
minimal dependencies are resolved. It means dependencies that are resolved later trigger reconfiguration phases.

This also allows to add or remove containers without modifying the Docker configuration.  
When a dependency changes, is added or removed, the **update.sh** script will be invoked.

The key relies on a script that will execute an update action in the Docker container.  

```bash
docker exec ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH} reconfiguration-script.sh
```  

To be clear, **update.sh** runs on the host system, while **reconfiguration-script.sh** runs inside the Docker container.  
This reconfiguration script will have to update the running Software with information provided by Roboconf.  

> Be careful when reconfiguring your program.  
> If it is was launched as the main application, stopping it will kill the Docker container.

The reconfiguration script has one drawback.  
New information is injected in the **update.sh** script. And you probably want to inject this information
in the docker container. So, there must be a way to generate the reconfiguration script from a template.

You can either complete the **update.sh** script to do this with your own means.  
Or you can rely on Roboconf's [script templating](plugin-script.html), which relies on [Mustache](https://mustache.github.io/),
and execute the commands in-line.

Basically, it consists in 2 steps:

* Roboconf generates the **update.sh** script from a template and the dependencies information it has.
* Robocnf runs the generated script that will reconfigure the program running in the Docker container.

```bash
# This script was generated from a template by Roboconf.
# 8081 was injected in the template by Roboconf.
docker exec ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH} /bin/bash -c\
      "sed -i /port/8081/ server.conf"
```  

