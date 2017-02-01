---
title: "DM's Templating"
layout: page
cat: "ug-0-7"
id: "dm-templating"
menus: [ "users", "user-guide", "0.7" ]
---

The DM's templating is about generating live documents at runtime.  
These documents can be reports, configuration files for other tools, etc.

> Originally, it was designed to generate configuration files for Nagios plugins.


## Features

Based on template files, the DM can instantiate them with live information and generate files.  
Template files must be located in a same directory. A template can be global (applied to all
the Roboconf applications) or restricted to a single one (specific template).

Here is the expected file structure of the templates directory.

```
- /
-- global-template1.tpl
-- global-template2.tpl
-- global-template3.tpl

-- app1/
-- -- template1.tpl
-- -- template2.tpl

-- app5/
-- -- template1.tpl
```

Global templates are applied to all the applications.  
They are located at the root of the templates directory. Specific templates are applied
only to a given application. Such templates must be located in a sub-directory whose name
is the same than the application's one.


The output directory will have the following structure.

```
app1/
-- global-template1
-- global-template2
-- global-template3
-- template1.tpl
-- template2.tpl

app2/
-- global-template1
-- global-template2
-- global-template3

app5/
-- global-template1
-- global-template2
-- global-template3
-- -- template1.tpl
```

Files generated from global and specific templates are all located in a same directory, each one
being associated with an application.


## Templates

Templates are based on [Mustache](https://mustache.github.io/) and (a Java port of) [Handlebars](http://handlebarsjs.com/).  
These solutions provide logic-less and semantic templating. The overall idea of these templates is to extract information
from Roboconf instances by filtering on components and/or installer names. You can then get runtime information like IP
addresses, ports, etc.

> For those who are familiar with Handlebars, Roboconf provides additional helpers.  
> In particular, **#all** and **#is-key**.

Here are some examples of templates.

**Getting all the instances of VM**

{% raw %}
```htmldjango
{{#all VM}}
- {{name}}
{{/all}}
```
{% endraw %}

... could output...

```
- Tomcat VM1
- Tomcat VM2
- Apche VM
```


**Filtering component names with wildcards**

{% raw %}
```htmldjango
{{#all '/Vm/Tom*' }}
- {{path}}
{{/all}}
```
{% endraw %}

... could output...

```
- /Tomcat VM 1/Tomcat
- /Tomcat VM 2/Tomcat
- /Tomcat VM 3/TomcatServer
```


**Selecting several components at once**

{% raw %}
```htmldjango
{{#all 'Vm | MySQL | */Tom*/War' }}
- {{path}}
{{/all}}
```
{% endraw %}

... could output...

```
- /MySqlVm
- /ApacheVm
- /TomcatVm1
- /TomcatVm1/Tomcat/WebApp
- /TomcatVm2
- /TomcatVm2/Tomcat/WebApp
```


**Selecting by installer name**

{% raw %}
```htmldjango
{{#all '*' installer='script' }}
- {{name}}
{{/all}}
```
{% endraw %}

... could output...

```
- Apache
- Tomcat
```

**Getting exported information**

{% raw %}
```htmldjango
{{#all Vm}}
- {{name}}
	{{#each exports}}
{{name}} = {{value}}
	{{/each}}
{{/all}}
```
{% endraw %}

... could output...

```
- MySqlVm
MySqlVm.ip = 192.168.1.29
- ApacheVm
apacheVm.ip = 192.168.1.14
- TomcatVm1
- TomcatVm2
```


**Displaying only deployed VM**

{% raw %}
```htmldjango
{{#all Vm}}
	{{#data}}{{#is-key 'ip.address'}}
{{name}} => {{value}}
	{{/is-key}}{{/data}}
{{/all}}
```
{% endraw %}

... could output...

```
- MySqlVm
MySqlVm.ip = 192.168.1.29
- ApacheVm
apacheVm.ip = 192.168.1.14
```

**Templates can contain comments**

{% raw %}
```htmldjango
{{! This is a comment that will not be present in generated files. }}
```
{% endraw %}

Obviously, these templates are quite simple as they mostly generate lists.  
But you can generate any structure you want with this.
Other examples are available in 
[the sources](https://github.com/roboconf/roboconf-platform/tree/master/core/roboconf-dm-templating/src/test/resources).


## Installation

To install it, create the **net.roboconf.dm.templating.configuration** file under the DM's **etc** directory
and update the following content according to your needs.

```properties
# The location of the templates.
templates-directory-location =

# The output directory for generated files.
output-directory-location =

# The poll interval to check modifications on template files (in ms).
poll-interval = 1000
```

Then, open the DM's interactive mode and type in...

```properties
# Here in version 0.5
bundle:install --start mvn:net.roboconf/roboconf-dm-templating/0.5
```

You should see something like...

```
A new listener 'DM's templating' is now available in Roboconf's DM.
```

... in the DM's logs.
