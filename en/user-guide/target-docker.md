---
title: "Docker Support"
layout: page
cat: "ug-last"
id: "target-docker"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for Docker.  
This handler makes Docker seen as a kind of IaaS. Roboconf may create and manage Docker containers,
that run Roboconf agents (just like VMs) and can be used as deployment targets.

> This is useful for tests and demonstrations.  
> Not for real productions.

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-the-dm.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target docker
```

Or with the native Karaf commands:

```properties
# Here in version 0.9
bundle:install --start mvn:net.roboconf/roboconf-target-docker/0.9
```

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for Docker
handler = docker

# Provide a meaningful description of the target
id = a unique identifier
name = 
description = 

# Docker API
# docker.endpoint = tcp://localhost:4243
# docker.image = roboconf/roboconf-agent:<version> 

# docker.user = 
# docker.password = 
# docker.email = 
# docker.version = 

# Image Generation
# docker.generate.image.from = ./img
```

Here is a complete description of the parameters for Docker.  
Let's begin with general parameters.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| handler | Determines the target handler to use. | none, must be "docker" | yes |
| id | A unique identifier for the target properties. | - | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| docker.endpoint | The end-point URL of Docker (requires Docker to be setup to use a TCP port). Only 'tcp://' or 'unix://' URLs are supported. | tcp://localhost:4243 | no |
| docker.image | The ID or tag (name) of the docker image used as a template for the VM (as shown by "docker images", for example). | roboconf/roboconf-agent:\<version\> | no |
| docker.user | The name of the user to connect. | none | no |
| docker.password | The password of the user to connect. | none | no |
| docker.email | The email of the user to connect. | none | no |
| docker.version | The Docker version (for API compatibility). This version supports versions until Docker v1.23. | none | no |

> `\<version\>` is the version of the DM.  
> If the DM is a snapshot version, then `LATEST` is retained.

