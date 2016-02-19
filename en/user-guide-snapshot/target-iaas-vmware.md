---
title: "VMWare Support"
layout: page
cat: "ug-snapshot"
id: "target-iaas-vmware"
menus: [ "users", "user-guide", "Snapshot" ]
---

Roboconf has a target implementation for VMWare.  
It only supports the creation of *compute* VMs.

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-roboconf.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target vmware
```

Or with the native Karaf commands:

```properties
# Here in version %v_SNAP%
bundle:install --start mvn:net.roboconf/roboconf-target-iaas-vmware/%v_SNAP%
```

> VMWare support depends on your version.  
> What will most likely happens is that Roboconf will have several VMWare extensions, one per VMWare version.

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for VMWare
handler = iaas-vmware
name = 
description = 

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
| handler | Determines the target handler to use | none, must be "iaas-vmware" | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| vmware.url | The URL to interact with VMWare's manager. | none | yes |
| vmware.user | The user name to connect. | none | yes |
| vmware.password | The user password to connect. | none | yes |
| vmware.ignorecert| True to ignore the certificate on connection, false otherwise. | false | no |
| vmware.template | The image template to use to create the VM. | none | yes |
| vmware.cluster | The cluster's identifier. | none | yes |
| vmware.vmuser | The user name to connect to the created VM. | none | yes |
| vmware.vmpassword | The password to connect to the created VM. | none | yes |
| vmware.datacenter | The data center's identifier. | default | yes |
