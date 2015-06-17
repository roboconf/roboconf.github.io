---
title: "Preparing Virtual Images with an Agent"
layout: page
cat: "ug-snapshot"
id: "preparing-virtual-images-with-an-agent"
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

> If you do not use a cloud infrastructure, you can stop reading this page.
> You can directly look at [how to install a Roboconf agent](installing-an-agent.html).

The creation of a virtual image depends on the IaaS you use.
You may also define virtual appliances with [OVF](http://en.wikipedia.org/wiki/Open_Virtualization_Format)
or solutions like [UShareSoft](http://www.usharesoft.com) or [Kameleon](https://github.com/oar-team/kameleon).

Virtual images should thus contain a Roboconf agent.
As a general matter, it is also a good practice to pre-install and configure system libraries.
This includes as an example Java virtual machines, Python libraries or even NodeJS.

It is not that Roboconf could not install them.
But since Roboconf executes your scripts, it is a lot of work for users to handle the deployment of
these elements (in particular because your scripts / recipes must be idempotent).
Eventually, system libraries cannot be modeled as Roboconf components (starting and stopping them does not make sense).
So, when you install a system library, you must install it with the component that use it. Again, it is better to
install and configure them in your virtual images.

This being said, you can now take a look at [how to install a Roboconf agent](installing-an-agent.html).
