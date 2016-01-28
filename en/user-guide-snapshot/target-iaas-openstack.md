---
title: "Openstack Support"
layout: page
cat: "ug-snapshot"
id: "target-iaas-openstack"
menus: [ "users", "user-guide", "Snapshot" ]
---

Roboconf has a target implementation for Openstack.  
It only supports the creation of *compute* VMs.

To install it, open the DM's interactive mode and type in...

```properties
# Here in version %v_SNAP%
feature:install jclouds-for-roboconf
bundle:install --start mvn:net.roboconf/roboconf-target-iaas-openstack/%v_SNAP%
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

## General Parameters

Here is a description of the general parameters for OpenStack.  
Block storage is detailed further in the page.

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


## Block Storage

Roboconf's Openstack driver allows you to create and attach several volumes to a VM.  
Here is a sample that will show you to use this feature.

```properties
# Create two volumes with different properties.
# vol1 and vol2 are only references to block storages in this configuration file.
# They will not appear anywhere in Openstack meta-data.
openstack.use-block-storage = vol1, vol2

# Volume 1
openstack.volume-name.vol1 = cache-%APP%-%NAME%
openstack.volume-size.vol1 = 10	# Gb
openstack.volume-mount-point.vol1 = /dev/sdf
openstack.volume-type.vol1 = SSD
openstack.delete-volume-on-termination.vol1 = true 

# Volume 2: use default values, except for the size.
openstack.volume-size.vol2 = 100	# Gb
```

Here are the parameters related to block storage in Openstack.

<table>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
		<th>Mandatory</th>
	</tr>
	<tr>
		<td>openstack.use-block-storage</td>
		<td>A list of block storage IDs. Items are separated by a comma.</td>
		<td>-</td>
		<td>no</td>
	</tr>
	<tr>
		<td>openstack.volume-name.</td>
		<td>
The prefix to indicate the name of a volume. Since several Roboconf instances may share the same 
Openstack configuration, it is <b>strongly</b> recommended to use a template tag to define the name.
Two templates tags are currently available. <b>%NAME%</b> will be replaced by the instance name. <b>%APP%</b>
will be replaced by the application name.
		</td>
		<td>roboconf-%APP%-%NAME%</td>
		<td>no</td>
	</tr>
	<tr>
		<td>openstack.volume-size.</td>
		<td>The prefix to specify the volume's size (in Gb).</td>
		<td>5</td>
		<td>no</td>
	</tr>
	<tr>
		<td>openstack.volume-mount-point.</td>
		<td>The prefix to indicate the mount point of the block storage in the created VM.</td>
		<td>/dev/vdb</td>
		<td>no</td>
	</tr>
	<tr>
		<td>openstack.volume-type.</td>
		<td>
The prefix to indicate the volume type. This depends on your Openstack configuration and of the 
available storages. Example: <i>SSD</i>. To use the default storage type, do not mention this
property or let its value empty.
		</td>
		<td>-</td>
		<td>no</td>
	</tr>
	<tr>
		<td>openstack.delete-volume-on-termination.</td>
		<td>
The prefix to specify whether the volume should be deleted when the VM is terminated. 
If set to true, the volume will be deleted when the VM is killed. Otherwise, it will remain available for future reuse.
		</td>
		<td>no</td>
		<td>false</td>
	</tr>
</table>

Notice that when <i>openstack.delete-volume-on-termination</i> is <b>false</b>, Roboconf will first search for a volume with this name
and try to reuse it. If it does not exist, or if the volume is supposed to be deleted after VM termination, then Roboconf will create
the volume. This is why persistent block storages should have a unique name in your installation. Roboconf guarantees the uniqueness of the
couple *(application name, root instance name)*. This is why you can use the <b>%APP%</b> and <b>%NAME%</b> tags to generate the volume name.
