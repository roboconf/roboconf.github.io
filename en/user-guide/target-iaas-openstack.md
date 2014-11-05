---
title: "OpenStack Support"
layout: page
id: "ug.snapshot.target-iaas-openstack"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for Openstack.  
It only supports the creation of *compute* VMs.

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

``` properties
# Configuration file for Openstack
target.id = openstack

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

# VM networking.
# Use either floatingIpPool for Nova, or networkId / fixedIp for Neutron.
openstack.floatingIpPool = public

# Storage configuration
openstack.volumeId =
openstack.volumeSizeGb =
openstack.volumeMountPoint =
```

Here is a complete description of the parameters for OpenStack.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| target.id | Determines the target handler to use | none, must be "openstack" | yes |
| openstack.identityUrl | URL of the identity server (aka. keystone) | none | yes |
| openstack.computeUrl | URL of the compute service (aka. nova) | none | yes |
| openstack.tenantId | The tenant ID associated to the user to connect | none | yes |
| openstack.user | The name of the user to connect | none | yes |
| openstack.password | The password of the user to connect | none | yes |
| openstack.keypair | The name of the key pair used to connect | none | yes |
| openstack.image | The ID of the VM image or snapshot used as a template for the VM | none | yes |
| openstack.flavor | The VM "size" aka. flavor in Openstack | m1.tiny | no |
| openstack.securityGroup | The VM security group | default | no |
| openstack.floatingIpPool | A pool of available public IPs, so that one of them be associated to the VM (if no pool is provided, the VM only has a private IP). Works only for Nova networking (for Neutron, use networkId / fixedIp instead). | none | no |
| openstack.networkId | A neutron (aka quantum) network ID, to use for networking. If no fixedIp is specified, DHCP will be used to associate an IP from the corresponding network. Works only for Neutron networking (for Nova networking, use floatingIpPool instead). | none | no |
| openstack.fixedIp | When a networkId is specified (Neutron networking), it is possible to select a fixed IP from that network. When no fixedIp is specified, DHCP is used to allocate one dynamically. | none | no |
| openstack.volumeId | The ID or name of a volume to attach to the VM (if no volume is found with the given ID, it will be considered a name). | none | no |
| openstack.volumeSizeGb | The size in GB of the volume to attach (usable only with volumeId set as a volume name: the volume would then be created if not present). | none | no |
| openstack.volumeMountPoint | The mount point of the volume to attach (usable only with volumeId set). Should comply with Openstack volume mount point name conventions (eg. /dev/vdb or /dev/vdc). | /dev/vdb | no |

