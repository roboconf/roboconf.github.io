---
title: "Puppet plugin"
layout: page
id: "ug"
menu: "users"
sub-menu: "user-guide"
---

## Install prerequisites

The puppet plugin enables puppet deployment with roboconf: it uses [puppet]() to deploy and configure software
on target platforms.

Puppet has to be installed on every target platform for deployment: on a IaaS, it should be deployed in the
virtual machine image (eg. EC2 AMI or OpenStack snapshot) that contains the roboconf agent.

Note that old releases of puppet may not work with roboconf: at least, the "puppet module" command must be supported.

On Ubuntu systems, the safest way is to install the latest puppet, as follows:
```
sudo apt-get install rubygems
sudo gem install facter
sudo gem install puppet
```
