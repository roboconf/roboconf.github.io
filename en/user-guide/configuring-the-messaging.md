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
| message-server-ip | The IP address and the port of the messaging server. Examples: http://192.168.1.87 (default port), http://192.168.1.89:4048 (with a custom port). | **null** is interpreted as "localhost". | yes |
| message-server-username | The user name for the messaging server. | **null** is interpreted as "guest". | yes |
| message-server-password | The password for the messaging server. | **null** is interpreted as "guest". | yes |
