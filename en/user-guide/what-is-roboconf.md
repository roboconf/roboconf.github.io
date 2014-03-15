---
title: "What is Roboconf"
layout: page
id: "ug-what-is-roboconf"
menu: "users"
sub-menu: "user-guide"
---

# What is it?
Roboconf is a deployment tool for the cloud : taking as input the description of a whole application
in terms of "components" and "instances", it takes the burden of launching VMs, deploying software on them,
resolving dependencies between software components installed to complete their configuration, and starting the whole stuff
when ready.

# What are its key points ?
Roboconf enables to define a model of the application that one wants to deploy.
It then offers a vision of this model during deployment and at runtime.
The model and the use of Roboconf are designed to be simple.
It uses known technologies: Puppet, AMQP, Bash, REST/JSON web services.
It is asynchronous : the application can be deployed in any order.

# What are the differences between Roboconf and...

## Puppet Master
Puppet (using it with a central server) and Roboconf share numbers of common points.
Roboconf is however designed to be part of an autonomous IaaS. It can instantiate VM on a IaaS, and add or remove
some very easily.

## Some Bash script and SSH
Roboconf could be replaced by some scripts, but the result would be very complicated to maintain.
