---
title: "Roboconf Commands"
layout: page
cat: "ug-last"
id: "roboconf-commands"
menus: [ "users", "user-guide" ]
---

This page introduces the notion of command.  


## Commands Definition

Commands are a way to script Roboconf instructions.  
They allow to define complex behaviors with a simple syntax.
They can be executed from the web console or triggered by [the autonomic manager](autonomic-management-with-roboconf.html).

Commands are defined in \**.commands* files.  
These files are either provided in application templates, under the **commands** directory.

Commands are ALWAYS associated with applications.  
Applications inherit commands from their templates, but then live independently of it.


## Basic Command Instructions

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
# @parameter: a root instance's path
# @parameter: a new instance name
Replicate /myRoot as myRoot2

# Rename an instance.
# @parameter: an instance's path
# @parameter: a new instance name
Rename /myRoot2 as myRootCopy

# Associate a root/scoped instance with a given target.
# @parameter: a scoped instance's path
# @parameter: a target ID
Associate /myRootCopy with 3

# Change the state of an instance.
# @parameter: an instance's path
# @parameter: a stable Roboconf state
Change status of /myRoot/myInstance to NOT_DEPLOYED
Change status of /myRoot/myInstance to DEPLOYED_STOPPED
Change status of /myRoot/myInstance to DEPLOYED_STARTED

# Bulk actions.
# These actions are performed on the instance itself and on its children too.
# @parameter: an instance's path
Deploy and start all /myRootCopy
Stop all /myRootCopy
Undeploy all /myRootCopy

# These bulk actions can also be applied by component name.
# @parameter: a component name
Deploy and start all instances of VM
Stop all instances of VM
Undeploy all instances of VM

# Delete an instance.
# This instance must be in the "not_deployed" state.
# If the deletion fails, the command script is not interrupted.
# @parameter: an instance's path
Delete /myRootCopy

# A bulk mode also exists for deletion.
# If the deletion fails for an instance, the command script is not interrupted.
# @parameter: a component name
Delete all instances of VM
</code></pre>

Instance creation only impacts the runtime model.  
Creating an instance and deploying or starting it are two different actions.


> A command instruction is supposed to stand on a single line.  
> However, it is possible to split a line by putting the '\' character before a line break.


<pre><code class="language-roboconf-commands">
Create component \
       as myInstance $(smartIndex) \
       under /myRoot
</code></pre>



## Generator Variables

When naming instances, it is possible to inject some variables that Roboconf will replace.  
And you can create your own ones.

<pre><code class="language-roboconf-commands"># $(NANO_TIME) is a predefined variable with the time in nanoseconds.
Define ntime = $(NANO_TIME)
Rename /myRootCopy as myRootCopy_$(NANO_TIME)

# $(MILLI_TIME) is a predefined variable with the time in milliseconds.
Define mtime = $(MILLI_TIME)
Create component as myInstance $(mtime) under /myRoot

# $(FORMATTED_TIME) is a predefined variable with the time formatted by the user.
# The variable includes a pattern to format the text, separated from the prefix by a space.
# The date pattern follows the one of the java.text.SimpleDateFormat class.
# See https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
Define ftime = $(FORMATTED_TIME hh:mm:ss)
Write $(ftime) into /that/file

# Be careful, the $(FORMATTED_TIME) variable must be used alone in a line.
# To create something complex with it, use a temporary variable.
Define my complex sentence = Something happened at $(ftime).

# $(UUID) is a predefined variable that generates a random (unique) string.
Define randomString = $(UUID)
Create component as myInstance $(randomString) under /myRoot

# $(SMART_INDEX) is a predefined variable to inject a smart index.
# It is smart only when an instance path is given
# Here, it will create "myInstance 1".
# If "instance 1" was already existing, it would create "instance 2".
Define smartName = myInstance $(SMART_INDEX) under /myRoot
Create component as $(smartName) under /myRoot
Deploy and start all $(smartName)

# Here, it will create "myInstance 2".
# We just override our previous variable.
Define smartName = myInstance $(SMART_INDEX) under /myRoot
Create component as $(smartIndex) under /myRoot
Deploy and start all $(smartName)

# No instance path => the index will always be ONE.
# Here, it will create "sample 1".
Define smartName = sample $(SMART_INDEX)
Create component as $(smartName) under /myRoot

