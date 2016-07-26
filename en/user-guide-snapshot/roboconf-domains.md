---
title: "Roboconf Domains"
layout: page
cat: "ug-snapshot"
id: "roboconf-domains"
menus: [ "users", "user-guide", "Snapshot" ]
---

Currently, all the applications are managed by a same DM.  
A DM should be managed by a single team. When several departments would like
to share infrastructures but manage their own applications, it is possible to
use Roboconf domains.


To make things simple, a **Roboconf domain is defined by a Roboconf DM**.  
So, to have multiple domains, you should have multiple DMs.

Each domain should...

* ... have its own DM.
* ... have its own credentials or its own messaging server.
* ... have its own credentials for the cloud infrastructure.

When using HTTP messaging, domains are implicit since the DM is the domain.  
With RabbitMQ as the messaging server, it is necessary to set the **domain** property
in the **net.roboconf.dm.configuration** file. It is then possible to have several DMs
using the same messaging server (or cluster of messaging servers) without interactions.

And the infrastructure credentials guarantee one DM will not interact with the images
and virtual machines from another user. **This approach allows several topologies** (here pictured with 2 virtualized infrastructures).
Obviously, here, messaging could also be read as clustered messaging.


## Classic / Basic Architecture

<img src="/resources/img/en_roboconf-domains--classic.png" alt="One DM, one messaging server..." class="gs" />
<br />

## Each DM with its own Messaging

<img src="/resources/img/en_roboconf-domains--each-one-its-messaging.png" alt="Several DMs, each one with its own messaging server..." class="gs" />
<br />

## Shared Messaging

<img src="/resources/img/en_roboconf-domains--same-messaging.png" alt="Several DMs with the same messaging infrastructure..." class="gs" />
<br />

## Hybrid Domains

<img src="/resources/img/en_roboconf-domains--hybrid-mode.png" alt="Several DMs and hybrid approaches..." class="gs" />
