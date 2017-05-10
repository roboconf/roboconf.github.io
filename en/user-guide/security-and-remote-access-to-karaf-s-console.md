---
title: "Security :: Remote Access to Karaf's Console"
layout: page
cat: "ug-last"
id: "security-and-remote-access-to-karaf-s-console"
menus: [ "users", "user-guide" ]
---

Roboconf agents use the same basis than the DM: [Apache Karaf](http://karaf.apache.org).  
So, they should follow the same principles to be secured.


## Remote Connection

There are two ways to connect to a remote Karaf distribution.  
The first one is to directly connect in SSH.

```properties
# 8101 is the default SSH port
# karaf/karaf is the default user/password
ssh -p 8101 karaf@host
```

This command asks for a password.  
Another solution is to connect to the machine with SSH, and then connect to the Karaf console.

```properties
# Once connected in SSH to the machine,
# go into Karaf's bin directory
./client -u karaf
```

However, this default configuration is known from everybody.  
Besides, the following command...

```
./client -a 8101
```

... allows you to connect to the console without a password.  
To prevent that, you **must** customize the SSH configuration.


## Change the Default Key

This section is taken from [Christian Schneider's blog](http://www.liquid-reality.de/display/liquid/2014/01/08/How+to+hack+into+any+default+apache+karaf+installation).

> The client command has a built in ssh private key which is used when connecting to karaf.
> There is a config **etc/keys.properties** in karaf which defines the public keys that are allowed to connect to karaf.

The default key is known from everybody.  
So, anyone with SSH access to the machine can log into Karaf's console.

The solution is to replace the key in **etc/keys.properties**.  
This file lists the keys allowed to connect. They follow the syntax `user=key,role`.
Please, refer to [Karaf's documentation](https://karaf.apache.org/manual/latest/#_managing_authentication_by_key) about it.

The global idea is to generate a key pair (`ssh-keygen -t dsa -f karaf.id_dsa -N karaf`).  
Copy the public key in **etc/keys.properties** and use the private key when connecting with SSH.

```properties
# karaf.id_dsa contains the private key
ssh -p 8101 -i ~/karaf.id_dsa karaf@host
```


## Change the Default User

By default, users are defined in **etc/users.properties**.  
There are solutions to [authenticate users from other sources](security-and-authentication.html).

However, if you keep the properties definition, you can edit users in the **etc/users.properties** file.  
Please, refer to [this page](security-and-authentication-with-properties-files.html) for more details about users management in properties files.


## Change the SSH Configuration in Karaf

SSH properties are located in **etc/org.apache.karaf.shell.cfg**.  
You can change the port (8101 by default) and related properties.
