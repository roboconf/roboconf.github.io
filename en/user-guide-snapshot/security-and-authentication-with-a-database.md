---
title: "Security :: Authentication with a Database"
layout: page
cat: "ug-snapshot"
id: "security-and-authentication-with-a-database"
menus: [ "users", "user-guide", "Snapshot" ]
---

This document explains how Roboconf distributions can be configured to authenticate users from a database.  
You need a relational database with existing tables.


## Creating the Data Source

Install the JDBC driver for the database.  

```
feature:repo-add mvn:org.ops4j.pax.jdbc/pax-jdbc-features/0.9.0/xml/features
feature:install pax-jdbc-config
feature:install pax-jdbc-mysql
```

You can refer to [PAX's documentation](https://ops4j1.jira.com/wiki/display/PAXJDBC/Documentation) for help about PAX-JDBC.

Then, prepare a configuration file to declare a data source.  
In Roboconf's **etc** directory, create a file named **org.ops4j.datasource-auth.cfg**.  
What is important is that its name begins with **org.ops4j.datasource-**.

```
osgi.jdbc.driver.name = mysql
databaseName = users
serverName = localhost
portNumber = 3306
user = roboconf
password = roboconf
dataSourceName = jdbc/roboconf-auth-db
```

Properties names can be found in the driver's documentation.  
Generic ones are also listed [here](https://osgi.org/javadoc/r4v43/cmpn/org/osgi/service/jdbc/DataSourceFactory.html).

Once saved, you can find your configuration in Karaf's web console, under the **OSGi &gt; Configuration** menu.  
You should also find it as a **javax.sql.DataSource** under the **OSGi &gt; Services** menu.


## Working with a Test (SQL) Database

Create the tables as follows.

```sql
CREATE TABLE users (
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (username)
);

CREATE TABLE roles (
  username varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
  PRIMARY KEY (username,role)
);

INSERT INTO users VALUES ("toto","toto");
INSERT INTO roles VALUES ("toto","admin");
INSERT INTO roles VALUES ("toto","viewer");
```
 

## Creating the REALM

Prepare a (blueprint) file with the connection properties.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
		xmlns:jaas="http://karaf.apache.org/xmlns/jaas/v1.1.0"
		xmlns:ext="http://aries.apache.org/blueprint/xmlns/blueprint-ext/v1.0.0">

	<jaas:config name="karaf" rank="1">
		<jaas:module className="org.apache.karaf.jaas.modules.jdbc.JDBCLoginModule" flags="required">
			datasource = osgi:javax.sql.DataSource/(osgi.jndi.service.name=jdbc/roboconf-auth-db)
			query.password = SELECT password FROM USERS WHERE username=?
			query.role = SELECT role FROM ROLES WHERE username=?
		</jaas:module>
	</jaas:config>
</blueprint>
```

This login module creates a JAAS realm called **karaf**. It overrides the default JAAS realm (used by Karaf)
by using a rank attribute value greater than 0 (the default **karaf** realm has a rank of 0).
Notice that the database and the tables must exist first.

Get the Karaf shell and deploy the *blueprint* in Karaf.  

```properties
# Log into the Karaf shell
./client -u user -p password

# Install the deployer feature
feature:install deployer

# Install it using the blueprint deployer
bundle:install --start blueprint:file:/path/to/blueprint.xml

# Verify it is installed
bundle:list
jaas:realm-list
```

You could also copy the XML file under Karaf's **deploy** directory.  
Or create a Karaf feature that reference the blueprint.

Then, you can verify your users are found...

```properties
# Provided you have a user called "toto" in the "users" table
./client -u toto
```

The client should prompt for the user password.  
The password will be verified against the database.

> Notice that you can configure this module to manage users and roles from the DM.  
> You need to configure the JDBC back-end. Please, refer to 
> [Karaf's web site](https://karaf.apache.org/manual/latest/#_available_realm_and_login_modules) for more details.
