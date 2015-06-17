---
title: "Docker installation tips"
layout: page
cat: "ug-snapshot"
id: "docker-installation-tips"
menus: [ "users", "user-guide" ]
---

## Docker configuration

Here, we assume Docker is already installed on your system (e.g. by using "apt-get install lxc-docker" on Ubuntu, or see [docker.com](http://docker.com) for other platforms).  
Note that Docker runs mainly on Linux 64-bit systems, although some ports may be available for other platforms.

> It is recommended to use docker version 1.5.x or higher.

When docker is installed, make sure to obtain a Docker Linux image (e.g. Ubuntu), so you can use it later as a base image for Roboconf agent images.  
For example, run the following command:

```tcl
docker pull ubuntu
```


## Configure the TCP port for Docker Containers

Roboconf needs Docker to be available on a TCP port.  
To enable it, edit **/etc/default/docker**, and define DOCKER\_OPTS there.

```properties
# Make Docker listen on TCP port 4243 (along with local Unix socket)
DOCKER_OPTS="-H=tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock"
```

Then, simply restart docker.

```tcl
sudo stop docker
sudo start docker
```
