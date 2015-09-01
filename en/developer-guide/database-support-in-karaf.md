---
title: "Database Support in Apache Karaf"
layout: page
cat: "dg-snapshot"
id: "database-support-in-karaf"
menus: [ "developers", "developer-guide" ]
---

From summer 2015, Roboconf is based on Karaf 4.x.  
For the moment, it does not use any database, although such a support has been studied.

For the record, here are the required steps to embed, define and use a database in Roboconf's DM.  
We here assume we want to use a H2 database.


## Complete the Karaf Distribution

Database support goes through PAX-JDBC (which is the new standard way for Karaf 4.x, unlike
Blueprint which was the main option in Karaf 3.x). So, update the **pom.xml** file of the Karaf distribution.
Make sure it installs the following **boot features**...

```xml
<feature>pax-jdbc-config</feature>
<feature>pax-jdbc-h2</feature>
```

## Create a Datasource

Make sure the following file will be added in the **etc** directory of the Karaf distribution.  
This file should be named **org.ops4j.datasource-roboconf-dm.cfg**. What is important is its name begins with
**org.ops4j.datasource-**.

```properties
osgi.jdbc.driver.name = H2
databaseName = roboconf-dm
url = jdbc:h2:${karaf.data}/roboconf-dm-database
user = roboconf
password = roboconf
dataSourceName = roboconf-dm-db
```

## Using it in the DM

First, define a new injected field in the Manager class.

```java
// A javax.sql.DataSource object that will be injected with iPojo.
protected DataSource dataSource;
```

Then, make sure to import the **javax.sql** packages.  
In the POM file, you should see...

```xml
<plugin>
	<groupId>org.apache.felix</groupId>
	<artifactId>maven-bundle-plugin</artifactId>
	<configuration>
		<instructions>
			<Import-Package>
				net.roboconf.*;version="${project.version}",
				javax.sql.*
			</Import-Package>
...
```

Eventually, make the DataSource service (created by PAX-JDBC) injected in the DM by iPojo.  
To achieve it, update the **metadata.xml** file.

```xml
<component classname="net.roboconf.dm.management.Manager" name="roboconf-dm" public="false">
		<requires field="dataSource" optional="false" filter="(dataSourceName=roboconf-dm-db)" />
...
```

That's it.  
PAX-JDBC will create the DataSource and register it as a service. It will also handle reconfiguration.  
And iPojo will inject the service and make it available in the DM. The DM only has to use it to interact with
the database.
