---
title: "Configuring the Messaging"
layout: page
cat: "ug-last"
id: "configuring-the-messaging"
menus: [ "users", "user-guide" ]
---

The messaging designates the means the DM and agents use to exchange messages.  
Several implementations are available, each one with its pros and cons.

Each messaging implementation is defined in its own OSGi bundle.  
And each one has its own configuration. Generally, messaging configurations should have PIDs
that begin with **net.roboconf.messaging**.

> Configuration parameters can be changed at runtime, without rebooting.  
> Besides, as a reminder, on the agent, you do NOT have to configure the messaging if its **target-id** property
> was set to one of the *iaas-...* values.

Here is a short overview of all the messaging implementations.


## HTTP

HTTP is a messaging implementation of the Roboconf messaging API.  
It is associated with the messaging-type **http** (to use in the DM and agent's configuration files).

> It is the default messaging type for the DM and agents.

It was created to simplify the installation of Roboconf for new beginners.  
With this messaging, the DM must be available on a public location. With this implementation, agents will connect to the DM
with web-sockets. This bi-directional channel will be used to exchange messages. Exchanges between agents go through the DM.
It means the DM should not be stopped when this messaging is used. It replaces, it is the messaging server.

> Given the way it works, this solution only supports a very limited traffic.  
> It is clearly not designed to work in production environments.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| server.ip | The DM's IP address. | If left blank, the DM will try to guess it. | no |
| server.port | The DM's web server port. | Left blank is interpreted as "8181". | no |

All these properties are prefixed with **net.roboconf.messaging.http.**.  
As a reminder, if you use this messaging with **local Docker containers**, you should set the IP address to 172.17.0.1 (172.17.42.1 in former Docker versions).


## RabbitMQ

RabbitMQ was the initial choice to enable exchanges between the DM and agents.  
It is associated with the messaging-type **rabbitmq** (to use in the DM and agent's configuration files).  
As a reminder, here is the page that explains [its installation](installing-rabbit-mq.html).

With this messaging, the DM is only required to create agents.  
Agents can then communicate without the DM (which means it can be stopped when it is not necessary).

> For the moment, this implementation is the only one ready to be used in production environments.  
> Unlike other ones, it can support heavy traffic.

The PID of the managed service is **net.roboconf.messaging.rabbitmq**.  
And the Karaf configuration file is **etc/net.roboconf.messaging.rabbitmq.cfg**.

Here is a description of the various parameters.

| Property | Description | Notice | Mandatory |
| --- | --- | --- | --- |
| message-server-ip | The IP address and the port of the messaging server. Examples: http://192.168.1.87 (default port), http://192.168.1.89:4048 (with a custom port). | Left blank is interpreted as "localhost". | yes |
| message-server-username | The user name for the messaging server. | Left blank is interpreted as "guest". | yes |
| message-server-password | The password for the messaging server. | Left blank is interpreted as "guest". | yes |

All these properties are prefixed with **net.roboconf.messaging.rabbitmq.**.  
There are also properties related to the SSL configuration for RabbitMQ. These properties are documented [here](security-rabbitmq-over-ssl.html).


## In-Memory

The in-memory implementation was created for both a proof of concept and for potential use for tests.  
With this kind of messaging, clients directly route messages to the right message queue. It can only work when the DM
and agents run inside the same JVM.

However, its base implementation can be reused to create other kinds of messaging, such as peer-to-peer clients.
Instead of routing messages to queues directly, it could route messages to specific locations. The HTTP implementation partially
relies on this base implementation.

The in-memory implementation does not have any parameter.  
It is associated with the **in-memory** messaging type.
