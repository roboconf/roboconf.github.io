---
title: "VMWare Support"
layout: page
id: "ug.snapshot.target-iaas-vmware"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for VMWare.  
It only supports the creation of *compute* VMs.

Sample **target.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for VMWare
target.id = iaas-vmware

# REST URL
vmware.url = 

# Credentials to connect
vmware.user	= 
vmware.password	= 
vmware.ignorecert = true

# Cluster information
vmware.datacenter = 
vmware.cluster = 
vmware.vmuser = 
vmware.vmpassword = 

# VM configuration
vmware.template =  
```
