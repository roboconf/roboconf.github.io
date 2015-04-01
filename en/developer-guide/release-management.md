---
title: "Release Management"
layout: page
cat: "dg-snapshot"
id: "release-management"
menus: [ "developers", "developer-guide" ]
---

Unlike continuous integration, releases must be performed **locally**.  
Performing a release means running specific Maven commands **on a Git repository**.  
We do not release a single Maven module, but a set of coherent projects. A Git repository defines the bounds of this coherence.

## Prerequisites

1. You must have an account at [Sonatype.org](https://oss.sonatype.org/).
2. You must have been added as a manager on Roboconf @ Sonatype. See [this ticket](https://issues.sonatype.org/browse/OSSRH-11576).
3. You must have a signing key, generated with PGP. See [these instructions](http://central.sonatype.org/pages/working-with-pgp-signatures.html).


## Releasing

* Clone or update the concerned Git repository.  
* Make sure the root POM has a released version as its parent.

	* If the parent is a SNAPSHOT version, release the parent first.

<!-- -->

* Type in **mvn clean**.
* Type in **mvn release:clean**.
* Type in **mvn release:prepare**.

	* You will be asked several questions.
	* You can keep the default values for the versions.
	* The tag names should follow the convention *&lt;git repository name&gt;-&lt;version&gt;*.

Maven will then compile the code, run the tests, **generate javadoc and sources archives** (mandatory to deploy on Maven Central) 
AND **sign** the artifacts (mandatory). It will also update the POM versions and tag the source code in the Git repository.

* Eventually, type in **mvn release:perform**.

	* This will upload the build artifacts to the staging repository.

At this point, the artifacts have not been released.  
They are in the staging repository at [Sonatype.org](https://oss.sonatype.org/). To validate this release, you should...

* ... test it!
* ... test it, again.
* ... connect to [Sonatype.org](https://oss.sonatype.org/) and **close** the staging repository.
* ... make sure no error was found by Sonatype after you closed the staging repository.
* ... **release** the staging repository. This will deploy and synchronize the artifacts with Maven Central.

Reading [this page](http://central.sonatype.org/pages/releasing-the-deployment.html) may help for the last steps.


## Releasing the Eclipse plug-in

The Eclipse plug-in follow a slightly different build process.  
Roughly, we do not use Maven to release it. We must use the Tycho approach, which means...

1. Update the version by hand in the POM.
2. Build locally.
3. Test...
4. Upload the generated update site on [Bintray](https://bintray.com/roboconf/roboconf-eclipse).
5. Make sure that the uploaded archive will be unzipped (there is an option for that). 
6. Tag the source repository.
7. Add the new update site's location on the web site.


## Projects Release

A release involve several source repositories.  
Proceed as described below.

1. Update and tag **roboconf-web-administration**.
2. Release **roboconf-platform**.
3. Release **roboconf-eclipse-plugin**.
4. Release **roboconf-system-installers**.
5. Update the web site (no tag required).
6. Update and tag **roboconf-examples** (no release required).
