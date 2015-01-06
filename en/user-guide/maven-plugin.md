---
title: "Roboconf's Maven plug-in"
layout: page
id: "ug.snapshot.maven-plugin"
menus: [ "users", "user-guide" ]
---

Roboconf's Maven plug-in allows to automate some tasks related to Roboconf.  
It also allows a seamless integration with build tools, such as [Jenkins](http://jenkins-ci.org) or [Travis](http://travis-ci.org).

Here is a sample **pom.xml** file for a Roboconf project.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
		xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<prerequisites>
		<maven>3.0.3</maven>
	</prerequisites>
	
	<groupId>net.roboconf</groupId>
	<artifactId>my-project</artifactId>
	<version>1.0-SNAPSHOT</version>
	<name>This is a sample</name>
	<packaging>roboconf-app</packaging>
	
	<build>
		<plugins>
			<plugin>
				<groupId>net.roboconf</groupId>
				<artifactId>roboconf-maven-plugin</artifactId>
				<version>0.2</version>
				<extensions>true</extensions>
			</plugin>
		</plugins>
	</build>
</project>
```

There are 2 things to notice.

* The **roboconf-app** packaging, which indicates to Maven this is a Roboconf project.
* The **roboconf-maven-plugin** declaration in the **build** section.

The project structure must be the following one.

	- pom.xml
	- src/main/model/
	** descriptor/
	** graph/
	** instances/

Basically, this is the usual Roboconf structure, translated into a Maven-like project.  
The plug-ins has the following goals.

* **initialize**: to configure the project (model directory, build output).
* **validate-project**: to validate the project's structure.
* **validate-application**: to validate the Roboconf application.
* **package**: to package a Roboconf application as a ZIP file.
