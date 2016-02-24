---
title: "Release Management by hand"
layout: page
cat: "dg-snapshot"
id: "release-management-by-hand"
menus: [ "developers", "developer-guide" ]
---

This page explains the detailed procedures to release Maven modules by hand.  
It also shows how to upload Eclipse plug-ins or Debian packages
to [Bintray](https://bintray.com). This is the basis used in the release scripts.

> This page is kept for informational purpose.  
> However, the [releases should be performed with the release scripts](release-management.html).

The prerequisites are the same than those of the release scripts


## Releasing a Maven project

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
6. Specify a path when you upload. **Use the new Roboconf version (e.g. 0.2, 0.3, etc) as the upload path.**
7. Tag the source repository.
8. Add the new update site's location on the web site.


## Releasing the Debian packages

The Debian packages are built with Maven and JDeb.  
However, they are not uploaded on Maven Central. Instead, we upload them on [Bintray](https://bintray.com/roboconf/roboconf-debian-packages).

To upload a new version...

1. Create a new version in the **main** package.
2. Click to upload files.
3. Specify the Debian platform: jessie, whizzy, etc. Ubuntu 14.04 => **jessie**
4. Specify the Debian component: generally, **main**.
5. Specify the architecture: **i386,amd64** (no space)
6. Select the DM's package. **Wait** before saving changes. You must see the underlined indication first!

<img src="/resources/img/upload-debian-packages.png" alt="Upload Debian packages on Bintray" />

Once it is done, save the changes.  
Then, click to upload new files in the same location and proceed the same way for the agent.

Once the upload is done, **publish** your repository. That's it!
