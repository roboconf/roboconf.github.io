---
title: "The Script Plug-in"
layout: page
cat: "ug-0-3"
id: "plugin-script"
menus: [ "users", "user-guide", "0.3" ]
---

The Script plug-in executes a script (e.g. bash, shell, perl, python...) on every life cycle step.  
It is mostly intended for Unix systems, but might run on alternative platforms.

> Scripts should explicitly return an error when something goes wrong.  
> Otherwise, Roboconf will consider everything run fine even if the script encountered errors.  
  
This plug-in is associated with the **script** installer name.

<pre><code class="language-roboconf">
Component_Y {
	installer: script;
}
</code></pre>

Here is the way this plug-in works.  
In the next lines, *action* is one of **deploy**, **start**, **update**, **stop** or **undeploy**. 

* The plug-in will load **scripts/action*** (when multiple file names start with the action's name, the 1st one found will be used, so the result may be unpredictable: in such case, a warning message will be logged by Roboconf).
* If it is not found, it will try to load **templates/action.template**
* If it is not found, it will try to load **templates/default.template**
* If it is not found, the plug-in will do nothing.

Templates use [Mustache](http://mustache.github.io/) to generate a concrete script before executing it.  
**default.template** is the template that will be used for all the steps which do not have their own
script or template.

All the templates can use import variables.  
These variables will be inserted by Roboconf.


# Action script and parameters

Parameters are passed to action scripts (eg. start.sh, stop.py, update.perl ...) using environment variables, that respect naming conventions.


## Global environment-related variables

- ROBOCONF\_INSTANCE\_NAME: The name of the current instance (the one whose script is invoked).
- ROBOCONF\_FILES\_DIR: The directory where instance files are located (if any).

## Exported and imported variables

All the exports of the instance are available as environment variables (their names are left unchanged).  
Imports are more complex, as there may be multiple ones: let's take the example of an Apache load balancer, 
that imports Tomcat "ip" and "portAjp" variables. The imports will look like this (for N+1 Tomcat instances
named "tomcat0" to "tomcatN"):

```properties
tomcat_size = N
tomcat_0_name = tomcat1
tomcat_0_ip = < ip address of tomcat 1 >
tomcat_0_portAjp = < AJP port for tomcat 1 >
# ...
tomcat_N_name = tomcatN
tomcat_N_ip = < ip address of tomcat N >
tomcat_N_portAjp = < AJP port for tomcat N >
```

So, the naming convention for imports is < componentName >\_< index >\_< exportName >, with index starting at 0 and max (index) given by < componentName >\_size .


## Variables related to update actions

| Variable name | Description |
| ------------- | ----------- |
| ROBOCONF\_UPDATE\_STATUS | The status of the instance that triggered the update (e.g. DEPLOYED\_STOPPED, DEPLOYED\_STARTED). |
| ROBOCONF\_IMPORT\_CHANGED\_COMPONENT | Name of the component for the changed import. |
| ROBOCONF\_IMPORT\_CHANGED\_INSTANCE\_PATH | Path of the instance that exports the changed import. |
| ROBOCONF\_IMPORT\_CHANGED\_< ImportName > | The value of every imported variable that changed (e.g. if an exported *ipAddress* changed, the "ROBOCONF\_IMPORT\_CHANGED_ipAddress" variable should contain its new value). | 
