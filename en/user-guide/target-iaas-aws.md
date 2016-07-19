---
title: "Amazon Web Services Support"
layout: page
cat: "ug-last"
id: "target-iaas-aws"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for Amazon Web Services (AWS).  
It only supports the creation of *compute* VMs.

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-roboconf.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target aws
```

Or with the native Karaf commands:

```properties
# Here in version 0.7
bundle:install --start mvn:net.roboconf/roboconf-target-iaas-ec2/0.7
```

Every new VM is associated with a public IP address.  
This address will be used by other components which resolve their dependencies through Roboconf.

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for EC2
handler = iaas-ec2

# Provide a meaningful description of the target
name = 
description = 

# EC2 URL
ec2.endpoint = 

# Credentials to connect
ec2.access.key = 
ec2.secret.key = 

# VM configuration
ec2.ami = 
ec2.instance.type = t1.micro
ec2.ssh.key = 
ec2.security.group =

# Elastic IP address
# ec2.elastic.ip =  

# ec2.availability-zone =

# Block Storage
# ec2.use-block-storage = volume1, volume2
# ec2.ebs-snapshot-id.volume1 = my volume 1
# ec2.ebs-size.volume1 = 4
# ec2.ebs-mount-point.volume1 = /dev/sdf
# ec2.ebs-type.volume1 = gp2
# ec2.ebs-delete-on-termination.volume1 = true
# ec2.ebs-snapshot-id.volume2 = my volume 2
# ec2.ebs-size.volume2 = 2
# ec2.ebs-mount-point.volume2 = /dev/sdg
# ec2.ebs-type.volume2 = gp2
# ec2.ebs-delete-on-termination.volume2 = false
```

It is also possible to define an elastic IP address.  
It is not a good idea to set it in the **target.properties**, although it works.
Indeed, all the VM instances created from this target configuration will try to use the same elastic IP.
Since Amazon does not allow it, only the last created VM will be associated with this IP. 
**It is much better** to define the elastic IP in the instance definition, as shown below.

<pre><code class="language-roboconf">
instance of VM {
	name: VM1;
	data.ec2.elastic.ip: your-elastic-ip;

	# Put children instances next...
}
</code></pre>

> In a general matter, VM instances can inject target parameters through their definitions.  
> These properties must start with "data." followed by the target property.

## General parameters

Here is a description of general parameters for Amazon Web Services.
Block storage parameters are detailed further.

| Property | Description | Default | Mandatory
| --- | --- | --- | --- |
| handler | Determines the target handler to use | none, must be "iaas-ec2" | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| ec2.endpoint | URL of the compute service (eg. eu-west-1.ec2.amazonaws.com)  | none | yes |
| ec2.access.key | Access key defined in your ec2 account | none | yes |
| ec2.secret.key | Secret key defined in your ec2 account | none | yes |
| ec2.ami | The ID of the VM image used as a template for the VM | none | yes |
| ec2.instance.type | The VM "size" aka. instance type or flavor | t1.micro | no |
| ec2.ssh.key | The name of the ssh key used to connect | none | yes |
| ec2.security.group | The VM security group name. *Caution to not set the security group id*. | default | no |
| ec2.elastic.ip | An elastic IP address | none | no |
| ec2.availability-zone | Availability zone for instances and EBS volumes: necessary to reuse volumes (they must be in the same availability zone as instances they are attached to) | none | no |

## Block storage parameters

Roboconf’s EC2 driver allows you to create and attach several volumes to a VM.
Here is a sample that will show you to use this feature.

```properties
# Create two volumes with different properties.
# volume1 and volume2 are only references to block storages in this configuration file.
# They will not appear anywhere in EC2 meta-data.
ec2.use-block-storage = volume1, volume2

# Volume 1
ec2.ebs-snapshot-id.volume1 = my volume 1
ec2.ebs-mount-point.volume1 = /dev/sdf
ec2.ebs-type.volume1 = gp2
ec2.ebs-delete-on-termination.volume1 = true

# Volume 2
# Use default values, except for volume size
ec2.ebs-size.volume2 = 4
ec2.ebs-mount-point.volume2 = /dev/sdg
```

| Property | Description | Default | Mandatory
| --- | --- | --- | --- |
| ec2.use-block-storage | A list of block storage IDs. Items are separated by a comma. | - | no |
| ec2.ebs-snapshot-id. | Snapshot ID for volume, or volume name that can be reused if delete-on-termination is false. Since several Roboconf instances may share the same EC2 configuration, it is strongly recommended to use a template tag to define the name. Two templates tags are currently available. %NAME% will be replaced by the instance name. %APP% will be replaced by the application name. | roboconf-%APP%-%NAME% | no |
| ec2.ebs-delete-on-termination. | Delete volume on instance termination, or not | false | no |
| ec2.ebs-size. | Volume size (Gb) | 2 | no |
| ec2.ebs-mount-point. | Volume mount point | /dev/sdf | no |
| ec2.ebs-type. | Volume type. Can be *standard*, *io1* (Provisioned IOPS - SSD) or *gp2* (General Purpose - SSD). | standard | no |

Notice that when <i>ec2.ebs-delete-on-termination.</i> is <b>false</b>, Roboconf will first search for a volume with this name
and try to reuse it. If it does not exist, or if the volume is supposed to be deleted after VM termination, then Roboconf will create
the volume. This is why persistent block storages should have a unique name in your installation. Roboconf guarantees the uniqueness of the
couple *(application name, root instance name)*. This is why you can use the <b>%APP%</b> and <b>%NAME%</b> tags to generate the volume name.

Notice also that creating a volume only means creating a disk.
Attaching it means linking your server with this disk. So, once your server is up, you should find the disk.
On Linux systems, you can use the following command to list the available disks.

```tcl
sudo fdisk -l
```

If your volumes were never initialized, you might see something like `Disk /dev/sdf doesn't contain a valid partition table`.
It means you need to format the disk and mount it in the system. This is not an operation performed by the IaaS. You have to do
it in your system. For Roboconf, we suggest you create a script that will be invoked at startup to format and mount partitions if necessary.

This last point may be improved in the future.  
Additional information about volumes configuration can be found [here](https://community.hpcloud.com/article/preparing-your-block-storage-volume-use).
