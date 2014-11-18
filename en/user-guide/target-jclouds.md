---
title: "JClouds Support"
layout: page
id: "ug.snapshot.target-jclouds"
menus: [ "users", "user-guide" ]
---

Roboconf has a generic target implementation based on [Apache JClouds](http://jclouds.apache.org).  
For the moment, it only supports the creation of *compute* VMs.

Sample **target.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for JClouds
target.id = jclouds

# The JClouds provider
jclouds.provider-id = 

# The URL to reach the cloud API
jclouds.endpoint = 

# The credentials to connect
jclouds.identity = 
jclouds.credential = 

# The VM configuration
jclouds.image-id = 
jclouds.security-group = 
jclouds.hardware-id = 
jclouds.key-pair = 
```

Here is a complete description of the parameters for JClouds.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| target.id | Determines the target handler to use | none, must be "jclouds" | yes |
| jclouds.provider-id | The ID of the JClouds provider (AWS, Rackspace, etc). | none | yes |
| jclouds.endpoint | The URL to reach the cloud API. | none | yes |
| jclouds.identity | The user name for the cloud API. | none | yes |
| jclouds.credential | The password for the cloud API. | none | yes |
| jclouds.image-id | The ID of the template image for new VMs. | none | yes |
| jclouds.security-group | The name of the security group for new VMs. | none | yes |
| jclouds.hardware-id | The hardware configuration to use to create a new VM. Equivalent to flavor. | none | yes |
| jclouds.key-pair | The name of the key pair used to connect in SSH to newly created VMs. Not all the providers support it. | none | no |
