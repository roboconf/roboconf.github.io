---
title: "Application Descriptor"
layout: page
cat: "ug-0-4"
id: "application-descriptor"
menus: [ "users", "user-guide", "0.4" ]
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
