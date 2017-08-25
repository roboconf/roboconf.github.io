---
title: "Security :: Web Console over HTTPS"
layout: page
cat: "ug-0-8"
id: "security-and-https-console"
menus: [ "users", "user-guide", "0.8" ]
---

This page explains how to configure Apache Karaf to secure the web console with HTTPS.

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

You can find information about creating a key store on [this page](security-ssl-and-certificates.html).
