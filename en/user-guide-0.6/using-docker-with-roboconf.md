---
title: "Using Docker with Roboconf"
layout: page
cat: "ug-0-6"
id: "using-docker-with-roboconf"
menus: [ "users", "user-guide", "0.6" ]
---

There are several ways of using Docker with Roboconf.  


## Docker Containers as VMs

One usage consists in using Docker in replacement of Virtual Machines.  
Instead of creating virtual machines (e.g. on a cloud infrastructure), Roboconf will launch
Docker containers. Like with usual targets, a Roboconf agent will have to start with an agent inside.

This is particularly useful for tests and local deployments. For such a use case,
please refer to the [Docker target](target-docker.html) documentation.

<img src="/resources/img/docker-as-vm-alternatives.png" alt="Docker containers as VM alternatives" class="gs" />

<br />

## Remote Docker Containers

Another use case consists in having Docker containers running on remote VMs.  
Roboconf can create these VMs, as well as Docker containers on it.

One way to achieve is to consider remote Docker containers as any other VM.  
It means **VMs as well as remote Docker containers will have an agent inside**.
This is a variation of the previous solution, where Docker containers are considered like VMs.

We sometimes refer to this use case as &laquo; *IaaS in IaaS* &raquo; or &laquo; *VMs into VMs* &raquo;.

<img src="/resources/img/docker-as-vms--iaas-in-iaas.png" alt="Docker containers as VM alternatives" class="gs" />

This approach still relies on the [Docker target](target-docker.html).  
It works the same way than local Docker deployments, except the Docker API's end-point
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
{% raw %}docker.endpoint = http://{{ ip }}:4243{% endraw %}
# ...
```

<br />

## Docker Container managed by Roboconf Agents

The third use case is probably the one that interests Docker users.  
Indeed, the two previous ones are more interesting for Roboconf users (e.g. for tests).

This third approach consists in having Roboconf agents managing Docker containers.  
These Docker contains do not contain any Roboconf agent. They just run with what users want.

<img src="/resources/img/docker-containers-managed-by-agents.png" alt="Docker containers managed by Roboconf agents" class="gs" />

This use case is discussed in details [here](using-docker-on-the-agent-side.html).
