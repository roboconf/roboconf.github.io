---
title: "Installing the Messaging Server"
layout: page
id: "ug.snapshot.installing-the-messaging-server"
menus: [ "users", "user-guide" ]
---

The messaging server is a crucial element so that Roboconf can work.  
Roboconf uses [RabbitMQ](https://www.rabbitmq.com/) as its messaging server. It means you must install an Erlang container and
RabbitMQ itself. Follow the instructions on [RabbitMQ's web site](https://www.rabbitmq.com/download.html).

It is recommended to install a version 3.2.x (or higher).  
These versions come with a [management plug-in](https://www.rabbitmq.com/management.html) which may be very useful.

> The messaging server should be accessible through a public IP.  
> The most simple solution is generally to put it in a public cloud infrastructure.
