---
title: "Docker Support"
layout: page
cat: "ug-0-6"
id: "target-docker"
menus: [ "users", "user-guide", "0.6" ]
---

Roboconf has a target implementation for Docker.  
From the Roboconf perspective, Docker is seen as a kind of IaaS.
Roboconf may create and manage docker containers, that run Roboconf agents (just like VMs) and can be used as deployment targets.

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-roboconf.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target docker
```

Or with the native Karaf commands:

```properties
# Here in version 0.6
bundle:install --start mvn:net.roboconf/roboconf-target-docker/0.6
```

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for Docker
handler = docker

# Provide a meaningful description of the target
name = 
description = 

# Docker API
docker.endpoint = http://localhost:4243
docker.image = 

#docker.user = guest
#docker.password = guest
#docker.email = guest@something.com
#docker.version = 
#docker.run.exec = 

# Image Generation

#docker.generate.image = 
#docker.agent.package.url = 
#docker.agent.jre-packages = 
#docker.additional.packages =  
#docker.additional.deploy = 

# docker.base.image = ubuntu:latest
# docker.download.base-image = true
# docker.image.registry = registry.hub.docker.com
```

Here is a complete description of the parameters for Docker.  
Let's begin with general parameters.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| handler | Determines the target handler to use. | none, must be "docker" | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| docker.endpoint | The end-point URL of Docker (requires Docker to be setup to use a TCP port). | http://localhost:4243 | no |
| docker.image | The ID or tag (name) of the docker image used as a template for the VM (as shown by "docker images", for example). If the image is not found, Roboconf will try to generate one, using "\<docker.image\>:\<docker.image\>" as its tag: if so, the **docker.agent.package** property is required so that Roboconf knows where to find the Roboconf agent to install on the generated image. If it is an image ID, it must be the full ID, that can be retrieved with **docker images --no-trunc**. | "generated.by.roboconf" | no |
| docker.user | The name of the user to connect. | none | no |
| docker.password | The password of the user to connect. | none | no |
| docker.email | The email of the user to connect. | none | no |
| docker.version | The Docker version (for API compatibility). This version supports versions until Docker v1.17. | none | no |
| docker.run.exec | The command line to run in the created Docker container. *See dedicated [The docker.run.exec property](#the-docker.run.exec-property) section below* | *See the section below* | no |

Let's now take a look at parameters related to image generation.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| docker.generate.image | A boolean value that indicate whether a Docker image for Roboconf should be generated. Disabled by default. | false | no |
| docker.agent.package.url | If you want this extension to generate a Docker image for you, this parameter is an **URL** that points to the ZIP or TAR.GZ file of a Roboconf agent distribution. If not specified, Roboconf will try to guess it. The guess process is described in [this section](#the-docker.agent.package.url-property) below. | *See below* | no |
| docker.agent.jre-packages | If you want this extension to generate a Docker image for you, this parameter indicates the JRE to install (as a system package), as well as other optional packages, separated by spaces. The package name(s) must be understandable by the apt package manager (Debian-based Linux distributions). | openjdk-7-jre-headless | no |
| docker.additional.packages | Additional packages to install on the generated image, using **apt-get install**. The package name(s) must be understandable by the apt package manager (Debian-based Linux distributions). | none | no |
| docker.base.image | If Roboconf generates an image for you, this property is used to determine the base image to use. The generated Dockerfile will begin with **FROM** *docker.base.image*... If the base image does not exist, it can be downloaded if **docker.download.base-image** is set to true. Otherwise, an error will be thrown. Examples: ubuntu, ubuntu:latest | ubuntu | no |
| docker.additional.deploy | A list of URLs that point to additional elements you would like to deploy in Karaf / the Roboconf agent. Example: bundles. Local and remote URLs are supported (http, file...). URLs should be separated by spaces. If you have several ones, we suggest you put one URL per line, each line ending with ` \\`, except the last one. This will keep your **target.properties** file readable. | none | no |
| docker.download.base-image | If set to true, and that the base image does not exist, then it will be downloaded from a Docker registry. | false | no |
| docker.image.registry | If the base image must be downloaded, then it will be retrieved from this Docker registry. | registry.hub.docker.com | no |
 

At least one of **docker.image** or **docker.agent.package** must be specified.  

> As a good practice, **docker.image** should always be specified.  
> Even when Roboconf generates the image.

## <a name="the-docker.run.exec-property"></a>The docker.run.exec property

This target property holds a command line to pass to the Docker container when it is started.  
By default, a Roboconf agent is started, but it is possible to specify another command to do special things before/while the Roboconf agent is started.

The value of this property  **must** be formatted using the JSON string array syntax.

* If this property is left undefined, then Roboconf will use the default value.
* If the property is set, its value will be used as the command to run the created container.
* If a custom Dockerfile has been provided, and if the Dockerfile contains a `CMD` instruction, you can explicitly
set this property to an empty array `[]`, so Roboconf will use the `CMD` from the Dockerfile.

The default value for this property is...

```json
[
  "/usr/local/roboconf-agent/start.sh",
  "etc/net.roboconf.messaging.$messagingType$.cfg",
  "agent.application-name=$applicationName$",
  "agent.scoped-instance-path=$instancePath$",
  "agent.messaging-type=$messagingType$",
  "$msgConfig$"
]
```

The parameter values prefixed and suffixed by the dollar symbol are replaced at runtime by Roboconf.
Indeed, a Roboconf agent needs some configuration before it can run.  
The **docker.run.exec** property allows to use several markers, that will be substituted by the actual configuration for the agent.

| Marker | Description |
| --- | --- | --- |
| $applicationName$ | The name of the application |
| $instancePath$ | The path of the scoped instance |
| $messagingType$ | The type of the messaging factory |
| $msgConfig$ | The messaging configuration properties |

There is one more thing about the **$msgConfig$** marker, which is a bit more special than the other ones. As it expands to several
arguments, it can only be used alone *verbatim*, in its own argument. This marker is substituted by each one of the Roboconf agent
messaging configuration property, in a separated argument, prefixed with `msg.`.

According to the substitution rules explained above, and for...

* ... an application named *app*,
* ... a scoped instance whose path is */path/to/instance*,
* ... a messaging factory type set to *telegraphy* with 2 parameters, **code=morse** and **medium=wire**...

... then the command line will be substituted and expanded to...

```bash
/usr/local/roboconf-agent/start.sh \
    "etc/net.roboconf.messaging.telegraphy.cfg" \
    "agent.application-name=app" \
    "agent.scoped-instance-path=/path/to/instance" \
    "agent.messaging-type=telegraphy" \
    "msg.code=morse" \
    "msg.medium=wire"
```


Notice that parameters injection only works when variables are in their own argument.  
Said differently, **if you override** the default value, the JSon array cannot mix a
variable with something else.

```properties
# OK! will expand to "msg.property1=value1", "msg.property2=value2", …
"$msgConfig$"

# Not OK! $msgConfig$ can only be used alone in its own argument.
"msgParam:$msgConfig$"

# Not OK! Same as above, only usable alone.
"$messagingType$ $msgConfig$"

# OK! Used in separated arguments.
"type=$messagingType$", "$msgConfig$"
```


## <a name="the-docker.agent.package.url-property"></a>The docker.agent.package.url property

This property holds an URL that points to a Roboconf agent distribution (either a ZIP or a tar.GZ file).  
If not specified, Roboconf tries to guess it. First, it assumes the agent's version should be the same that the DM's one.
By introspecting its configuration, the DM can find it (provided it runs in an OSGi environment). Then, it tries to find a
Maven artifact that will match the agent's distribution for this version.

Here is the resolution order:

1. Try to find it in the local Maven repository.
2. If it is not found locally, contact [Sonatype's web service API](https://repository.sonatype.org/nexus-restlet1x-plugin/default/docs/index.html) to find it.

Sonatype is the Maven provider/intermediate Roboconf uses for snapshots builds hosting and releases management.  
Snapshot versions resolution will use the latest build. Released versions are hosted by public Maven repositories,
including Maven Central.

Notice that it is not possible to download snapshots of released versions. As soon as a version is released, all the snapshots
are deleted.  


## Docker Configuration

See [Roboconf's Docker tips](docker-tips.html) for details about installing and preparing docker for Roboconf.  
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


## Docker RUN with Roboconf

This section clarified the way Roboconf creates Docker containers.  
Here is what it executes, if **docker.command.use** is set to true (or not set at all).

```
docker run <docker.image> <docker.command.line>
```

With default values, and assuming **id** is the ID of an image tagged with **generated-by-roboconf**, then
the previous command is equivalent to...

```
docker run id /usr/local/roboconf-agent/start.sh
```

Docker options (for the RUN) can be set.  
Read the previous section about this.


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


## Running Docker in a VM

There are two options to manage Docker containers in a VM with Roboconf.  
The first one relies on the idea that a Roboconf agent will manage them. This solution is not yet implemented.

The other option relies on the DM.  
It implies you have a hierarchy of instances that looks like...

<pre><code class="language-roboconf">
instance of VM {
	instance of Docker {
		instance of MyApp {
			#...
		}
	}
}
</code></pre>

Roboconf will create all these instances, the VM, the Docker container and the application.  
The secret here relies on the fact that both **VM** and **Docker** are components associated with the **target** installer.
From Roboconf's point of view, it is all about nested scoped instances (or nested containers).

**VM** can match any target in general (including EC2, Openstack or even Docker).  
Let's assume it is EC2 (Amazon Web Services).

To have such a use case work, you must have Docker installed on the VM.  
It means your virtual image (appliance or AMI) must have Docker installed. And your Docker properties
(those you pass to Roboconf in the **target.properties** file) must reference the IP address of the VM.
Since this IP address is not known at modeling time, you will use a variable that will be expanded by Roboconf at runtime.

Here is a sample **target.properties** for Docker in this use case.

```properties
# Configuration file for Docker
handler = docker

{% raw %}docker.endpoint = http://{{ ip }}:4243{% endraw %}
docker.image = gen
docker.agent.package = http://maven.../roboonf-agent.tar.gz
```

The end-point will be completed with the right IP address when the container is created.  
Only **ip** is supported at the moment.


## Preparing your own Docker image

> This is NOT necessary if the image is generated by Roboconf,  
> i.e. if **docker.agent.package** was specified in the **target.properties** file.

Start a Docker container using a docker system image (e.g. Ubuntu):

```tcl
docker run -v /tmp:/roboconf -t -i ubuntu /bin/bash
```

Note: the container started above shares the local **/tmp** as **/roboconf** under Docker (using the -v option).  
This can be useful to share files between the local file system and the Docker container (e.g. to install the Roboconf agent).

Let's assume you have copied the Roboconf agent in the shared **/roboconf** directory (here, the local **/tmp**).  
In the Docker container, execute the following commands.

```bash
apt-get update
apt-get install openjdk-7-jre-headless
cd /usr/local
tar xvzf /roboconf/roboconf-karaf-dist-agent.tar.gz
ln -s roboconf-karaf-dist-agent/ roboconf-agent
```

Now, you have to add a **start.sh** executable script in the **/usr/local/roboconf-agent** directory.  
Set the following content (the script is mainly used to complete the agent setup at startup time).

<a name="start.sh"></a>

```bash
#!/bin/bash"
# Startup script for a Roboconf agent on Docker
# Find the file containing the messaging configuration
msgConfigFile=$1

# Prepare configuration files
cd /usr/local/roboconf-agent
echo "# Agent configuration - DO NOT EDIT: Generated by Roboconf" > etc/net.roboconf.agent.configuration.cfg
echo "# Messaging configuration - DO NOT EDIT: Generated by Roboconf" > $msgConfigFile

# And update them
for p in \"$@\"
do
	if [[ $p == msg.* ]] ;
		echo ${p:4} >> $msgConfigFile
	else [[ $p == agent.* ]] ;
		echo ${p:6} >> etc/net.roboconf.agent.configuration.cfg
	fi
done

# Start Karaf
cd bin
./karaf
```

The container is now ready to become a Docker image.  
Outside docker, keep track of its ID, that will be useful to build the image.

- Use **docker ps** to obtain your container ID.
- Then, **docker commit -m "Roboconf-Agent-Image" \<your container ID\> roboconf-agent:some-tag**

Now, your image is created.  
Retrieve its image ID using **docker images**, and use it as *docker.image* in the Roboconf configuration (**target.properties**).
