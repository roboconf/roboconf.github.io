---
title: "Docker Support"
layout: page
id: "ug.snapshot.target-docker"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for Docker.  

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

<br />
