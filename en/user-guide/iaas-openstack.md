---
title: "Open Stack Support"
layout: page
id: "ug.snapshot.iaas-open-stack"
menus: [ "users", "user-guide" ]
---

Roboconf has a IaaS implementation for Open Stack.  
It only supports the creation of *compute* VMs.

The implementation can associate a public address to the created VM.  
The behavior depends on the **iaas.properties** file.
  
> Roboconf keeps memory of the most public address for the created VM.  
> This address will be used by other components which resolve their dependencies through Roboconf.

As an example, if a MySQL server is deployed on Open Stack but only has an internal address (i.e. not
visible the IaaS), then any web application server that uses it will have to be inside the same network.
This can lead to some issues in case of hybrid cloud. For the moment, Roboconf does not check anything 
with respect to this. It is assumed the administrator knows what he does.

Sample **iaas.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for OpenStack
iaas.type = openstack

# The keystone URL
openstack.identityUrl = 

# The nova URL
openstack.computeUrl = 

# Credentials to connect
openstack.tenantId = 
openstack.user = 
openstack.password = 
openstack.keypair = 

# VM configuration
openstack.image = 
openstack.flavor = m1.small
openstack.securityGroup = default
openstack.floatingIpPool = public
```
