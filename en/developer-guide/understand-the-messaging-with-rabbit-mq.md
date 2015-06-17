---
title: "Understand the Messaging with Rabbit MQ"
layout: page
cat: "dg-snapshot"
id: "understand-the-messaging-with-rabbit-mq"
menus: [ "developers", "developer-guide" ]
---

First, it is **highly recommended** to read [Rabbit MQ's tutorial](https://www.rabbitmq.com/getstarted.html).
It explains the basics and the concepts of this messaging server.

Now, let's talk about the way Roboconf uses RabbitMQ.

## Global Schema

This schema illustrates what is discussed below.

<img src="/resources/img/rabbit-mq-usage.png" alt="Messaging Interactions" />

## Clients and Queues

The DM and all the agents have their own client for RabbitMQ.
Each of them has also its own queue.

The DM's queue is called...

```xml
<application-name>.dm
```

The queue for an agent is named according to the root instance it is associated with.
Within a Roboconf application, a root instance name is unique. When an agent starts, it is associated
with a root instance. The name of an agent's queue is thus...

```xml
<application-name>.<root-instance-name>
```

## Exchanges

There are 2 exchanges.
Exchanges are important because no client sends directly a message to a queue.
Queues are hidden behind exchanges.

The first exchange is for the Deployment Manager. All the messages sent to this exchange will be
forwarded to the DM's queue (broadcast). This exchange name is called...

```xml
<application-name>.admin
```

The second exchange is used for all the agents.
When the DM or an agent wants to send something to agent, it will use this exchange.

```xml
<application-name>.agents
```

## Routing Keys

The DM's exchange forwards all the messages it receives to the DM queue.
However, the agents' exchange forwards a message to this agent's queue or that agent's queue
through a routing key. To simplify the agent's code, the routing key is not determined in the **agent** module
but in the **messaging** module.

Routing keys are deduced from variables names.
The variables are what component instances export or import (the *famous* runtime dependencies).

## Example

Let's consider the following instances.
We assume they are already associated with an agent.

* *MyWebApplication* is an instance of **WebApplication**.
It exports **WebApplication.ip** and **WebApplication.port**.
It imports **MySql.ip** and **MySql.port**.

* *MyDatabase* is an instance of **MySql**.
It exports **MySql.ip** and **MySql.port**. And it imports nothing.

1. We deploy *MyWebApplication*.
The agent starts listening messages sent to **those.that.exports.MySql**.

2. We start *MyWebApplication*.
It publishes the variables it exports to **those.exports.WebApplication**. Those that listen it
will receive them.

3. We deploy *MyDatabase*.
There is no import, so the agent has nothing to listen to.

4. We now start *MyDatabase*.
It publishes the variables it exports to **those.exports.MySql**. Those that listen it, including the
*MyWebApplication* instance, will receive them.

When we say an agent **publishes**, it sends a message to the agent exchange, with the right routing key **those.exports.(...)**.
When we say an agent **listens**, it actually binds its queue with the agent exchange AND the right routing key **those.exports.(...)**.

By creating bindings between queues and the agents' exchange, we determine routes for messages.
And we are sure the messages only reach the clients that actually need this information.
