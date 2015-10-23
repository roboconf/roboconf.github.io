---
title: "Openstack Support"
layout: page
cat: "ug-last"
id: "target-iaas-openstack"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for Openstack.  
It only supports the creation of *compute* VMs.

To install it, open the DM's interactive mode and type in...

```properties
# Here in version 0.5
feature:install jclouds-for-roboconf
bundle:install --start mvn:net.roboconf/roboconf-target-iaas-openstack/0.5
```

The implementation can associate a public address to the created VM.  
The behavior depends on the **target.properties** file.
  
> Roboconf keeps memory of the most public address for the created VM.  
> This address will be used by other components which resolve their dependencies through Roboconf.

As an example, if a MySQL server is deployed on OpenStack but only has an internal address (i.e. not
visible the IaaS), then any web application server that uses it will have to be inside the same network.
This can lead to some issues in case of hybrid cloud. For the moment, Roboconf does not check anything 
with respect to this. It is assumed the administrator knows what he does.

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for Openstack
handler = iaas-openstack
name = 
description = 

# The URL of Keystone, Openstack's identity component
openstack.keystone-url = 

# Credentials to connect
openstack.tenant-name = 
openstack.user = 
openstack.password = 

# VM configuration
openstack.image-name = 
openstack.flavor-name = m1.small
openstack.security-group = default
openstack.key-pair = default

# VM networking.
openstack.floating-ip-pool = 
openstack.network-id = 
```

Here is a complete description of the parameters for OpenStack.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| handler | Determines the target handler to use | none, must be "iaas-openstack" | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| openstack.keystone-url | The URL of Keystone, Openstack's *identity* component. The URL of all the other Openstack services will be found through Keystone. | none | yes |
| openstack.tenant-name | The tenant name (not the ID). | none | yes |
| openstack.user | The name of the user to connect. | none | yes |
| openstack.password | The password of the user to connect. | none | yes |
| openstack.image-name | The name of the VM image or snapshot used as a template for the VM. | none | yes |
| openstack.flavor-name | The hardware configuration for new VMs. Example: m1.tiny | none | yes |
| openstack.security-group | The VM security group | default | yes |
| openstack.key-pair | The name of the key pair used to connect to new VMs. | none | yes |
| openstack.floating-ip-pool | A pool of available public IPs, so that one of them be associated to the VM (if no pool is provided, the VM only has a private IP). | none | no |
| openstack.network-id | A neutron (aka quantum) network ID, to use for networking. | none | no |


Notice we do not use image and flavor IDs in our configuration files.  
This is because this IaaS extension is implemented with Apache JClouds which requires region settings when specifying identifiers.

As an example, if you wanted to create a new VM from image ID *abcdef* with a flavor (or hardware) called *m1.small* in Openstack, you
would have a configuration looking-like...

```properties
# ...
openstack.image-id = RegionOne/abcdef
openstack.hardware-id = RegionOne/2
# ... assuming 2 is the ID for flavor m1.small...
# ... and RegionOne is the associated region.
```

Since region settings and hardware ID are not always easy to retrieve, we prefer to rely on names.  
We assume cloud infrastructures will be managed so that these names remain unique. Otherwise, feel free to post a feature request
in our issues tracker.
