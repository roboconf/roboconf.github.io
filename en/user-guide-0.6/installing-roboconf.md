---
title: "Installing Roboconf"
layout: page
cat: "ug-0-6"
id: "installing-roboconf"
menus: [ "users", "user-guide", "0.6" ]
---

Roboconf is implemented in Java. So, it should work on any system with a Java Virtual Machine.  
However, most of the tests are performed on Linux/Debian systems.  
First versions of Roboconf were also heavily tested on Windows, but this is not the case anymore.


## System Packages

* Installing [Roboconf with Debian packages](installing-roboconf-with-debian-packages.html)
* Installing [Roboconf with RPM](installing-roboconf-with-rpm.html)


## Manual Installation

For other systems, you will have to install the DM and agents by hand.  
Please, refer to the links below for more details.

* [Installing the Deployment Manager](installing-the-deployment-manager.html) by hand
* [Installing an Agent](installing-an-agent.html) by hand


## Messaging Servers

If you use RabbitMQ, [this page](installing-rabbit-mq.html) will guide you into its installation.


## Configuration

Once installed, please refer to the configuration pages:

* [Configuring the DM](configuring-the-deployment-manager.html)
* [Configuring an Agent](configuring-an-agent.html)
* [Configuring the Messaging](configuring-the-messaging.html)


## Legacy

It is also possible to install everything (RabbitMQ included) through scripts.  
They were written for Linux, but could be (quite) easily adapted for other systems.

* [Installing Everything](installing-everything-with-scripts.html) with Linux scripts
