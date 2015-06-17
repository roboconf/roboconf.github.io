---
title: "Creating a new Roboconf plug-in"
layout: page
cat: "dg-snapshot"
id: "creating-a-new-roboconf-plugin"
menus: [ "developers", "developer-guide" ]
---

A Roboconf plug-in is an extension for a Roboconf agent.
Currently available plug-ins include **Bash**, **Puppet** and **Logger**.
You may want to read [this page](../user-guide/about-plugins.html) to refresh your memories.

A Roboconf plug-in is an OSGi bundle with specific meta-data.
Roboconf uses [iPojo](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo.html) to simplify OSGi development.
We also use Maven to develop our modules.

> If you have never worked with OSGi, do not worry.
> Our design was made to make extensibility easy.

Let's suppose you want to develop a plug-in for **Chef**.
At the moment this documentation is being written, there is not yet a Roboconf plug-in for [Chef](https://www.getchef.com/chef/).

## The POM

* Create a directory called **roboconf-plugin-chef**.
* Create a **pom.xml** file and copy the content below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project
		xmlns="http://maven.apache.org/POM/4.0.0"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<groupId>net.roboconf</groupId>
	<artifactId>roboconf-plugin-chef</artifactId>
	<name>Roboconf :: Plugin :: Chef</name>
	<version>1.0-SNAPSHOT</version>
	<packaging>bundle</packaging>

	<properties>
		<roboconf.version>0.2</roboconf.version>
	</properties>

	<dependencies>
		<dependency>
  			<groupId>net.roboconf</groupId>
  			<artifactId>roboconf-core</artifactId>
  			<version>${roboconf.version}</version>
  			<scope>provided</scope>
		</dependency>

		<dependency>
  			<groupId>net.roboconf</groupId>
  			<artifactId>roboconf-plugin-api</artifactId>
  			<version>${roboconf.version}</version>
  			<scope>provided</scope>
		</dependency>

		<!-- + All the other dependencies you need. -->
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.felix</groupId>
				<artifactId>maven-bundle-plugin</artifactId>
				<version>2.4.0</version>
				<configuration>
					<instructions>
						<Import-Package>
							net.roboconf.*;version="${roboconf.version}"
						</Import-Package>
						<Embed-Dependency>*;scope=compile|runtime;inline=true;groupId=!net.roboconf</Embed-Dependency>
						<Embed-Transitive>true</Embed-Transitive>
					</instructions>
				</configuration>
			</plugin>

			<plugin>
				<groupId>org.apache.felix</groupId>
				<artifactId>maven-ipojo-plugin</artifactId>
				<version>1.12.0</version>
				<executions>
					<execution>
						<goals>
							<goal>ipojo-bundle</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>
```

The project meta are standard information with Maven.
Notice the **bundle** packaging.

In the dependencies, you need both **roboconf-core** and **roboconf-plugin-api**.
Their scope is **provided** because at runtime, these dependencies are also deployed as OSGi bundles.

The **maven-bundle-plugin** describes the OSGi meta-data for the MANIFEST.
Roughly, we import packages from our Roboconf dependencies. Imports are versioned. It means if several versions of Roboconf
bundles are deployed, we will only import the packages from the bundles with the right version. In addition, this plug-in
embeds its dependencies (except for provided or Roboconf dependencies). As an example, if you use a library, its classes
will be embedded in the bundle with your own classes. The bundle's class loader guarantees there will not be any conflict
with another bundle or another library.

Eventually, the **maven-ipojo-plugin** indicates there additional properties to generate for iPojo.


## iPojo Meta-data

Now that you have created your POM, you need to create a file called **metadata.xml**.
Copy the content below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ipojo
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="org.apache.felix.ipojo http://felix.apache.org/ipojo/schemas/CURRENT/core.xsd"
		xmlns="org.apache.felix.ipojo">

	<component classname="net.roboconf.plugin.chef.internal.PluginChef" name="roboconf-plugin-chef">
		<provides />
	</component>

	<instance component="roboconf-plugin-chef" name="Roboconf Plugin - Chef" />
</ipojo>
```

This file indicates your bundle provides a **PluginInterface** service for a Roboconf's agent.
More exactly, your bundle defines a component (a Java class) and an instance that will be registered as a service in the OSGi registry.
The iPojo framework ensures us that once you deploy your bundle in an OSGi container with a Roboconf's agent, your service will be
injected into the agent.


## Implementing the Plug-in

The **metadata.xml** file references a class called **net.roboconf.plugin.chef.internal.PluginChef**.
So, you need to create it. Start by creating the Maven structure (**src/main/java** and **src/test/java**).

Here is the skeleton of the class.

```java
package net.roboconf.plugin.chef.internal;

import java.util.logging.Logger;

import net.roboconf.core.model.runtime.Import;
import net.roboconf.core.model.runtime.Instance;
import net.roboconf.core.model.runtime.Instance.InstanceStatus;
import net.roboconf.plugin.api.PluginException;
import net.roboconf.plugin.api.PluginInterface;

public class PluginChef implements PluginInterface {

	private final Logger logger = Logger.getLogger( getClass().getName());
	private String agentId;



	@Override
	public String getPluginName() {
		return "chef";
	}


	@Override
	public void setNames( String applicationName, String rootInstanceName ) {
		this.agentId = "'" + rootInstanceName + "' agent";
	}


	@Override
	public void initialize( Instance instance ) throws PluginException {
		String name = instance != null ? instance.getName() : null;
		this.logger.fine( this.agentId + " is initializing the plug-in for " + name + "." );
	}


	@Override
	public void deploy( Instance instance ) throws PluginException {
		String name = instance != null ? instance.getName() : null;
		this.logger.info( this.agentId + " is deploying instance " + name + "." );
	}


	@Override
	public void start( Instance instance ) throws PluginException {
		String name = instance != null ? instance.getName() : null;
		this.logger.info( this.agentId + " is starting instance " + name + "." );
	}


	@Override
	public void update( Instance instance, Import importChanged, InstanceStatus statusChanged ) throws PluginException {
		String name = instance != null ? instance.getName() : null;
		this.logger.info( this.agentId + " is updating instance " + name + "." );
	}


	@Override
	public void stop( Instance instance ) throws PluginException {
		String name = instance != null ? instance.getName() : null;
		this.logger.info( this.agentId + " is stopping instance " + name + "." );
	}


	@Override
	public void undeploy( Instance instance ) throws PluginException {
		String name = instance != null ? instance.getName() : null;
		this.logger.info( this.agentId + " is undeploying instance " + name + "." );
	}
}
```

For the description of the methods, please refer to the Javadoc of the **PluginInterface** interface.

Basically, all the methods are related to a life cycle change on the agent side.
The plug-in name matches the installer name within Roboconf's DSL. If a Roboconf component uses **chef** as its
installer name, then this plug-in will be used.

On the agent, there is no multi-threading for the plug-ins.
Since every action may modify the system and the deployed applications, plug-ins are invoked sequentially by the agent.
And **any long-running operation must be blocking**.

Any critical exception must be wrapped in an instance of **PluginException**.
Eventually, you must know that inside the agent, there will be only instance of your plug-in class. And that it will be reused
during all the time it is deployed. So, be careful with class fields. The class must be implemented in a state-less fashion.

As usual, write as many unit tests as possible.

> It is good habit to keep this class in an internal package.
> By convention, internal packages are generally not exported in OSGi. And Roboconf plug-ins do not need to export packages.


## Packaging the Plug-in

To package your plug-in, you simply need to run **mvn clean install** in your plug-in directory.
You will get a JAR file under the **target** directory. This JAR file can be deployed in any OSGi container or server
where iPojo, the **roboconf-plugin-api** and **roboconf-core** bundles are already deployed.

If you want to deploy it in the agent's Karaf distribution, simply drop it under the **deploy** directory.
That's it, your plug-in is installed and ready to be used by the agent. No additional configuration is required.


## Source Code Hosting

Roboconf's modularity and extensibility allows you to only rely on Maven dependencies at build time.
There is no need to update Roboconf's POM or its code to plug your own extension. Therefore, you can
host your source code wherever you want. It can be on another Git repository, on SVN, whatever.

You may also contribute your extension to Roboconf's source code.
In this case, a fork followed of a pull request is the suitable way to achieve this.
