---
title: "Installing Roboconf with Docker"
layout: page
cat: "ug-0-7"
id: "installing-roboconf-with-docker"
menus: [ "users", "user-guide", "0.7" ]
---

## Docker Images

Both the DM and the agent are available as Docker images.  
They are hosted on [Docker Hub](https://hub.docker.com/_/roboconf).

> Only releases are available as Docker images.  
> You will have to [build snapshot ones](https://github.com/roboconf/roboconf-dockerfile) if you need them.  
>
> Docker agents do not aim at being started by hand from Docker.  
> Information related to the Docker image for the agent is available on [Github's readme](https://github.com/roboconf/roboconf-dockerfile). 

To get the DM and run it from docker, type in...

```bash
# Pull
docker pull roboconf/roboconf-dm:latest

# Run
docker run -d -p 8181:8181 roboconf/roboconf-dm:latest
```

Then, open [http://localhost:8181/roboconf-web-administration/index.html](http://localhost:8181/roboconf-web-administration/index.html)
into your web browser.  
For production environments though, Roboconf's DM may require a fully-working RabbitMQ server.  
To start Roboconf using the official RabbitMQ image, please run the following commands:

```bash
# Run RabbitMQ in its own container.
docker run -d -p 5672:5672 -p 4369:4369 --name rc_rabbitmq -d rabbitmq:latest

# Run Roboconf's DM and link it with RabbitMQ.
docker run -d -p 8181:8181 --link rc_rabbitmq:rabbitmq roboconf/roboconf-dm:latest
```

It is possible to modify the Roboconf configuration by setting environment variables.  
Here are the default values:

| Variable | Value | Description |
| -------- | :---: | ----------- |
| MESSAGING_TYPE | http | The messaging implementation to use (**http** or **rabbitmq**). |
| REDIRECT_LOGS | - | If defined, this variable redirects logs to the standard output. |

<!-- -->

If *MESSAGING_TYPE* is set to `http`.

| Variable | Value | Description |
| -------- | :---: | ----------- |
| HTTP_IP | localhost | The IP address of Roboconf's DM. This IP will be used by agents. |
| HTTP_PORT | 8181 | The port used by the DM to expose its web socket for agents. |

<!-- -->

If *MESSAGING_TYPE* is set to `rabbitmq`.

| Variable | Value | Description |
| -------- | :---: | ----------- |
| RABBITMQ_PORT_5672_TCP_ADDR | rc_rabbitmq | RabbitMQ's IP address (link to another Docker container by default). |
| RABBITMQ_PORT_5672_TCP_PORT | 5672 | RabbitMQ's port. |
| RABBITMQ_USER | guest | User name to connect to RabbitMQ. |
| RABBITMQ_PASS | guest | Password name to connect to RabbitMQ. |


To run it as a stand-alone using your own RabbitMQ server, you can use `-e` option to match your settings.  
For example, to connect to RabbitMQ server listening on IP 192.168.0.55 and port 5672 using *roboconf* as user and password:

```bash
# You can pass as many environment variables as necessary.
$ docker run -d -p 8181:8181 \
         -e MESSAGING_TYPE=rabbitmq \
         -e RABBITMQ_PORT_5672_TCP_ADDR=192.168.0.55 \
         -e RABBITMQ_USER=roboconf \
         -e RABBITMQ_PASS=roboconf \
         roboconf/roboconf-dm:latest
```

Once your container is started, you may have to login to deploy additional artifacts (e.g. target handlers in the DM).

```bash
$ docker exec -it <container_id> /bin/bash

# You can now interact with the container.

$ cd bin
$ ./client -u karaf

# You are now logged into Karaf.
# Do what you have to do and log out.

$ karaf > roboconf:target openstack
$ karaf > logout

# Then, exit the container.

$ exit
```


## Configuration

The main parts can be configured through environment variables, as mentioned above.  
However, you can also refer to the classic configuration pages.

* [Configuring the DM](configuring-the-deployment-manager.html)
* [Configuring an Agent](configuring-an-agent.html)
