---
title: "Inheritance and Variables"
layout: page
cat: "ug-last"
id: "inheritance-and-variables"
menus: [ "users", "user-guide" ]
---

This page explains how component inheritance and facets impact the 
definition of variables. As a reminder, variables are exchanged by and among
Roboconf agents to update configuration files dynamically.


## Back to basics

<pre><code class="language-roboconf">
MyComponent {
	exports: ip, property = value;
}
</code></pre>

This (incomplete) graph portion indicates **MyComponent** will share
*MyComponent.ip* and *MyComponent.property* with other application parts.


## Component Extensions

Let's now consider the following example.

<pre><code class="language-roboconf">
MySQL {
	exports: ip, port = 3306;
	installer: puppet;
}

My-Client-Database {
	extends: MySQL;
	exports: my-own-variable = something;
}
</code></pre>

We have two components, one extending the other.  
In the example above, **MySQL** exports...

* MySQL.ip
* MySQL.port

And **My-Client-Database** exports...

* MySQL.ip and MySQL.port (since **My-Client-Database** is a **MySQL**).
* My-Client-Database.ip and My-Client-Database.port (inherited variables, replicated with its own prefix).
* My-Client-Database.my-own-variable (new variable added by the extending component).

All the inherited variables are replicated in the component's scope.  
This way, those who import MySQL.\* will receive notifications from **MySQL** and **My-Client-Database**.
And those who import **My-Client-Database** will only receive notifications of **My-Client-Database** only, but with
all the available information.


## Facets

Facets can define variables too.  
When a component is associated with a facet, it proceeds the same way than for the components it exports.
It inherits the variables with their original prefix, and replicates them with its own prefix.


## Overriding Variables in the Graph

Components can override variables they inherit.  
*And instances can override variables they receive from their component.*

Let's take back the example above.

<pre><code class="language-roboconf">
My-Client-Database {
	extends: MySQL;
	exports: my-own-variable = something;
}
</code></pre>

Here are the default values of the variables.

* MySQL.ip (set at runtime by Roboconf)
* MySQL.port (3306, defined in the graph)
* My-Client-Database.ip (set at runtime by Roboconf)
* My-Client-Database.port (3306, inherited from MySQL)
* My-Client-Database.my-own-variable (something, defined in the graph)

Now, how can we override the **port** value in **My-Client-Database**?  
There are two ways. This will override both port variables.

<pre><code class="language-roboconf">
My-Client-Database {
	extends: MySQL;
	exports: port = 3307;
}
</code></pre>

Or we can override the MySQL.port value directly.  
And by inheritance, we will get it.

<pre><code class="language-roboconf">
My-Client-Database {
	extends: MySQL;
	exports: MySQL.port = 3307;
}
</code></pre>

If for some reason, we do not want to expose the same property for the ports, we can proceed this way.

<pre><code class="language-roboconf">
My-Client-Database {
	extends: MySQL;
	exports: MySQL.port = 3307, My-Client-Database.port = 3308;
}
</code></pre>

Setting the prefix defines a scope.  
When there is no prefix, then all the variables are updated.


## Overriding Variables in Instances

Let's keep our previous graph.  
Let's consider the following instances definition.

<pre><code class="language-roboconf">
instance of MySQL {
	port: 33107;
}
</code></pre>

We have an instance of **MySQL** with a **port** property.  
Since there is only one variable exported by this component with this name, it is thus equivalent to
writing...

<pre><code class="language-roboconf">
instance of MySQL {
	MySQL.port: 33107;
}
</code></pre>

Let's now see what we can do with an instance of a sub-component.  
Here, we have two variables whose name is **port** (onr from the component itself (My-Client-Database)
and one from its super component (MySQL). So, we should write...

<pre><code class="language-roboconf">
instance of My-Client-Database {
	MySQL.port: 33107;
	My-Client-Database.port: 33107;
}
</code></pre>

Remember, this component exports both variables.  
However, Roboconf allows the following (simplified) notation.

<pre><code class="language-roboconf">
instance of My-Client-Database {
	port: 33107;
}
</code></pre>

In this case, 3 variables will be defined or overridden:

* MySQL.port
* My-Client-Database.port
* port (without any prefix)

And a warning will appear in the validation.  
What all of this implies is that an instance may export one value for a given variable
and another one for another sibling. Example:

<pre><code class="language-roboconf">
instance of My-Client-Database {
	MySQL.port: 33108;
	My-Client-Database.port: 33107;
}
</code></pre>

This may be used for some customization or behavior configuration.  
We here took component extension as our main example, but it works the same way with inherited facets.

As a reminder, variables that are defined by an instance but not in their component are not prefixed.  
As an example, the following definition...

<pre><code class="language-roboconf">
instance of My-Client-Database {
	port: 33107;
	setup: true;
}
</code></pre>

...  would export...

* MySQL.port
* My-Client-Database.port
* port (without any prefix, due to the ambiguity)
* setup (without any prefix, due to the fact there is no match in the component variables)
