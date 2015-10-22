---
title: "M2R Lab"
layout: page
cat: "ug-snapshot"
id: "m2r_lab"
menus: [ "users", "user-guide", "Snapshot" ]
---

## Installation

> You will use a snapshot version for today.

Download the last snapshot DM [here](https://oss.sonatype.org/content/repositories/snapshots/net/roboconf/roboconf-karaf-dist-dm/0.5-SNAPSHOT/roboconf-karaf-dist-dm-0.5-20151020.005603-30.tar.gz).  
Install RabbitMQ as specified on Roboconf's [web site](installing-the-messaging-server.html). Then start and configure the DM to use RabbitMQ.  
Please, report to the Roboconf documentation to find out how to proceed.


## Building the first Application

* Checkout the following [project](https://github.com/vincent-zurczak/roboconf-docker-compliant-lamp) on GitHub.  
* Study the structure of the project and look at the files.

> In the scope of another work, you will be asked to create a XText editor for some of these configuration files.

By default, the application is configured to be deployed on Docker.  
This is not the initial deployment target. Update the **graph/VM/target.properties** file with the following content:

```properties
handler: in-memory
name: in-memory
description: To simulate deployments.
```

* Verify you have a Maven 3.x version on your machine.
* Compile the project.
* Verify you have a ZIP file under the **target** directory.


## First Deployment

In the Karaf CLI, install the **in-memory** handler.  

	roboconf:target in-memory

This handler will simulate the deployment of your application.  
It will help to understand the dependency resolution mechanism.

In the [Roboconf web console](http://localhost:8181/roboconf-web-administration/index.html), create a new application from your application archive.  
Call it **lamp in memory**.

Then, go under the **instances** sub-menu, start and deploy components to see what happens.  
You can use the **deploy &amp; start all** action. When everything is deployed and started, watch what happens
when you stop the database. Which other parts of the application are impacted?

In the graph file of the application project, find the properties that explain this behavior.


## Docker Deployment

In the Karaf CLI, install the **docker** handler.  

	roboconf:target docker

This handler will enable the manipulation of Docker images and containers.  
It will be used to deploy the application on your local machine. 

In the web console, go into the **deployment targets** top menu.  
Create a new target called **docker** and copy the following content.

```properties
handler = docker
name = docker
description = A local deployment of the application.

docker.image = roboconf-docker-img
docker.command.options = --cap-add SYS_PTRACE
```

* Save the target properties.
* Create a new application from the archive you uploaded (no need to upload it twice).
Simply create a new application from an existing template.
* In the new application properties, set the **docker** target as the default target
in the **target associations** sub-menu.
* Verify you have [Docker installed and configured](docker-tips.html) for REST invocations.
* Go into the **instances** sub-menu of the application and deployed and start it all.
* Monitor progress with **docker ps** and **docker images** commands.

Roboconf will indeed generate a Docker image, install an agent on it, configure and start it.  
It will then create containers from this image and install the application on it.

Once everything is deployed and started, find the IP address of the Apache load-balancer
(e.g. 172.17.0.19). Then, open your web browser to [http://172.17.0.19/roboconf-hello/](http://172.17.0.19/roboconf-hello/).

Verify round-robin works.  
What happens if you stop one Tomcat server? What happens if you stop the database?


## Going Further - Cloud Deployment

This section does not require a cloud account, this is not about manipulating but about
understanding how you would proceed.

Assuming you want to deploy this same application on a cloud infrastructure (e.g. Amazon Web Services,
for public cloud), how would you do? And assuming you want to deploy the database on a first infrastructure,
and the servers on another (hybrid cloud), how would you do?


## Going Further - The DSL

* Let's imagine we want to define a new kind of application in the graph.  
* Create a new component that can be directly deployed on a VM (choose a name for it and associate it with the **script** installer).
* Please, refer to the [DSL description](roboconf-dsl.html) to update the graph.
* Add associated instances in the model, on a new VM.
* Create [script recipes](plugin-script.html) that simply echo a message.
* Update the project version in your POM to not conflict with the first application template you deployed.
* Compile the project with Maven to verify your model does not contain errors.
