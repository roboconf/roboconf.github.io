---
title: "Graph Definition"
layout: page
cat: "ug-0-1"
id: "graph-definition"
menus: [ "users", "user-guide", "0.1" ]
---

## The Graph

The graph is the central element in Roboconf's configuration files.  
It defines Software components and their relations. At runtime, it will be used to determine
what can be instantiated, and how it can be deployed.

> The graph defines relations between components.  
> A component by itself is just a definition (like a Java class). At runtime,
> we do not manipulate components but instances of a component.

Software components include the deployment roots (virtual machines, devices, remote hosts),
databases, application servers and application modules (WAR, ZIP, etc). They list what you want
to deploy (or possibly deploy). Two kinds of relations are modeled:

* **Containment** means a component can be deployed over another one.  
As an example, a Tomcat server can be deployed over a virtual machine. Or a web application
(WAR) can be deployed over a Tomcat server.

* **Runtime** relations references components that work together.  
As an example, a web application needs a database. More specifically, it needs the IP address
and the port of the database. Generally, this information is hard-coded. Roboconf can instead
resolve them at runtime and update the configuration files. As an example, MySQL, Tomcat and MySQL can
be deployed in parallel. Tomcat will be deployed but will not be able to start until it knows where is
the database. Once the database is deployed and started, Roboconf will update Tomcat configuration so
that it knows where is MySQL. This is what runtime dependencies make possible.

What is modeled in the graph is really a user choice.  
Various granularity can be described. It can goes very deeply in the description...

<img src="/resources/img/LAMP-modular.jpg" alt="High Granularity" class="illustration" />

... or bundle things together (associate a given WAR with an application server).

<img src="/resources/img/LAMP-legacy.jpg" alt="Low Granularity" class="illustration" />

Multi-IaaS is supported by defining several root components.  
Each one will be associated with various properties (IaaS provider, VM type, etc).  
The following graph means *my deployable* can be deployed either on EC2 virtual machine or on
an Openstack VM.

<img src="/resources/img/Multi-Iaas--1.jpg" alt="Graph for Multi-Iaas" class="illustration" />

Until now, we have talked of a graph.  
However, if you look at Roboconf's source code, we manipulate **graphs*. In fact, you can define a
single graph, or a collection of graphs. The interest of having several graphs is to define virtual appliances.
As an example, you could define the following graphs inside a same project:

* VM_Tomcat / Tomcat / Web Application "A"
* VM_MySQL / MySQL
* VM_Apache_Load_Balancer / Apache

Or you could define a single graph, with a single root VM and three possible children (Tomcat,
MySQL and Apache Load Balancer). The IaaS on which the VM is will be created is defined in the component's
resources directory. We will see this later.


## Graph Configuration

A Roboconf project must contain an **graph** directory with the definition of a graph.  
As a reminder, like a Java class, a Roboconf component is only a definition.
It needs to be instantiated to be used.

By convention, graph definitions are expected in files with the **graph** extension.
The parser will not be difficult if you use another extension. However, notice that tools
may rely on the extension (such as editors, to provide syntax highlighting).

A component starts with the component name, followed by an opening curly bracket.  
Components can be defined in any order. 

<pre><code class="language-roboconf">
# This is a comment
# There are only in-line comments

# The VM
VM {
	alias: Virtual Machine;
	installer: iaas;
	children: MySQL, Tomcat, Apache;
}

# MySQL database
MySQL {
	alias: MySQL;
	installer: puppet;
	exports: ip, port = 3306;
}

# Tomcat
Tomcat {
	alias: Tomcat with Rubis;
	installer: puppet;
	exports: ip, portAJP = 8009;
	imports: MySQL.ip, MySQL.port;
}

# Apache Load Balancer
Apache {
	alias: Apache Load Balancer;
	installer: puppet;
	imports: Tomcat.portAJP, Tomcat.ip;
}
</code></pre>

> Important!  
> Every component property must be defined on a single line.

Components can be defined in separate files (think to
the case where you have several graphs in your graph model, you could have one file per graph). 

> The import mechanism will be documented later.

Let's see the properties you can or have to set for a component.

* **alias** is mandatory and provides a human-readable name.  

* **installer** is mandatory and designates the Roboconf plug-in that will handle the life cycle of component instances.  
Examples of Roboconf plug-ins include Bash and Puppet implementations.

