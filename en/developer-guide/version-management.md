---
title: "Version Management"
layout: page
id: "dg.snapshot.version-management"
menus: [ "developers", "developer-guide" ]
---

This page describes the version policy for Roboconf.  
It is standard with respect to the usage in other open source projets.

* For the moment, Roboconf uses version 0.x.  
It will remain this way until all the main features of Roboconf are **implemented, stable and usable**.
This implies the platform, the tools and the web site.

* Roboconf versions are formed of 2 or 3 digits.  
A version number is built as follows: **major**.**minor**.**maintenance**. The third digit is optional.

* Changing the **major** digit means an incompatible change.  
For users, an incompatible change implies that the configuration files will have to be updated.  
For developers, an incompatible change means we break our API (such as **PluginInterface**, **IaasInterface**, etc).

* Changing the **minor** digit means features were changed but remain compatible with old versions.  
Generally, this is used when new features are added.

* Changing the **maintenance** digit means bugs were fixed.  
A maintenance release does not contain any new feature and is fully compatible with the previously released version.

* Versions whose **maintenance** digit is 0 (zero) can omit it.  
Example: version 1.0.0 is written 1.0. Version 2.4.0 is written 2.4. But version 2.4.1 is 2.4.1.
