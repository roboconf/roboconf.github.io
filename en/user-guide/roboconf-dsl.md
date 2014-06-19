---
title: "Roboconf DSL"
layout: page
id: "ug.snapshot.roboconf-dsl"
menus: [ "users", "user-guide" ]
---

Here is a summary of Roboconf's DSL and keywords.  
Let's start with graph(s) definitions.

The graph(s) is a set of graphs.  
It is made up of roots components. A component can have several children, and several parents.
A graph(s) must have at least one root component. Several root components indicate several entry points to 
walk through the graph(s).


## Components

A component is defined as follows:

	MyComp {
		...
	}

It is a name followed by an opening curly bracket.  
Component properties must be defined from the next line, **one property per line**.

Here are the supported properties for a component.

| Property | Description | Required |
| --- | --- | --- |
| installer | The installer name, that is to say, which Roboconf extension will handle the life cycle of this component instances. | yes |
| alias | A description of a component. An alias aims at being more user-friendly than the component name. | yes |
| icon | The location of an icon file (\*.jpg, \*.png, \*.gif). | no |
| children | A list of component names, separated by a comma. As an example, an Apache component being a child of a VM component means we could deploy Apache on a VM. | no |
| exports | A list of exported variables, separated by a comma. Network properties are set dynamically by Roboconf. Others (e.g. a port) must have a default value. | no |
| imports | A list of imported variables, separated by a comma. It means this component will need dependencies to be started. An import can be marked as **optional**. | no |
| facets | Some properties can be grouped together in facets. So, this is a list of facet names, separated by a comma. | no |

<br />
Here is a commented example of a component (without any facet).

	ApacheServer {
		installer: puppet;			# Apache instances will be deployed by Roboconf's Puppet extension
		alias: a Tomcat server;		# An alias
		icon: apache.jpg;			# An icon located in the graph resources
		
		# Web applications could be deployed over this Apache server
		children: My-Dash-Board, Marketing-Suite;
		
		# Properties exported by this component.
		exports: ip, port = 19099;
		# 'port' should have a default value, or we will have to set it when we create an instance.
		# 'ip' will be updated at runtime by Roboconf's agent.
		
		# Other components properties that this server needs to have so that it can start.
		imports: LB.port (optional), LB.ip (optional);
		
		# Here, the Apache may also be notified about components instances of type LB.
		# The imports are marked as optional. It means that if there is no LB instance, an
		# Apache instance will be able to start anyway. 
		#
		# If the import was not optional, e.g.
		#
		# imports: LB.port, LB.ip;
		# or even
		# imports: LB.port (optional), LB.ip;
		# 
		# ... then an Apache instance would need at least one LB instance somewhere.
	}

Notice that exported variables are prefixed by the component (or the facet) name that defined them.  
As an example, if a component Tomcat exports **port** and **ip**, and that another component wants to import them,
it will need to import **Tomcat.port** and **Tomcat.ip**. Same thing if the variables are exported by a facet.

## Facets

Facets are defined in graph(s) definitions.  
A facet is almost like a component, except it is used to group properties and make their reusable (inheritable)
among components.

Here is an example of facet.

	facet LoadBalanced {
		exports: ip, port;	# Define we export two variables.
		installer: puppet;	# Define it will be installed by the Puppet extension.
	}

Here are the supported properties for a facet.

| Property | Description | Required |
| --- | --- | --- |
| installer | The installer name, that is to say, which Roboconf extension will handle the life cycle of this component instances. | no |
| icon | The location of an icon file (\*.jpg, \*.png, \*.gif). | no |
| children | A list of component names, separated by a comma. As an example, an Apache component being a child of a VM component means we could deploy Apache on a VM. | no |
| exports | A list of exported variables, separated by a comma. Network properties are set dynamically by Roboconf. Others (e.g. a port) must have a default value. | no |
| extends | A facet may extend other facets. So, this is a list of facet names, separated by a comma. | no |

<br />
Unlike components, facets do not have a resource directory.  
In fact, facets are just a way to shorten component definitions, by making reusability easier.


## Instances

We have seen graph(s) definitions. Let's continue with instances definitions.  
Instances reference components an may override the value of exported properties. They cannot
add or remove properties (neither exported, nor imported). They must be compliant with their component definition.

An instance is defined as follows:

	instanceof MyComp {
		name: MyInstance1;
		...
	}

It starts with the **facet** keyword, followed by a component name and an opening curly bracket.  
Instance properties must be defined from the next line, **one property per line**.

Here are the supported properties for an instance.

| Property | Description | Required |
| --- | --- | --- |
| name | The instance name. It supports spaces. | yes |
| count | The number of instances to create. If not set, it is assumed to be 1. | no |
| channel | Channels are used to adjust the target of messaging in Roboconf (this feature is not yet back in the code). | no |
| instance-data | Instance data. This is not expected to be set by hand. But you may encounter it. | no |
| instance-state | The instance state. This is not expected to be set by hand. But you may encounter it. | no |

<br />
Instances can be defined hierarchically.  
Here is an example.

	instanceof VM {
	
		# This will create 5 VM instances, called VM 1, VM 2, VM3, VM 4 and VM 5.
		name: VM ;	# Yes, there is a space at the end... :)
		count: 5;
		
		# On every VM instance, we will deploy...
		instanceof Tomcat {
			name: Tomcat;
		}
	}

Instances can also override properties from their component.  
Assuming the Tomcat component specified...

	Tomcat {
		exports: ip, port = 8080;
	}
	
... a Tomcat instance may override the port value.

	instanceof Tomcat {
		name: Tomcat;
		port: 11000;
	}

It may also define properties that were not defined in the component.  
This can be useful sometimes to pass specific data in a script or a Puppet module.

	instanceof Tomcat {
		name: Tomcat;
		port: 11000;
		checked: true;
	}
