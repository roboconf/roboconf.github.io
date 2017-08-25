---
title: "Security :: Change RabbitMQ's default port"
layout: page
cat: "ug-0-8"
id: "security-rabbitmq-change-the-default-port"
menus: [ "users", "user-guide", "0.8" ]
---

By default, RabbitMQ's port is 5672.  
See [this page](security-and-roboconf-messaging-ports.html) about RabbitMQ's ports.

Here is how to change this default port.  
Edit the configuration file for RabbitMQ.

On Debian systems, this file is located under `/etc/rabbitmq/rabbitmq.config`.  
Please, refer to [RabbitMQ's web site](https://www.rabbitmq.com/configure.html#configuration-file)
for more details about this configuration file. By default, it does not exist, you have to create it.

Edit the **tcp_listeners** property to change its value.

```erl
%% Default configuration
[
  {rabbit, [{tcp_listeners, [5672]}]}
].
```
