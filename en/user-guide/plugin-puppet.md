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
> See [Puppet's user guide about "apply"](http://docs.puppetlabs.com/references/3.3.1/man/apply.html).

Concretely, this plug-in is in charge of executing a Puppet module during a life cycle step.

> At least one Puppet module must be located in the component's resources directory.

This plug-in is associated with the **puppet** installer name.

	Component_Y {
		installer: puppet;
	}

The module path will automatically be set to the corresponding module path. The value of the MODULEPATH environment 
variable, if present, will be appended to it.

## Install prerequisites

Puppet has to be installed on every target platform for deployment: on a IaaS, it should be deployed in the
virtual machine image (eg. EC2 AMI or OpenStack snapshot) that contains the Roboconf agent.

> Note that old releases of puppet may not work with Roboconf: the "puppet module" command must be supported.

On Ubuntu systems, the safest way is to install the latest Puppet, as follows:

``` properties
# On old versions (instead of ruby): sudo apt-get install rubygems
sudo apt-get install ruby
sudo gem install facter
sudo gem install puppet
```

Note you may also use *apt-get install puppet*, but make sure the version on the official repositories is
recent enough.


## The puppet module

The configuration for the Puppet plug-in must be a valid [Puppet module](http://docs.puppetlabs.com/learning/modules1.html).  
It is also recommended that components and variables be in lowercase characters in the Roboconf model: if not, they will be converted 
to lower case prior to being passed to puppet (works fine, but can be quite confusing for developers).

### Importing external modules

Roboconf provides an equivalent to "puppet module add", so that external modules may be used.
To do so, add a "modules.properties" file in the root directory of you puppet module, that contains one line for each module to import.
The line has the following format : <i>modulename = [version]</i>

For example, to add the "thias-sysctl" module in version 0.3.0, and the "fsalum-redis" module with no version spec:

``` properties
thias-sysctl = 0.3.0
fsalum-redis =
```

### Module content

Suppose an apache+load balancer component, that imports variables from Tomcat instances.  
It may look like this in your graph model.

	Apache {
		installer: puppet;
		imports: Tomcat.portAJP, Tomcat.ip;
	}
	
	Tomcat {
		installer: puppet;
		exports: ip, portAJP = 8009;
	}


Let's have a look at what the module looks like:

* It should be called roboconf\_apache\_module ("roboconf\_" + Component name in LOWER CASE + "\_module"), and can contain manifests, templates or files, like any classical puppet module (e.1g. for a init.pp puppet manifest: roboconf_apache_module/manifests/init.pp).
* In the manifests/ directory, you can either create puppet manifests for each operation of the Roboconf life cycle (deploy.pp, start.pp, stop.pp, update.pp and undeploy.pp), or a single init.pp default manifest (will be used instead of any other missing manifest - eg. if there is no "start.pp", "init.pp" will be used at startup time).
* In the init.pp, the class should have the same name as the module (e.g. class roboconf_apache_module). If specific operation manifests are used (eg. start.pp), the class name should be the operation name in the module (e.g. class roboconf_apache_module::start).

The puppet manifests receive the following variables:

* runningState ("running" for start, "stopped" for stop, and "undef" for other operations)
* importComponent (only upon import add/remove: name of the corresponding component)
* importAdded (value of the new import when one is added)
* importRemoved (value of the removed import if applicable)
* A list of all imports to be taken into account, for each components that we depend on (eg. in the Apache example, there will be a "tomcat" variable, which is a list of all the Tomcat, and for each Tomcat, a hash with its name + the values of (ip, portAJP)).

In our Apache example, the module may look like the following:

	roboconf_apache_module/
	├── files
	│   └── default
	├── manifests
	│   └── init.pp
	└── templates
    	 └── workers.properties.erb

And the init.pp manifest look like this:

``` puppet
class roboconf_apache_module($runningState = undef, $importAdded = undef, $importRemoved = undef, $tomcat = undef) {

	# 'tomcat' is an array of hashes
	# It needs to be declared as the following:
	# $tomcat = {
	#              'tomcat1' => {'ip' => '127.0.0.1', 'portajp' => '8009'},
	#              'tomcat2' => {'ip' => '127.0.0.2', 'portajp' => '8010'}
	#            }
	
	...
}
```

## Possible Upgrade

This plug-in may extended in the future to also work with a Puppet master.  
Roboconf would then push the configuration to a master which would then propagate it to other agents.
