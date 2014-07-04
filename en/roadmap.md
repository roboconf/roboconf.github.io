---
title: "Roadmap"
layout: page
id: "main.roadmap"
menus: [ "project", "roadmap" ]
---

Roboconf started as a Research prototype and is now under industrialization.  
The roadmap for the next months covers several aspects.

* **Until mid-September**

	* Bundle the DM and the agent in [Karaf](http://karaf.apache.org/) distributions.
	* Use [iPOJO](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo.html) and initialize a service approach.
	* Create system packages (such a Debian packages) to ease installation.
	* Setup a [Maven repository](https://docs.sonatype.org/display/Repository/Sonatype+OSS+Maven+Repository+Usage+Guide) for Roboconf.
	* Complete the **download** section on the web site.
	* Support [Docker](http://www.docker.com/).
	* Write the first tutorial for Roboconf.

* **From mid-September**

	* Add MBeans to monitor Roboconf.
	* Add monitoring support to Roboconf.
	* Create a Maven plug-in to automate validation and build.
	* Create text editors for Roboconf's DSL.
	* Create documentation generators.
	* Add support to execute user scenarios.
	* Setup a repository of reusable recipes and components.

* **For Contributions**

    * Implement a Chef plug-in.
    * Implement a Puppet plug-in for Puppet masters.
    * Implement an ANT plug-in.

No release is planned for the moment.