* **children** lists the component that can be instantiated and deployed over this component.  
In the example above,
it means we can deploy MySQL, Tomcat and Apache over a VM instance.

* **exports** lists the variables this component makes visible to other components.  
Variable names are separated by commas. **ip** is a special variable name whose value will be set dynamically
by Roboconf. All the other variables should specify a default value.

> The IP address is a special variable.  
> In fact, other network properties should be supported soon.

* **imports** lists the variables this components needs to be resolved before starting.  
Variable names are separated by commas. They are also prefixed by the component that exports them. As an example,
if Tomcat exports the *ip* variable, then a depending component will import *Tomcat.ip*.

> A component instance will not be able to start until all its runtime dependencies are resolved.  
> It means all the variable it imports must be exported by another instance. If one variable has no value,
> then it cannot start.

Import can also be marked as **optional**.  
In this case, the instance will be able to start even if the imported variables are not resolved.
As an example, if you think to a cluster mode, a cluster member may need to know where are the other members.

<pre><code class="language-roboconf">
ClusterMember {
	alias: a Cluster member;
	exports: varA, varB;
	imports: ClusterMember.varA (optional), ClusterMember.varB (optional);
}
</code></pre>

## Facets

Sometimes, components may share a lot of configuration.  
To limit redundancy, Roboconf added the notion of **facet**. A facet groups properties that can then be applied to components.
A component may *inherit* from several facets.

Let's take a look at an example.

<pre><code class="language-roboconf">
###################################
## First, components...
###################################

# The VM
VM_EC2 {
	alias: Virtual Machine on EC2;
	facets: VM;
}

VM_Azure {
	alias: Virtual Machine on Azure;
	facets: VM;
}

# MySQL database
MySQL {
	alias: MySQL;
	facets: deployable;
	installer: puppet;
	exports: ip, port = 3306;
}

# Tomcat
Tomcat {
	alias: Tomcat with Rubis;
	facets: deployable;
	installer: puppet;
	exports: ip, portAJP = 8009;
	imports: MySQL.ip, MySQL.port;
}

# Apache Load Balancer
Apache {
	alias: Apache Load Balancer;
	facets: deployable;
	installer: puppet;
	imports: Tomcat.portAJP, Tomcat.ip;
}


###################################
## Then, facets...
###################################

# The VM facet
facet VM {
	children: deployable;
	installer: iaas;
}

# The deployable facet
facet deployable {
	# nothing
}

# Facets are not very useful here. We could put everything in components (see lamp-legacy-1).
# However, it shows what can be seen as a good practice for bigger VM deployments.
</code></pre>

A component lists the facets it uses with the property named **facets**.  
It will inherit all the imported and exported variables, as well as the children and installer name. If
a component inherits several installers, and does not specify one, then an error is thrown. In case of ambiguity
in the inheritance, the component has to override the installer. There can be only one installer.

Imported and exported variables are only added to the component.  
A facet supports the following properties: **children**, **exports**, **imports** and **installer**.

> Facets are only a way to group properties.  
> At runtime, there is no "facet" object in Roboconf's internal model. This is a parsing commodity
> to reduce the size of configuration files.


## System Requirements

The graph model allows define multi-container and distributed topologies.  
We can go from the machine (VM, device...) to an application module (e.g. a Web Application). However, and even if
the model could support it, it is not considered as a good practice to define system requirements as graph nodes.

What does it mean?  
Let's take an example.

If an application server needs a JVM or a library to run (such as Python), you should not rely on Roboconf
to install it. It is not that you could not achieve it with a Bash script or something else. But it may be better
to pre-install and configure such dependencies directly in the virtual images. As an example, there are mechanisms
in Java Virtual Machines such as endorsed and policies that would be painful to configure with Roboconf. And, again,
the problem here is not Roboconf, but the way you would implement it with a Roboconf plug-in (Bash, Puppet...).

This has been experimented with NodeJS application.  
Write a Bash script that respect Roboconf's requirements (be idem-potent) that installs NodeJS and NPM was quite painful to do.
Pre-installing them on virtual images was much more convenient.

> System requirements should not be deployed with Roboconf.  
> They should be deployed and configured in the virtual images.
