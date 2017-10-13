---
title: "The Script Plug-in"
layout: page
cat: "ug-0-7"
id: "plugin-script"
menus: [ "users", "user-guide", "0.7" ]
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

Parameters are passed to action scripts (e.g. start.sh, stop.py, update.perl ...) using environment variables.  
When you use script recipes, it is recommenced to name your graph components smartly (e.g. no space).


## Global Variables

In the next lines, the *current instance* means the one whose script is invoked.

- ROBOCONF\_FILES\_DIR: the directory where instance files are located (if any).
- ROBOCONF\_INSTANCE\_NAME: the name of the current instance.
- ROBOCONF\_INSTANCE\_PATH: the path of the current instance.
- ROBOCONF\_CLEAN\_INSTANCE\_PATH: the path of the current instance but with the non-alphanumeric characters being replaced by an underscore.
- ROBOCONF\_CLEAN\_REVERSED\_INSTANCE\_PATH: the reversed path of the current instance and with the non-alphanumeric characters being replaced by an underscore.

Example:

```bash
echo ${ROBOCONF_INSTANCE_NAME}
my-server

echo ${ROBOCONF_INSTANCE_PATH}
/VM/my-server

echo ${ROBOCONF_CLEAN_INSTANCE_PATH}
VM_my_server

echo ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}
my_server_vm
```


## Exported Variables

All the exports of the instance are available as environment variables.  
Their name is left unchanged, except that spaces and the `-` character are replaced by `_`.

Assuming a component is defined as...

<pre><code class="language-roboconf">
MyComp {
	exports: ip, port = 8080;
}
</code></pre>

... then the following variables will be available: `${ip}` and `${port}`.  


## Ancestor Variables

Sometimes, it is useful to use parent information.  
The script recipes of a component may use variables exported by a parent instance.
Such variables are built with the ANCESTOR\_*&lt;component-name&gt;*_*&lt;variable-name&gt;* pattern. 

Consider the following example.

<pre><code class="language-roboconf">
VM {
	exports: ip;
	children: server;
}

server {
	exports: path = "apps/";
	children: app;
}


app {
	exports: name = "app";
}
</code></pre>

A script for the **app** component could use the following variables: `${name}`,
`${ANCESTOR_server_path}` and `${ANCESTOR_VM_ip}`.
A script for the **server** component could use the following variables: `${path}` and `${ANCESTOR_VM_ip}`.

Variable names are left unchanged, except that spaces and the `-` character are replaced by `_`.  
Also, notice an instance can not access children variables. Only ancestor ones.


## Imported Variables

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
#!/bin/bash
for c in `seq 0 ${tomcat_size}`;
do
 IP_ADDRESS=tomcat_${c}_ip
 echo ${!IP_ADDRESS}
done
```

## Updated-related Variables

These variables are only made available in the **update** script.

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

```properties
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
