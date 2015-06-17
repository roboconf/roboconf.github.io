---
title: "Installing the Deployment Manager"
layout: page
cat: "ug-0-3"
id: "installing-the-deployment-manager"
menus: [ "users", "user-guide", "0.3" ]
---

The Deployment Manager (or DM) is an OSGi application that drives deployments and administration actions.  
Basically, it can deploy, start, stop and undeploy instances of Software components. It is also in charge
of maintaining application models and artifacts.

The DM itself exposes REST services.  
It also comes with a web interface which is in fact a client for the REST API. 
By default, this interface is bundled with the DM, but it can also be run
independently.

> The Deployment Manager is the administration part of Roboconf. And although it could, it is not supposed to run all the time. 
> So, you may stop it when you do not use it anymore. The agents will work without it and without any problem.

To install the DM, you need a Java Virtual Machine (JDK) for Java 1.7.  
Both OpenJDK and Oracle JDK are supported.

Although we generally test Roboconf with Ubuntu systems, there is no reason it does not work on other systems.  
However, **we recommend using Linux systems**.

Several options are available to install the DM.
 
* Deploy our predefined OSGi distribution for the DM.
* Deploy the DM as a Karaf feature on your own Karaf server.
* Deploy the DM's bundles in an OSGi container.


> This page only describes how to install the DM.  
> Take a look at [this page](configuring-the-deployment-manager.html) to see how to configure it.


# Installing Java

Installing Java is described in several places all over the web.  
Here are some short links and snippets to make you gain some time.
Take a look at [this page](http://doc.ubuntu-fr.org/java) as an example.

```
sudo apt-get update
sudo apt-get install openjdk-7-jdk 
```

And define the **JAVA_HOME** environment variable.  
On Ubuntu 14.04, the following command installs Java here...

	/usr/lib/jvm/java-7-openjdk-amd64/jre

If you use Karaf, you can define this variable in the Karaf's **bin/setenv** file.


# The Custom Karaf Distribution for the DM

[Apache Karaf](http://karaf.apache.org/) is an OSGi server.  
It brings additional features to OSGi containers like Felix (Apache) or Equinox (Eclipse). It also allows to build custom distributions
with pre-installed bundles and their configurations. The custom Karaf distribution for the DM is thus a stand-alone server with the
Roboconf's DM being already deployed and configured. The DM distribution uses [Apache Felix](http://felix.apache.org/).

> Having several Karaf servers on a machine can result in port conflicts.
> If it is your case, you may have to configure the ports differently. 
> Or you may prefer deploying our Karaf feature in your own Karaf installation.

This distribution can be deployed either with a Debian package or manually.  
To deploy it manually, you must have a JDK 7 installed. Then, [download the DM's archive](../download.html)
and unzip it somewhere on your disk.

> It is better to take the **tar.gz** archive, since it preserves file permissions.  
> If you use the ZIP, change the permissions of the **data/tmp** directory to 774.  

To start it, execute...

```bash
cd bin
./karaf
```

This opens an interactive shell.  
To exit, type in...

```bash
logout
```

You can find help and more instructions about Karaf on [its web site](http://karaf.apache.org/).


# The DM Feature for Karaf

If you already have your own Karaf server, you may prefer to install the DM as a feature.  
The DM feature is a XML file that lists the bundles to install and some of their dependencies so that the DM works.

We do not have any official release yet.  
However, you can add our snapshot repository to the list of features repository.

Start your karaf and execute...

```properties
# Add the feature URL
features:addurl https://oss.sonatype.org/content/repositories/snapshots/net/roboconf/roboconf-karaf-feature-dm/0.2-SNAPSHOT/feature.feature.xml

# Install the feature 
feature:install roboconf-dm
```

For the record, the **roboconf-dm** feature depends on the following features:

* **ipojo-all** since Roboconf bundles use iPojo.
* **war** since Roboconf exposes the web administration (a web application).
* **jersey 1.x** since the REST services rely on Jersey 1.x (this also includes Jackson bundles).
* **config** since the DM can be reconfigured through *Config Admin*.


# The DM Bundles

It is possible to deploy the DM bundles directly in Felix, Equinox or any other OSGi container.  
To determine all the required bundles, take a look at the Karaf feature described above. The previous section
also lists their dependencies (as other Karaf features).
