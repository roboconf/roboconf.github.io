---
title: "OSGi Conventions"
layout: page
cat: "dg-snapshot"
id: "osgi-conventions"
menus: [ "developers", "developer-guide" ]
---

This page does not aim at defining OSGi best practices.  
There are enough information on the web about it.

However, there are sometimes several options available and we chose some of them.  
They are listed here and we explain why we made these choices.


## Java Package Names

Maven artifacts IDs and Java packages should match.  
It means we should know which bundle exports a package only from its name.

Module **roboconf-something** should thus have packages that start with **net.roboconf.something**.


## Internal Packages

Packages that aim at NOT being exported should be internal.  
It means their name contains the word **internal**.

With the previous example, internal packages should be located under **net.roboconf.something.internal**.


## Exported Packages

In the past, the development team used several ways to define exported packages in OSGi manifests.  
Some mixed the *Export-Package* and *Private-Package* instructions of the Maven bundle plugin. Some others
only used the *Export-Package* directive. So that we do not introduce errors with small mistakes, and since
package exports used to cause bugs in the past, it is IMPORTANT we all follow the same convention.

1. If a package does not export any package, do not add any *Export-Package* directive in the POM.
2. If a package is exported, the package name MUST end with a wildcard.
3. If a package is exported, you MUST exclude the internal packages too (even if they do not exist).
4. Roboconf bundles should only export one root package (the others are handled with the wildcard).

```xml
<Export-Package>
	!net.roboconf.something.internal.*,
	net.roboconf.something.*
</Export-Package>
```

The reason for these choices is that sometimes, developers add code and packages but do not update
the OSGi metadata. Setting them right from the beginning is the solution.


## iPojo

There are several ways of defining iPojo services and components.  
It can be with Java annotations or with a **metadata.xml** file.

With Roboconf, we have decided to only stick with XML files.  
Indeed, having a single location where iPojo components are defined makes it more simple to find information.
With Java annotations, POJO definitions are spread all around the code.
