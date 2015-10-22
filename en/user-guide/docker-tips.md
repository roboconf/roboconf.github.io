---
title: "Docker Tips"
layout: page
cat: "ug-last"
id: "docker-tips"
menus: [ "users", "user-guide", "0.4" ]
---
  
Note that Docker runs mainly on Linux 64-bit systems, although some ports may be available for other platforms.


## Note to install latest Docker (Ubuntu)

On Debian systems, you can install Docker with...

```tcl
sudo apt-get install lxc-docker
```

Or see [docker.com](http://docker.com) for other platforms).  
For Ubuntu, since March 3<sup>rd</sup>, 2015 (Docker 1.5.x), you may have to use...

```tcl
wget -qO- https://get.docker.io/gpg | sudo apt-key add -
sudo sh -c "echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
sudo apt-get update
sudo apt-get install lxc-docker
```

.. to get the last version.


## Docker Configuration

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


## Some Docker Commands

Here is a reminder of some Docker commands.

To list docker images:  
**docker images**

To remove a docker image:  
**docker rmi \<image-ID\>**

To run interactively a docker image (thus launching a container):  
**docker run -i -v /tmp:/roboconf -t \<image-ID\> /bin/bash**

Note: the -v option is used there to share the local "/tmp" as "/roboconf" in the container, which is useful to exchange files.

To list running docker containers:  
**docker ps** (or, to list them all, "docker ps -a")

to attach a shell script to a running container:  
**docker exec -ti \<container-ID\> /bin/bash**

To remove a docker container:  
**docker rm \<container-ID\>**

To remove all exited containers:  
**docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm**
