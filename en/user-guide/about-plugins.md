---
title: "About Roboconf Plug-ins"
layout: page
cat: "ug-snapshot"
id: "about-plugins"
menus: [ "users", "user-guide" ]
---

Roboconf agents use plug-ins to manage the life cycle of instances.  
As a reminder, Roboconf agents are deployed either on VMs, or on devices. In any
case, they are supposed to be deployed remotely with respect to the DM.

An instance represents a concrete Software component, that will interact
with other components deployed with Roboconf.

The life cycle of an instance is composed of the following phases:

* **initialize**: check the pre-requisite are available on the agent's machine.
* **deploy**: receive from the DM the files to deploy and deploy them effectively.
* **start**: start the deployed instance.  
  Imports from other components are resolved.
  Other components are notified that a new instance is running and receive new exports.
* **update**: components this instance depends on have changed. Imports are updated.  
  It may require an update of the configuration files.
* **stop**: stop the deployed instance.  
  Other components are notified an instance is stopped and update their imports.
* **undeploy**: delete the deployment files from the machine.

Notice than independently of this life cycle, the instance is still in the model.  
When an instance is registered in the model but that it is not running or even deployed, it
is marked as **not deployed**. Therefore, you can have pre-defined instances in your application
even if they are not running or deployed.

> A Roboconf plug-in handles the complete life cycle of an instance.  
> It means a plug-in implements all the life cycle steps.

From a concrete point of view, configuring Roboconf plug-ins is what will take most of the time.
Writing the Roboconf model (application description, graph definition and initial instances) is fairly
easy and is achieved quickly. But every plug-in required resources. These resources are located into the
directory associated with a graph component.

As an example, let's assume you have the following component.

	Apache_Load_Balancer {
		installer: puppet;
	}

This implies there will be a directory called **Apache_Load_Balancer** which will contain at least
one Puppet module. The fact it is a Puppet modules is due to the Puppet installer. If we had used the
Bash plug-in, the directory would contain bash scripts. What files are expected depend on the plug-in itself.

Basically, plug-ins are the way Roboconf can be extended.  
Thus, it is possible to write its own plug-ins to integrate and share a given behavior.
