---
title: "LAMP Example - Part 2"
layout: page
cat: "ug-last"
id: "lamp-example-part-2"
menus: [ "users", "user-guide" ]
---

## IaaS Elasticity Patterns

Here, we will deal with adding / removing Tomcat VMs.  
Roboconf will dynamically reconfigure mod-proxy (without a restart).

So that it is a little more easy to understand, let's also introduce the internal
Roboconf mechanism. Roboconf is made up of a *manager block*, called the **deployment manager**
(or DM), agents, and a messaging server (RabbitMQ).

Let's take a look at what we can do from our previous description.


## Model Loading

We load our application's description in the DM.  
This is achieved through a REST API.

<img src="/resources/img/LAMP--step-1.jpg" alt="Step 1" class="gs" />


## Deploy and Start

We invoke an operation to deploy and start our initial instances.  
As a reminder, there are made up of 3 VMs. One will have a Tomcat server, another one
will have a MySQL database, and the last one will have an Apache web server.

The DM starts by creating the virtual machines.  
VM creation is performed in parallel. Creating one VM or 100 takes roughly the same amount of time.

<img src="/resources/img/LAMP--step-2.jpg" alt="Step 2" class="gs" />


## VMs are Up

Virtual machines have been created from a virtual image registered in the IaaS catalog.  
This appliance has a Roboconf agent pre-installed. This agent will start with the VM.

When the VM is up, the agent starts, gets some data from the VM and notifies the DM
that it is up and running. The notification goes through a messaging server. 

<img src="/resources/img/LAMP--step-3.jpg" alt="Step 3" class="gs" />


## The DM sends Deployment Commands

When a VM is up, the agent sends a message to the agent so that it deploys what it has to deploy.  
The message indicates what Software must be deployed. It may have attached resources.

An agent only receives the messages that target it.  
Said differently, the agent on the Tomcat VM will only be asked to deploy a Tomcat instance. It
works this way because of the way we have defined our initial instances.

<img src="/resources/img/LAMP--step-4.jpg" alt="Step 4" class="gs" />

> What happens on a given VM is independent of what happen on the other ones.  
> Every agent manages its own task independently. It means deployments are performed
> in parallel. How everything falls working is explained below.


# The Agent Deploy Things

Once an agent has received a deployment message, it deploys what it has to by using the appropriate plug-in.
Roboconf has (for the moment) Bash and Puppet plug-ins. Roboconf will delegate the deployment task to either
Bash scripts or a Puppet agent.

<img src="/resources/img/LAMP--step-5.jpg" alt="Step 5" class="gs" />

> Puppet is assumed to be part of the virtual image.  
> Roboconf does not install it. Besides, Roboconf does not need a Puppet master.


# Exports Publication

When an instance is deployed and ready to start (when it has no import to resolve), 
it publishes its exports on the messaging server.  
The other instances that need these variables will receive them.

<img src="/resources/img/LAMP--step-6.jpg" alt="Step 6" class="gs" />


# Imports Resolution

An instance cannot start until all its imports are resolved.  
As an example, a Tomcat server cannot start until the MySQL database is started.

Once an instance is started, it publishes its own exports.  
A chain reaction is initiated, and Software instances can start as their imports / dependencies are resolved. 

<img src="/resources/img/LAMP--step-7.jpg" alt="Step 7" class="gs" />


# Effective Start

Once all its imports are resolved, the Roboconf agent can start the instance.  
Like for the *deploy* phase, *start* is handled by a Roboconf plug-in. It will be the same for all the other
life cycle steps.

On our example, Apache depends on Tomcat which itself depends on MySQL.  
It means...

* Apache cannot start until Tomcat is started.
* Tomcat cannot start until MySQL is started.

As soon as MySQL is deployed and started, Tomcat starts, followed by Apache.  
The application is ready to handle client requests.

<img src="/resources/img/LAMP--step-8.jpg" alt="Step 8" class="gs" />

> Everything was deployed in parallel. Things start working together
> when they have resolved their dependencies. This process of resolution is asynchronous.


# Deployment Result

For simplification, we deployed a WAR with the Tomcat server.  
This concrete deployment is handled by a Roboconf plug-in.

<img src="/resources/img/LAMP--step-9.jpg" alt="Step 9" class="gs" />

> The Deployment Manager is only required to interact with the messaging server and the agents.  
> Agents an communicate with each other directly to resolve their imports. Said differently, the DM
> and the messaging server are necessary only during scale-up and scale-down phases. The distributed application
> can work without them once it is started.

# Adding a new Tomcat

First, we need to create a new instance.  
It means indicating the Software component to instantiate, give it a name and define
where it should go. Here, we create a new Tomcat instance. Given our configuration files,
it can only go under a VM instance.

We can either reuse an existing instance or create another VM instance.  
This is this second option we will take.

<img src="/resources/img/LAMP--step-10.jpg" alt="Step 10" class="gs" />


We have only added instances in the model.  
They are not started, and even not deployed. We ask the DM to deploy and start both of them.
First, the DM creates the new VM. Once it is up, the Deployment Manager sends the deployment command.
A new Tomcat instance is deployed over the virtual machine. The Roboconf agents then publishes the exports (i.e. 
a new Tomcat instance with a port and IP address). Since the Apache load balancer imports such components, it is
notified a new Tomcat arrived.

The agent associated with the Apache VM invokes a Roboconf plug-in to update the configuration files of the
Apache server. Therefore, the load balancer is now aware of two Tomcat servers. If configured in round-robin,
it will invoke alternatively every Tomcat server when it receives a request.

<img src="/resources/img/LAMP--step-11.jpg" alt="Step 11" class="gs" />

> The real magic with Roboconf is the asynchronous exchange of dependencies between Software instances.
> The deployment and life cycle actions are delegated to plug-ins. This can be Bash, Puppet, Chef, ANT, a Java plug-in...
> This is what takes most of the time to write with Roboconf.
