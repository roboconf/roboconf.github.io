---
title: "Roboconf Commands"
layout: page
cat: "ug-snapshot"
id: "roboconf-commands"
menus: [ "users", "user-guide", "Snapshot" ]
---

This page introduces the notion of command.  


## Commands Definition

Commands are a way to script Roboconf instructions.  
They allow to define complex behaviors with a simple syntax.
They can be executed from the web console or triggered by [the autonomic manager](autonomic-management-with-roboconf.html).

Commands are defined in \**.commands* files.  
These files are either provided in application templates, under the **commands** directory, or created and edited
through the web console.

Commands are ALWAYS associated with applications.  
Applications inherit commands from their templates, but then live independently of it.


## Command Instructions

The section provides an overview of the various available instructions that can be found
in a command file. They are shown through examples with comments.

<pre><code class="language-roboconf-commands"># Create a root instance.
# @parameter: a component name
# @parameter: an instance name
Create RootComponent as myRoot

# Create a new instance.
# @parameter: a component name
# @parameter: an instance name
# @parameter: the path of the parent instance
Create component as myInstance under /myRoot

# Replicate a root instance.
# It replicates all the children instances as well.
# It only works with root instances.
# 
# If the instance to copy is associated with a deployment target,
# then the copy will also be associated with it.
# @parameter: a root instance name
# @parameter: a new instance name
Replicate myRoot as myRoot2

# Rename an instance.
# @parameter: an instance path
# @parameter: a new instance name
Rename /myRoot2 as myRootCopy

# Associate a root/scoped instance with a given target.
# @parameter: an instance path
# @parameter: a target ID
Associate /myRootCopy with 3

# Change the state of an instance.
# @parameter: an instance path
# @parameter: a stable Roboconf state
Change status of /myRoot/myInstance to NOT_DEPLOYED
Change status of /myRoot/myInstance to DEPLOYED_STOPPED
Change status of /myRoot/myInstance to DEPLOYED_STARTED

# Bulk actions.
# These actions are performed on the instance itself and on its children too.
# @parameter: an instance path
Deploy and start all /myRootCopy
Stop all /myRootCopy
Undeploy all /myRootCopy

# Delete an instance.
# This instance must be in the "not_deployed" state.
# @parameter: an instance path
Delete /myRootCopy
</code></pre>

Instance creation only impacts the runtime model.  
Creating an instance and deploying or starting it are two different actions.

When naming instances, it is possible to inject some variables that Roboconf will replace.  
And you can create your own ones.

<pre><code class="language-roboconf-commands"># $(INDEX) is a predefined variable to inject a smart index.
# Here, it will create "myInstance 1".
# If "instance 1" was already existing, it would create "instance 2".
Define smartIndex = $(INDEX)
Create component as myInstance $(smartIndex) under /myRoot
Deploy and start all myInstance $(smartIndex)

# Here, it will create "myInstance 2".
# We just override our previous variable.
Define smartIndex = $(INDEX)
Create component as myInstance $(smartIndex) under /myRoot
Deploy and start all myInstance $(smartIndex)

# $(NANO_TIME) is a predefined variable with the time in nanoseconds.
Define ntime = $(NANO_TIME)
Rename /myRootCopy as myRootCopy_$(NANO_TIME)

# $(MILLI_TIME) is a predefined variable with the time in milliseconds.
Define mtime = $(MILLI_TIME)
Create component as myInstance $(mtime) under /myRoot

# $(UUID) is a predefined variable that generates a random (unique) string.
Define randomString = $(UUID)
Create component as myInstance $(randomString) under /myRoot

# You can reuse your variables to define new ones.
Define mtime_bis = $(mtime)_bis
Create component as myInstance $(mtime_bis) under /myRoot 
</code></pre>

> A command instruction is supposed to stand on a single line.  
> However, it is possible to split a line by putting the '\' character before a line break.


<pre><code class="language-roboconf-commands">
Create component \
       as myInstance $(smartIndex) \
       under /myRoot
</code></pre>
