---
title: "Security: User Authentication"
layout: page
cat: "ug-last"
id: "security-and-authentication"
menus: [ "users", "user-guide" ]
---

Roboconf is based on Apache Karaf.  
Therefore, it reuses the security mechanisms available in Karaf.

Apache Karaf uses JAAS to manage realms.  
A realm is a mechanism to authenticate users. It allows to associate a user and a password.
Every realm knows about the roles associated with a given user. A realm relies on a data source.
There are many possible data sources in Karaf, including LDAP registries, databases and even [Apache Syncope](https://syncope.apache.org).


```properties
# Log into Karaf
./client -u user -p password

# List realms
jaas:realm-list
```

In Roboconf 0.8, it displays...

```
Index | Realm Name | Login Module Class Name
-----------------------------------------------------------------------------------
1     | karaf      | org.apache.karaf.jaas.modules.properties.PropertiesLoginModule
2     | karaf      | org.apache.karaf.jaas.modules.publickey.PublickeyLoginModule
3     | karaf      | org.apache.karaf.jaas.modules.audit.FileAuditLoginModule
4     | karaf      | org.apache.karaf.jaas.modules.audit.LogAuditLoginModule
5     | karaf      | org.apache.karaf.jaas.modules.audit.EventAdminAuditLoginModule
```

The **karaf** realm comes with many login modules.

* The **PropertiesLoginModule** uses the **etc/users.properties** file as back-end for users, groups, roles and password.  
This login module authenticates the users and returns the users' roles.

* The **PublickeyLoginModule** is especially used by the SSHd.  
It uses the **etc/keys.properties** file. This file contains the users and a public key associated to each user.

You may want to read these links for more information.  
On Karaf's web site:

* [Users, groups, roles and passwords](https://karaf.apache.org/manual/latest/#_users_groups_roles_and_passwords)
* [Passwords encryption](https://karaf.apache.org/manual/latest/#_passwords_encryption)
* [Available REALM and login modules](https://karaf.apache.org/manual/latest/#_available_realm_and_login_modules)

On Roboconf's web site:

* [Authentication from a properties file](security-and-authentication-with-properties-files.html)
* [Authentication from a LDAP server](security-and-authentication-with-a-ldap-server.html)
* [Authentication from a database](security-and-authentication-with-a-database.html)
