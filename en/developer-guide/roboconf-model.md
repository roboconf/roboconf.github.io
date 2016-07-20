---
title: "Roboconf Model"
layout: page
cat: "dg-snapshot"
id: "roboconf-model"
menus: [ "developers", "developer-guide" ]
---

This page explains the way Roboconf manages the model things.  

There is not ONE Roboconf model, but TWO Roboconf models.  
They cover various steps and requirements.

Roboconf's model is handled in **roboconf-core**.  
Both models are handled by the same bundle. They could be separated later if several DSL
were used.


## The Parsing Model

The **parsing model** is the result of parsing configuration files.  
It stores regions and their content.

As an example...

<pre><code class="language-roboconf">
# This is a comment
Tomcat {
	alias: a Tomcat component;
	exports: ip, port = 8080;	# set the default port value
}
</code></pre>

This small portion is made up of several regions.

* A comment section, with the content "This is a comment".
* A component declaration.
* A component property.
* Another component property with an in-line comment.
* The end of a component declaration.

This model allows to write editors in IDE (Eclipse, Netbeans, whatever).  
This is why the parsing model is not internal. Eclipse plug-ins may import these classes.
From an in-memory representation, we can update a text portion. This model is useless at runtime.

Facets are handled at this level.  
In the runtime model, there is no facet, but only components. This way, developers
have a simple object to manipulate: components. All the complexity has been handled
at parsing time.


## The Runtime Model

The runtime model is the one actually used by the platform at runtime.  
It manipulates Roboconf concepts, such as the graph, components and instances. It is what is
generally called a *model* in platforms.

The transition between the parsing model and the runtime model is achieved through converters.
There are converters for both directions (parsing to runtime and runtime to parsing). This could
also allow other DSL to be implemented for Roboconf. One could have its own parsing model. What is
important is to be able to map it to the runtime model.


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
6. Recipes Errors (related to scripts or Puppet modules as an example)
7. Commands Errors (related to Roboconf commands)
8. Rules Errors (related the autonomic)
9. Execution Errors (not yet setup in the code, but for runtime errors)

The *ErrorCode* class aims at centralizing every error information.  
This should help to create a catalog of errors for production environments.


## Configuration Files

Roboconf's DSL is inspired from CSS.  
It was preferred over XML (easy but heavy), JSon (not user-friendly) and YAML 
(error prone when many levels of indentation).

Its main force is to be very simple, with the minimal set of characters to write.  
Every instruction must fit into a single line. So, **one line = one instruction**.

Comments are a little bit specific.  
On one hand, they are instructions (in some way). There are no multi-line comments. 
A comment is a single line and starts with sharp character. And on the other hand,
every instruction can have an end comment. So, on a same line, there can be an instruction
(such as an installer name), followed by a comment.


## DSL Version

The Roboconf DSL may be upgraded with time.  
New instructions may appear. This is why a specific property called **dsl-version** was introduced.
This will help to select the right parser. 

This way, parsers should only focus on one version.  
This will help to maintain the code and support version upgrades with less efforts.

For the moment, the default (and unique) parser only reads this property.  
It does not check if it is really what it supports.
