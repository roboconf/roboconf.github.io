---
title: "VMWare Support"
layout: page
cat: "ug-0-1"
id: "iaas-vmware"
menus: [ "users", "user-guide", "0.1" ]
---

Roboconf has a IaaS implementation for VMWare.  
It only supports the creation of *compute* VMs.

> VMWare support depends on your version.  
> What will most likely happens is that Roboconf will have several VMWare extensions, one per VMWare version.

Sample **iaas.properties**.  
Just copy / paste and edit.

```properties
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

Here is a complete description of the parameters for OpenStack.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| target.id | Determines the target handler to use | none, must be "iaas-vmware" | yes |
| vmware.url | The URL to interact with VMWare's manager. | none | yes |
| vmware.user | The user name to connect. | none | yes |
| vmware.password | The user password to connect. | none | yes |
| vmware.ignorecert| True to ignore the certificate on connection, false otherwise. | false | no |
| vmware.template | The image template to use to create the VM. | none | yes |
| vmware.cluster | The cluster's identifier. | none | yes |
| vmware.vmuser | The user name to connect to the created VM. | none | yes |
| vmware.vmpassword | The password to connect to the created VM. | none | yes |
| vmware.datacenter | The data center's identifier. | default | yes |
