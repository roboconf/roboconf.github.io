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

# Action script and parameters

Parameters are passed to action scripts (eg. start.sh, update.sh ...) using environment variables, that respect naming conventions.

## Global environment-related variables

- ROBOCONF\_INSTANCE\_NAME: The name of the current instance (the one whose script is invoked).
- ROBOCONF\_FILES\_DIR: The directory where instance files are located (if any).

## Exported and imported variables

All the exports of the instance are available as environment vars (their names are left unchanged).

Imports are more complex, as there may be multiple ones: let's take the example of an apache load balancer, that imports tomcat "ip" and "portAjp" variables.
The imports will look like this (for N tomcat instances named "tomcat1" to "tomcatN"):

	tomcat\_size = N
	tomcat\_1\_name = tomcat1
	tomcat\_1\_ip = < ip address of tomcat 1 >
	tomcat\_1\_portAjp = < AJP port for tomcat 1 >
	...
	tomcat\_N\_name = tomcatN
	tomcat\_N\_ip = < ip address of tomcat N >
	tomcat\_1\_portAjp = < AJP port for tomcat 1 >

So, the naming convention for imports is < componentName >\_< index >\_< exportName >, with index starting at 1 and max(index) given by < componentName >\_size .

## Variables related to update actions

- ROBOCONF\_UPDATE\_STATUS: the status of the instance that triggered the update (eg. DEPLOYED\_STOPPED, DEPLOYED\_STARTED).

In case of import change (eg. instance started or stopped):

- ROBOCONF\_IMPORT\_CHANGED\_INSTANCE\_PATH: Path to the instance that exports the changed import.
- ROBOCONF\_IMPORT\_CHANGED\_< ImportName >: For each imported variable that changed, the corresponding value (eg. if an "ipAddress" export changed, the "ROBOCONF\_IMPORT\_CHANGED_ipAddress" variable should contain its new value).

