---
title: "Security"
layout: page
cat: "ug-0-6"
id: "security"
menus: [ "users", "user-guide", "0.6" ]
---

Security covers several parts.  
We discuss every of them on this page.


## Roboconf Ports

By default, Roboconf's DM uses the port 8181.  
This port can be changed [by updating the web console configuration](configuring-the-web-consoles.html).

Both the DM and agents need a port to exchange messages.  
Which port exactly depends on the messaging solution. The sections below summer it up.

**Rabbit MQ**

| Port | Comment |
| ---- | ------- |
| 5672 | Default port for clients (out-coming connections). Used by the DM, agents and Rabbit MQ itself. |
| 4369 | Only used by Rabbit MQ. No need to configure it on the DM and agents. |
| 35197 | Only used by Rabbit MQ. No need to configure it on the DM and agents. |
| 15672 | For Rabbit MQ's management console. No need to configure it on the DM and agents. For versions prior to 3.x, 55672 was used instead of it. |

Obviously, these ports can be changed in Rabbit MQ's configuration.  
Please, refer to [its web site](https://www.rabbitmq.com/) for more information.


**HTTP**

| Port | Comment |
| ---- | ------- |
| 8081 | This is the same port than the Roboconf's DM web server. Only required by the DM. |

Agents only have out-going connections to this port.



## Roboconf Deployment

Security, as a general matter, also depends on the way Roboconf is deployed.  
As a reminder, the overall architecture looks like...

<img src="/resources/img/roboconf-architecture.jpg" alt="Architecture Diagram" class="gs" />

Obviously, this schema relies on a dedicated messaging server (here, Rabbit MQ).  
This is the recommended configuration for production environments.

With such a configuration, the agents and the DM must all *see* the messaging server.  
So, they must all be on a same network, or the messaging server should be on a public address.

Agent will be located on their own machines.  
The DM (Deployment Manager) should not be available on a public address. It should even be located on a secured machine.
Indeed, it provides administration features and should thus remain in a restricted area.



## Deployed Software's Security

For agents, beyond this access to the messaging server, ports / firewalls should be configured
to allow applicative connections. Configuring applicative connections should be part of the recipes. As an example, if you
wrote a recipe to manage the life cycle of a Tomcat server, you should open the right ports in the script that deploys this server.
And you should close these ports in the **uninstall** script.

When using system packages (like RPM or Debian packages), port configuration is generally part of
the install process. If you choose a manual installation, port configuration will have to be managed by hand (as
a example with iptables commands if you run on Linux systems).
