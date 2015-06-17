---
title: "Installing the Deployment Manager"
layout: page
cat: "ug-0-1"
id: "installing-the-deployment-manager"
menus: [ "users", "user-guide", "0.1" ]
---

The Deployment Manager (or DM) is a web application that drives deployments and administration actions.
Basically, it can deploy, start, stop and undeploy instances of Software components. It is also in charge
of maintaining application models and artifacts.

The DM itself exposes REST services.
It also shows a very basic web page to make sure it is online. The DM also comes with a web interface which is
in fact a client for the REST API. By default, this interface is bundled with the DM, but [it can also be run
independently](launching-the-web-administration.html).

To install the DM, grab **roboconf-dm-webapp.war** and deploy it on your favorite web application server.
It requires the *servlet-api* library, version 2.5. You can use as an example [Apache Tomcat](https://tomcat.apache.org/whichversion.html)
from version 6.x.

If you are using Tomcat, just drop the WAR into the **webapps** directory.
Assuming the server is running on your local machine, open a web browser
and go to

	http://localhost:8080/roboconf-dm-webapp/

The REST services are exposed at

	http://localhost:8080/roboconf-dm-webapp/rest

And the embedded web client for the REST services is available at

	http://localhost:8080/roboconf-dm-webapp/client

> Although the DM could be deployed anywhere, a good practice is to keep it in your internal information system.
> Indeed, the DM is just an interface to transmit orders to agents through the messaging server. Putting it in
> the cloud will require an extra effort to make it secured. Besides, the DM is not supposed to run all the time.

The DM is not supposed to run all the time.
Once you have installed it, you should take a look at [its configuration](configuring-the-deployment-manager.html).
