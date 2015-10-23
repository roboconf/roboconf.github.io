---
title: "Installing Roboconf"
layout: page
cat: "ug-last"
id: "installing-roboconf"
menus: [ "users", "user-guide" ]
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

First, you need to add our Debian repository into your repo list.

```bash
# For Ubuntu, or su if you are under Debian
sudo -i

# If you do not have them installed...
# Install https transport for APT and wget.
apt-get install apt-transport-https wget

# "jessie" is the Debian version we tested our package on (~ Ubuntu 14.04).
echo "deb https://dl.bintray.com/v1/content/roboconf/roboconf-debian-packages jessie main" >> /etc/apt/sources.list

# Add the SSH key.
wget --quiet -O - "https://bintray.com/user/downloadSubjectPublicKey?username=bintray" | apt-key add -

# Update the list of packages.
apt-get update

exit
```

Then, run...

```
sudo apt-get install roboconf-dm
```

... to install Roboconf's DM and...

```
sudo apt-get install roboconf-agent
```

... to install a Roboconf agent.


> Notice the package for the Roboconf agent asks a question.  
> This prevents from having to configure the agent after the installation.

Configuration files are available under **/etc/roboconf-dm** or **/etc/roboconf-agent**.  
Logs are located under **/var/log/roboconf-dm** or **/var/log/roboconf-agent**.


# Manual Installation

For other systems, you will have to install things by hand.  
Please, refer to the links below for more details.

* [Installing the Deployment Manager](installing-the-deployment-manager.html) by hand
* [Installing an Agent](installing-an-agent.html) by hand

It is also possible to install everything (RabbitMQ included) through scripts.  
They were written for Linux, but could be (quite) easily adapted for other systems.

* [Installing Everything](installing-everything-with-scripts.html) with Linux scripts
