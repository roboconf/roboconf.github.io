---
title: "Tutorial - Managing Apache Storm with Roboconf and Docker - 1/5"
layout: page
cat: "ug-snapshot"
id: "tutorial-apache-storm-et-docker-2"
menus: [ "users", "user-guide", "Snapshot" ]
---

If it is not already done, start by reading and following the [getting started tutorial](tutorial-getting-started-with-roboconf.html).  
It gathers everything needed to begin with Roboconf and the DM.

> Notice we do not install the DM as [a Docker container](https://hub.docker.com/r/roboconf/roboconf-dm/). This is because we
> are then going to deploy Docker containers. It is possible to launch Docker containers from another docker
> container ([DooD](http://container-solutions.com/running-docker-in-jenkins-in-docker/)), but this does not work on all the operating systems.

Once this is done, install [RabbitMQ via Docker](https://hub.docker.com/_/rabbitmq/).  
We are going to use it instead of Roboconf's HTTP messaging.

```
docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
```

Replace the default user by this one `roboconf / roboconf`.  
You must also update the DM's configuration. Please, refer to [this page](installing-rabbit-mq.html)
and [this one](/en/user-guide/configuring-the-messaging.html) for more details.

> Reconfiguring the DM does not require any restart.

You can now verify the LAMP example keeps on working correctly.    
Once verified, you can go on with [the second part of the tutorial](tutorial-apache-storm-with-docker-3.html).
