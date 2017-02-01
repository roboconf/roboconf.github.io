---
title: "Instances Description"
layout: page
cat: "ug-last"
id: "instances-description"
menus: [ "users", "user-guide" ]
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


## Instances Properties

> This page is an introduction.  
> Please, refer to the [full DSL syntax](roboconf-dsl.html) for more details.

An instance must have the **name** property, which is the instance name. It must be unique among its parent.
The instance may also declare properties to override component properties. As an example, if a component exports
a *port* property with the default value 8080, the instance may override it (e.g. with 8081).

<pre><code class="language-roboconf">
instance of Tomcat {
	name: Tomcat;
	port: 8081;
}
</code></pre>

Just like for graph definitions, it is possible to surround values with quotes.

<pre><code class="language-roboconf">
instance of Tomcat {
	name: Tomcat;
	port: "8081";
	welcome_message: "We can use a complex value and insert several semicolons ;; on the same line.";
}
</code></pre>

> Be careful, unlike for graphs, property values are not entirely trimmed.  
> Use quotes if necessary, or do not set spaces after instance properties.
> This can be used to create several instances at once.

<pre><code class="language-roboconf">
instance of VM {
	name: vm ;
	count: 5;
	
	instance of Server {
		name: server;
	}
}
</code></pre>

... will create « vm 1 », « vm 2 », « vm 3 », « vm 4 » and « vm 5 ».  
All of them will have child instance called « server ».

It is also possible to force a value for a [random exported variable](graph-definition.html) in the instances definition.  
As an example, with a graph declaration like...

<pre><code class="language-roboconf">
Tomcat {
	installer: puppet;
	exports: random[port] httpPort;
}
</code></pre>

... we could force the value of the *httpPort* with...

<pre><code class="language-roboconf">
instance of Vm_Tomcat {
	name: Tomcat VM1;

	instance of Tomcat {
		name: Tomcat;
		httpPort: 9000;
	}
}
</code></pre>

> Forcing values of random variables must be used at your own risks!  
> Users should avoid to do that when possible.


## Instances Files

Instances definitions can be split into several files. It is indeed possible to import other instance definitions.  
Instances definitions can mix imports and instances declaration, or, it can only contain imports.

<pre><code class="language-roboconf">
import database.instances;
import servers.instances;

instance of MyApp {
	# whatever
}
</code></pre>

> File imports are not relative to the current's file location.  
> They are resolved from the instances directory.

As an example, `import dir1/dir2/servers.instances;` means we import the file *servers.instances* located under
**instances/dir1/dir2** directory of the project.
