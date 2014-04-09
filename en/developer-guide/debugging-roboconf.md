---
title: "Debugging Roboconf"
layout: page
id: "dg.snapshot.debugging-roboconf"
menus: [ "developers", "developer-guide" ]
---

Roboconf is still under development.  
Besides, it is a distributed application that aims at deploying distributed applications.
Eventually, communication is asynchronous. Therefore, and despite the presence of logs,
Roboconf is really hard to test and debug.

There are two options to debug Roboconf.


## In-Memory

The **In-Memory** solution consists in mocking the IaaS resolver and the agent's plug-ins.  
Instead of creating virtual machines, we will load an agent in memory. And instead of
executing Puppet or Bash (which require root privileges), we will simply log actions.

This solution allows to debug what goes through the DM and the agent.  
It can be used to understand why something does not work and make sure life cycle is handled correctly.

> The messaging server can be deployed anywhere (locally or on a remote machine).  
> The Deployment Manager should run locally and be launched from an IDE.

You can get an example to launch and debug the Deployment Manager from an IDE 
[here](https://github.com/vincent-zurczak/roboconf-debug-sample). It is written as a JUnit test
that will start a web container and run the DM as a web application. You can then either use the
REST API (you can thus play with the web administration) or include instructions in the code (such as
the location of the messaging server, the application you want to load, etc).


## Real Deployments

You can use the same solution to experiment real deployments.  
The DM will still run from your IDE. The messaging server will be deployed wherever you want. But for cloud
deployments, it should be deployed in the cloud. The main difference this time is that you will use the real
IaaS resolver and the real agent's plug-ins.

Said differently, you will have the DM and the web administration that run on your machine.  
The messaging server will be deployed in the cloud. And all the agents and the applications
will be deployed where you want them to be deployed.

> Before the end of summer, we should work on something to execute scenarios and verify assertions.  
> We will see what is feasible.
