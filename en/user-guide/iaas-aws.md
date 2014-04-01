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
ami.vm.node	= 
vm.instance.type = t1.micro
ssh.key.name = 
security.group.name	= 
```
