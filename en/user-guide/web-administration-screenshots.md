---
title: "Screenshots of the Web Administration"
layout: page
cat: "ug-snapshot"
id: "web-administration-screenshots"
menus: [ "users", "user-guide" ]
---

This page shows screenshots of [Roboconf's Web Administration](web-administration.html).  
It involves the deployment of one of the initial use cases, the one about an Enterprise Social Network.

This example involves the deployment of a load balancer (HA Proxy), a Node JS application (called RSE),
Mongo DB (for storage) and Redis (for asynchronous communication between the instances of RSE).


## The Welcome Screen

<img src="/resources/img/roboconf--web-administration--welcome.jpg" alt="the welcome screen" class="gs" />

Users are invited to upload their first application.


## Upload

<img src="/resources/img/roboconf--web-administration--upload-application--1.jpg" alt="the upload dialog" class="gs" />

Following the upload link, the **upload** dialog shows up and requires to select a ZIP file to upload.  
This ZIP file must contain the Roboconf application. It must directly contain the three directories
named **descriptor**, **graph** and **instances**. 

See [this page](configuration-files.html) about the structure of a Roboconf application.


## Upload (Follow Up)

<img src="/resources/img/roboconf--web-administration--upload-application--2.jpg" alt="start uploading" class="gs" />

Once the file selected, click the **upload** button.


## Upload (End)

<img src="/resources/img/roboconf--web-administration--upload-application--3.jpg" alt="upload progress and Completion" class="gs" />

The dialog reports the upload progression.


## Applications List

<img src="/resources/img/roboconf--web-administration--new-application.jpg" alt="the list of applications" class="gs" />

When the upload dialog is closed, the list of applications is refreshed.  
This page lists the applications handled by the Deployment Manager (DM). In addition to its description
and version, it gives access to the list of instances (or application parts).


## Instances List

<img src="/resources/img/roboconf--web-administration--instances-overview.jpg" alt="the list of instances" class="gs" />

A Roboconf application is generally made up of several parts.  
Indeed, Roboconf was designed to work with distributed applications.

These parts are called instances.


## At the Beginning...

<img src="/resources/img/roboconf--web-administration--root-instance-is-not-deployed.jpg" alt="the VM is not deployed" class="gs" />

... nothing is deployed.


## Life Cycle

<img src="/resources/img/roboconf--web-administration--child-instance-is-not-deployed.jpg" alt="HA proxy is not deployed either" class="gs" />

Unlike Virtual Machines (VMs), other instances have a *stopped* state.


## Deploying and Starting HA Proxy

<img src="/resources/img/roboconf--web-administration--root-instance-is-about-to-be-launched.jpg" alt="deploying this group of instances" class="gs" />

We deploy and start the HA Proxy group.  
This includes creating the VM, deploy HA Proxy and starting it.

Roughly, we are deploying a part of our model.


## VM Deployment

<img src="/resources/img/roboconf--web-administration--state-root-deploying.gif" alt="the VM is being deployed" class="gs" />

The deployment of a VM is handled by the **iaas** plug-in of Roboconf.  
This one can talk with several infrastructures.


## VM Deployment (Follow Up)

<img src="/resources/img/roboconf--web-administration--root-instance-is-deployed.jpg" alt="the VM is deployed" class="gs" />

Once the VM has been created and is ready, Roboconf deploys HA Proxy.  
Relations of type *container / contained* are deployed sequentially.



## Deployment of HA Proxy

<img src="/resources/img/roboconf--web-administration--child-instance-is-stopped.jpg" alt="HA proxy is being deployed" class="gs" />

HA Proxy is deployed by the Roboconf agent that is installed on the VM.  
The agent delegates the work to one of its plug-ins, which will use the associated recipe (Bash script, Puppet module...).


## Deploying other Parts

* Other instances are started (one of Mondog DB, one of Redis and one of the RSE).
* Hierarchical instances are deployed sequentially.
* But instance groups are deployed in parallel.

<!-- -->
* An instance can be deployed only when its parent has been deployed and started.
* An instance can be started only when all its imports are resolved.


## Completed Deployment

<img src="/resources/img/roboconf--web-administration--child-instance-is-started.jpg" alt="everything is deployed and started" class="gs" />

In our example, HA Proxy depends on the **RSE** component, which itself depends on Mongo DB and Redis.
Therefore, HA Proxy will be blocked in the **starting** state until all the other instances have started.
HA Proxy is the last one to effectively start. These dependencies are expressed in the graph(s) files.
