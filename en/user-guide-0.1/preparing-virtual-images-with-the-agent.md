---
title: "Preparing Virtual Images with the Agent"
layout: page
id: "ug.0.1.preparing-virtual-images-with-the-agent"
menus: [ "users", "user-guide" ]
---

So that Roboconf can deploy Software components on remote hosts (VMs, devices...), there need to be a Roboconf
agent deployed on this host. The agent will be in charge of receiving orders from the Deployment Manager
and applying them. It is also responsible of notifying the DM of changes on the host.

So, the prerequisite is to have this agent deployed on the remote hosts.  
On devices or self-hosted machines, the agent has to be deployed manually. This can be made automatic
with SSH and some scripts, or by using other deployment solutions. In the cloud, deploying the agent
is achieved by creating and storing a virtual image. When a VM will be instantiated from this image,
the agent will already be there.

> We plan to create system packages (.deb, .rpm) for both the DM and the agent.  
> For agents, it will simplify the creation of the virtual images.

The creation of a virtual image depends on the IaaS you use.  
You may also define virtual appliances with [OVF](http://en.wikipedia.org/wiki/Open_Virtualization_Format) 
or solutions like [UShareSoft](http://www.usharesoft.com) or [Kameleon](https://github.com/oar-team/kameleon).

> Although we generally test Roboconf with Ubuntu systems, there is no reason it does
> not work on other systems.  
> However, we recommend using Linux systems.

In any case, you must have:

* A Java Virtual Machine (JVM) for Java 1.6+.  
OpenJDK and Oracle JDK are supported.

* Bash if you want to use the **Bash** plug-in.

* Puppet if you want to use the **Puppet** plug-in.  
Make sure you have a recent version of Puppet. See [this page](plugin-puppet.html)
for more information about Puppet installation.

Eventually, you need to have the agent installed somewhere on the system.  
Until we have system packages, the agent must be deployed by hand and configured to start with the machine and/or VM.

Grab the agent's ZIP file and unzip it somewhere on the file system.  
Make sure the agent will start with the system. A simple way can be to call it from from the the *rc.local* file.

	sudo nano /etc/rc.local

Put at the end of this file, before *exit(0)*

	/path/to/roboconf/agent/startup.sh

Obviously, you can also create an **init.d** script.

> It is important that the agent runs in ROOT mode.  
> Otherwise, agent plug-ins may not work correctly and encounter permission issues.

Once you have a VM running with all of this, you can create a snapshot and save it as a virtual image.
The image ID will be referenced in the **iaas.properties**. When a VM will be created by Roboconf, it will
create it from this template.

You may wonder if the agent needs parameters at startup.  
Most of the time, the DM passes information to agents through mechanisms that are available
in cloud infrastructures (through *user data*). However, since Roboconf can deploy on other machines than
just VMs, other solutions are available to pass data to agents.

Here is a short table to indicate the parameters to give.

| IaaS / Platform | Parameters and Comments |
| --- | --- |
| Amazon Web Services | No argument. Information will be transmitted by the DM through AWS mechanisms. |
| Microsoft Azure | Two arguments are required. Use **startup.sh platform azure** |
| OpenStack | No argument. Information will be transmitted by the DM through OpenStack mechanisms. |
| VMWare | No argument. Information will be transmitted by the DM through VMWare mechanisms. |
| "Embedded" | You will need to pass 6 arguments to the startup script. See comments at beginning of the **startup.sh** script. |
| "In-Memory" | It makes no sense for this, since the agent is created by the DM and runs in-memory. |
