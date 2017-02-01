---
title: "New &amp; Noteworthy"
layout: page
cat: "main"
id: "new-and-noteworthy-0.8"
menus: [ "users", "download" ]
---

This page lists the enhancements and new features brought by Roboconf 0.8.

<!-- FIXME: all the links should point to 0.8. -->


## Security

An important work has been done about security.

* Enable or disable [CORS support](../user-guide/security-and-cors.html) for the REST clients.
* Specify [the network interface](../user-guide/security-and-agents.html) for Roboconf agents.
* User authentication for CLI with various back-ends
([properties files](../user-guide/security-and-authentication-with-properties-files.html),
[LDAP server](../user-guide/security-and-authentication-with-a-ldap-server.html),
[database](../user-guide/security-and-authentication-with-a-database.html)).
* [Configure the web console for HTTPS](../user-guide/security-and-https-console.html).

<img src="/resources/img/nn-0.8-web-console-in-https.png" alt="Web Console in HTTPS" class="gs" />

Other tasks are planned about security for the next version.
<br />
<div><hr class="darker" /></div>


## New Deployment Topologies

Several deployment topologies are now possible with Roboconf.  
The last upgrade was about introducing [Roboconf domains](../user-guide/roboconf-domains.html).

<img src="/resources/img/nn-0.8-en-roboconf-domains--same-messaging.png" alt="An installation with several DMs" class="gs" />

Please, refer to this [page](../user-guide/roboconf-domains.html) for more examples.
<br />

<div><hr class="darker" /></div>


## Internationalization of the Web Administration

The web administration has been internationalized.  

<img src="/resources/img/nn-0.8-i18n.png" alt="Internationalization of the web console" class="gs" />

Administrators can set the default language in the [DM's preferences](../user-guide/roboconf-preferences.html).

```properties
# The user language (e.g. for the web console).
#
# Possible values:
#  - EN (for English)
#  - FR (for French)
#
user.language = EN
```

For the moment, English and French translations have been provided.
<div><hr class="darker" /></div>


## Customizing the Look'n'Feel of the Web Administration

It is now possible to add
[its own CSS file and image banner](../user-guide-snapshot/customizing-the-web-administration-look-n-feel.html)
for Roboconf's web administration.

<img src="/resources/img/nn-0.8-customizing-the-web-administration.png" alt="Web administration with custom CSS and banner image" class="gs" />
<div><hr class="darker" /></div>


## Documentation for our REST API

There is now a [Swagger UI installation](../developer-guide/rest-api.html) on our web site to get information
about our REST API and web socket.

<img src="/resources/img/nn-0.8-swagger-ui-for-roboconf.png" alt="Swagger UI" class="gs" />
<div><hr class="darker" /></div>


## Mavenized Deployment Targets

Deployment targets could already be defined in the web administration or embedded
in application templates. They can now be packaged independently and managed as
[stand-alone Maven artifacts](http://localhost:4000/en/user-guide-snapshot/maven-plugin-for-targets.html)
that you can deploy with the web administration.

<img src="/resources/img/nn-0.8-targets-upload.png" alt="Deployment targets" class="gs" />
<div><hr class="darker" /></div>


## Fine-Grained Associations for Deployment Targets

Deployment targets can be associated with applications (default setting),
with specific instances...

<img src="/resources/img/nn-0.8-fine-grained-associations-for-targets-2.png" alt="Associate targets with instances" class="gs" />

...  and now with components.  
This brings a lot more flexibility when defining these associations.

<img src="/resources/img/nn-0.8-fine-grained-associations-for-targets-1.png" alt="Associate targets with components" class="gs" />
<div><hr class="darker" /></div>


## Monitoring with Apache Decanter and ELK

We wrote a [tutorial](../user-guide-snapshot/tutorial-monitoring-roboconf-with-apache-decanter.html)
to show how to use [Apache Decanter](https://karaf.apache.org/manual/decanter/latest-1/),
[Elastic Search](https://www.elastic.co) and [Kibana](https://www.elastic.co/products/kibana)
to monitor Roboconf installations. For the moment, we mainly monitor
OS and agent metrics. Applications monitoring will be shown later.

<img src="/resources/img/nn-0.8-kibana-dashboard-example.png" alt="Example of Kibana dashboard for Roboconf" class="gs" />
<div><hr class="darker" /></div>


## Advanced Machine Configurations

Configuration scripts can now be added to deployment targets to complete machine configurations.

* On the agent's side, these scripts can be use to format and mount partitions.
* On the DM's side, these scripts can be used to complete the configuration
of a machine (e.g. passing parameters to an agent, or even uploading and installing an agent).

<img src="/resources/img/nn-0.8-advanced-machine-configurations.png" alt="Completing machine configuration" class="gs" />
<div><hr class="darker" /></div>


## 1-\* Bindings for Inter-Application Links

Formerly, we could only bind two applications together (1-1 relation).  
Now, these bounds can follow a 1-* relation.

<img src="/resources/img/nn-0.8-multi-bindings.png" alt="1-n relations for inter-application links" class="gs" />
<div><hr class="darker" /></div>


## Object Storage Configuration in Openstack

Roboconf can now create domain in Openstack's Swift component.

<img src="/resources/img/openstack.jpg" alt="Support of object storage in Openstack" class="gs" />
<div><hr class="darker" /></div>


## OCCI Infrastructure Support

Roboconf can now manage cloud infrastructures by using the REST specification
[OCCI Infrastructure](http://occi-wg.org/about/specification/).

<img src="/resources/img/nn-0.8-occi-support.png" alt="Support OCCI Infrastructure" class="gs" />
<div><hr class="darker" /></div>


## Miscellaneous

A lot of enhancements have been brought to this new version.  
And many bugs were fixed too. Please, refer to the release notes for details.

* [Platform](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.8)
* [Web Administration](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.8)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.8)
