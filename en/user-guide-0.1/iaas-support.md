---
title: "IaaS Support"
layout: page
cat: "ug-0-1"
id: "iaas-support"
menus: [ "users", "user-guide", "0.1" ]
---

Roboconf can deploy an application on various cloud infrastructures (IaaS).
It can even deploy a part of an application on a given IaaS and some other parts on other IaaS.
This makes Roboconf suitable for hybrid deployments. Thus, you can deploy applications in the cloud,
in your (self-hosted) information system or even on embedded systems (connected devices, internet of things...).

> IaaS support is for the moment fairly basic.
> Roboconf only creates *compute VMs*. It is planned to extend this support to storage and other IaaS features
(such as routing, etc).

For every IaaS, the definition follows the same schema. In the graph model, root components are associated with
hardware elements. This can be virtual machines (VMs), existing machines or devices. These root components
should be associated with the **iaas** installer.

When Roboconf will parse the model, it will know recognize this installer and then search for the IaaS configuration.
It means the resources directory associated with this root component must contain a **iaas.properties** file.

	graph
	├── your-graph-model.graph
	├── ...
	└── "root component" directory
	    └── iaas.properties

The IaaS plug-in will analyze the properties and deduce which IaaS is targeted.
It will then pick up the right client library to create the VM. Most of the IaaS implementation
of Roboconf rely on virtual images (or AMI or appliance). It means Roboconf creates a virtual machine
from a template and properties given in the IaaS properties.

**Multi-IaaS** (for hybrid cloud) is handled by defining several root components.
Each one will be associated with various IaaS properties. Thus, to deploy a component *X* on an Open Stack
VM or an AWS VM, you will have the following graph definition.

<pre><code class="language-roboconf">
VM_AWS {
	alias: a VM for AWS;
	children: X;
	installer: iaas;
}

VM_Open_Stack {
	alias: a VM for Open Stack;
	children: X;
	installer: iaas;
}

X {
	# whatever
}
</code></pre>

And the resources directories.

	graph/
	├── your-graph-model.graph
	├── ...
	├── VM_Open_Stack/
	|   └── iaas.properties
	└── VM_AWS/
		└── iaas.properties

Where will be instantiated the *x* component will depend on the definition of initial instances
and of the administrator actions. This graph indicates the component X can be instantiated over a VM
created into Amazon Web Services or into Open Stack. The same mechanism is used to deploy a part of an application
into the cloud and some other parts onto devices or internal systems.
