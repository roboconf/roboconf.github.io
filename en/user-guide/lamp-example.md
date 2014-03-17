---
title: "LAMP example, based on Apache + Tomcat + MySQL"
layout: page
id: "ug-lamp-example"
menu: "users"
sub-menu: "user-guide"
---

Deploy Tomcat with a webapp that uses a MySQL database, with Apache + mod-proxy to serve web requests.

This example illustrates a more complex configuration:

* Dependencies between components: the Tomcat node depends on the MySQL node because it needs the MySQL
IP/port + database credentials, and the Apache node depends on the Tomcat node because it needs
the Tomcat IP/port to configure mod_proxy).
* IaaS elasticity patterns: multiple Tomcat nodes can be added/removed to adapt to traffic, but it requires a
hot re-configuration of the Apache node (so mod-proxy knows about all the available Tomcat nodes).

## Initial deployment pattern

Roboconf is told to deploy Apache, MySQL and Tomcat on 3 VMs, as follows:

```
# A VM with Apache only
instanceof VM {
        name: Apache VM;
        instanceof Apache {
                name: Apache;
        }
}

# A VM with MySQL only
instanceof VM {
        name: MySQL VM;
        instanceof MySQL {
                name: MySQL;
        }
}

# A VM with Tomcat only
instanceof VM {
        name: Tomcat VM 1;
        instanceof Tomcat {
                name: Tomcat;
        }
}
```

The VM is defined as follows:

```
VM {
        alias: Virtual Machine;
        installer: iaas;
        children: MySQL, Tomcat, Apache
}
```

## Dependencies between components

Here, we will use Roboconf to deploy Apache (+ mod-proxy), Tomcat (+ webapp), and MySQL (+ data) on 3 separate VMs: this includes updating the configuration files as soon as dependencies can be resolved (eg. when it is aware of the MySQL IP/port, Roboconf will send them to the Tomcat node, so it can update its configuration and start).

The application nodes (MySQL, Tomcat, Apache) are defined as follows:

```
# MySQL database
MySQL { 
        alias: MySQL;
        installer: puppet;
        exports: ip, port = 3306;
}       

# Tomcat + webapp
Tomcat {
        alias: Tomcat with Webapp;
        installer: puppet; 
        exports: ip, portAJP = 8009;
        imports: MySQL.ip, MySQL.port;
}       

# Apache + load Balancer
Apache { 
        alias: Apache Load Balancer;
        installer: puppet; 
        imports: Tomcat.portAJP, Tomcat.ip;
} 
```

As you can see, the VM is supposed to support the deployment of either Apache, Tomcat or MySQL components.

And each components is described in terms of imports/exports:
* Exports are configuration variables that the components makes available to the world (eg. the Tomcat node exports its IP and AJP port)
* Imports are configuration variables needed by the component to complete its configuration, before starting (eg. the Apache node imports IP and AJP ports of any available Tomcat node that exports them).

With that description, Roboconf knows when a deployed component can be started: when all its imports are resolved !<br/>
Roboconf is in fact responsible for import/export exchanges between components, and lifecycle management
(eg. start the component when imports are resolved).


## IaaS elasticity patterns

Here, we will deal with adding/removing Tomcat VMs, with Roboconf used for dynamic (hot) reconfiguration of mod-proxy.
