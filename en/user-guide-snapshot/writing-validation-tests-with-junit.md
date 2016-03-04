---
title: "Writing Validation Tests with JUnit"
layout: page
cat: "ug-snapshot"
id: "writing-validation-tests-with-junit"
menus: [ "users", "user-guide", "Snapshot" ]
---

> This page assumes you are familiar with Java development, Maven and JUnit.

Sometimes, one may want to automate verifications.  
In particular, it may be convenient to run scenarios in (almost) real situations but for test purpose.
Normally, deploying a Roboconf application is managed through the web console (and/or through Karaf's
command line interface).

But for those who would like to manage this through code, it is possible to use the Roboconf DM's API
directly in JUnit tests. This page describes how to do this.

Notice than there are alternatives to this solution.  
They are listed on the [other tools](other-tools.html) page.


## New Maven Project

Create a new Maven project that will contain your validation tests.  
Given the nature of these tests (they need a real deployment target), separating them
from the Roboconf project itself is better.

Use the following POM as a basis.  
It imports the required Roboconf dependencies.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>

	<groupId>net.roboconf</groupId>
	<artifactId>validation-project-sample-junit</artifactId>
	<name>Roboconf :: Validation Project Sample with JUnit</name>
	<version>1.0-SNAPSHOT</version>
	
	<properties>
		<roboconf.version>0.7-SNAPSHOT</roboconf.version>
	</properties>

	<dependencies>
	
		<!-- Mandatory Dependencies -->
		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-core</artifactId>
			<version>${roboconf.version}</version>
		</dependency>
		
		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-dm</artifactId>
			<version>${roboconf.version}</version>
		</dependency>

		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-target-api</artifactId>
			<version>${roboconf.version}</version>
		</dependency>
		
		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-messaging-api</artifactId>
			<version>${roboconf.version}</version>
		</dependency>
		
		<!--
		Only required if you want the DM's autonomic to send e-mails.
		The "javax.mail.version" property should be found in the Roboconf
		Platform's parent POM.
		 
		<dependency>
			<groupId>com.sun.mail</groupId>
			<artifactId>javax.mail</artifactId>
			<version>${javax.mail.version}</version>
		</dependency>
		-->

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<scope>test</scope>
			<version>4.12</version>
		</dependency>

		<!-- Necessary, although you will not manipulate it. -->
		<dependency>
			<groupId>org.apache.felix</groupId>
			<artifactId>org.apache.felix.ipojo</artifactId>
			<version>1.12.1</version>
		</dependency>
		
		<!-- 
		You will also have to add API implementations.
		Messaging and Targets. Example with the Rabbit MQ implementation
		of Roboconf's messaging API.
		-->
		
		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-messaging-rabbitmq</artifactId>
			<version>${roboconf.version}</version>
		</dependency>
		
		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-target-docker</artifactId>
			<version>${roboconf.version}</version>
		</dependency>
		
	</dependencies>
</project>
```

Then, create a **src/test/java** directory.


## JUnit Test Sample

A commented code sample seems more appropriated than some bla-bla.  
We could have created a Gist too, but this sample may evolve with versions.

```java
package net.roboconf.sample;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import net.roboconf.core.model.beans.ApplicationTemplate;
import net.roboconf.core.model.beans.Instance;
import net.roboconf.core.model.beans.Instance.InstanceStatus;
import net.roboconf.core.model.helpers.InstanceHelpers;
import net.roboconf.core.utils.ProgramUtils;
import net.roboconf.dm.management.ManagedApplication;
import net.roboconf.dm.management.Manager;
import net.roboconf.messaging.rabbitmq.internal.RabbitMqClientFactory;
import net.roboconf.target.docker.internal.DockerHandler;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;

public class SampleTest {

	@Rule
	public TemporaryFolder folder = new TemporaryFolder();
	private Manager manager;


	@Before
	public void prepareManager() throws Exception {

		// Create a new manager.
		this.manager = new Manager();

		// Define where the work directory will be located.
		this.manager.configurationMngr().setWorkingDirectory( this.folder.newFolder());

		// Inject target implementations.
		// Normally, this is managed automatically by our OSGi framework.
		// Here, you have to do this by hand.
		this.manager.targetAppears( new DockerHandler());

		// Set the messaging by hand.
		// Normally, this is managed automatically by our OSGi framework.
		// Here, you have to do this by hand.
		this.manager.addMessagingFactory( new RabbitMqClientFactory());
		
		// Set the messaging type
		manager.setMessagingType( "rabbitmq" );

		// Start the DM.
		this.manager.start();
	}


	@After
	public void stopManager() {

		// Do we need to clean the hosts?
		for( ManagedApplication ma : this.manager.applicationMngr().getManagedApplications()) {
			try {
				this.manager.instancesMngr().undeployAll( ma, null );

			} catch( IOException e ) {
				System.out.println( "Oops, we failed to undeploy application " + ma );
			}
		}

		// Stop the DM.
		this.manager.stop();
	}


	@Test
	public void runScenario() throws Exception {

		// Load an application template.
		File myAppLocation = new File( "whatever.zip" );
		ApplicationTemplate tpl = this.manager.applicationTemplateMngr().loadApplicationTemplate( myAppLocation );

		// Create an application.
		ManagedApplication ma = this.manager.applicationMngr().createApplication( "my-app", "", tpl );

		// Create a deployment target.
		String targetId = this.manager.targetsMngr().createTarget( new File( "my-target.properties" ));

		// Make it the default target for this application.
		this.manager.targetsMngr().associateTargetWithScopedInstance( targetId, ma.getApplication(), null );

		// The application may have inherited target associations from its template.
		// If we want to remove them...
		for( Instance scopedInstance : InstanceHelpers.getAllInstances( ma.getApplication())) {
			String instancePath = InstanceHelpers.computeInstancePath( scopedInstance );
			this.manager.targetsMngr().dissociateTargetFromScopedInstance( ma.getApplication(), instancePath );
		}

		// Perform a full deployment.
		this.manager.instancesMngr().deployAndStartAll( ma, null );

		// This make time!
		for( int i=0; i<10; i++ ) {

			// Are all the instance deployed?
			for( Instance inst : InstanceHelpers.getAllInstances( ma.getApplication())) {
				if( inst.getStatus() != InstanceStatus.DEPLOYED_STARTED )
					break;
			}

			// Wait 5 seconds
			Thread.sleep( 5000 );
		}

		// By the end of the loop, we assume the deployment SHOULD have completed.
		// Verify assertions...
		Assert.assertTrue( true );

		// Run a verification script located under "src/test/resources".
		URL url = getClass().getResource( "/verif.sh" );
		File scriptFile = new File( url.toURI());

		List<String> cmd = Arrays.asList( "/bin/bash", scriptFile.getAbsolutePath());
		File execDir = new File( "." );
		Map<String,String> env = new HashMap<>( 0 );

		ProgramUtils.executeCommand( Logger.getLogger( getClass().getName()), cmd, execDir, env );
	}
}
```

> Notice that for the moment, Roboconf APIs are not yet stable.  
> They will be starting from versions 1.0.
