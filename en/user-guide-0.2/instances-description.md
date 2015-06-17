---
title: "Instances Description"
layout: page
cat: "ug-0-2"
id: "instances-description"
menus: [ "users", "user-guide", "0.2" ]
---

A Roboconf project may contain an **instances** directory with the definition of instances.  
An instance is a concrete component. Like a Java class, a Roboconf component is only a definition.
It needs to be instantiated to be used.

Predefined instances aims at gaining some time when one wants to deploy application parts.  
The fact they are defined does not mean they will be deployed or started automatically. But they
will be already defined and configured, ready to be deployed.

By convention, instances definitions are expected in files with the **instances** extension.  
The parser will not be difficult if you use another extension. However, notice that tools
may rely on the extension (such as editors, to provide syntax highlighting).

An instance starts with the 2-word keyword **instance of** followed by the name of the component.  
Instances must be defined hierarchically. If the graph defines a root component R with a 
child C, then an instance of C must be defined within an instance of R.

Let's see a concrete example.

<pre><code class="language-roboconf">
# This is a comment
# There are only in-line comments
instance of Vm_Tomcat {
	name: Tomcat VM1;

	instance of Tomcat {
		name: Tomcat;
	}
}
</code></pre>

The Tomcat instance is defined inside a VM instance.  
Defining it else where would result in an error.

An instance must have the **name** property, which is the instance name. It must be unique among its parent.
The instance may also declare properties to override component properties. As an example, if a component exports
a *port* property with the default value 8080, the instance may override it (e.g. with 8081).

<pre><code class="language-roboconf">
instance of Tomcat {
	name: Tomcat;
	port: 8081;
}
</code></pre>

Instances definition can be split into several files. It is indeed possible to import other instance definitions.  
Instances definitions can mix imports and instances declaration, or, it can only contain imports.

<pre><code class="language-roboconf">
import database.instances;
import servers.instances;

instance of MyApp {
	# whatever
}
</code></pre>
