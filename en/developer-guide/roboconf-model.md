---
title: "Roboconf Model"
layout: page
id: "dg.snapshot.roboconf-model"
menus: [ "developers", "developer-guide" ]
---

This page explains the way Roboconf manages the model things.  

There is not a Roboconf model, but TWO Roboconf models.  
They cover various steps and requirements.

Roboconf's model is handled in **roboconf-core**.


## The Parsing Model

The **parsing model** is the result of parsing configuration files.  
It stores regions and their content.

As an example...

	# This is a comment
	Tomcat {
		alias: a Tomcat component;
		exports: ip, port = 8080;	# set the default port value
	}

This small portion is made up of several regions.

* A comment section, with the content "This is a comment".
* A component declaration.
* A component property.
* Another component property with an in-line comment.
* The end of a component declaration.

This model allows to write editors in IDE (Eclipse, Netbeans, whatever).  
From an in-memory representation, we can update a text portion. This model is useless at runtime.

Facets are handled at this level.


## The Runtime Model

The runtime model is the one actually used by the platform at runtime.  
It manipulates Roboconf concepts, such as the graph and the instances. It is what is
generally called a *model* in platforms.


## Dispatch

Each model has its own utilities: 

* input / output (or read and write)
* validation
* converters
* helpers
* ...


## Model Validation

When Roboconf loads an application, it goes through many steps.  
If a given steps has errors, then the application loading fails.

1. Find and check the application's descriptor.
2. Load and analyze the graph.
3. Load and analyze the initial instances.

The application descriptor is a simple properties file.  
The graph and the initial instances use a custom parser. Their parsing follows the same process. 

1. Parsing => Parsing Errors + Parsing Model
2. Analysis of the Parsing Model => Parsing Model Errors
3. Conversion of the Parsing Model into a Runtime Model => Conversion Errors
4. Analysis of the Runtime Model => Runtime Model Errors


## Error Codes

Error codes are centralized in **roboconf-core**.  
Roboconf errors are defined in a Java bean called *RoboconfError*. Every instance of this class
is associated with an *ErrorCode* instance. An ErrorCode is an enumerated type with all the possible errors
in Roboconf.

An error code has an ID, an error message, a severity (severe or simple warning) and a category.

1. Parsing Errors
2. Parsing Model Errors
3. Conversion Errors
4. Runtime Model Errors
5. Projects Errors (if files are missing, such as the application descriptor)
6. Execution Errors (not yet setup in the code, but for runtime errors)

The *ErrorCode* class aims at centralizing every error information.  
This should help to create a catalog of errors for production environments.


## Configuration Files

Roboconf's DSL is inspired from CSS.  
It was preferred over XML (easy but heavy), JSon (not user-friendly) and YAML 
(error prone when many levels of indentation).

Its main force is too very simple, with the minimal set of characters to write.
