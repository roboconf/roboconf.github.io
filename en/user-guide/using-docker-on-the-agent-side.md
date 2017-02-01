---
title: "Using Docker on the Agent's side"
layout: page
cat: "ug-last"
id: "using-docker-on-the-agent-side"
menus: [ "users", "user-guide" ]
---

This page discusses the case where Docker containers are launched by Roboconf agents.  
See [here](using-docker-with-roboconf.html) for other uses cases of Docker with Roboconf.

<img src="/resources/img/docker-containers-managed-by-agents.png" alt="Docker containers managed by Roboconf agents" class="gs" />

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
           -p ${httpPort}:8080
           -p ${ajpPort}:8009
           -your-docker-options
```

Roboconf guarantees that for a given VM (Roboconf agent), random ports will not
conflict. And since these ports are exchanged by Roboconf as dependency information, other
containers will be able to access them from the outside. You can also define ports to ignore
in [Roboconf preferences](roboconf-preferences.html) so that they are never picked up during the
random generation.


**stop.sh**

```bash
# Stop can be followed by undeploy OR start.
# Given the way our start script works, it is better to stop the container and delete it.
docker kill ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}
docker rm ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}
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
