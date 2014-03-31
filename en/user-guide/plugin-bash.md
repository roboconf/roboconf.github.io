---
title: "The Bash Plug-in"
layout: page
id: "ug.snapshot.plugin-logger"
menus: [ "users", "user-guide" ]
---

The Bash plug-in executes a bash script on every life cycle step.  
It only works under Linux systems.

> Bash scripts should explicitly return an error when something goes wrong.  
> Otherwise, Roboconf will consider everything run fine even if the script encountered errors.  
  
This plug-in is associated with the **bash** installer name.

	Component_Y {
		alias: an alias;
		installer: bash;
	}

Here is the way this plug-in works.  
In the next lines, *action* is one of **deploy**, **start**, **update**, **stop** or **undeploy**. 

* The plug-in will load **scripts/action.sh**
* If it is not found, it will try to load **templates/action.sh.template**
* If it is not found, it will try to load **templates/default.sh.template**
* If it is not found, the plug-in will do nothing.

Templates use [Mustache](http://mustache.github.io/) to generate a concrete bash script before executing it.  
**default.sh.template** is the template that will be used for all the steps which do not have their own
script or template.

All the templates can use import variables.  
These variables will be inserted by Roboconf.

> This page will be completed soon with an example illustrating the templating.
