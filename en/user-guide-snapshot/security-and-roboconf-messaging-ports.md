---
title: "Security :: Roboconf Messaging Ports"
layout: page
cat: "ug-snapshot"
id: "security-and-roboconf-messaging-ports"
menus: [ "users", "user-guide", "Snapshot" ]
---

By default, Roboconf's DM uses the port 8181 for the web front-end.  
This port can be changed [by updating the web console configuration](configuring-the-web-consoles.html).

Both the DM and agents need a port to exchange messages.  
Which port exactly depends on the messaging solution. The sections below summer it up.

**Rabbit MQ**

| Port | Comment |
| ---- | ------- |
| 5672 | Default port for clients (outgoing connections). Used by the DM, agents and Rabbit MQ itself. |
| 4369 | Only used by Rabbit MQ. No need to configure it on the DM and agents. |
| 35197 | Only used by Rabbit MQ. No need to configure it on the DM and agents. |
| 15672 | For Rabbit MQ's management console. No need to configure it on the DM and agents. For versions prior to 3.x, 55672 was used instead of it. |

Obviously, these ports can be changed in Rabbit MQ's configuration.  
Please, refer to [this page](security-rabbitmq-change-the-default-port.html) or to [the official web site](https://www.rabbitmq.com/)
for more information.


**HTTP**

| Port | Comment |
| ---- | ------- |
| 8081 | This is the same port than the Roboconf's DM web server. Only required by the DM. |

Agents only have out-going connections to this port.
