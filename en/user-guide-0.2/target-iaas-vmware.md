---
title: "VMWare Support"
layout: page
id: "ug.0.2.target-iaas-vmware"
menus: [ "users", "user-guide", "0.2" ]
---

Roboconf has a target implementation for VMWare.  
It only supports the creation of *compute* VMs.

To install it, open the DM's interactive mode and type in...

```properties
# Here in version 0.2
bundle:install mvn:net.roboconf/roboconf-target-iaas-vmware/0.2
bundle:start <bundle-id>
```

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
