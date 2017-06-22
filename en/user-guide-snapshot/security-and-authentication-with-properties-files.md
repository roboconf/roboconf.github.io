---
title: "Security :: Authentication based on Properties Files"
layout: page
cat: "ug-snapshot"
id: "security-and-authentication-with-properties-files"
menus: [ "users", "user-guide", "Snapshot" ]
---

This document explains how Roboconf distributions can be configured to authenticate users from a properties file.  

All that you need is creating a REALM to replace the default one.  
Prepare a (blueprint) file with the location of the properties file to use.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
		xmlns:jaas="http://karaf.apache.org/xmlns/jaas/v1.1.0"
		xmlns:ext="http://aries.apache.org/blueprint/xmlns/blueprint-ext/v1.0.0">

	<jaas:config name="karaf" rank="1">
		<jaas:module className="org.apache.karaf.jaas.modules.properties.PropertiesLoginModule" flags="required">
			users = ${karaf.etc}/users.properties
		</jaas:module>
	</jaas:config>
</blueprint>
```

This login module creates a JAAS realm called **karaf**. It overrides the default JAAS realm (used by Karaf)
by using a rank attribute value greater than 0 (the default **karaf** realm has a rank of 0).

The content of the file should follow the one of the default **etc/users.properties**.  
We here quote the header documentation.

```properties
# This file contains the users, groups, and roles.
# Each line has to be of the format:
#
# USER=PASSWORD,ROLE1,ROLE2,...
# USER=PASSWORD,_g_:GROUP,...
# _g_\:GROUP=ROLE1,ROLE2,...
#
# All users, groups, and roles entered in this file are available after Karaf startup
# and modifiable via the JAAS command group. These users reside in a JAAS domain
# with the name "karaf".

karaf = karaf,_g_:admingroup
toto = toto,_g_:admingroup
_g_\:admingroup = group,admin,manager,viewer,systembundles
```

> Roles are arbitrary and can be referenced in many locations.  
> The only exception is the web console. Only the **admin** role can access it (hard-coded in the web console).

Update and save the file.  
Like very often with Karaf and Roboconf, this file can be changed at runtime, without restarting.  
Then, get the Karaf shell and deploy the *blueprint* in Karaf.  

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
# Provided you have a user called "toto" in the file
./client -u toto
```

The client should prompt for the user password.  
The password will be verified against the properties file.

> Notice that you can configure this module to manage users and roles from the DM's CLI.  
> You need to configure the properties back-end. Please, refer to 
> [Karaf's web site](https://karaf.apache.org/manual/latest/#_available_realm_and_login_modules) for more details.


## Encrypting Passwords

If you do not want to let your passwords in clear, it is possible to encrypt them directly in Roboconf.  
The following lines are borrowed from [Karaf's web site](https://karaf.apache.org/manual/latest/#_passwords_encryption).


> By default, the passwords are stored in clear form in the **etc/users.properties** file.  
> It is possible to enable encryption in the **etc/org.apache.karaf.jaas.cfg** configuration file:

```properties
#
# Boolean enabling / disabling encrypted passwords
#
encryption.enabled = false

#
# Encryption Service name
#   the default one is 'basic'
#   a more powerful one named 'jasypt' is available
#       when installing the encryption feature
#
encryption.name =

#
# Encryption prefix
#
encryption.prefix = {CRYPT}

#
# Encryption suffix
#
encryption.suffix = {CRYPT}

#
# Set the encryption algorithm to use in Karaf JAAS login module
# Supported encryption algorithms follow:
#   MD2
#   MD5
#   SHA-1
#   SHA-256
#   SHA-384
#   SHA-512
#
encryption.algorithm = MD5

#
# Encoding of the encrypted password.
# Can be:
#   hexadecimal
#   base64
#
encryption.encoding = hexadecimal
```

> If the encryption.enabled property is set to true, the password encryption is enabled.  
> With encryption enabled, the password are encrypted at the first time an user logs in. 
> The encrypted passwords are prefixed and suffixed with \{CRYPT\}. To re-encrypt the password, 
> you can reset the password in clear (in **etc/users.properties** file), without the \{CRYPT\} prefix and suffix. 
> Apache Karaf will detect that this password is in clear (because it’s not prefixed and suffixed with \{CRYPT\}) and encrypt it again.

The **etc/org.apache.karaf.jaas.cfg** configuration file allows you to define advanced encryption behaviors.

| Property | Description | Possible Values | Default Value |
| -------- | ----------- | --------------- | ------------- |
| encryption.prefix | Define the prefix to "flag" a password as encrypted. | - | \{CRYPT\} |
| encryption.suffix | Define the suffix to "flag" a password as encrypted. | - | \{CRYPT\} |
| encryption.algorithm | Define the algorithm to use for encryption (digest). | MD2, MD5, SHA-1, SHA-256, SHA-384, SHA-512 | MD5 |
| encryption.encoding | Define the encoding of the encrypted password. | hexadecimal or base64 | hexadecimal |
