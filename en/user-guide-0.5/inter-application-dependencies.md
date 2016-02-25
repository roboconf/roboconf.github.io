---
title: "Inter-Application Dependencies"
layout: page
cat: "ug-0-5"
id: "inter-application-dependencies"
menus: [ "users", "user-guide", "0.5" ]
---

Until now, Roboconf has been used to exchange information within a given application.  
With a more global approach (information system), it is also possible to exchange information
among applications.

The idea is that most of the variables exchanged within an application have a local scope.
But some may make sense to be available from the outside. This can be achieved by listing
these variables in the application descriptor.


## Exporting Applications

Let's consider the following graph.

<pre><code class="language-roboconf">
# MySQL database
MySQL { 
	installer: puppet;
	exports: ip, port = 3306;
}     

# Tomcat + webapp
Tomcat {
	installer: puppet; 
	exports: ip, portAJP = 8009;
	imports: MySQL.ip, MySQL.port;
}

# Apache + load Balancer
Apache { 
	installer: puppet; 
	imports: Tomcat.portAJP, Tomcat.ip;
	exports: ip;
}

# A VM
VM {
	installer: target;
	children: MySQL, Tomcat, Apache;
}
</code></pre>

This is our usual (simplified) LAMP example.  
We could consider it would be relevant for other applications to know the location of the Apache load-balancer.
Other variables are local to this application and do not have to be seen from the outside.

So, the descriptor of our application template would contain these additional properties.

```properties

# On the global scope, variables exposed by this application will be prefixed with...
exports-prefix: Lamp

# That's because the template's name may contain special characters, while variable prefix
# cannot. This prefix must be unique among all the application templates.

# Now, lets export the internal variable outside.
exports: Apache.ip as lb_ip

# Other applications will see it as Lamp.lb_ip
# Several variables can be exported if necessary.
# 
# exports: \
#         Apache.ip as lb_ip,\
#         MySQL.ip as db_ip
# 
```

It means every time an Apache instance appears or disappears, notifications will be propagated internally for
variables **Apache.ip**, and externally for variables **Lamp.lb_ip**.


## Importing Applications

External variables are referenced in the graph with the **external** key word.

<pre><code class="language-roboconf">
MyApp { 
	installer: script; 
	imports: Tomcat.portAJP, Tomcat.ip; # local variables
	imports: external Lamp.lb_ip;      # external variables
	exports: ip;
}
</code></pre>

Every time an application exports **Lamp.lb_ip**, this application will be notified.  
However, since an application template may be associated with several applications, we do not want this graph
to be notified with all of them. So, for every application, it is possible to define which other application must
be bound for this prefix.

Let's take an example.  
Consider our LAMP application template. We could have two associated applications, e.g. *LAMP-production* and *LAMP-dev*.  
And consider our importing graph may also have two associated applications, e.g. *Imp-production* and *Imp-dev*.

And we want *Imp-dev* to only get variables from *LAMP-dev*, and *Imp-production* to only get variables from *LAMP-production*.
It is what we call an application binding. It means that for *Imp-production*, the **Lamp** prefix is bound to the *LAMP-production*
application. And for *Imp-dev*, the **Lamp** prefix is bound to the *LAMP-dev*.

> We could compare a global exports prefix as an interface name.  
> And binding an application to it means selecting its implementation.

Obviously, it is possible to import variables from several other applications, **provided they defined external exports in their descriptors**.
Each global exports prefix can be bound to a different application.

External imports are used like any other import.  
The only difference is that they come from another application. When this application changes, it may impact other ones.
