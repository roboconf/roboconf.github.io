---
title: "Understanding the Messaging with Rabbit MQ"
layout: page
cat: "dg-snapshot"
id: "understanding-the-messaging-with-rabbit-mq"
menus: [ "developers", "developer-guide" ]
---

> This page explains Rabbit MQ's support in Roboconf from version 0.6 (included).  
> For older versions, please refer to [this page](understanding-the-messaging-with-rabbit-mq--up-to-v0.5.html).


First, it is **highly recommended** to read [Rabbit MQ's tutorial](https://www.rabbitmq.com/getstarted.html).  
It explains the basics and the concepts of this messaging server.

Now, let's talk about the way Roboconf uses RabbitMQ.


## Global Schema

This schema illustrates what is discussed below.

<img src="/resources/img/rabbit-mq-usage-0.6.png" alt="Messaging Interactions" />


## Clients and Queues

The DM and all the agents have their own client for RabbitMQ.  
Each of them has also its own queue. Unlike in former versions, this is not contextual within an application.
The DM has a single queue and a single exchange, used for all the applications. Agents are by definition tied to
a given application.

The DM's queue is called `roboconf.queue.dm`.  

The queue for an agent is named according to the scoped instance it is associated with.  
Within a Roboconf application, an instance path is unique. When an agent starts, it is associated
with a scoped instance. The name of an agent's queue is thus...

```xml
<application-name>.<scoped-instance-path>
```

Notice that we replace the `/` character by `_` in queue names.


## Exchanges

There are 3 exchanges.  
Exchanges are important because no client sends directly a message to a queue.
Queues are hidden behind exchanges. Exchanges act as filters for messages. They will be routed 
(or dropped) according to routing rules (routing keys).

The first exchange is for the Deployment Manager. It is called `roboconf.dm`.  
The second exchange is used by agents within an application: `<application-name>.agents`.  
The third and last one is used by agents for inter-application exchanges: `roboconf.inter-app`.


## Routing Keys

Routing keys are routing rules that determine what is done of a message when it reaches an exchange.  
Routing keys are deduced from messaging contexts (it can Roboconf variables names, agent names, etc). 
As a reminder, variables are what component instances export or import (the *famous* runtime dependencies).

Routing key are used for the 3 exchanges.  
This corresponds to the **topic** keyword in Rabbit MQ.


## Routing Keys Example

Let's consider the following instances.  
We assume they are already associated with an agent.

* *MyWebApplication* is an instance of **WebApplication**.  
It exports **WebApplication.ip** and **WebApplication.port**.  
It imports **MySql.ip** and **MySql.port**.

* *MyDatabase* is an instance of **MySql**.  
It exports **MySql.ip** and **MySql.port**. And it imports nothing.

1. We deploy *MyWebApplication*.  
The agent creates its queue and starts listening to it. It also registers a routing key called **those.that.exports.MySql**.
When a message reaches the agent exchange, it will be redirected to the agent's queue.

2. We start *MyWebApplication*.  
It publishes the variables it exports to the agents exchange with the routing key **those.exports.WebApplication**.
Those that listen it will receive them.

3. We deploy *MyDatabase*.  
There is no import, so the agent has routing key to register.

4. We now start *MyDatabase*.  
It publishes the variables it exports to the agent exchange with the routing key **those.exports.MySql**.
Those that listen it, including the *MyWebApplication* instance, will receive them.

When we say an agent **publishes**, it sends a message to the agent exchange, with the right routing key **those.exports.(...)**.  
When we say an agent **listens**, it actually binds its queue with the agent exchange AND the right routing key **those.exports.(...)**.

By creating bindings between queues and the agents' exchange, we determine routes for messages.  
And we are sure the messages only reach the clients that actually need this information.

This works the same way when we send messages to the DM and for inter-application messages.
