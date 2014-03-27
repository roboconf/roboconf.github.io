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
