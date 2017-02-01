---
title: "RabbitMQ Clustering and High Availability"
layout: page
cat: "ug-last"
id: "clustered-rabbitmq"
menus: [ "users", "user-guide" ]
---

## Overview

RabbitMQ can be configured for multi-node clustering (replicating messages from a master node to slave nodes).  
Fail-over can be provided, by adding a round-robin load balancer in front of the rabbit cluster nodes.

> Although clustering and HA are possible, they are very complex to setup.  
> Our experiments allowed us to verify that a single node, coupled with a solution like [Pacemaker](http://clusterlabs.org), is generally enough.


## Goal and Related Links

This documentation explains how to cluster RabbitMQ on two nodes, then add a HA-proxy load-balancer in front of them.  
For detailed information about RabbitMQ clustering, see RabbitMQ's documentation:

* [Distributing RabbitMQ](https://www.rabbitmq.com/distributed.html)
* [Clustering RabbitMQ](https://www.rabbitmq.com/clustering.html)

Notice there also exist highly available queues, which are an alternative to clustering.  
This is has not been documented here, but you can refer to the official documentation of RabbitMQ. 

* [High Availability with RabbitMQ](https://www.rabbitmq.com/ha.html)
* [High Availability with Pacemaker](https://www.rabbitmq.com/pacemaker.html)

You may also find [this blog entry](https://insidethecpu.com/2014/11/17/load-balancing-a-rabbitmq-cluster/) useful.


## Node rabbit1

Install RabbitMQ:

```shell
rabbit1$ apt-get install rabbitmq
```

Start RabbitMQ in cluster mode:

```shell
rabbit1$ rabbitmq-server -detached

rabbit1$ rabbitmqctl cluster_status
Cluster status of node rabbit@rabbit1 ...
[{nodes,[{disc,[rabbit@rabbit1]}]},{running_nodes,[rabbit@rabbit1]}]
...done.
```

Create a **roboconf** user (on node #1 only, will be available for the whole cluster):

```shell
rabbit1$ rabbitmqctl add_user roboconf roboconf
rabbit1$ rabbitmqctl set_permissions roboconf ".*" ".*" ".*"
```

Make sure HA sync mode on cluster is automatic (optional):

```shell
rabbit1$ rabbitmqctl set_policy ha-all "" '{"ha-mode":"all","ha-sync-mode":"automatic"}'
```


## Node rabbit2

First:

* Declare the **rabbit1** node in `/etc/hosts`.
* Edit **/var/lib/rabbitmq/.erlang.cookie** and insert the same content as on node **rabbit1**.  
(note: if creating the file, make sure it belongs to `rabbitmq:rabbitmq` with access rights restricted to 400).

Install RabbitMQ:

```shell
rabbit2$ apt-get install rabbitmq
```

Start RabbitMQ and join the cluster:

```shell
rabbit2$ rabbitmq-server -detached

rabbit2$ rabbitmqctl stop_app
Stopping node rabbit@rabbit2 ...done.

rabbit2$ rabbitmqctl join_cluster rabbit@rabbit1
Clustering node rabbit@rabbit2 with [rabbit@rabbit1] ...done.

rabbit2$ rabbitmqctl start_app
Starting node rabbit@rabbit2 ...done.
```


## Node haproxy

Install HA-proxy:

```shell
haproxy$ apt-get install haproxy
```

Edit **/etc/haproxy/haproxy.cfg** and add the following content:

```
listen rabbitcluster 0.0.0.0:5672
         mode tcp
         option tcplog
         timeout client  3h
         timeout server  3h
         server rabbit-01 <IP-of-node-rabbit1>:5672 check fall 3 rise 2
         server rabbit-02 <IP-of-node-rabbit2>:5672 check fall 3 rise 2
```

<!-- FIXME: weird design IMO -->

> Note that client and server timeouts must be set to a long period.  
> Otherwise idle connections may get closed by HAProxy, causing errors.

Start haproxy:

```shell
haproxy$ sudo /usr/sbin/haproxy -f /etc/haproxy/haproxy.cfg -D -p /var/run/haproxy.pid
```


## Testing

Start Roboconf's DM with the messaging server's location set to the HA-proxy's one.  
Upload an application with dependencies (e.g. Apache / Tomcat sample :
test messaging with Apache started, then alternately start/stop Tomcat and check Apache status changes).

Then:

* Stop either node rabbit1 or rabbit2:

```
rabbitmqctl stop
```

* Check the node status: `rabbitmqctl cluster_status`.
* Test again : alternately start/stop Tomcat and check Apache status change.
* Restart the node previously stopped.

```
rabbitmq-server -detached
```

* Check the node status: `rabbitmqctl cluster_status`.
* Test again : alternately start/stop Tomcat and check Apache status change.
