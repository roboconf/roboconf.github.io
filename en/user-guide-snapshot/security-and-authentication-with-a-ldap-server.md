---
title: "Security :: LDAP Authentication"
layout: page
cat: "ug-snapshot"
id: "security-and-authentication-with-a-ldap-server"
menus: [ "users", "user-guide", "Snapshot" ]
---

This document explains how Roboconf distributions can be configured for LDAP authentication, using OpenLDAP.


## In Roboconf

Prepare a (blueprint) file with the connection properties.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
		xmlns:jaas="http://karaf.apache.org/xmlns/jaas/v1.1.0"
		xmlns:ext="http://aries.apache.org/blueprint/xmlns/blueprint-ext/v1.0.0">

	<jaas:config name="karaf" rank="1">
		<jaas:module className="org.apache.karaf.jaas.modules.ldap.LDAPLoginModule" flags="required">
			initialContextFactory=com.sun.jndi.ldap.LdapCtxFactory
			connection.username=cn=admin,dc=nodomain
			connection.password=admin
			connection.protocol=
			connection.url=ldap://localhost:389
			user.base.dn=ou=people,dc=nodomain
			user.filter=(uid=%u)
			user.search.subtree=true
			role.base.dn=ou=groups,dc=nodomain
			role.name.attribute=cn
			role.filter=(member:=uid=%u)
			role.search.subtree=true
			authentication=simple
		</jaas:module>
	</jaas:config>
</blueprint>
```

This login module creates a JAAS realm called **karaf**. It overrides the default JAAS realm (used by Karaf)
by using a rank attribute value greater than 0 (the default **karaf** realm has a rank of 0).

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
```

You could also copy the XML file under Karaf's **deploy** directory.  
Or create a Karaf feature that reference the blueprint.

Then, you can verify your users are found...

```
./client -u gibello
```

The client should prompt for the user password.  
The password will be verified against the LDAP server.

> Notice that unlike other modules, the LDAP login module does not provide any command to manage the LDAP server.  
> It means that the administration of the users and roles should be performed directly on the LDAP back-end.

You can find more information (module parameters, SSL connection to the LDAP...) on 
[Karaf's web site](https://karaf.apache.org/manual/latest/#_available_realm_and_login_modules).


## Retry Policies

The number of login attempts must be configured at the LDAP level.  
Roboconf and Karaf do not manage this part.


## Installing a LDAP Server

> This is only a short hint for test purpose.

```bash
# Ubuntu
sudo apt-get install slapd ldap-utils
# (user / pwd dialog: admin / admin)
```

Load standard schemas:

```
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/cosine.ldif
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/nis.ldif
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/inetorgperson.ldif
```

Create a LDIF file (let's call it `backend.ldif`)...

```properties
# File: backend.ldif
# Load dynamic backend modules
dn: cn=module,cn=config
objectClass: olcModuleList
cn: module
olcModulepath: /usr/lib/ldap
olcModuleload: back_hdb

# Database settings
dn: olcDatabase=hdb,cn=config
objectClass: olcDatabaseConfig
objectClass: olcHdbConfig
olcDatabase: {1}hdb
olcSuffix: dc=nodomain
olcDbDirectory: /var/lib/ldap
olcRootDN: cn=admin,dc=nodomain
olcRootPW: secret
olcDbConfig: set_cachesize 0 2097152 0
olcDbConfig: set_lk_max_objects 1500
olcDbConfig: set_lk_max_locks 1500
olcDbConfig: set_lk_max_lockers 1500
olcDbIndex: objectClass eq
olcLastMod: TRUE
olcDbCheckpoint: 512 30
olcAccess: to attrs=userPassword by dn="cn=admin,dc=nodomain" write by anonymous auth by self write by * none
olcAccess: to attrs=shadowLastChange by self write by * read
olcAccess: to dn.base="" by * read
olcAccess: to * by dn="cn=admin,dc=nodomain" write by * read
# End of file backend.ldif
```

Update the values.  

* `dc=nodomain` is for hosts with no qualified domain name.  
Otherwise, here is an example for **example.com**: `dc=example,dc=com`

* Change the *secret* password (`olcRootPW`) if necessary.

Add the file.

```
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f backend.ldif
```

Create a `frontend.ldif` file to declare a user / organization, etc.

```properties
# frontend.ldif file (replace values according to your own setup)
# Create top-level object in domain
dn: dc=nodomain
objectClass: top
objectClass: dcObject
objectclass: organization
o: Linagora
dc: nodomain
description: Linagora company

# Admin user.
dn: cn=admin,dc=nodomain
objectClass: simpleSecurityObject
objectClass: organizationalRole
cn: admin
description: LDAP administrator
userPassword: secret

dn: ou=people,dc=nodomain
objectClass: organizationalUnit
ou: people

dn: ou=groups,dc=nodomain
objectClass: organizationalUnit
ou: groups

dn: uid=gibello,ou=people,dc=nodomain
objectClass: inetOrgPerson
objectClass: posixAccount
objectClass: shadowAccount
uid: gibello
sn: Gibello
givenName: Pierre-Yves
cn: Pierre-Yves Gibello
displayName: Pierre-Yves Gibello
uidNumber: 1000
gidNumber: 1000
userPassword: test
gecos: Pierre-Yves Gibello
loginShell: /bin/bash
homeDirectory: /home/gibello
shadowExpire: -1
shadowFlag: 0
shadowWarning: 7
shadowMin: 8
shadowMax: 999999
shadowLastChange: 10877
mail: pygibello@toto.com
postalCode: 38000
l: Grenoble
o: Linagora
mobile: +33 (0)6 xx xx xx xx
homePhone: +33 (0)5 xx xx xx xx
title: System Administrator
postalAddress:
initials: PYG

dn: cn=example,ou=groups,dc=nodomain
objectClass: posixGroup
cn: gibello
gidNumber: 1000
# End of file frontend.ldif
```

Add the `frontend.ldif` file.

```
sudo ldapadd -x -D cn=admin,dc=nodomain -W -f frontend.ldif
```

Then, check the user was successfully created.

```
ldapsearch -xLLL -b "dc=nodomain" uid=gibello sn givenName cndn: uid=gibello,ou=people,dc=nodomain
```

You can now test you can connect Roboconf's DM to this LDAP.  
For OpenLDAP logs, you can refer to [this tutorial](http://tutoriels.meddeb.net/openldap-log-2/) (in French).
Short answer: `/var/log/slapd.log`
