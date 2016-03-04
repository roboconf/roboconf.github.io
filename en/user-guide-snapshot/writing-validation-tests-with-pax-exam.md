---
title: "Writing Validation Tests with PAX-Exam"
layout: page
cat: "ug-snapshot"
id: "writing-validation-tests-with-pax-exam"
menus: [ "users", "user-guide", "Snapshot" ]
---

> This page assumes you are familiar with Java development, Maven and JUnit.

[PAX-Exam](https://ops4j1.jira.com/wiki/display/PAXEXAM4/Pax+Exam) is a JUnit extension 
to run JUnit tests in an OSGi environment.  
If you are reluctant to write JUnit tests that mimic the DM, you can instead launch a real
DM (in its Karaf distribution) and configure it programmatically. Then, you can interact
with it with the REST API.

There is an existing Maven module with a Java client for Roboconf's REST API.    
**This client does not support all the RESt API yet**, but feel free to contribute if
necessary.

Notice than there are alternatives to this solution.  
They are listed on the [other tools](other-tools.html) page.


## Create a Maven Project

Create a new Maven project that will contain your validation tests.  
Given the nature of these tests (they need a real deployment target), separating them
from the Roboconf project itself is better.

Use the following POM as a basis.  
It imports the required dependencies.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>

	<groupId>net.roboconf</groupId>
	<artifactId>validation-project-sample-pax</artifactId>
	<name>Roboconf :: Validation Project Sample with PAX-Exam</name>
	<version>1.0-SNAPSHOT</version>
	
	<properties>
		<roboconf.version>%v_SNAP%</roboconf.version>
		<pax.exam.version>4.7.0</pax.exam.version>
		<pax.url.aether.version>2.4.1</pax.url.aether.version>
	</properties>

	<dependencies>

		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-core</artifactId>
			<version>${roboconf.version}</version>
		</dependency>
		
		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-dm-rest-commons</artifactId>
			<version>${roboconf.version}</version>
		</dependency>

		<dependency>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-dm-rest-client</artifactId>
			<version>${roboconf.version}</version>
		</dependency>

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<scope>test</scope>
			<version>4.12</version>
		</dependency>
		
		<!-- Dependencies for pax exam karaf container -->
		
		<dependency>
			<groupId>org.ops4j.pax.exam</groupId>
			<artifactId>pax-exam-container-karaf</artifactId>
			<version>${pax.exam.version}</version>
			<scope>test</scope>
		</dependency>
		
		<dependency>
			<groupId>org.ops4j.pax.exam</groupId>
			<artifactId>pax-exam-junit4</artifactId>
			<version>${pax.exam.version}</version>
			<scope>test</scope>
		</dependency>
		
		<dependency>
			<groupId>org.ops4j.pax.exam</groupId>
			<artifactId>pax-exam</artifactId>
			<version>${pax.exam.version}</version>
			<scope>test</scope>
		</dependency>
		
		<dependency>
			<groupId>org.ops4j.pax.url</groupId>
			<artifactId>pax-url-aether</artifactId>
			<version>${pax.url.aether.version}</version>
			<scope>test</scope>
		</dependency>
		
		<dependency>
			<groupId>javax.inject</groupId>
			<artifactId>javax.inject</artifactId>
			<version>1</version>
			<scope>test</scope>
		</dependency>
		
	</dependencies>
</project>
```

Then, create a **src/test/java** directory.


## Test Sample

A commented code sample seems more appropriated than some bla-bla.  
We could have created a Gist too, but this sample may evolve with versions.

```java
package net.roboconf.sample;

import static org.ops4j.pax.exam.CoreOptions.cleanCaches;
import static org.ops4j.pax.exam.CoreOptions.maven;
import static org.ops4j.pax.exam.karaf.options.KarafDistributionOption.editConfigurationFilePut;
import static org.ops4j.pax.exam.karaf.options.KarafDistributionOption.karafDistributionConfiguration;
import static org.ops4j.pax.exam.karaf.options.KarafDistributionOption.keepRuntimeFolder;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import net.roboconf.core.Constants;
import net.roboconf.core.model.beans.Application;
import net.roboconf.core.model.beans.ApplicationTemplate;
import net.roboconf.dm.rest.client.WsClient;

import org.junit.Assert;
import org.junit.Test;
import org.ops4j.pax.exam.ExamSystem;
import org.ops4j.pax.exam.Option;
import org.ops4j.pax.exam.TestContainer;
import org.ops4j.pax.exam.karaf.container.internal.KarafTestContainer;
import org.ops4j.pax.exam.options.MavenArtifactUrlReference;
import org.ops4j.pax.exam.spi.PaxExamRuntime;

public class SampleTest {

	private static final String ROOT_URL = "http://localhost:8181/roboconf-dm";


	/**
	 * @return the Karaf configuration (OSGi environment configuration)
	 */
	public Option[] config() {

		MavenArtifactUrlReference karafUrl = maven()
				.groupId( "net.roboconf" )
				.artifactId( "roboconf-karaf-dist-dm" )
				.version( "0.7-SNAPSHOT" )
				.type( "tar.gz" );

		// Configure the platform
		List<Option> options = new ArrayList<Option> ();
		options.add( karafDistributionConfiguration()
				.frameworkUrl( karafUrl )
				.unpackDirectory( new File( "target/pax-exam" ))
				.useDeployFolder( false ));

		options.add( cleanCaches( true ));
		options.add( keepRuntimeFolder());

		// Which messaging configuration? Example with RabbitMQ.
		options.add( editConfigurationFilePut(
				"etc/net.roboconf.dm.configuration.cfg",
				Constants.MESSAGING_TYPE,
				"rabbitmq" ));

		return options.toArray( new Option[ options.size()]);
	}


	@Test
	public void runScenario() throws Exception {

		File appDirectory = new File( "my-app-directory" );

		// Prepare to run an agent distribution
		Option[] options = config();
		ExamSystem system = PaxExamRuntime.createServerSystem( options );
		TestContainer container = PaxExamRuntime.createContainer( system );
		Assert.assertEquals( KarafTestContainer.class, container.getClass());

		WsClient client = null;
		try {
			// Start the DM's distribution... and wait...
			container.start();

			// You may to poll for REST services...
			Thread.sleep( 5000 );

			// Build a REST client
			client = new WsClient( ROOT_URL );

			// Perform the checks
			testRestInteractions( appDirectory.getAbsolutePath(), client );

		} finally {
			container.stop();
			if( client != null )
				client.destroy();
		}
	}


	private void testRestInteractions( String appLocation, WsClient client  )
	throws Exception {

		// Load an application template
		Assert.assertEquals( 0, client.getManagementDelegate().listApplicationTemplates().size());
		client.getManagementDelegate().loadApplicationTemplate( appLocation );
		List<ApplicationTemplate> templates = client.getManagementDelegate().listApplicationTemplates();
		Assert.assertEquals( 1, templates.size());

		ApplicationTemplate tpl = templates.get( 0 );
		Assert.assertEquals( "Legacy LAMP", tpl.getName());
		Assert.assertEquals( "sample", tpl.getQualifier());

		// Create an application
		Assert.assertEquals( 0, client.getManagementDelegate().listApplications().size());
		client.getManagementDelegate().createApplication( "app1", tpl.getName(), tpl.getQualifier());
		List<Application> apps = client.getManagementDelegate().listApplications();
		Assert.assertEquals( 1, apps.size());

		Application receivedApp = apps.get( 0 );
		Assert.assertEquals( "app1", receivedApp.getName());
		Assert.assertEquals( "Legacy LAMP", receivedApp.getTemplate().getName());
		Assert.assertEquals( "sample", receivedApp.getTemplate().getQualifier());

		// Etc.
	}
}
```
