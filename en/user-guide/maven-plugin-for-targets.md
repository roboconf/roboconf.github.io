---
title: "Roboconf's Maven plug-in"
layout: page
cat: "ug-last"
id: "maven-plugin-for-targets"
menus: [ "users", "user-guide" ]
---

Here is a sample **pom.xml** file for a Roboconf target project.

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
	<packaging>roboconf-target</packaging>

	<build>
		<plugins>
			<plugin>
				<groupId>net.roboconf</groupId>
				<artifactId>roboconf-maven-plugin</artifactId>
				<version>0.9</version>
				<extensions>true</extensions>
			</plugin>
		</plugins>
	</build>
</project>
```

There are 2 things to notice.

* The **roboconf-target** packaging, which indicates to Maven this is a Roboconf project.
* The **roboconf-maven-plugin** declaration in the **build** section.

The project structure must be the following one.

	- pom.xml
	- src/main/resources/
	** 1 or several properties files

This project should only contain properties files.  
Each one should define a [Roboconf target](about-target-support.html).


## Maven Properties

Filtering is enabled in the Roboconf Maven plug-in.  
It means you can inject Maven properties in your resource files.

Example with the **application.properties** file:

```properties
id = ${project.artifactId}-${project.version}-docker

# Etc.
```


## Maven Goals
  
The plug-in has the following goals.


### validate-target

This goal validates the Roboconf target file(s).  
It is part of the default life cycle for **roboconf-target** projects. You can also invoke it manually.

```tcl
mvn roboconf:validate-target
```


### package

This goal packages a Roboconf target(s) in a ZIP file.  
It has no parameter.

It is part of the default life cycle for **roboconf-app** projects. You can also invoke it manually.

```tcl
mvn package
```

... or the verbose way...


```tcl
mvn roboconf:package-target
```
