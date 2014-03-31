---
title: "The Puppet Plug-in"
layout: page
id: "ug.snapshot.plugin-puppet"
menus: [ "users", "user-guide" ]
---

The Puppet plug-in enables Puppet deployment with Roboconf.  
It uses [Puppet](http://www.puppetlabs.com) to deploy and configure Software on target platforms.

> This plug-in uses Puppet in server-less mode.  
> It means it does not require a Puppet master to work but instead uses "puppet apply".  
> See http://docs.puppetlabs.com/references/3.3.1/man/apply.html

Concretely, this plug-in is in charge of executing a Puppet module during a life cycle step.

> At least one Puppet module must be located in the component's resources directory.

This plug-in is associated with the **puppet** installer name.

	Component_Y {
		alias: an alias;
		installer: puppet;
	}


## Install prerequisites

Puppet has to be installed on every target platform for deployment: on a IaaS, it should be deployed in the
virtual machine image (eg. EC2 AMI or OpenStack snapshot) that contains the Roboconf agent.

> Note that old releases of puppet may not work with Roboconf: the "puppet module" command must be supported.

On Ubuntu systems, the safest way is to install the latest Puppet, as follows:

	sudo apt-get install rubygems
	sudo gem install facter
	sudo gem install puppet

Note you may also use *apt-get install puppet*, but make sure the version on the official repositories is
recent enough.


## Best Practices and Examples

This page will be updated to illustrate the good practices to write a suitable Puppet module for Roboconf.


## Possible Upgrade

This plug-in may extended in the future to also work with a Puppet master.  
Roboconf would then push the configuration to a master which would then propagate it
to other agents.
