---
title: "The File Plug-in"
layout: page
cat: "ug-0-5"
id: "plugin-file"
menus: [ "users", "user-guide", "0.5" ]
---

The file plug-in is a handy plug-in to perform basic file operations.  
It can be used, as an example, to download and install artifacts in web servers
that can detect new files. As an example, with Tomcat, you can install a new web application
by dropping a WAR file into the *webapps* directory.

This plug-in is associated with the **file** installer name.

<pre><code class="language-roboconf">
Component_Y {
	installer: file;
}
</code></pre>

Its configuration (or recipe) resides in a simple properties file.  
This file must be called **instructions.properties**.

The syntax of such a file is made up of a list of instructions.  
It will be easier with an example.

```properties
# Actions to perform on deployment
deploy.1.download = http://some-location/some/file
deploy.2.move = /tmp/roboconf-tmp-file -> /home/user/my-file.txt

# Start and stop
start.1.move = /home/user/my-file.txt -> /home/user/my-server/conf/my-file.txt
stop.1.move = /home/user/my-server/conf/my-file.txt -> /home/user/my-file.txt

# And on undeployment
undeploy.1.delete = /home/user/my-file.txt
```

An instruction is built as follows:

	phase.exec-position.action-type = action parameter

Possible phases:

* deploy
* start
* stop
* update
* undeploy

Possible action types:

| Action type | Parameter | Description |
| :---------: | :-------: | :---------: |
| Download | An URL. | Downloads a file and saves it under the system's temporary directory as **roboconf_tmp_file**. |
| Delete | A file path. | Deletes the file or directory at the given path. |
| Copy | Source -> Path | Copies a file. source path **->** target path |
| Move | Source -> Path | Moves a file. source path **->** target path |


If the action type is not recognized, then nothing is done.  
For a given phase, several actions can be specified. Ordering is achieved through the position parameter.

Most of the time, people will only deal with one file.  
But you could process lists in the following way...

```properties
# File 1
deploy.1.download = http://some-location/some/file-1
deploy.2.move = /tmp/roboconf-tmp-file -> /home/user/my-file-1.txt

# File 2
deploy.3.download = http://some-location/some/file-2
deploy.4.move = /tmp/roboconf-tmp-file -> /home/user/my-file-2.txt

# ...
```

> Everything this extension does could be done with Bash or Puppet.  
> But for people that do not want to write Bash scripts or Puppet modules,
> this plug-in provides a simple and efficient alternative for basic use cases.
