---
title: "Configuration Files"
layout: page
cat: "ug-0-5"
id: "configuration-files"
menus: [ "users", "user-guide", "0.5" ]
---

## Outline

An application (let's call it *MyApp*) should provide 3 directories.

**descriptor/** contains the main Roboconf configuration file, **application.properties**.  
This file describes the application it self (name, description, location of the main model files...).

**graph/** contains at least one *.graph* file (whose name is specified in **application.properties**).  
Graph files list components and their dependencies (components can be Software components to install, or VMs to deploy on).
**graph/** also contains one sub-directory for each component listed in the graph model.
This sub-directory must contain all the files necessary to deploy the component (e.g. scripts, Software packages, configuration files...)

**instances/** contains an *.instances* file (whose name is specified in **application.properties**).  
This file lists all the initial instances. It means graph components will be pre-instantiated, ready to be deployed.

	MyApp/
	├── descriptor
	│   └── application.properties (main Roboconf configuration file)
	├── graph
	│   ├── *.graph file (describes components and their dependencies)
	│   ├── One directory for each component...
	└── instances
    	└── *.instances (declares instances of components)


## Example

Let's assume you wish to deploy an application called *MyApp*, using bash scripts, on EC2 and OpenStack IaaS.  
Roboconf configuration files should be organized as follows:

	MyApp/
	├── descriptor
	│   └── application.properties
	├── graph
	│   ├── main.graph
	│   ├── VM_EC2
	│   │   └── target.properties (optional)
	│   ├── VM_Openstack
	│   │   └── target.properties (optional)
	│   └── MyApp
	│       ├── files
	│       └── script
	│           ├── deploy.sh
	│           ├── start.sh
	│           ├── stop.sh
	│           └── update.sh
	└── instances
	    └── model.instances (optional)

Content of **application.properties**:

```properties
# Application Descriptor for Roboconf
application-name = MyApp
application-qualifier = sample
application-description = A sample application

application-dsl-id = roboconf-1.0

graph-entry-point = main.graph
instance-entry-point = model.instances
```

Content of **main.graph**:

<pre><code class="language-roboconf">
# My app to deploy on the IaaS
MyApp {
	installer: bash;
	exports: ip;
}

# The VMs where to deploy the Wall application
VM_EC2 {
	installer: target;
	children: MyApp;
}
    
VM_Openstack {
	installer: target;
	children: MyApp;
}
</code></pre>

Content of **model.instances**:

<pre><code class="language-roboconf">
# Deploy on EC2 VM (called VM1)
instance of VM_EC2 {
	name: VM1;
	instance of MyApp {
		name: MyApp_on_EC2;
	}
}
    
# Deploy on Openstack VM (called VM2)
instance of VM_Openstack {
	name: VM2;
	instance of MyApp {
		name: MyApp_on_Openstack;
	}
}
</code></pre>

Content of **VM_EC2/target.properties**:

```properties
# These properties are specific to Amazon Web Services
target.id          = ec2
ec2.endpoint       = eu-west-1.ec2.amazonaws.com
ec2.access.key     = YOUR_EC2_ACCESS_KEY
ec2.secret.key     = YOUR_EC2_SECRET_KEY
ec2.ami            = Your AMI identifier (ami-...)
ec2.instance.type  = t1.micro
ec2.ssh.key        = Your SSH Key
ec2.security.group = Your Security Group
```
