# Lamp example, based on Apache + Tomcat + MySQL

Deploy Tomcat with a webapp that uses a MySQL database, with Apache + mod-proxy to serve web requests.

This example illustrates a more complex configuration:
* Dependencies between components: the Tomcat node depends on the MySQL node because it needs the MySQL
IP/port + database credentials, and the Apache node depends on the Tomcat node because it needs
the Tomcat IP/port to configure mod_proxy).
* IaaS elasticity patterns: multiple Tomcat nodes can be added/removed to adapt to traffic, but it requires a
hot re-configuration of the Apache node (so mod-proxy knows about all the available Tomcat nodes).

## Dependencies between components

Here, we will use Roboconf to deploy Apache (+ mod-proxy), Tomcat (+ webapp), and MySQL (+ data) on 3 separate VMs: this includes updating the configuration files as soon as dependencies can be resolved (eg. when it is aware of the MySQL IP/port, Roboconf will send them to the Tomcat node, so it can update its configuration and start).

## IaaS elasticity patterns

Here, we will deal with adding/removing Tomcat VMs, with Roboconf used for dynamic (hot) reconfiguration of mod-proxy.
