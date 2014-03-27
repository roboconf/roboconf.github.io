---
title: "Puppet plugin"
layout: page
id: "ug.snapshot.puppet"
menus: [ "users", "user-guide" ]
---

## Install prerequisites

The puppet plugin enables puppet deployment with roboconf: it uses [puppet](http://www.puppetlabs.com)
to deploy and configure software on target platforms.

Puppet has to be installed on every target platform for deployment: on a IaaS, it should be deployed in the
virtual machine image (eg. EC2 AMI or OpenStack snapshot) that contains the roboconf agent.

Note that old releases of puppet may not work with roboconf: at least, the "puppet module" command must be supported.

On Ubuntu systems, the safest way is to install the latest puppet, as follows:
```
sudo apt-get install rubygems
sudo gem install facter
sudo gem install puppet
```
Note you may also "apt-get install puppet", but make sure the version on the official repositories is
recent enough.

