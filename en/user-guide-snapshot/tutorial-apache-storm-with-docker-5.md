---
title: "Tutorial - Managing Apache Storm with Roboconf and Docker - 4/5"
layout: page
cat: "ug-snapshot"
id: "tutorial-apache-storm-et-docker-5"
menus: [ "users", "user-guide", "Snapshot" ]
---

This penultimate part guides you in the creation [a Roboconf command](roboconf-commands.html).
Such a file is equivalent to creating a script with Roboconf instructions.

Roboconf commands can be sued to define complex actions...

* ... executed on-demand in Roboconf's web console.
* ... whose execution [is scheduled](roboconf-commands-scheduling.html) (that day, at that time...).
* ... that will be executed when some criteria are met. This is what we call the
([autonomic](autonomic-management-with-roboconf.html)).

Upgrade your application by adding a **scale-up.commands** file.  
This command will have to:

* Generate a new VM name.
* Create a new instance of VM.
* Create a new instance of Storm worker node.
* Deploy and start it all.

Redeploy your application, redeploy the instances and then execute your command
through Roboconf's web console. Verify a new Docker container was created and that the topology was redistributed
over the Storm cluster.

It is now time to deal with [the last part of this tutorial](tutorial-apache-storm-with-docker-6.html).
