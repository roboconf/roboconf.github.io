---
title: "JClouds Support"
layout: page
cat: "ug-snapshot"
id: "target-jclouds"
menus: [ "users", "user-guide", "Snapshot" ]
---

Roboconf has a generic target implementation based on [Apache JClouds](http://jclouds.apache.org).  
For the moment, it only supports the creation of *compute* VMs.

To install it, open the DM's interactive mode and use one of the following options.  
With the [roboconf:target](karaf-commands-for-the-dm.html) command:

```properties
# The version will be deduced automatically by the DM
roboconf:target jclouds
```

Or with the native Karaf commands:

```properties
# Here in version %v_SNAP%
feature:install jclouds-for-roboconf
bundle:install --start mvn:net.roboconf/roboconf-target-jclouds/%v_SNAP%
```

Sample **target.properties**.  
Just copy / paste and edit.

```properties
# Configuration file for JClouds
handler = jclouds
name = 
description = 

# The JClouds provider
jclouds.provider-id = 

# The URL to reach the cloud API
jclouds.endpoint = 

# The credentials to connect
jclouds.identity = 
jclouds.credential = 

# The VM configuration
jclouds.security-group = 
jclouds.image-name =  
jclouds.hardware-name = 
jclouds.key-pair = 
```

Here is a complete description of the parameters for JClouds.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| handler | Determines the target handler to use | none, must be "jclouds" | yes |
| name | A human-readable name for the target | - | no |
| description | A description of the target. | - | no |
| jclouds.provider-id | The ID of the JClouds provider (AWS, Rackspace, etc). | none | yes |
| jclouds.endpoint | The URL to reach the cloud API. | none | yes |
| jclouds.identity | The user name for the cloud API. | none | yes |
| jclouds.credential | The password for the cloud API. | none | yes |
| jclouds.image-name | The name of the template image for new VMs. | none | yes |
| jclouds.security-group | The name of the security group for new VMs. | none | yes |
| jclouds.hardware-name | The hardware configuration to use to create a new VM, e.g. "m1.small". Equivalent to flavor. | none | yes |
| jclouds.key-pair | The name of the key pair used to connect in SSH to newly created VMs. Not all the providers support it. | none | no |


Notice we do not use image and hardware IDs in our configuration files.  
This is because JClouds requires region settings when specifying identifiers.

As an example, if you wanted to create a new VM from image ID *abcdef* with a flavor (or hardware) called *m1.small* in Openstack, you
would have a configuration looking-like...

```properties
# ...
jclouds.image-id = RegionOne/abcdef
jclouds.hardware-id = RegionOne/2
# ... assuming 2 is the ID for flavor m1.small...
# ... and RegionOne is the associated region.
```

Since region settings and hardware ID are not always easy to retrieve, we prefer to rely on names.  
We assume cloud infrastructures will be managed so that these names remain unique. Otherwise, feel free to post a feature request
in our issues tracker.
