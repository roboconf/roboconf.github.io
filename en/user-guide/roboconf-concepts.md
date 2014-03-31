---
title: "Roboconf concepts"
layout: page
id: "ug.snapshot.roboconf-concepts"
menus: [ "users", "user-guide" ]
---

# Overview

Roboconf's main constituents are:

* The "deployment manager", generally associated to a management webapp.
* At least one "agent": an agent must be deployed on each deployment target (eg. a VM on a IaaS), prior to using Roboconf.

Roboconf users (clients) deploy applications on Roboconf's deployment manager, using REST/JSON APIs: the "deployment manager" webapp provides a web interface on top of these APIs.

Roboconf agents talk to each other (and to the deployment manager as well) using RabbitMQ message queues.



Roboconf is made up of several blocks:

* The **Deployment Manager** (or DM) is a web application in charge of managing
Virtual Machines (or VM) and the agents. It acts as an interface to the set of
VMs or devices.
* The Messaging Server is the key component that enable communications between
the DM and the agents. The DM and the agents always communicate asynchronously
through this server.
* The agent is a Software component that must be deployed on every VM and device
on which Roboconf must deploy or control something. The installation of the agents
is detailed on [a separate page](preparing-appliances-with-the-agent.html).
* Eventually, you need a REST client to control the DM.  
Roboconf comes with a web application which provides a user interface to interact
with the DM through REST. If you want to use or develop another client, you can find
the description REST API in the [developer guide](/developer-guide/developer-guide.html). 

