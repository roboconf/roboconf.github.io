---
title: "Configuring the Messaging"
layout: page
cat: "ug-0-4"
id: "configuring-the-messaging"
menus: [ "users", "user-guide", "0.4" ]
---

The messaging designates the means the DM and agents use to exchange messages.  
Several implementations are available, each one with its pros and cons.

Each messaging implementation is defined in its own OSGi bundle.  
And each one has its own configuration. Generally, messaging configurations should have PIDs
that begin with **net.roboconf.messaging**.

> Configuration parameters can be changed at runtime, without rebooting.

Here is a short overview of all the messaging implementations.


## RabbitMQ

RabbitMQ was the initial choice to enable exchanges between the DM and agents.  
It is associated with the messaging-type **rabbitmq** (to use in the DM and agent's configuration files).

With this messaging, the DM is only required to create agents.  
Agents can then communicate without the DM (which means it can be stopped when it is not necessary).

> For the moment, this implementation is the only one ready to be used in production environments.  
> Unlike other ones, it can support heavy traffic.

The PID of the managed service is **net.roboconf.messaging.rabbitmq**.  
And the Karaf configuration file is **etc/net.roboconf.messaging.rabbitmq.cfg**.

Here is a description of the various parameters.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| message-server-ip | The IP address and the port of the messaging server. Examples: http://192.168.1.87 (default port), http://192.168.1.89:4048 (with a custom port). | **null** is interpreted as "localhost". | yes |
| message-server-username | The user name for the messaging server. | **null** is interpreted as "guest". | yes |
| message-server-password | The password for the messaging server. | **null** is interpreted as "guest". | yes |


## HTTP

HTTP is an alternative implementation of the Roboconf messaging API.  
It is associated with the messaging-type **http** (to use in the DM and agent's configuration files).

It was created to simplify the installation of Roboconf for new beginners.  
With this messaging, the DM must be available on a public location. With this implementation, agents will connect to the DM
with web-sockets. This bi-directional channel will be used to exchange messages. Exchanges between agents go through the DM.
It means the DM should not be stopped when this messaging is used.

> Given the way it works, this solution only supports a very limited traffic.  
> It is clearly not designed to work in production environments.

This implementation does not provide (nor require) any configuration.
