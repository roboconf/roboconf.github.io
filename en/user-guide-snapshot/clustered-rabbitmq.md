---
title: "Clustered RabbitMQ"
layout: page
cat: "ug-snapshot"
id: "clustered-rabbitmq"
menus: [ "users", "user-guide", "Snapshot" ]
---

## Overview

RabbitMQ can be configured for multi-node clustering (replicating messages from a master node to slave nodes).
Failover can be provided, by adding a round-robin load balancer in front of the rabbit cluster nodes.

This documentation explains how to cluster RabbitMQ on two nodes, then add a haproxy load-balancer in front of them.

For detailed information about rabbitmq clustering, see rabbitmq documentation:

* [Distributing rabbitmq](https://www.rabbitmq.com/distributed.html)
* [Clustering rabbitmq](https://www.rabbitmq.com/clustering.html)

## Node rabbit1

Install rabbitmq:

```
rabbit1$ apt-get install rabbitmq
```

Start rabbitmq in cluster mode:

```
rabbit1$ rabbitmq-server -detached

rabbit1$ rabbitmqctl cluster_status
Cluster status of node rabbit@rabbit1 ...
[{nodes,[{disc,[rabbit@rabbit1]}]},{running_nodes,[rabbit@rabbit1]}]
...done.
```

Create roboconf user (on node #1 only, will be available for the whole cluster):

```
rabbit1$ rabbitmqctl add_user roboconf roboconf
rabbit1$ rabbitmqctl set_permissions roboconf ".*" ".*" ".*"
```

Make sure HA sync mode on cluster is automatic (optional):

```
rabbit1$ rabbitmqctl set_policy ha-all "" '{"ha-mode":"all","ha-sync-mode":"automatic"}'
```

## Node rabbit2

First:

* Declare node rabbit1 in /etc/hosts
* Edit /var/lib/rabbitmq/.erlang.cookie, and insert the same content as on node rabbit1.
(note: if creating the file, make sure it belongs to rabbitmq:rabbitmq with access rights restricted to 400).

Install rabbitmq:

```
rabbit2$ apt-get install rabbitmq
```

Start rabbitmq and join cluster:

```
rabbit2$ rabbitmq-server -detached

rabbit2$ rabbitmqctl stop_app
Stopping node rabbit@rabbit2 ...done.

rabbit2$ rabbitmqctl join_cluster rabbit@rabbit1
Clustering node rabbit@rabbit2 with [rabbit@rabbit1] ...done.

rabbit2$ rabbitmqctl start_app
Starting node rabbit@rabbit2 ...done.
```

## Node haproxy

Install haproxy:

```
haproxy$ apt-get install haproxy
```

Edit /etc/haproxy/haproxy.cfg, then add the following:
(note that client and server timeouts must be set to a long period,
otherwise idle connections may get closed by HAProxy, causing errors).

```
listen rabbitcluster 0.0.0.0:5672
         mode tcp
         option tcplog
         timeout client  3h
         timeout server  3h
         server rabbit-01 <IP-of-node-rabbit1>:5672 check fall 3 rise 2
         server rabbit-02 <IP-of-node-rabbit2>:5672 check fall 3 rise 2
```

Start haproxy:

```
haproxy$ sudo /usr/sbin/haproxy -f /etc/haproxy/haproxy.cfg -D -p /var/run/haproxy.pid
```

## Testing

Start roboconf DM with node haproxy as messaging server.

Upload an application with dependencies (eg. apache/tomcat sample :
test messaging with apache started, then alternately start/stop tomcat and check apache status change).

Then:

* Stop either node rabbit1 or rabbit2:
```
rabbitmqctl stop
```
(check status on node: rabbitmqctl cluster_status)
* Test again : alternately start/stop tomcat and check apache status change.
* Restart node proviously stopped
```
rabbitmq-server -detached
```
(check status on node: rabbitmqctl cluster_status)
* Test again : alternately start/stop tomcat and check apache status change.
