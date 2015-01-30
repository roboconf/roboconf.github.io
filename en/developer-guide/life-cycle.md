---
title: "Life Cycle"
layout: page
id: "dg.snapshot.life-cycle"
menus: [ "developers", "developer-guide" ]
---

## Applications

Roboconf applications do not have a life cycle.  
What does the life cycle of a distributed application mean? Assuming
you start the application, it means all its parts are started. But some parts may be
optional, the application may work without them. Besides, what is the state of the application
when one of its vital part falls?

For these reasons, it was decided to not associate a life cycle with a Roboconf application.  
Instead, such an application supports the following operations:

* **Addition:** load and add a new application to the list of managed applications.
* **Shutdown:** a commodity operation to undeploy all the parts of the application.
* **Removal:** remove the application from the managed applications.  
This is only possible when all the application parts have been undeployed.

Eventually, there are several operations to perform on the applications parts.


## Instances

In Roboconf, applications parts are called instances.  
An instance is associated with a component, itself defined in the graph model.

An instance is a specific piece of Software, running and working within the scope of a Roboconf application.  
It can be an application server, a database, an applicative module or even a VM. 

Instances have a life cycle.

<img src="/resources/img/instance-life-cycle.png" alt="The life cycle of an instance" />

<br />

Some of the steps are said *unstable* (or *transitive*): **deploying**, **starting**, **stopping** and **undeploying** will 
end up with a stable state (either **not deployed**, **deployed - started** and **deployed - stopped**). The transitive states
are used to report information to the user. Indeed, deploying (or starting, or stopping, or undeploying) an application can be 
a long-running operation.

The **unresolved** state is reserved to non-root instances.  
Before a **deployed** instance can be started, its dependencies are verified. If they are all
satisfied (Roboconf knows where they are and that they were started), then the instance can be started.
Otherwise, it will remain in the **unresolved** state until its dependencies are resolved. Once they
are all satisfied, Roboconf will automatically start the instance. So, when an instance is in this state,
it means &laquo; *I will start as soon as all my dependencies are resolved* &raquo;.

The **problem** state is a little bit specific.
It is reserved for root instances (often VM). If a **started** root instance has not sent a heart beat for some time,
the root instance will go into the **problem** state. If a heart beat arrives, it will go back into the **deployed - started** state.

> If a root instance is in the **PROBLEM** state, it means either that the agent encountered a
> problem, that the VM has network issues, or that the messaging server had a problem. It does not
> mean application parts do not work.

Another difference of root instances is that they do not reach the **deployed - stopped** state.  
They are either deployed and started, or not deployed. They cannot go through the intermediate states.

Let's now illustrate the life cycle of an instance with an example.  
We will take the LAMP example (Apache load balancer, Tomcat and MySQL). We will focus on the Tomcat server.

1. We have created and started a VM for the Tomcat server.
2. We now create an instance in our model to declare a Tomcat server. State is **not deployed**.
3. We deploy it. Its state first jumps to **deploying**. Once it is deployed, the state switches to **deployed - stopped**.
4. We start it. It goes to the **unresolved** state.
5. If all its imports are resolved (i.e., a MySQL database was deployed and started), then it can go to the **starting**
state before ending (normally) in the **deployed - started** state.
Otherwise, it will remain in the **unresolved** state until a MySQL database is started. Let's suppose a MySQL database was started.
The state of the Tomcat instance is **deployed - started**.
6. Let's stop the MySQL database. Roboconf changes the Tomcat's state to **unresolved** again. All the other instances that depend on this
Tomcat instance will also update their life cycle if necessary (chain reaction). Restart the MySQL instance and the Tomcat will go back
into **deployed - started** state.
7. We stop the Tomcat server. State goes through **stopping** before ending with **deployed - stopped**.
8. We undeploy the instance. State goes through **undeploying** before ending with **not deployed**.

> **&laquo; not deployed &raquo;** is a state that allows to declare instances without deploying them.


## Grouped Operations

The life cycle of application instances is managed through the Deployment Manager.  
A user that wants to modify the state of an instance will have to use the REST API. This API
can modify the state of an instance, or modify states in bulk mode.
