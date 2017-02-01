---
title: "Application Descriptor"
layout: page
cat: "ug-0-7"
id: "application-descriptor"
menus: [ "users", "user-guide", "0.7" ]
---

A Roboconf project must contain a **descriptor** directory with an application descriptor inside.  
This descriptor must be named **application.properties**.

It contains basic information related to the application itself.  
Here is a sample you can copy / paste and edit.

```properties
# Application Descriptor for Roboconf

# The application name (required)
# It should be readable by a human.
application-name = Your Application Name

# The application qualifier (required)
# It can be a version number, a build ID, whatever.
# It should be readable by a human.
application-qualifier = snapshot

# The application's description (optional)
application-description = The description of \
your application

# The DSL ID (optional)
# For the moment, Roboconf only knows 1 DSL,
# but it may support other standards or definitions later.
application-dsl-id = roboconf-1.0

# The main graph file (required)
# A graph definition may contain several files. This property indicates
# the one to read first.
graph-entry-point = main.graph

# The main instances file (optional)
# An instance definition may be made up of several files. This property
# indicates the one to read first.
instance-entry-point = definition.instances
```


## Advanced Properties

Additional properties can appear in this descriptor.  
See the page related to [inter-applications dependencies](inter-application-dependencies.html) for more details.


## Maven Integration

By using the [Roboconf Maven plug-in](maven-plugin.html), it is possible to inject Maven properties in the descriptor.  
Example:

```properties
application-name = Tomcat 8 cluster
application-qualifier = ${project.artifactId}-${project.version}

# Etc.
```
