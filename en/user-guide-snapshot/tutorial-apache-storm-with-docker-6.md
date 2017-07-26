---
title: "Tutorial - Managing Apache Storm with Roboconf and Docker - 5/5"
layout: page
cat: "ug-snapshot"
id: "tutoriel-apache-storm-et-docker-6"
menus: [ "users", "user-guide", "Snapshot" ]
---

This last part is the one where we upgrade the Roboconf application to deploy
our Dockerized Storm cluster over a distributed virtualized infrastructure (e.g.
on Amazon Web Services). Thus, Roboconf will not only manage Docker containers but it will also
create virtual machines.

In the first version, we used Docker lins.  
These links allow to associate a host name (as resolved by the container) with another container.
As an example, writing...

```
docker run -d --rm --restart always --name nimbus --link zookeeper-c:zookeeper storm:1.1 storm nimbus
```

... means that the Nimbus container looks for a host named **zookeeper** and that it will be resolved
as the **zookeeper-c** container. Under the hood, Docker networks generate firewall rules to redirect
requests to the right containers (SDN - *Software Defined Network*).

It works very well on a local machine. It is a little more complicated over several machines.
Some tools, such as Docker Swarm, deal with such use cases correctly.

Still with this example, such a Docker link means the configuration files of Nimbus
reference somewhere a host called **zookeeper**. To switch to a distributed mode, we would
like it to be replaced by an specific IP address. So, we need to modify the way we start our containers
to inject the right information in them.

Several options are possible, potentially in combination:

- Modify configuration files with **docker exec**.
- Recreate a new container every time a configuration changes.
- Inject the right configuration when containers start [with the right parameters](https://hub.docker.com/_/storm/).

Upgrade your Roboconf application to remove Docker links and by injecting the right IP addresses in Storm
configuration files. Redeploy your Roboconf application and verify everything works correctly.
