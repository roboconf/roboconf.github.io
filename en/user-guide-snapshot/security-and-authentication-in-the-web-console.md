---
title: "Security :: Authentication in the web console"
layout: page
cat: "ug-snapshot"
id: "security-and-authentication-in-the-web-console"
menus: [ "users", "user-guide", "Snapshot" ]
---

In addition to enabling HTTPS in the web console, it is possible to require
authentication for users. When enabled (on the server side), all the exchanges
with the REST API and Roboconf's web socket will need a security token. The web
console automatically detects when authentication is required, and redirects to a login
page.

By default, authentication is not required.  
To enable it, edit the **etc/net.roboconf.dm.rest.services.configuration.cfg** file.
Here is a list of the available parameters.

* **enable-authentication**: true to enable authentication.
* **authentication-realm**: the [REALM](security-and-authentication.html) used to authenticate users.
* **session-period**: the time during which a session is valid. Use -1 for infinite validity.

The authentication mechanism is managed by Karaf.  
You can use the same realm than for the command line interface, or create a dedicated REALM
for the web console. When a user logs in, the realm validates it and a session is created.

> Sessions are exchanged as a cookie.  
> So, cookies must be enabled in the web browser when using Roboconf's web console.  

Notice however that the server checks the validity of a session on every request.  
Which means that the cookie is just a way of passing the session ID. A session is valid as long as...

* ... it is not outdated by the *session period*.
* ... the user did not log out. 

The session ID is a random string.  
Only the server can associate it with a user name. Passwords are hidden by the realm.

> To prevent "man in the middle" attacks, it is **strongly** recommended
> to associate web authentication with [HTTPS communications](security-and-https-console.html).


## Creating a dedicated REALM

Here is an example of a REALM based on properties files, and dedicated to authentication in the web console.
You can find [other examples on this page](security.html) (for LDAP or database back-ends, as an example). You will
most likely have to adapt them, at least for the REALM name.

Prepare a (blueprint) file with the location of the properties file to use.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
		xmlns:jaas="http://karaf.apache.org/xmlns/jaas/v1.1.0"
		xmlns:ext="http://aries.apache.org/blueprint/xmlns/blueprint-ext/v1.0.0">

	<jaas:config name="roboconf-web-console" rank="1">
		<jaas:module className="org.apache.karaf.jaas.modules.properties.PropertiesLoginModule" flags="required">
			users = ${karaf.etc}/roboconf-users.properties
		</jaas:module>
	</jaas:config>
</blueprint>
```

Create a file named *roboconf-users.properties* under Karaf's **etc** directory.  
Update its content with the following.

```properties
# USER=PASSWORD,ROLE1,ROLE2,...
# USER=PASSWORD,_g_:GROUP,...
# _g_\:GROUP=ROLE1,ROLE2,...
user1 = pwd1
user2 = pwd2
user3 = pwd3
```

Eventually, update the configuration for the REST services
(**etc/net.roboconf.dm.rest.services.configuration.cfg**).

```properties
# Rough configuration
enable-cors = false
enable-authentication = true
authentication-realm = roboconf-web-console
session-period = -1
```

Now, you should be able to authenticate with the credentials defined in this properties file.

> Roles are not yet supported by the web administration and the REST API.
