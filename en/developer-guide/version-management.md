---
title: "Version Management"
layout: page
cat: "dg-snapshot"
id: "version-management"
menus: [ "developers", "developer-guide", "Snapshot" ]
---

## Roboconf Platform

This page describes the version policy for Roboconf.  
It is standard with respect to the usage in other open source projects.

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


## Roboconf's Relatives

The version management is almost similar for projects that relative to the platform.  
This implies Eclipse tools, the Maven plug-in and so on.

> All the project relatives must have a three-digit version: **major.minor.maintenance**  
> The system installers are the only exception to this rule.

What really matters are the 2 first digits of the platform.  
Project relatives that are associated with a given version must have the same two first digits.
  
Let's see examples.

| Platform version | Relative Version | Comment |
| :---: | :---: | :--- |
| 1.0 | 1.0.0 | The first version of the relative project that works with Roboconf 1.0. |
| 1.0 | 1.0.1 | The first **maintenance** release of the relative that works with Roboconf 1.0. |
| 1.0 | 1.0.2 | The second **maintenance** release of the relative that works with Roboconf 1.0. |
| 1.0.1 | 1.0.2 | The second **maintenance** release of the relative that works with Roboconf 1.0.x. Only bugs were fixed in the Roboconf platform. |
| 1.0.1 | 1.0.3 | The third **maintenance** release of the relative that works with Roboconf 1.0.x. Only bugs were fixed in the Roboconf platform. |

It may happen that a maintenance release of the platform requires a new maintenance release of project relatives.
As an example, fixing a bug in the Maven module **roboconf-core** may impact the Roboconf Maven plug-in and the Roboconf Eclipse plug-ins.
In this case, we will simply release a new maintenance version of these projects. How the maintenance releases are linked will be done 
through the download pages on the web site.

If the platform version 1.0.1 needs the Maven plug-in 1.0.4, they will be mentioned on the same page on the web site.  
This is also why all the releases must appear on the web site. And this is why all the download sections must be archived.


## System Installers

System installers are a little bit different.  
This includes RPM and Debian packages. Their version is made up three parts:

* The platform's version.
* The package's version.
* The version qualifier.

Roughly, the version of a system installer is built as the following concatenation.

```
${platform.version}-${package.version}${version.qualifier}
```

Let's see examples.  

| Version | Platform version | Comment |
| :---: | :---: | :--- |
| 0.6-1.0 | 0.6 | The first package that deploys Roboconf 0.6. |
| 0.6.1-1.0 | 0.6.1 | The first package that deploys Roboconf 0.6.1. |
| 0.6.1-1.1 | 0.6.1 | The first **maintenance** package for Roboconf 0.6.1. Example: there was a bug in the package (but not in the platform). |
| 0.6.1-1.2 | 0.6.1 | The second **maintenance** package for Roboconf 0.6.1.  Example: there was a bug in the package (but not in the platform). |
| 0.6-1.0-SNAPSHOT | 0.6-SNAPSHOT | The first package that deploys Roboconf 0.6-SNAPSHOT. |
| 0.6-2.0 | 0.6 | A full-rewrite of the package for Roboconf. Not likely to happen, but we never know... |

These examples illustrate some rules.

* Snapshot versions of the platform should have their package version set 1.0.
* Platform releases should have their package version set 1.0.
* The only case where a package version is incremented is when **there is a bug** in a system installer (not in the platform).
