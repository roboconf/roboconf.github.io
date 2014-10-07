---
title: "Launching the Web Administration"
layout: page
id: "ug.0.1.launching-the-web-administration"
menus: [ "users", "user-guide" ]
---

Roboconf's Web Administration is a web application developed with [AngularJS](http://angularjs.org/).  
It comes a separate application and acts as a front-end for the DM. It is in fact a REST client with a web interface.

As explained on the [DM's installation page](installing-the-deployment-manager.html), the DM's web application
embeds this client by default.  
However, you may need to run it separately (as an example for test purpose).

Get the sources of Roboconf's web administration.  

	git clone git://github.com/roboconf/roboconf-web-administration.git

You must have [NodeJS](http://nodejs.org/) and [NPM](https://www.npmjs.org/) installed.  
Indeed, if in the WAR, the application's files are served by Tomcat (or an application server),
in stand-alone mode, they are served by NodeJS.

If you have  installed, go into the **roboconf-web-administration** folder, and type in

``` properties
# Download Javascript dependencies
npm install

# Start the application
npm start
```

This will start a small web server to serve the files.  
Then, assuming you are running it on your machine, open a web browser and go to

	http://localhost:8000/

All the dynamic part is handled by Javascript. This application is only made up
of static files. You could serve them from any web server.

> Do not open directly the *index.html* file into your web browser (file:/...).  
> Navigation will not work. You need the page to be served by a web server.

You might also prefer using another REST client.  
Remember, this application is just a front-end for the REST API exposed by the Deployment Manager.
Mozilla Firefox and Google Chrome have extensions to invoke REST services. Roboconf's REST API 
is documented in the [developer guide](/developer-guide/developer-guide.html).
