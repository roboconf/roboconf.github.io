---
title: "Amazon Web Services Support"
layout: page
id: "ug.snapshot.iaas-aws"
menus: [ "users", "user-guide" ]
---

Roboconf has a IaaS implementation for Amazon Web Services (AWS).  
It only supports the creation of *compute* VMs.

Every new VM is associated with a public IP address.  
This address will be used by other components which resolve their dependencies through Roboconf.

Sample **iaas.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for EC2
iaas.type = ec2

# EC2 URL
ec2.endpoint = 

# Credentials to connect
ec2.access.key = 
ec2.secret.key = 

# VM configuration
ec2.ami	= 
ec2.instance.type = t1.micro
ec2.ssh.key = 
ec2.security.group	= 
```

Here is a complete description of the parameters for Amazon Web Services.

| Property | Description | Default | Mandatory
| --- | --- | --- | --- |
| iaas.type | Determines the IaaS plugin to be used | none, must be "ec2" | yes |
| ec2.endpoint | URL of the compute service (eg. eu-west-1.ec2.amazonaws.com)  | none | yes |
| ec2.access.key | Access key defined in your ec2 account | none | yes |
| ec2.secret.key | Secret key defined in your ec2 account | none | yes |
| ec2.ami | The ID of the VM image used as a template for the VM | none | yes |
| ec2.instance.type | The VM "size" aka. instance type or flavor | t1.micro | no |
| ec2.ssh.key | The name of the ssh key used to connect | none | yes |
| ec2.security.group | The VM security group | default | no |
