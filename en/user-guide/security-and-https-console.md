---
title: "Security: Web Console over HTTPS"
layout: page
cat: "ug-last"
id: "security-and-https-console"
menus: [ "users", "user-guide" ]
---

This page explains how to configure Apache Karaf to secure the web console with HTTPS.


## Updating the Configuration

Open the **org.ops4j.pax.web.cfg** file under Karaf's **etc** directory.  
Add or set the following properties.

```properties
# Default (generated) configuration
javax.servlet.context.tempdir = ...
org.ops4j.pax.web.config.file = ...

# HTTP port
org.osgi.service.http.port = 8181

# Disable HTTP connections
org.osgi.service.http.enabled = false

# Enable SSL
org.osgi.service.http.secure.enabled = true
org.ops4j.pax.web.ssl.keystore = /tmp/keystore/keystore.jks
org.ops4j.pax.web.ssl.password = store-pwd
org.ops4j.pax.web.ssl.keypassword = key-pwd

# HTTPS port (default to 8443)
org.osgi.service.http.port.secure = 9999
```

With such a configuration, the web administration would be available at 
[https://localhost:9999/roboconf-web-administration/index.html](https://localhost:9999/roboconf-web-administration/index.html)
instead of [http://localhost:8181/roboconf-web-administration/index.html](http://localhost:8181/roboconf-web-administration/index.html).

The meaning of the parameters is given below.  
It is taken from [PAX Web's](https://ops4j1.jira.com/wiki/display/paxweb/SSL+Configuration#SSLConfiguration-ssl)
and from [Jetty's](https://wiki.eclipse.org/Jetty/Howto/Secure_Passwords) wikis.

| Parameter | Default | Description |
| --------- | :-----: | :---------- |
| org.osgi.service.http.port | 8080 | The HTTP port. |
| org.osgi.service.http.enabled | true | Whether HTTP connections are enabled. |
| org.osgi.service.http.port.secure | 8443 | The HTTPS port. |
| org.osgi.service.http.secure.enabled | false | Whether HTTPS connections are enabled. |
| org.ops4j.pax.web.ssl.keystore | ${user.home}/.keystore | The path to the key store to be used. |
| org.ops4j.pax.web.ssl.password | - | The password used for key store integrity check. The value can be in plain text or obfuscated ( starting with OBF: ) as described on [Jetty's wiki](https://wiki.eclipse.org/Jetty/Howto/Secure_Passwords). |
| org.ops4j.pax.web.ssl.keypassword | - | The password used for key store. The value can be in plain text or obfuscated ( starting with OBF: ) as described on [Jetty's wiki](https://wiki.eclipse.org/Jetty/Howto/Secure_Passwords). |
| org.ops4j.pax.web.ssl.keystore.type | JKS | The key store type. |
| org.ops4j.pax.web.ssl.clientauthwanted | - | Set to **true** if certificate-based client authentication at the server is **wanted**. |
| org.ops4j.pax.web.ssl.clientauthneeded | - | Set to **true** if certificate-based client authentication at the server is **required**. |


## Creating a Keystore

Although this is not really up to Roboconf to document it, this section may help users to save time.  
First, let's generate a certificate for the server.

```bash
# Choose wherever you want to store your key store
mkdir -p etc/keystores
cd etc/keystores

# Generate it
keytool -genkey -keyalg RSA -alias serverkey -keypass key-pwd -storepass store-pwd -keystore keystore.jks
```

This will generate a keystore.  
You will then need to make ti verify by a certificate authority (CA), such as [Verisign](http://www.verisign.com)
or [Thawte](http://www.thawte.com).

If you only want a certificate for a demo, you can create a self-signed certificate with...

```
keytool -genkey -keyalg RSA -validity 365 -alias serverkey -keypass key-pwd -storepass store-pwd -keystore keystore.jks
```

Fill-in all the required information.

```
Enter keystore password: store-pwd
What is your first and last name?
[Unknown]: development.linagora.com
What is the name of your organizational unit?
[Unknown]: Development
what is the name of your organization?
[Unknown]: Linagora
What is the name of your City or Locality?
[Unknown]: Paris
What is the name of your State or Province?
[Unknown]: Paris
What is the two-letter country code for this unit?
[Unknown]: FR
Is<CN=development.linagora.com, OU=Development, O=Linagora, L=Paris, ST=Paris, 
C=US> correct?
[no]: yes

Enter key password for <client>
    (RETURN if same as keystore password): key-pwd
```

That's it, you have your certificate for the server.  
You may also want to create certificates for clients. Usually, there should be one certificate per client.

```properties
# We generate a new (here, self-signed) certificate
keytool -genkey -keyalg RSA -validity 365 -alias serverkey -keypass key-pwd -storepass store-pwd -keystore client1.jks

# Export it so that we can import it in the server's store
keytool -export -rfc -keystore client1.jks -storepass store-pwd -alias client1key -file client1.cer
keytool -import -trustcacerts -keystore keystore.jks -storepass store-pwd -alias client1key -file client1.cer

# Delete the temporary file
rm client1.cer
```

You can verify the client's certificate was correctly imported by using...

```
keytool -list -v -keystore keystore.jks
```

It should output something like...

```
Alias name: client1key
Creation date: July 17, 2016
Entry type: trustedCertEntry
```

In the scope of this page, the server's certificate is the one to reference in Karaf's **org.ops4j.pax.web.cfg** file.
The client's certificate is the one to use in the client tool, e.g. Mozilla Firefox or Google Chrome.

These pages may also help:

* [Creating a KeyStore in JKS Format, by Oracle](https://docs.oracle.com/cd/E19509-01/820-3503/ggfen/index.html)
* [Enabling HTTPS with Karaf, by Jean-Baptiste Onofré](http://blog.nanthrax.net/2012/12/how-to-enable-https-certificate-client-auth-with-karaf/)
