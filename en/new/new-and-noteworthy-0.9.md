---
title: "New &amp; Noteworthy"
layout: page
cat: "main"
id: "new-and-noteworthy-0.9"
menus: [ "users", "download" ]
---

This page lists the enhancements and new features brought by Roboconf 0.9.


## Security: RabbitMQ exchanges over SSL

It is now possible to configure RabbitMQ messaging with SSL in Roboconf.  
All the exchanges will go through secured channels.

<img src="/resources/img/nn-0.9-rabbitmq-over-ssl.png" alt="Exchanges between Roboconf and RabbitMQ over SSL" class="gs" />


## Security: Authentication in the Web Console

Authentication can be enabled in the web console.  
Users can be defined in Karaf REALMs, that is to say, in properties files,
in databases or in LDAP servers.

<img src="/resources/img/nn-0.9-authentication-in-the-web-console.png" alt="Authentication in Roboconf's web console" class="gs" />

Once enabled, the web console automatically requires authentication.


```properties
# Enable or disable CORS.
# CORS = https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
# It should be disabled in production environments.
enable-cors = false

# Enable or disable authentication.
# Users are authenticated against the specified REALM.
enable-authentication = false

# The REALM that is used for authentication.
# We use Karaf realms.
authentication-realm = karaf

# The period of validity for a session once a user is logged in.
# Expressed in seconds. Use a negative value for infinite validity.
session-period = -1
```

<br />


## Security: Audit Files for Web Access

When authentication is enabled for web access, any access is tracked and
user actions are logged for audit purpose.

<img src="/resources/img/nn-0.9-audit-files.png" alt="Log web accesses" class="gs" />
<br /><br />


## New MBeans to monitor Roboconf

Roboconf 0.9 comes with custom MBeans.  
It allows to retrieve various Roboconf metrics with JMX.

<img src="/resources/img/nn-0.9-new-mbeans.png" alt="New MBeans for Roboconf" class="gs" />

This can be used, as an example, with Elastic Search and Kibana dashboards.

<img src="/resources/img/nn-0.9-kibana-dashboard-example.png" alt="Example of Kibana dashboard" class="gs" />
<br /><br />


## Commands History

Roboconf commands can be executed on-demand, through the REST API, or automatically,
be it by the autonomic or by the scheduler. Commands executions are not traced in a history,
giving details about the execution's result, what triggered the execution, when, etc.

The history is global...

<img src="/resources/img/nn-0.9-global-commands-history.png" alt="Global commands history" class="gs" />

... or can be contextualized for a given application.

<img src="/resources/img/nn-0.9-commands-history-for-an-application.png" alt="Commands history for a given application" class="gs" />


## Docker Target was redesigned

The Docker target is a way to use Docker containers as a substitute for VMs.  
It primarily serves for test purpose.

This target was redesigned to rely on the official Docker images for Robocconf. All the image
generation was replaced. Users can now provide a dockerfile that should extend the official agent image.

<img src="/resources/img/nn-0.9-docker-target-v2.png" alt="Docker target was redesigned" class="gs" />


## On-Premise Deployments

The embedded target aims at using servers that preexist to Roboconf usage.  
It requires Roboconf agents to be installed on them.

This target handler was upgraded to pick up a machine amongst a list of provided IP addresses and dynamically give an identity
to a Roboconf agent. The agent's identity can be recycled once the machine is released by Roboconf.

<img src="/resources/img/nn-0.9-on-premise-hosts--en.png" alt="The DM can use and reuse servers from a given pool" class="gs" />


## Miscellaneous

A lot of enhancements have been brought to this new version.  
And many bugs were fixed too. Please, refer to the release notes for details.

* [Platform](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.9)
* [Web Administration](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.9)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.9)
