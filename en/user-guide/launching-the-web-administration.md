---
title: "Launching the Web Administration"
layout: page
id: "ug.snapshot.launching-the-web-administration"
menus: [ "users", "user-guide" ]
---

Roboconf's Web Administration is a web application developed with [AngularJS](http://angularjs.org/).  
It comes a separate application and acts as a front-end for the DM. It is in fact a REST client with a web interface.

Get the sources of Roboconf's web administration.  
If you have [NodeJS](http://nodejs.org/) installed, go into the **app** folder, and type in

	node ../web-scripts/web-server.js

This will start a small web server to serve the files.  
Then, assuming you are running it on your machine, open a web browser and go to

	http://localhost:8000/index.html

Otherwise, you can serve these static files from any web server.  
The dynamic part is located inside the Javascript code.

> Do not open directly the *index.html* file into your web browser (file:/...).  
> Navigation will not work. You need the page to be served by a web server.

You can also prefer using another REST client.  
Mozilla Firefox and Google Chrome have extensions to invoke REST services.  
Roboconf's REST API is documented in the [developer guide](/developer-guide/developer-guide.html).