# You can reuse your variables to define new ones.
Define mtime_bis = $(mtime)_bis
Create component as myInstance $(mtime_bis) under /myRoot 
</code></pre>


## Query Variables

Generator variables will **always** have a value.  
However, there may be situations where we want to find an existing instance.  
That can be useful, as an example, for scale down scenarios, when we want to stop and delete
a given instances.

Let's consider this set of commands.

<pre><code class="language-roboconf-commands"># Replicate a template instance and start it
Define NEW_VM = vm $(SMART_INDEX)
Replicate /vm as $(NEW_VM)
Deploy and start all /$(NEW_VM)
</code></pre>

This command script can be executed on demand, automatically when used with the autonomic,
or by the Roboconf scheduler. So, it can be executed N times if we want. Now, how would we manage
scaling down? Any situation of scaling down. Meaning we would have 50 VM and we want to delete one.
Or we could have no VM and we would not like to get errors because there is no VM to kill.

Well, we can use query variables.

<pre><code class="language-roboconf-commands"># Find an existing VM
Define VM_TO_KILL = vm $(EXISTING_INDEX MIN)

# Undeploy it and delete it from our model
Undeploy all /$(VM_TO_KILL)
Delete /$(VM_TO_KILL)
</code></pre>

If there exist a VM named "vm &lt;some integer&gt;", then we will execute the instructions.
However, if no such instance is found, then all the instructions that reference the **VM_TO_KILL**
variable will be disabled. It means they will be parsed but not executed.

Such command scripts can mix other instructions.  
Only those that reference variables based on the **$(EXISTING_INDEX)** variable, directly or
indirectly, will be disabled.

Now, here is the syntax of this variable.  
There are basically 4 scenarios.

* **$(EXISTING_INDEX &nbsp;  MIN)** finds the matching instance with the smallest index.
* **$(EXISTING_INDEX &nbsp;  MIN > 3)** finds (as an example) a matching instance with the smallest index but higher than 3.
* **$(EXISTING_INDEX &nbsp;  MAX)** finds the matching instance with the highest index.
* **$(EXISTING_INDEX &nbsp;  MAX < 10)** finds (as an example) a matching instance with the highest index but less than 10.

It is obviously possible to use **MAX > 10** and **MIN < 3**, but it is somehow redundant. :)  
As explained above, it is possible that no instance matches the criteria. That will not make the commands
script fail or throw an error.


## Other Command Instructions

Here are additional commands that might be useful.


### Email Command

Send an e-mail to someone.  
SMTP settings are stored in the DM's preferences, not in command files.  
These preferences also allow to define default recipients.

<pre><code class="language-roboconf-commands"># Send an e-mail with a default subject (Roboconf event).
email user@company.net with this message
</code></pre>

<pre><code class="language-roboconf-commands"># Send an e-mail with a default subject (Roboconf event)...
# ... to several recipients.
email user1@company.net, user2@company.net with this message
</code></pre>

<pre><code class="language-roboconf-commands"># Send an e-mail with a default subject (Roboconf event)...
# ... to the default recipients (defined in the preferences).
email with this message
</code></pre>

<pre><code class="language-roboconf-commands"># Define a mail subject and a body.
email user@company.net with @n@
    Subject: Alert! @n@
    This is an example.
</code></pre>


### Write Command

Write into a file.

<pre><code class="language-roboconf-commands">Write some text into /this/file

# Write into the system's temporary directory.
# %TMP% will be replaced by the location of the system's temporary directory.
Write something else into %TMP%/temporary-file.txt

# Create an empty file.
Write into /that/file
</code></pre>


### Append Command

A variant of the **write** command.  
Append text into a file. If the file does not exist, it is created.  
When the file exists and is not empty, the content is appended after a line break.

<pre><code class="language-roboconf-commands">Append some text into /this/file

# Write into the system's temporary directory.
# %TMP% will be replaced by the location of the system's temporary directory.
Append something else into %TMP%/temporary-file.txt

# Create an empty file.
Append into /that/file
</code></pre>


### Execute Command

This command instruction allows to execute another *commands* file.

<pre><code class="language-roboconf-commands">Execute command-file-name

# You use or omit the file extension.
# But the extension must be "commands".
Execute command-file-name.commands
</code></pre>