If you use your own image, you should extend
[the official one for Roboconf agents](https://hub.docker.com/r/roboconf/roboconf-agent/).  
If the Docker image is not found, Roboconf will try to generate it from a Dockerfile that is supposed to be provided.
If no Dockerfile is provided, an error will be thrown. Let's take a look at parameters related to image generation.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| docker.generate.image.from | The path to a directory containing a Dockerfile. The path is relative to the target properties file. | - | no |

You should use [our official images](https://hub.docker.com/r/roboconf/roboconf-agent/) as a work base.


## Default Run Options

This handler starts containers with the following elements:

* A shared volume that contain dynamic parameters.
* An environment variable (*AGENT_PARAMETERS*) which sets up the agent configuration in the container.
* An environment variable (*RBCF_VERSION*) which is the version of the DM.


## Docker Configuration

See [Roboconf's Docker tips](docker-tips.html) for details about installing and preparing Docker for Roboconf.  
You will also find a reminder about basic Docker commands.


## Docker Options

Docker [CLI](https://docs.docker.com/reference/commandline/cli/) and 
Docker's [remote API](https://docs.docker.com/reference/api/docker_remote_api/) allows you to pass various options.  
Some of these options can also be passed via Roboconf **to create a new container** (i.e. docker run...).

> These options are only used when Roboconf creates a container.  
> Other operations, like creating an image, cannot use them.

Since these options are passed with the Java REST API, Roboconf only supports a subset of options.  
Only those of type *int*, *long*, *boolean*, *string*, *array of string* and *array of capabilities* are supported.  
These options must be prefixed with **docker.option.run.**.

Let's take a look at examples.

```properties
# Set the host name
docker.option.run.hostname = some host name

# Set the CPU share
docker.option.run.cpushares = 512
docker.option.run.cpu-shares = 512

# Attach the standard error with the container
# (probably useless with Roboconf but this is for the example)
docker.option.run.attachstderr = true
docker.option.run.attach-stderr = true

# Add capacilities
docker.option.run.capadd = SYS_PTRACE, AUDIT_CONTROL
docker.option.run.cap-add = SYS_PTRACE, AUDIT_CONTROL

# Remove capabilities
docker.option.run.capdrop = MKNOD, AUDIT_CONTROL
docker.option.run.cap-drop = MKNOD, AUDIT_CONTROL
```

Options can be found in the [remote API](https://docs.docker.com/reference/api/docker_remote_api/)'s guide.  
Given the way Roboconf passes these options to the REST clients, it is possible some options fail to be set.
Complex ones are not supported at all (e.g. **ExposedPorts**).

If you need support for new options, or if one does not work, please 
[submit a feature request and/or a bug report](https://github.com/roboconf/roboconf-platform/issues).


## Docker Environment Variables

It is possible to pass environment variables when the DM starts a Docker container.  
Such variables must be prefixed with **docker.option.env.**. It is also possible few
place holders in values.

Example:

```properties
# "VAR=value"
docker.option.env.VAR = value

#  AGENT_APPLICATION_NAME="application name injected by the DM"
docker.option.env.AGENT_APPLICATION_NAME = <application-name>

#  AGENT_SCOPED_INSTANCE_PATH="scoped instance path injected by the DM"
docker.option.env.AGENT_SCOPED_INSTANCE_PATH = <scoped-instance-path>

#  AGENT_MESSAGING_TYPE="messaging type injected by the DM" (e.g. RabbitMQ)
docker.option.env.AGENT_MESSAGING_TYPE = <scoped-messaging_type>
```

> Notice that there is no place holder for messaging properties.  
> Also remember the DM injects the **AGENT_PARAMETERS** environment variable.


## Privileges

**docker.option.run.cap-add** can be used to change privileges.  
Indeed, some Software component cannot be installed with the default configuration.  
As an example, if set to `SYS_PTRACE`, then Roboconf will execute...  

```
docker run --cap-add SYS_PTRACE id /usr/local/roboconf-agent/start.sh
```

Such permissions are sometimes necessary.  
See these discussions on Github for additional information.

* [How to use init script](https://github.com/roboconf/roboconf.github.io/issues/45)
* [Add a property to pass options to run Docker containers](https://github.com/roboconf/roboconf-platform/issues/335)


## Extending the Official Image

There are cases where you want to extend the official image to install automatically
some add-ons. It can be installing new system packages...

```docker
FROM roboconf/roboconf-agent:${RBCF_VERSION}
RUN apt-get install -y my-package1 my-package2
```

... or installing extensions for a Roboconf agent.  
This second case is a little more complex. Let's start with a simple scenario: we only
want to deploy something that runs in Karaf but does not depend on Roboconf libraries.
Example: Karaf Decanter (a monitoring solution).

```properties
FROM roboconf/roboconf-agent:${RBCF_VERSION}

# Add a new repo
RUN echo "mvn:org.apache.karaf.decanter/apache-karaf-decanter/LATEST/xml/features" \
	>> /opt/roboconf-karaf-dist-agent/etc/org.apache.karaf.features.repos.cfg

# Add a list of features to enable / install at startup
RUN sed -i /featuresBoot\s*=\s*/featuresBoot = management, decanter-collector-jmx, / \
	/opt/roboconf-karaf-dist-agent/etc/org.apache.karaf.features.cfg
```

Let's take a look now about a feature that would depend on Roboconf.  
To solve deployment ordering, you need to create a Karaf feature
first, that depends on the **roboconf-agent** one.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<features 
		name="generated-by-roboconf"
		xmlns="http://karaf.apache.org/xmlns/features/v1.3.0"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://karaf.apache.org/xmlns/features/v1.3.0 http://karaf.apache.org/xmlns/features/v1.3.0">

	<feature name="roboconf-agent-additions" version="1.0" description="Generated by Roboconf (Docker Target)" install="auto">
		<feature>roboconf-agent</feature>

		<bundle>http://my-server/bundle1.jar</bundle>
		<bundle>http://my-server/bundle2.jar</bundle>
		<bundle>file:/opt/roboconf-karaf-dist-agent/my-agent-extensions/bundle3.jar</bundle>
	</feature>
</features>
```

Put it within the same directory than your Dockerfile.

```properties
FROM roboconf/roboconf-agent:${RBCF_VERSION}

# Copy a local dependency
# (assuming all the other ones are available remotely) 
RUN mkdir -p /opt/roboconf-karaf-dist-agent/my-agent-extensions
ADD bundle3.jar /opt/roboconf-karaf-dist-agent/my-agent-extensions/

# Copy the feature  in the "deploy" folder
# (its name must be "feature.xml")
COPY my-feature.xml /opt/roboconf-karaf-dist-agent/deploy/
```
