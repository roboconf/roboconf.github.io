---
title: "The Script Plug-in"
layout: page
cat: "ug-0-4"
id: "plugin-script"
menus: [ "users", "user-guide", "0.4" ]
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
* If it is not found, it will try to load **roboconf-templates/action.template**
* If it is not found, it will try to load **roboconf-templates/default.template**
* If it is not found, the plug-in will do nothing.

Templates use [Mustache](http://mustache.github.io/) to generate a concrete script before executing it.  
**default.template** is the template that will be used for all the steps which do not have their own
script or template.

All the templates can use import variables.  
These variables will be inserted by Roboconf.


# Action Scripts and Parameters

Parameters are passed to action scripts (e.g. start.sh, stop.py, update.perl ...) using environment variables, that respect naming conventions.


## Global environment-related variables

- ROBOCONF\_INSTANCE\_NAME: The name of the current instance (the one whose script is invoked).
- ROBOCONF\_FILES\_DIR: The directory where instance files are located (if any).


## Exported and imported variables

All the exports of the instance are available as environment variables (their names are left unchanged).  
Imports are more complex, as there may be multiple ones: let's take the example of an Apache load balancer, 
that imports Tomcat (spelled *tomcat* in the graph) "ip" and "portAjp" variables. The imports will look like this (for N+1 Tomcat instances
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

So, the naming convention for imports is < componentName >\_< index >\_< exportName >, with index starting at 0 and max (index) given by < componentName >\_size.  
Here is an example of how such variables can be used (in bash).

```bash
for (( c=0; c<${tomcat_size}; c++ ))
do
 IP_ADDRESS=tomcat_${c}_ip
 echo $IP_ADDRESS
done
```

## Variables related to update actions

| Variable name | Description |
| ------------- | ----------- |
| ROBOCONF\_UPDATE\_STATUS | The status of the instance that triggered the update (e.g. DEPLOYED\_STOPPED, DEPLOYED\_STARTED). |
| ROBOCONF\_IMPORT\_CHANGED\_COMPONENT | Name of the component for the changed import. |
| ROBOCONF\_IMPORT\_CHANGED\_INSTANCE\_PATH | Path of the instance that exports the changed import. |
| ROBOCONF\_IMPORT\_CHANGED\_< ImportName > | The value of every imported variable that changed (e.g. if an exported *ipAddress* changed, the "ROBOCONF\_IMPORT\_CHANGED_ipAddress" variable should contain its new value). |

<br />

# Scripts Templating

Rather than writing scripts that check variables, it is also possible to generate scripts from a template.  
This can be easier in some cases, when you want the executed script to remain as simple as possible.  

Templates are located under the **roboconf-templates** directory.  
They should have a **.template** extension. [Mustache](http://mustache.github.io/) is used as the templating engine.

For the moment, only imports variables are injected in the generation context.  
Here is a sample template:

```
#!/bin/bash
#
# Instance imports...
# Or what information an instance has about its dependencies.
# 
{% raw %}
{{#importLists}}
echo "Component: {{prefix}}"
 
{{#imports}}
	{{#exportedVars}}
echo "Variable: {{name}} -> {{value}}"
	{{/exportedVars}} 
{{/imports}}
	
echo ""
{{/importLists}}
{% endraw %}
```

Assuming the instance to start has the following imports...

* **mongo-db** => {ip=192.168.1.18, port=17501}, {ip=192.168.1.93, port=17501}
* **rabbit-mq** => {ip=192.168.0.17, topic=main}

... then it means it knows 2 instances of MongoDB and one of RabbitMQ.  
The previous template would then result in...

```bash
#!/bin/bash
#
# Instance imports...
# Or what information an instance has about its dependencies.
# 

echo "Component: mongo-db"

echo "Variable: ip -> 192.168.1.18"
echo "Variable: port -> 17501"
echo "Variable: ip -> 192.168.1.93"
echo "Variable: port -> 17501"

echo "Component: rabbit-mq"

echo "Variable: ip -> 192.168.0.17"
echo "Variable: topic -> main"
	
echo ""
```
