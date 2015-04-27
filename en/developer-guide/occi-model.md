---
title: "OCCI Model for Roboconf"
layout: page
cat: "dg-snapshot"
id: "occi-model"
menus: [ "developers", "developer-guide" ]
---

This page aims at specifying an OCCI-compliant extension for Roboconf.  
The [OCCiware](http://www.occiware.org) project defined an EMF meta-model. The global idea is to map Roboconf concepts
as OCCI resources, links, mix-ins, etc.


## Roboconf Concepts

Roboconf has the following concepts.

* Application template
* Application
* Graphs (which wraps types definitions)
* Facet (which is an abstract type)
* Component (which is a concrete type)
* Instance (which is an instanced type)

And there are various relations between these concepts.


## Class Diagram

The following class diagram illustrates the relations between Roboconf concepts.  
Notice that **instance data** are not present in the model, there are considered like a developer trick rather than a real concept.
Same thing for **instance imports**, which are runtime structures and do not aim at being manipulated by users.

<img src="/resources/img/roboconf-class-diagram-for-occi.png" alt="Class diagram" class="gs" />

A [SVG version](/resources/img/roboconf-class-diagram-for-occi.svg) is also available.  
As usual with [draw.io](https://www.draw.io/) diagrams, sources are available on Roboconf's web site resources.

This diagram may look ugly.  
Let's detail it a little bit.

* An application and an application template share common properties.
* An application is always created from a template.
* An application template always has a graph.
* An application may have any number of root instances.
* Facets and components are types.

* Various relations exist between types.
   * A type may be instantiated **only** within another type. It is a **hierarchy** relation.
   * A type may depend on other types (dependency / variable resolution). It is a **runtime** relation.
   * A type may inherit properties from another type. It is an **inheritance** relation.

<!-- -->

* *Component* extends *Facet*. So, every behavior available for a facet also exists for a component.
* Only components can have hierarchical and runtime relations. In this context, a facet designates all the components that inherit from this facet.
* An instance is associated with only one component.


## OCCI Diagram

The following diagram was generated with Eclipse's ecore tooling.  
It is based on the ecore model that was contributed in the [OCCIware project](https://github.com/occiware).

This diagram is compliant with the OCCI meta-model.  
The concepts described above extend **Resource**. And we defined relations that exist between them as **Link**s.
There is no mix-in in Roboconf.

> This mapping was made so that we can easily create Roboconf configuration files from a Roboconf OCCI model.
> AND, it was made so that runtime conversion between Roboconf model classes and an OCCI RESTful API is efficient.


## Model Constraints

There are also some constraints that cannot be represented on the class and OCCI diagrams.  
In the ecore model, they are translated as OCL constraints.

Here is a textual definition of these constraints.

**1: comp-ext-one-comp**

	A component can only extend directly one component.
	You can compare facets to Java interfaces and components to Java classes.
	
	Like the diagram suggests it, a component can extend any number of facets.

**2: facet-cannot-ext-itself**

	A facet cannot extend (directly or indirectly) itself.

**3: comp-cannot-deploy-over**

	A component cannot be deployed (directly or indirectly) on itself (prevent cycle).
	This may be seen as a limit for Docker containers, but they should be modeled differently according to their use,
	even if they share the same configuration (think about debug and support).

**4: comp-optional-dep**

	A component cannot depend on itself, unless the dependency is optional.

**5: root-components**

	Graphs root components cannot not have any (hierarchical) parent.

**6: root-instances**

	Applications root instances cannot have any (hierarchical) parent.

**7: instance-and-graph-coherence**

	Instance hierarchy must be coherent with the component hierarchy.  
	Said differently, if instance A is a child of instance B, then the component (of instance) B must be a
	(hierarchical) parent of the component A.

**8: graph-facets-are-facets**

	Graphs facets can only be facets, and not components.

> Notice that all these constraints are already checked in the Roboconf validator.  
> Except the Roboconf validator works on Roboconf classes and not on an OCCI-compliant meta-model.
