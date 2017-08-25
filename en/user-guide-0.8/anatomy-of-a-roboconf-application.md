---
title: "Anatomy of a Roboconf Application"
layout: page
cat: "ug-0-8"
id: "anatomy-of-a-roboconf-application"
menus: [ "users", "user-guide", "0.8" ]
---

A Roboconf application is a ZIP archive with the following structure.  
Reading this page may help to understand what Roboconf does.

<pre class="file-hierarchy">
MyApp/
│
├── <strong>descriptor/</strong>
│	└── application.properties
│
├── <strong>graph/</strong>
│	├── *.graph file
│	├── Component 1/ (recipes)
│	├── Component 2/ (recipes)
│	└── Component 3/ (recipes)
│
├── <strong>instances/</strong> <i>(optional)</i>
│	└── *.instances
│
├── <strong>commands/</strong> <i>(optional)</i>
│	└── *.commands
│
├── <strong>probes/</strong> <i>(optional)</i>
│	├── Component 1.measures (probe configuration)
│	├── Component 1.measures.properties (probe parameterization)
│	├── *.measures (probe configurations)
│	└── *.measures.properties (probe parameterization)
│
└── <strong>rules.autonomic/</strong> <i>(optional)</i>
 	└── *.drl
</pre>

Let's detail each directory.  

**descriptor/** contains the main Roboconf configuration file, **application.properties**.  
This file describes the application itself (name, description, location of the main model files...).

**graph/** contains at least one *.graph* file (whose name is specified in **application.properties**).  
Graph files list Software components and their relations (runtime dependencies, containment relations...).
**graph/** also contains one sub-directory for each component listed in the graph model.
This sub-directory must contain all the files necessary to manage the component's life cycle 
(e.g. scripts, Software packages, configuration files...)

**instances/** contains *.instances* files.  
Instances define the effective runtime model, that is to say Software instances that already run
or those that are ready to be deployed.

**commands/** contains *.commands* files.  
A *.commands* file is like a script with Roboconf instructions. They can be used to define administration
procedures to invoke from the web console or by the autonomic manager.

**probes/** contains configurations for probes managed by Roboconf agents.  
These probes are mainly used with the autonomic to gather information about machines and programs
and be able to react when something goes wrong.

**rules.autonomic/** contains *.drl* files.  
It is the same extension than Drools rules, with almost the same syntax. These rules allow to specify
automatic reactions Roboconf will undertake when several events (notified by Roboconf agents and their probes)
are met. These automatic reactions must be specified as Roboconf commands.
