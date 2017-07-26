---
title: "Installing RabbitMQ"
layout: page
cat: "ug-snapshot"
id: "installing-rabbit-mq"
menus: [ "users", "user-guide", "Snapshot" ]
---

The messaging server is a crucial element so that Roboconf can work.  
The list of available messaging implementations are listed on this page.

In production environments, it is recommended to use [RabbitMQ](https://www.rabbitmq.com/).  
This page describes the steps to follow to install and configure RabbitMQ for Roboconf.

> Notice that we replace the default « guest / guest » user by « roboconf / roboconf ».  
> That's because the guest user is only usable on the local host (RabbitMQ's security policy).


## RabbitMQ as a Docker Container

The most simple solution is to get RabbitMQ as a Docker container.  
Use...

```properties
# Expose internal ports on the system
# And replace the guest/guest user by roboconf/roboconf
docker run -d \
	--hostname my-rabbit \
	--name some-rabbit \
	-e RABBITMQ_DEFAULT_USER=roboconf \
	-e RABBITMQ_DEFAULT_PASS=roboconf \
	-p 15672:15672 \
	-p 5672:5672 \
	-p 4369:4369 \
	rabbitmq:3-management-alpine
```

... to launch RabbitMQ with the management plug-in (web console)
and configured for Roboconf. The management console is available on
`http://localhost:15672`. Please, refer to [the official Docker image](https://hub.docker.com/_/rabbitmq/)
for more details.


## RabbitMQ with SSL as a Docker Container

The Roboconf team has created a Docker image to launch RabbitMQ in a Docker container
and pre-configured with a SSL configuration. The SSL configuration (certificates, etc) are generated
on the fly by the container. By using a shared volume, it is then possible for clients (such as Roboconf) to reference
the generated configuration.

Please, refer to the readme file in [this Github repository](https://github.com/roboconf/rabbitmq-with-ssl-in-docker)
for more details.


## RabbitMQ as a Service

If you only want to test this messaging implementation, you might consider
using [https://www.cloudamqp.com](https://www.cloudamqp.com/) instead of installing your own RabbitMQ server.


## Full Installation

Installing RabbitMQ means installing an Erlang container and RabbitMQ itself. 
Follow the instructions on [RabbitMQ's web site](https://www.rabbitmq.com/download.html).

It is recommended to install the version 3.3.3 or higher.  
Versions 3.x come with a [management plug-in](https://www.rabbitmq.com/management.html) which may be very useful.
You **should** follow the instructions on [RabbitMQ's web site](http://www.rabbitmq.com/download.html) to install it.

> The messaging server should be accessible through a public IP.  
> The most simple solution is generally to put it on a public server.

RabbitMQ needs to be configured with a user and a password. 
Otherwise, client connections will be refused. See this page about [access control](http://www.rabbitmq.com/access-control.html) with RabbitMQ.
You should clear the guest/guest credentials. The user name and password are the one you set in the Deployment Manager's configuration.

Here is a short snippet to quickly configure RabbitMQ.  
You must first connect to the machine hosting RabbitMQ and then execute these commands.

```properties
# To create a new user called roboconf
sudo rabbitmqctl add_user roboconf roboconf

# Grant read/write/access permissions to our new user
sudo rabbitmqctl set_permissions roboconf ".*" ".*" ".*"

# Check permissions
sudo rabbitmqctl list_user_permissions roboconf

# Delete the guest user
sudo rabbitmqctl delete_user guest
```
  
To adjust the access permissions, you may want to look at [the man page](http://www.rabbitmq.com/man/rabbitmqctl.1.man.html) of RabbitMQ.
