---
title: "Installing Roboconf"
layout: page
cat: "ug-0-4"
id: "installing-roboconf"
menus: [ "users", "user-guide", "0.4" ]
---

Roboconf is implemented in Java. So, it should work on any system.  
However, most of the tests are performed on Linux/Debian systems.  
First versions of Roboconf were also heavily tested on Windows, but this is not the case anymore.


# Prerequisites

At the moment, Roboconf needs a [RabbitMQ](https://www.rabbitmq.com) instance to run.  
This messaging server enables communication between Roboconf parts.  
Follow the instructions on this page to [install the messaging server](installing-the-messaging-server.html).

If you deploy on a cloud infrastructure (such as Amazon Web Services, Microsoft Azure or Openstack),
Roboconf will create virtual machines from an appliance (or virtual image). You will have to create
this image and pre-install a Roboconf agent on it. More details are given on [this page](preparing-virtual-images-with-an-agent.html).


# Debian Packages

> This part will be completed as soon as Debian packages are online.

To install the Deployment Manager, ...

To install the agent, ...


# Manual Installation

For other systems, you will have to install things by hand.  
Please, refer to the links below for more details.

* [Installing the Deployment Manager](installing-the-deployment-manager.html) by hand
* [Installing an Agent](installing-an-agent.html) by hand

It is also possible to install everything (RabbitMQ included) through scripts.  
They were written for Linux, but could be (quite) easily adapted for other systems.

* [Installing Everything](installing-everything-with-scripts.html) with Linux scripts
