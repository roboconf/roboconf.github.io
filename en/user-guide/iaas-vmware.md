---
title: "VMWare Support"
layout: page
id: "ug.snapshot.iaas-vmware"
menus: [ "users", "user-guide" ]
---

Roboconf has a IaaS implementation for VMWare.  
It only supports the creation of *compute* VMs.

Sample **iaas.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for VMWare
iaas.type = vmware

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
