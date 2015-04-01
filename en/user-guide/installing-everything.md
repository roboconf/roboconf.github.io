---
title: "Installing Everything"
layout: page
cat: "ug-snapshot"
id: "installing-everything"
menus: [ "users", "user-guide" ]
---

The other pages explain all the manual steps to install and configure the various Roboconf parts.  
This is fine when you do it once. But it can quickly become tedious when you do it several times.

This is why the [system installers](https://github.com/roboconf/roboconf-system-installers) were created.  
This project groups solutions to ease the installation of Roboconf. The most mature solution consists in Linux scripts.
Provided you can create machines on your target infrastructure, they will connect to them
in SSH, upload and/or download the required artifacts and configure them. This includes RabbitMQ,
the Roboconf agent (to create a virtual image) and the DM.

There are 5 scripts.

| Script | Description |
| ------ | ----------- |
| conf.sh | The file that contains all your parameters (Roboconf version, SSH key location, etc). |
| install-messaging.sh | The script to install and configure RabbitMQ. It also generates a script to configure or reconfigure RabbitMQ on every reboot. This way, you can create a reusable image from this VM. |
| install-agent.sh | The script to install and configure an agent on a VM. You can then create a virtual image from it. |
| install-dm.sh | The script to install and configure the DM on a remote VM. |
| install-local-dm.sh | The script to install and configure the DM on your local machine. |


Here is how it works.

1. Update the **conf.sh** script with your configuration.
2. If you need to install RabbitMQ, create a new VM, put the IP address in **conf.sh** and execute **install-messaging.sh**.
3. If you need to install the agent, create a new VM, put the IP address in **conf.sh** and execute **install-agent.sh**. Then, create an image from the VM in your infrastructure.
4. If you need to install the DM remotely, create a new VM, put the IP address in **conf.sh** and execute **install-dm.sh**. Then, create an image from the VM in your infrastructure.
5. If you need to install the DM locally, complete **conf.sh** and execute **install-dm-local.sh**.

This is not completely automatic because you need to interact with the target infrastructure (at least to create initial VM and create the virtual images).
But this helps to gain time and avoids repetitive tasks.

> There are plans to create Debian packages too.  
> And we may provide another solution. We also have to dig existing solutions to create virtual appliances.
