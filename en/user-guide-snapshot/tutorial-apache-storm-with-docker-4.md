---
title: "Tutorial - Managing Apache Storm with Roboconf and Docker - 3/5"
layout: page
cat: "ug-snapshot"
id: "tutoriel-apache-storm-et-docker-4"
menus: [ "users", "user-guide", "Snapshot" ]
---

In this third part, you are going to create a new Roboconf application for Storm.
To start easy, we will make simple and deploy locally. A distributed deployment will
come in the last part of this tutorial (for a cloud deployment, as an example).

Let's start by creating a Roboconf project.  
You can use [our Eclipse tooling](eclipse-plugins.html)
([download it here](../download.html)), or you can also create it by hand. The file structure and content are
quite simple. The following pom.xml file (for Maven) will be helpful for the second hypothesis.

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
	<artifactId>dockerized-storm</artifactId>
	<version>1.0-SNAPSHOT</version>
	<packaging>roboconf-app</packaging>
	
	<name>dockerized storm</name>
	<description>An application to deploy a Storm cluster as Docker containers</description>
	
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<timestamp>${maven.build.timestamp}</timestamp>
		<maven.build.timestamp.format>yyyy-MM-dd--HH-mm</maven.build.timestamp.format>
		
		<maven.storm.version>1.1</maven.storm.version>
		<maven.zookeeper.version>3.3</maven.zookeeper.version>
	</properties>
	
	<build>
		<finalName>${project.artifactId}--${project.version}--${timestamp}</finalName>
		<plugins>
			<plugin>
				<groupId>net.roboconf</groupId>
				<artifactId>roboconf-maven-plugin</artifactId>
				<version>0.8</version>
				<extensions>true</extensions>
			</plugin>
		</plugins>
	</build>
	
</project>
```

By using the LAMP example, [these examples](https://github.com/roboconf/roboconf-examples) and 
[the online documentation](user-guide.html),
build a Roboconf graph that defines the various relations you saw previously for Storm.

* Nimbus depends on Zoo Keeper.
* Every worker node depends on the Nimbus.
* Storm's web interface depends on the Nimbus.
* The topology depends on the Nimbus and worker nodes.

> Use **ip** as the variable exported by components.  
> Beyond defining a dependency relation, this infiormation will be used later for configuration files.

Notice we added a dependency relation between the topology and worker nodes. This is because we want
Roboconf to redistribute the topology every time the Storm cluster changes (added or removed workers).

Verify your graph coherence with Roboconf's in-memory target.  
In a scond time, you will add bash recipes, to manage the following life cycle:

* deploy.sh: download the Docker image.
* start.sh: start the container.
* stop.sh: stop the container.
* undeploy.sh: not really useful here.

> To simplify, you can consider there will be only one instance of ZooKeeper and one instance of Nimbus.  
> Use the Docker *links* too. To summer it up, only worker nodes will have dynamic names.

For dynamic names, you can use `${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}`.  
See [this page](using-docker-on-the-agent-side.html) for more details.

Eventually, it is time to test your recipes.  
Modify the deployment target in Roboconf's web console. Add it [the right options](target-in-memory.html)
to execute the real recipes (instead of simulating their execution). Play with instances' life cycle
and verify everything goes well for Storm.

We can now [add a Roboconf command](tutorial-apache-storm-with-docker-5.html)
to automate the addition of worker node.
