---
title: "Creating a new Messaging Implementation"
layout: page
cat: "dg-snapshot"
id: "creating-a-new-messaging-implementation"
menus: [ "developers", "developer-guide" ]
---

The key part of Roboconf is about notifications.  
This goes through what we call the messaging part of Roboconf. This part is organized as follows.

<img src="/resources/img/roboconf-messaging-apis.png" alt="Diagram explaining the messaging API organization" />
<br /><br />

The business API for the messaging has only one implementation. This implementation
provides an abstraction to simplify messaging implementations. To support a new kind
of messaging solution, one just has to implement a single class and package it as an
iPojo (OSGi) component. The technical API for Roboconf messaging is clearly oriented towards 
the publish / subscribe pattern.

Current implementations include...

* ... **Rabbit MQ**, to interact with a Rabbit MQ server.
* ... **HTTP**, where the DM acts a central hub and interacts with agents trough web sockets.
* ... **in-memory**, which delivers messages between Roboconf components running within the same JVM.

A messaging implementation for Roboconf is an OSGi bundle with specific meta-data.  
Roboconf uses [iPojo](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo.html) to simplify OSGi development. 
We also use Maven to develop our modules.

> If you have never worked with OSGi, do not worry.  
> Our design was made to make extensibility easy.

Let's suppose you want to develop a plug-in for **ActiveMQ**.  
At the moment this documentation is being written, there is not yet a Roboconf plug-in for [ActiveMQ](http://activemq.apache.org/).

> Roboconf has several extension points. Clearly, this is the most complex one.  
> This is because messaging (and dynamic reconfiguration) is a hot topic in the project.


## The POM

* Create a directory called **roboconf-messaging-activemq**.
* Create a **pom.xml** file and copy the content below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
		xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<groupId>net.roboconf</groupId>
	<artifactId>roboconf-messaging-activemq</artifactId>
	<name>Roboconf :: Messaging :: ActiveMQ</name>
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

In the dependencies, you need both **roboconf-core** and **roboconf-messaging-api**.  
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

	<component classname="net.roboconf.messaging.activemq.internal.ActiveMqClientFactory" name="roboconf-messaging-client-factory-activemq" public="false">
		<requires field="httpService" optional="false" />
		<provides />

		<!-- Actiosn to perform on start and stop. -->
		<callback transition="validate" method="start"/>
		<callback transition="invalidate" method="stop"/>

		<!-- 
			Properties that can be updated at runtime.
			When a property is updated, the "reconfigure" method is invoked by iPojo.
		-->
		<properties pid="net.roboconf.messaging.http" updated="reconfigure">
			<property name="net.roboconf.messaging.http.server.port" method="setPort" value="61616" />
			<property name="net.roboconf.messaging.http.server.ip" method="setServerIp" />
		</properties>
	</component>
	
	<!-- And the instance... -->
	<instance component="roboconf-messaging-client-factory-activema" name="Roboconf Messaging - Factory for ActiveMQ" />
</ipojo>
```

This file indicates your bundle provides a **IMessagingClientFactory** service.  
More exactly, your bundle defines a component (a Java class) and an instance that will be registered as a service in the OSGi registry.
The iPojo framework ensures us that once you deploy your bundle in an OSGi container, your factory will be made available for agents and/or
the DM.

It is possible to in-line the iPojo configuration in the POM if you want.  
Take a look at the [maven-ipojo-plugin](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo/apache-felix-ipojo-tools/ipojo-maven-plug-in.html)
for more details.


## Implementing the Messaging Factory

The **metadata.xml** file references a class called **net.roboconf.messaging.activemq.internal.ActiveMqClientFactory**.  
This class is a factory to create messaging clients. It can be used by agents and/or the DM. Clients are not kept forever.
Indeed, the DM or an agent can switch its messaging type. As an example, we could decide to switch (at runtime) from HTTP
to RabbitMQ. This kind of reconfiguration is already supported by the business implementation of the messaging. So, you
do not have to worry about it.

Let's see what such a factory looks like.  
Start by creating the Maven structure (**src/main/java** and **src/test/java**).

Here is the skeleton of the class.

```java
package net.roboconf.messaging.activemq.internal;

import java.util.Map;

import net.roboconf.messaging.api.MessagingConstants;
import net.roboconf.messaging.api.extensions.IMessagingClient;
import net.roboconf.messaging.api.factory.IMessagingClientFactory;
import net.roboconf.messaging.api.reconfigurables.ReconfigurableClient;

public class ActiveMqFactory implements IMessagingClientFactory {

	private static final String MESSAGING_TYPE = "activemq";


	@Override
	public String getType() {
		return MESSAGING_TYPE;
	}


	@Override
	public IMessagingClient createClient( ReconfigurableClient<?> parent ) {
		return new ActiveMqClient();
	}


	// iPojo method
	public void start() throws Exception {
		// The factory "starts".
	}


	// iPojo method
	public void stop() throws Exception {
		// The factory "stops".
	}


	// iPojo method
	public void reconfigure() throws Exception {
		// A field of the factory was updated.
	}


	@Override
	public boolean setConfiguration( Map<String,String> configuration ) {

		boolean valid = MESSAGING_TYPE.equals( configuration.get( MessagingConstants.MESSAGING_TYPE_PROPERTY ));
		if( valid ) {
			// TODO: replace or update messaging clients
			// that were created by this factory.
		}

		return valid;
	}
}
```

For the description of the methods, please refer to the Javadoc of the **IMessagingClientFactory** interface.

Basically, this class only creates messaging clients. It is also in charge of updating or replacing them when the
factory configuration changes or when the DM (or agents) asks to create a new client. This factory will be used whenever
an agent or the DM indicate it uses **activemq** as its messaging type. Notice that this class must support multi-threaded
environments.

Here is a skeleton implementation of the messaging client itself.

```java
package net.roboconf.messaging.activemq.internal;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.logging.Logger;

import net.roboconf.core.model.beans.Application;
import net.roboconf.messaging.api.extensions.IMessagingClient;
import net.roboconf.messaging.api.extensions.MessagingContext;
import net.roboconf.messaging.api.extensions.MessagingContext.RecipientKind;
import net.roboconf.messaging.api.messages.Message;

public class ActiveMqClient implements IMessagingClient {

	private final Logger logger = Logger.getLogger( getClass().getName());
	private LinkedBlockingQueue<Message> messageQueue;
	private boolean connected;


	@Override
	public void setMessageQueue( LinkedBlockingQueue<Message> messageQueue ) {
		this.messageQueue = messageQueue;
	}


	@Override
	public boolean isConnected() {
		return this.connected;
	}


	@Override
	public void setOwnerProperties( RecipientKind ownerKind, String applicationName, String scopedInstancePath ) {
		this.logger.info( "Store information about \"what\" is using this messaging client." );
	}


	@Override
	public void openConnection() throws IOException {
		this.logger.info( "Open a connection to a server, if necessary." );
		this.connected = true;
	}


	@Override
	public void closeConnection() throws IOException {
		this.logger.info( "Close a connection to a server, if necessary." );
		this.connected = false;
	}


	@Override
	public String getMessagingType() {
		return ActiveMqFactory.MESSAGING_TYPE;
	}


	@Override
	public Map<String,String> getConfiguration() {

		Map<String,String> result = new HashMap<> ();
		// put the properties used by this client.

		return result;
	}


	@Override
	public void subscribe( MessagingContext ctx ) throws IOException {
		this.logger.info( "Start listening to a given context." );
	}


	@Override
	public void unsubscribe( MessagingContext ctx ) throws IOException {
		this.logger.info( "Stop listening to a given context." );
	}


	@Override
	public void publish( MessagingContext ctx, Message msg ) throws IOException {
		this.logger.info( "Publish a message to a given context." );
	}


	@Override
	public void deleteMessagingServerArtifacts( Application application )
	throws IOException {
		this.logger.info( "Clean the server artifacts when a given application is deleted." );
	}
}
```

Most of these methods are fairly easy to understand, provided you are familiar with publish/subscribe.
The only information that needs to be explained is the **MessagingContext** class. Roughly, this class
is used to determine what to listen to and what to send messages to. Said differently, this class can be used
to build a topic name.

> There is an abstract implementation for messaging clients where routing is managed by the DM.
> It is used by both the HTTP and in-memory implementations. See **AbstractRoutingClient** in the
> **roboconf-messaging-api**.

As usual, write as many unit tests as possible.

> It is good habit to keep these classes in an internal package.  
> By convention, internal packages are generally not exported in OSGi. And Roboconf plug-ins do not need to export packages.


## Packaging the Plug-in

To package your plug-in, you simply need to run **mvn clean install** in your plug-in directory.  
You will get a JAR file under the **target** directory. This JAR file can be deployed in any OSGi container or server
where iPojo, the **roboconf-messaging-api** and **roboconf-core** bundles are already deployed.

If you want to deploy it in the agent's Karaf distribution, simply drop it under the **deploy** directory.  
That's it, your plug-in is installed and ready to be used by the agent. No additional configuration is required.


## Source Code Hosting

Roboconf's modularity and extensibility allows you to only rely on Maven dependencies at build time.  
There is no need to update Roboconf's POM or its code to plug your own extension. Therefore, you can 
host your source code wherever you want. It can be on another Git repository, on SVN, whatever.

You may also contribute your extension to Roboconf's source code.  
In this case, a fork followed of a pull request is the suitable way to achieve this.
