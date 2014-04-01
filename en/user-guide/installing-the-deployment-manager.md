---
title: "Installing the Deployment Manager"
layout: page
id: "ug.snapshot.installing-the-deployment-manager"
menus: [ "users", "user-guide" ]
---

The Deployment Manager is a web application that exposes REST services.  
It also shows a very basic web page to make sure it is online.

To install the DM, grab **roboconf-dm-webapp.war** and deploy it on your favorite web application server.  
It requires the *servlet-api* library, version 2.5. You can use as an example [Apache Tomcat](https://tomcat.apache.org/whichversion.html)
from version 6.x.

If you are using Tomcat, just drop the WAR into the **webapps** directory.  
Assuming the server is running on your local machine, open a web browser 
and go to 

	http://localhost:8080/roboconf-dm-webapp/

The REST services are exposed at

	http://localhost:8080/roboconf-dm-webapp/rest/

> Although the DM could be deployed anywhere, a good practice is to keep it in your internal information system.  
> Indeed, the DM is just an interface to transmit orders to agents through the messaging server. Putting it in
> the cloud will require an extra effort to make it secured.