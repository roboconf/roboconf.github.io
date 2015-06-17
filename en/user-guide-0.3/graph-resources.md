---
title: "Graph Resources"
layout: page
cat: "ug-0-3"
id: "graph-resources"
menus: [ "users", "user-guide", "0.3" ]
---

The graph definition has already been introduced.
However, it does not answer the question: how does Roboconf deal with deployment configuration?

Clearly, the graph model is artificial. One can put whatever he wants in it.
The real logic processing will be handled by a Roboconf plug-in (e.g. Bash or Puppet). These plug-ins will
use resources, associated with a component, to deploy real Software.

So, for **every** component in the graph, a project must contain a sub-directory with the same name than the component.
If we take the following graph definition...

<pre><code class="language-roboconf">
VM {
	installer: target;
	# ...
}

MySQL {
	installer: puppet;
	# ...
}

Tomcat {
	installer: puppet;
	# ...
}

Apache {
	installer: puppet;
	# ...
}
</code></pre>

... then the file structure will look like...

	MyApp/
	├── descriptor/
	│   └── application.properties
	├── graph/
	│   ├── main.graph
	│   ├── VM/
	│   ├── Tomcat/
	│   ├── MySQL/
	│   └── Apache/
	└── instances/
    	└── ...

These sub-directories will contain the components resources.
These resources will be used by the Roboconf plug-in identified by the installer name.
The kind of resources to put depends on the plug-in.

* As an example, if the *Tomcat* component uses the **puppet** installer, then its resources directory
will contain a Puppet module.
* If it uses the **bash** installer, then it will contain bash scripts.
* Plug-ins are extensions for Roboconf. So, you can imagine various plug-ins.
Roboconf plug-ins are discussed more in details [here](about-plugins.html).

> Writing the plug-in configurations is what takes most of the time.
> Roboconf's roadmap includes a Maven plug-in so that people will be able to reuse graph model and resources
> among projects.
