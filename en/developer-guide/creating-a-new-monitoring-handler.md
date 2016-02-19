---
title: "Creating a new Monitoring Handler"
layout: page
cat: "dg-snapshot"
id: "creating-a-new-monitoring-handler"
menus: [ "developers", "developer-guide" ]
---

A monitoring handler is an extension for a Roboconf agent's monitoring.  
These handlers are in charge of polling or verifying resources on the agent's machine.
They are used for [autonomic management](../user-guide/autonomic-management-with-roboconf.html).  
Currently available handlers include **file**, **nagios** and **rest**.

A monitoring handler is an OSGi bundle with specific meta-data.  
Roboconf uses [iPojo](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo.html) to simplify OSGi development. 
We also use Maven to develop our modules.

> If you have never worked with OSGi, do not worry.  
> Our design was made to make extensibility easy.

Let's suppose you want to develop a handler working with a custom JMX API.

## The POM

* Create a directory called **roboconf-agent-monitoring-my-jmx**.
* Create a **pom.xml** file and copy the content below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
		xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<groupId>net.roboconf</groupId>
	<artifactId>roboconf-agent-monitoring-my-jmx</artifactId>
	<name>Roboconf :: Agent :: Monitoring with my JMX</name>
	<version>1.0-SNAPSHOT</version>
	<packaging>bundle</packaging>

	<properties>
		<roboconf.version>0.5</roboconf.version>
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
  			<artifactId>roboconf-agent-monitoring-api</artifactId>
  			<version>${roboconf.version}</version>
  			<scope>provided</scope>
		</dependency>
		
		<dependency>
  			<groupId>net.roboconf</groupId>
  			<artifactId>roboconf-messaging-api</artifactId>
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
				<extensions>true</extensions>
				<configuration>
					<instructions>
						<Import-Package>
							net.roboconf.*;version="${version.range}"
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

In the dependencies, you need both **roboconf-core**, **roboconf-agent-monitoring-api** and **roboconf-messaging-api**.  
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

	<component classname="net.roboconf.agent.monitoring.internal.MyJmx" name="roboconf-agent-monitoring-myjmx">
		<provides />
	</component>

	<instance component="roboconf-agent-monitoring-myjmx" name="Roboconf Agent Monitoring - MyJMX" />
</ipojo>
```

This file indicates your bundle provides a **MonitoringHandler** service for a Roboconf's agent.  
More exactly, your bundle defines a component (a Java class) and an instance that will be registered as a service in the OSGi registry.
The iPojo framework ensures us that once you deploy your bundle in an OSGi container with a Roboconf's agent, your service will be
injected and invoked on a regular basis.


## Implementing the Handler

The **metadata.xml** file references a class called **net.roboconf.agent.monitoring.MyJmx**.  
So, you need to create it. Start by creating the Maven structure (**src/main/java** and **src/test/java**).

Here is the skeleton of the class.

```java
package net.roboconf.agent.monitoring.internal;

import java.util.logging.Logger;

import net.roboconf.agent.monitoring.api.IMonitoringHandler;
import net.roboconf.core.model.beans.Instance;
import net.roboconf.messaging.api.messages.from_agent_to_dm.MsgNotifAutonomic;

public class MyJmx implements IMonitoringHandler {

	static final String HANDLER_NAME = "my-jmx";

	private final Logger logger = Logger.getLogger( getClass().getName());
	private String applicationName, scopedInstancePath, eventId;

	@Override
	public String getName() {
		return HANDLER_NAME;
	}

	@Override
	public void setAgentId( String applicationName, String scopedInstancePath ) {
		this.applicationName = applicationName;
		this.scopedInstancePath = scopedInstancePath;
	}

	@Override
	public void reset( Instance associatedInstance, String eventId, String rawRulesText ) {
		this.eventId = eventId;

		// TODO: Extract rules
	}

	@Override
	public MsgNotifAutonomic process() {

		// Build a message, if necessary
		MsgNotifAutonomic result = null;
		return result;
	}
}
```

For the description of the methods, please refer to the Javadoc of the **IMonitoringHandler** interface.

Basically, a Java instance of your handler is injected in the agent's monitoring.  
On a regular basis, the agent will check assertions on the running instances. Provided these instances
are associated with assertions and a handler name, the right handler will be invoked. Context information will
be set (such as the current instance being checked, as well as the assertions), followed by the invocation
of the **run** method.

This method is in charge of verifying the assertions.  
If it fails, it should create a **MsgNotifAutonomic** message, i.e. a notification that will be sent by the agent
to the DM. Sending the message is not the problem of the handler. The handler's responsibility is to decide whether
a message should be created, and if so, with which information.

> Since there is only one class instance of the handler,  
> the implementation must deal with states and resources itself.

As usual, write as many unit tests as possible.

> It is good habit to keep this class in an internal package.  
> By convention, internal packages are generally not exported in OSGi. And Roboconf handlers do not need to export packages.


## Packaging the Handler

To package your plug-in, you simply need to run **mvn clean install** in your plug-in directory.  
You will get a JAR file under the **target** directory. This JAR file can be deployed in any OSGi container or server
where iPojo, the **roboconf-agent-monitoring-api**, **roboconf-messaging-api** **roboconf-core** bundles are already deployed.

If you want to deploy it in the agent's Karaf distribution, simply drop it under the **deploy** directory.  
That's it, your handler is installed and ready to be used by the agent. No additional configuration is required.


## Source Code Hosting

Roboconf's modularity and extensibility allows you to only rely on Maven dependencies at build time.  
There is no need to update Roboconf's POM or its code to plug your own extension. Therefore, you can 
host your source code wherever you want. It can be on another Git repository, on SVN, whatever.

You may also contribute your extension to Roboconf's source code.  
In this case, a fork followed of a pull request is the suitable way to achieve this.
