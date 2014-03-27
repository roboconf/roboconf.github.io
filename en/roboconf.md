---
title: "What is Roboconf?"
layout: page
id: "main.what-is-roboconf"
menus: [ "project", "what-is-roboconf" ]
---

Roboconf is a deployment tool for the cloud : taking as input the description of a whole application in terms of "components" and "instances", it takes the burden of launching VMs, deploying software on them, resolving dependencies between software components installed to complete their configuration, and starting the whole stuff when ready.

Roboconf also handles the application lifecycle: hot reconfiguration (eg. for elasticity issues) and consistency (eg. maintaining a consistent state when a component starts or stops, even accidentally).

Roboconf is distributed technology, based on REST/JSON and AMQP. It is IaaS-agnostic, and provides plugins for
many well-known IaaS (including OpenStack, Amazon WS, Azure, VMWare, as well as a "local" deployment plugin for
on-premise hosts).
