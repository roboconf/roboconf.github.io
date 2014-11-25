---
title: "Docker Support"
layout: page
id: "ug.snapshot.target-docker"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for Docker.  

## Roboconf configuration for Docker

Sample **target.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for Docker
target.id = docker

docker.endpoint: http://localhost:4243
docker.image: 0f3087570887
docker.user: guest
docker.password: guest
```

Here is a complete description of the parameters for Docker.

| Property | Description | Default | Mandatory |
| --- | --- | --- | --- |
| target.id | Determines the target handler to use | none, must be "docker" | yes |
| docker.endpoint | The endpoint URL of Docker (requires Docker to be setup to use a TCP port). | none | yes |
| docker.image | The ID of the docker image used as a template for the VM (as shown by "docker images", for example) | none | yes |
| docker.user | The name of the user to connect. | none | yes |
| docker.password | The password of the user to connect. | none | yes |

## Docker configuration

Roboconf needs that docker be available on a TCP port. To enable it, edit **/etc/default/docker**, and set DOCKER\_OPTS there:

```
# Make Docker listen on TCP port 4243 (along with local Unix socket)
DOCKER_OPTS="-H=tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock"
```

Then, simply restart docker:
```
sudo stop docker
sudo start docker
```


