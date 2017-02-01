---
title: "Security :: SSL and Certificates"
layout: page
cat: "ug-last"
id: "security-ssl-and-certificates"
menus: [ "users", "user-guide" ]
---

Although this is not really up to Roboconf to document it, this page explains how to create key stores
and certificates.

> All of this is written for Linux systems.  
> Windows users will have to look for resources on the web.
  
First, let's generate a certificate for the server.

```bash
# Choose wherever you want to store your key store
mkdir -p etc/keystores
cd etc/keystores

# Generate it
keytool -genkey -keyalg RSA -alias serverkey -keypass key-pwd -storepass store-pwd -keystore keystore.jks
```

This will generate a keystore.

> If you want to use PKCS12 keystore format, add the following option: `-storetype PKCS12`
  
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
keytool -genkey -keyalg RSA -validity 365 -alias client1key -keypass key-pwd -storepass store-pwd -keystore client1.jks

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
