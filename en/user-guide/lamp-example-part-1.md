---
title: "LAMP Example - Part 1"
layout: page
cat: "ug-last"
id: "lamp-example-part-1"
menus: [ "users", "user-guide", "0.4" ]
---

Let's take an example to understand the way Roboconf works.  
The example is a classic JEE application, with...

* ... a load-balancer relying on Apache and mod-proxy.
* ... an application server (Tomcat).
* ... a MySQL database.

<img src="/resources/img/LAMP-description.jpg" alt="A Classic LAMP use case" />

> This example illustrates cloud deployment and elasticity patterns.


* Dependencies between components: 
    * A Tomcat instance depends on the MySQL instance (because it needs the MySQL IP / port + database credentials).
    * The Apache instance depends on Tomcat instances because it needs their IP and port to configure mod_proxy.
    
* IaaS elasticity patterns: multiple Tomcat nodes can be added/removed to adapt to traffic, but it requires a
hot re-configuration of the Apache node (so mod-proxy knows about all the available Tomcat nodes).


## Initial Deployment Pattern

Roboconf is told to deploy Apache, MySQL and Tomcat on 3 separate VMs, as follows:

<pre><code class="language-roboconf">
# A VM with Apache only
instance of VM {
        name: Apache VM;
        instance of Apache {
                name: Apache;
        }
}

# A VM with MySQL only
instance of VM {
        name: MySQL VM;
        instance of MySQL {
                name: MySQL;
        }
}

# A VM with Tomcat only
instance of VM {
        name: Tomcat VM 1;
        instance of Tomcat {
                name: Tomcat;
        }
}
</code></pre>

What is a VM, what is a Tomcat... all of this is explained below.

## Dependencies Between Components

Here, we will use Roboconf to deploy Apache (+ mod-proxy), Tomcat (+ webapp), and MySQL (+ data) on 3 separate VMs:
 this includes updating the configuration files as soon as dependencies can be resolved (e.g. when it is aware of the MySQL 
 IP / port, Roboconf will send them to the Tomcat node, so it can update its configuration and start).

The application nodes (MySQL, Tomcat, Apache) are defined as follows:

<pre><code class="language-roboconf">
# MySQL database
MySQL { 
	installer: puppet;
	exports: ip, port = 3306;
}     

# Tomcat + webapp
Tomcat {
	installer: puppet; 
	exports: ip, portAJP = 8009;
	imports: MySQL.ip, MySQL.port;
}

# Apache + load Balancer
Apache { 
	installer: puppet; 
	imports: Tomcat.portAJP, Tomcat.ip;
}

# A VM
VM {
	installer: target;
	children: MySQL, Tomcat, Apache;
}
</code></pre>

As you can see, the VM is supposed to support the deployment of either Apache, Tomcat or MySQL components.

And each components is described in terms of imports/exports:

* Exports are configuration variables that the components makes available to the world 
(e.g. the Tomcat node exports its IP and AJP port)
* Imports are configuration variables needed by the component to complete its configuration, 
before starting (e.g. the Apache node imports IP and AJP ports of any available Tomcat node that exports them).

With this description, Roboconf knows when a deployed component can be started: when all its imports are resolved!  
Roboconf is in fact responsible for import/export exchanges between components, and life cycle management
(e.g. start the component when imports are resolved).


Let's see what these descriptions allow to do concretely. [Go to part 2.](lamp-example-part-2.html)
