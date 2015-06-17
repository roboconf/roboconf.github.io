---
title: "Supporting a new Deployment Target"
layout: page
cat: "dg-snapshot"
id: "supporting-a-new-deployment-target"
menus: [ "developers", "developer-guide" ]
---

A deployment target designates a platform or a solution on which Roboconf can deploy Software.  
Currently available targets include cloud infrastructures (Amazon Web Services, Openstack...), **Docker**, etc.
You may want to read [this page](../user-guide/about-target-support.html) to refresh your memories.

A deployment target is supported though an OSGi bundle with specific meta-data.  
Roboconf uses [iPojo](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo.html) to simplify OSGi development. 
We also use Maven to develop our modules.

> If you have never worked with OSGi, do not worry.  
> Our design was made to make extensibility easy.

Let's suppose you want to develop a deployment target for a specific version of **vSphere** (from VM Ware).

## The POM

* Create a directory called **roboconf-target-vsphere**.
* Create a **pom.xml** file and copy the content below.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
		xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<groupId>net.roboconf</groupId>
	<artifactId>roboconf-target-vsphere</artifactId>
	<name>Roboconf :: Target :: vSphere</name>
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
  			<artifactId>roboconf-target-api</artifactId>
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

In the dependencies, you need both **roboconf-core** and **roboconf-target-api**.  
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

	<component classname="net.roboconf.target.vsphere.internal.TargetVSphere" name="roboconf-target-vsphere">
		<provides />
	</component>

	<instance component="roboconf-target-vsphere" name="Roboconf Target - vSphere" />
</ipojo>
```

This file indicates your bundle provides a **TargetHandler** service for Roboconf's DM.  
More exactly, your bundle defines a component (a Java class) and an instance that will be registered as a service in the OSGi registry.
The iPojo framework ensures us that once you deploy your bundle in an OSGi container with Roboconf's DM, your service will be
injected into the DM.


## Implementing the Target Handler

The **metadata.xml** file references a class called **net.roboconf.target.vsphere.internal.TargetVSphere**.  
So, you need to create it. Start by creating the Maven structure (**src/main/java** and **src/test/java**).

Here is the skeleton of the class.

```java
package net.roboconf.target.vsphere.internal;

import java.util.logging.Logger;

import net.roboconf.core.model.runtime.Import;
import net.roboconf.core.model.runtime.Instance;
import net.roboconf.core.model.runtime.Instance.InstanceStatus;
import net.roboconf.plugin.api.PluginException;
import net.roboconf.plugin.api.PluginInterface;

public class TargetVSphere implements TargetHandler {

	private final Logger logger = Logger.getLogger( getClass().getName());


	@Override
	public String getTargetId() {
		return "vsphere";
	}

	@Override
	public String createMachine(
		Map<String, String> targetProperties,
			String messagingIp,
			String messagingUsername,
			String messagingPassword,
			String rootInstanceName,
			String applicationName )
	throws TargetException {

		logger.info( "Creating a new machine." );
		return "the VM's ID";
	}

	@Override
	public void terminateMachine( 
			Map<String,String> targetProperties, 
			String machineId ) 
	throws TargetException {

		logger.info( "Terminating a machine." );
	}

	@Override
	public void configureMachine(
		Map<String,String> targetProperties,
		String machineId,
		String messagingIp,
		String messagingUsername,
		String messagingPassword,
		String rootInstanceName,
		String applicationName )
	throws TargetException {

		logger.info( "Configuring a machine." );
	}


	@Override
	public boolean isMachineRunning( Map<String,String> targetProperties, String machineId )
	throws TargetException {
		return false;
	}
}
```

For the description of the methods, please refer to the Javadoc of the **TargetHandler** interface.

The target ID matches the **target-id** property in **"target.properties** files (**target** installer).  
If a Roboconf component references this target ID, then this bundle will be used.

On the DM, target handlers may be invoked concurrently and from different threads.  

Any critical exception must be wrapped in an instance of **TargetException**.  
Eventually, you must know that inside the DM, there will be only instance of your target handler class. And that it will be reused during all the time it is deployed. So, be careful with class fields. The class must be implemented in a state-less fashion.

As usual, write as many unit tests as possible.

> It is good habit to keep this class in an internal package.  
> By convention, internal packages are generally not exported in OSGi. And Roboconf's target handlers
> do not need to export packages.


## Packaging the Bundle

To package your bundle, you simply need to run **mvn clean install** in your project directory.  
You will get a JAR file under the **target** directory. This JAR file can be deployed in any OSGi container or server
where iPojo, the **roboconf-plugin-api** and **roboconf-core** bundles are already deployed.

If you want to deploy it in the DM's Karaf distribution, simply drop it under the **deploy** directory.  
That's it, your target handler is installed and ready to be used by the DM. No additional configuration is required.


## Source Code Hosting

Roboconf's modularity and extensibility allows you to only rely on Maven dependencies at build time.  
There is no need to update Roboconf's POM or its code to plug your own extension. Therefore, you can 
host your source code wherever you want. It can be on another Git repository, on SVN, whatever.

You may also contribute your extension to Roboconf's source code.  
In this case, a fork followed of a pull request is the suitable way to achieve this.


## Long-Time Running Operations

Creating a machine generally consists in requesting the creation of a machine.  
It may then take time for this operation to complete. It is also the case of machine configuration.
Setting up the network, associating storage... All these operations can be long-running.

The temptation is real about using *Thread.sleep* to wait for a step to complete.  
However, this would not be a good idea, as it would reduce performances in case of many requests.

Roboconf provides an abstract class to handle such operations.  
It is called **net.roboconf.target.api.AbstractThreadedTargetHandler**. To benefit from its feature, make your
target handler extend it and implement a **MachineConfigurator**. A machine configurator is in charge of starting and resuming
configuration steps asynchronously for a given machine. You can find examples of this mechanism in the **EC2** and **Openstack**
target handlers.

> If your target handler needs to perform long-time running operations, consider extending *AbstractThreadedTargetHandler*.
> This will seriously improve performances of your handler.

Because **AbstractThreadedTargetHandler** uses a thread pool executor, you also have to update the iPojo configuration.  
You indeed need to declare **start** and **stop** callbacks in the **metadata.xml** file.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ipojo 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="org.apache.felix.ipojo http://felix.apache.org/ipojo/schemas/CURRENT/core.xsd"
		xmlns="org.apache.felix.ipojo">

	<component classname="net.roboconf.target.vsphere.internal.TargetVSphere" name="roboconf-target-vsphere">
		<provides />
		<callback transition="validate" method="start" />
		<callback transition="invalidate" method="stop" />
	</component>

	<instance component="roboconf-target-vsphere" name="Roboconf Target - vSphere" />
</ipojo>
```
