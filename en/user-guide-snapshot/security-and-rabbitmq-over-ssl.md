---
title: "Security :: RabbitMQ over SSL"
layout: page
cat: "ug-snapshot"
id: "security-and-rabbitmq-over-ssl"
menus: [ "users", "user-guide", "Snapshot" ]
---

This page explains how to configure RabbitMQ and Roboconf to work together with SSL.  
It is assumed you are already familiar with [SSL and certificates](security-ssl-and-certificates.html).
You can also read this [good article](http://javarevisited.blogspot.fr/2012/09/difference-between-truststore-vs-keyStore-Java-SSL.html)
about the concepts used with Java certificates (mainly key stores and trust stores).
[This web page](https://www.javacodegeeks.com/2014/07/java-keystore-tutorial.html#self) may help too.

> We **strongly recommend** you to read [RabbitMQ's SSL documentation](https://www.rabbitmq.com/ssl.html) first.


## Configuring RabbitMQ

This chapter is a short-hand version to configure RabbitMQ.  
A longer version is available on [RabbitMQ's web site](https://www.rabbitmq.com/ssl.html).

> Verify your Erlang version.  
> As this page is written, it is recommended to use OTP 19 and higher as older versions
> contain vulnerabilities related to SSL. 

* Start by creating / getting a key store.  
Be careful, the key store must use **PKCS12**.
* Generate a certificate for the server (RabbitMQ).
* Edit the configuration file for RabbitMQ.

On Debian systems, this file is located under `/etc/rabbitmq/rabbitmq.config`.  
Please, refer to [RabbitMQ's web site](https://www.rabbitmq.com/configure.html#configuration-file)
for more details about this configuration file. By default, this file does not exist.
You have to create it. This is where you can specify the port and SSL options.

```erl
%% Disable SSLv3.0 and TLSv1.0 support.
[
  {rabbit,
      [{tcp_listeners, [5672]},
       {ssl_listeners, [5671]},
       {ssl_options, [
           {cacertfile,"/path/to/testca/cacert.pem"},
           {certfile,"/path/to/server/cert.pem"},
           {keyfile,"/path/to/server/key.pem"},
           {verify,verify_peer},
           {fail_if_no_peer_cert,true},
           {versions, ['tlsv1.2', 'tlsv1.1']}
       ]}
   ]}
].
```

All the SSL options can be found on [Erlang's web site](http://erlang.org/doc/man/ssl.html).  
The main ones are:

* **cacertfile**: the path to the certificate authority.
* **certfile**: the path to the key store (that contains user certificates).
* **keyfile**: the path to the file containing the user's private PEM-encoded key.
* **password**: the user's password (used only if the private key file is password-protected).
* **versions**: the supported protocol versions. Some versions are vulnerable (SSLv3, TLS 1.0).
* **verify**: whether the server should request a certificate from clients.
* **fail_if_no_peer_cert**: when true, the client must a valid (and non-empty) certificate. When false, the client
must have a valid certificate or an empty one (which is considered as valid).

Once configured, restart your RabbitMQ server.  
On Debian systems, type in `sudo /etc/init.d/rabbitmq restart`.


## Configuring Roboconf

On Roboconf, all the configuration is made in its **etc/net.roboconf.messaging.rabbitmq.cfg** file.  
Add or complete the following properties (they are all prefixed with `net.roboconf.messaging.rabbitmq.`).

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| ssl.use | True to enable SSL connections with RabbitMQ. | false | no |
| ssl.protocol | The SSL protocol. | TLSv1.1 | no |
| ssl.pass.as.user.data | True if the DM should send the SSL configuration to agents (through user data). If false, it is considered agents already have all the configuration on their machine (located in the image). | true | no |
| ssl.key.store.path | The path to the key store, on the DM's machine. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | - | yes |
| ssl.key.store.passphrase | The pass phrase for the key store. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | - | yes |
| ssl.key.store.type | The type for the key store. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | PKCS12 | no |
| ssl.trust.store.path | The path to the trust store, on the DM's machine. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | - | yes |
| ssl.trust.store.passphrase | The pass phrase for the trust store. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | - | yes |
| ssl.trust.store.type | The type for the trust store. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | JKS | no |
| ssl.key.manager.factory | The factory for key managers. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | SunX509 | no |
| ssl.trust.manager.factory | The factory for trust managers. Not sent to agents by the DM if **ssl.pass.as.user.data** is false. | SunX509 | no |

> Also, make sure to update the **message-server-ip** property: `<ip>:<ssl_port>`

By default, the SSL configuration is passed to agents through user data.  
It allows to dynamically pass the configuration. However, it also means that any application co-located with agents could retrieve this configuration.
Indeed, user data are generally not protected and any application on the remote machine can use them.

There are two workarounds for this.  
All of them imply setting **ssl.pass.as.user.data** to **false** and passing the configuration in another way.

* Add the SSL configuration directly in the agent's image.  
If you have several images, you will have to do it on all of them. SSL properties set by hand in the agent's configuration
files will not be overwritten if **ssl.pass.as.user.data** is **false**.

* In your deployment target, add a script that will be executed by the DM and that will upload (through SSH or SCP)
the SSL configuration directly in the agent's configuration directory. If the agent's files are owned by a specific user
(and with the right permissions), no application will be able to read it. As a reminder, our RPM and Debian packages create
a dedicated user for both the DM and agent distributions.


## Available Examples

The main difficulties can be configuring the RabbitMQ server, and generating the certificates stuff
(in particular the key store and the trust store). 

You can take a look at the configuration we use for manual tests with RabbitMQ and SSL configuration.
We use [a custom Docker image](https://github.com/roboconf/rabbitmq-with-ssl-in-docker)
that generates certificates on the fly. We then use them in
[unit tests](https://github.com/roboconf/roboconf-platform/blob/master/core/roboconf-messaging-rabbitmq/src/test/java/net/roboconf/messaging/rabbitmq/internal/RabbitMqTestWithSsl.java)
and
[integration tests](https://github.com/roboconf/roboconf-platform/blob/master/miscellaneous/roboconf-integration-tests-dm-with-agents-in-memory/src/test/java/net/roboconf/integration/tests/dm/with/agents/in/memory/messaging/AgentInMemoryWithRabbitMqAndSslTest.java).
It may help you to deal with such a use case.
