---
title: "Security: LDAP authentication"
layout: page
cat: "ug-snapshot"
id: "security-and-ldap"
menus: [ "users", "user-guide", "Snapshot" ]
---

This document explains how Roboconf DM can be configured for LDAP authentication, using OpenLDAP.

**OpenLDAP installation and configuration**

```
sudo apt-get install slapd ldap-utils
(user / pwd dialog: admin / admin).
```

Load standard schemas:

```
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/cosine.ldif
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/nis.ldif
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f /etc/ldap/schema/inetorgperson.ldif
```

LDIF file to add (replace "dc=nodomain" - for hosts with no FQDN - with adequate value if applicable, eg. "dc=example,dc=com" for FQDN example.com).
Also change the "secret" password (olcRootPW) if needed.

To add the file (let's call it backend.ldif):

```
sudo ldapadd -Y EXTERNAL -H ldapi:/// -f backend.ldif
```

```
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

Create a "frontend.ldif" file to declare a user / organization etc...

```
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
mail: pygibello@linagora.com
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

To add the frontend.ldif file:

```
sudo ldapadd -x -D cn=admin,dc=nodomain -W -f frontend.ldif
```

Then to check the user is created:

```
ldapsearch -xLLL -b "dc=nodomain" uid=gibello sn givenName cndn: uid=gibello,ou=people,dc=nodomain
```

OpenLDAP logs:
http://tutoriels.meddeb.net/openldap-log-2/
(/var/log/slapd.log)

**Roboconf**

In karaf shell:

```
feature:install deployer
```

File to copy in deploy/ directory:

```
<?xml version="1.0" encoding="UTF-8"?>
<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
  xmlns:jaas="http://karaf.apache.org/xmlns/jaas/v1.1.0"
  xmlns:ext="http://aries.apache.org/blueprint/xmlns/blueprint-ext/v1.0.0">

  <jaas:config name="karaf" rank="1">
    <jaas:module className="org.apache.karaf.jaas.modules.ldap.LDAPLoginModule"
                 flags="required">
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

To test (from bin/ directory):

```
./client -u gibello
```

(the client should prompt for user password, "test" as defined in the LDIF above).
