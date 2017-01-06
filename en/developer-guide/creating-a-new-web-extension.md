---
title: "Creating a new Web Extension"
layout: page
cat: "dg-snapshot"
id: "creating-a-new-web-extension"
menus: [ "developers", "developer-guide", "Snapshot" ]
---

It is possible to deploy web extensions in Roboconf.  
There are two levels of extensions:

1. Deploying a new web application or web services in the DM.
2. Making such an extension visible in the web administration.


## Web Extensions

The DM relies on Karaf's web server, which is Jetty.  
It is possible to deploy usual Java web applications in it, as well as WAB
(web application bundles). WAB are just WAR with an OSGi-compliant manifest.

You can find WAB examples in Roboconf's source code:

* [Roboconf's web administration wrapper](https://github.com/roboconf/roboconf-platform/tree/master/core/roboconf-dm-web-administration)  
This project downloads our AngularJS application and makes it served by Karaf's web server.
It also provides custom servlets.

* [Roboconf's REST services](https://github.com/roboconf/roboconf-platform/tree/master/core/roboconf-dm-rest-services)  
These services are based on Jersey (1.x) and Jackson for Java-JSon bindings.
An interesting aspect here is that we mix it with iPojo, the framework we use to ease OSGi development.
In particular, our REST services can access the manager's instance, which is provided by another bundle.

* [Roboconf's web extension for Kibana](https://github.com/roboconf/roboconf-platform/tree/master/web-extensions/roboconf-web-extension-for-kibana)  
This is a real web extension, meant to be linked from Roboconf's web console.
This project registers a new servlet in Karaf's web server. It serves content that are specific to Kibana
(links to Kibana dashboards in fact). It also registers itself as a Roboconf web extension, and can thus be
displayed in the web console.


## Registering a Web Extension in the Web Console

Among the 3 examples given above, only one can be referenced by the web console as an extension.  
To do so, it is necessary to inject the manager's instance into the servlet. It means an iPojo component
has to be created. The secret then, is to register the web location of this extension in Roboconf's preferences.

```java
// The path to access our servlet
String CONTEXT = "/roboconf-web-extension/kibana";

// Create and register the servlet
this.servlet = new KibanaExtensionServlet( this.manager );
this.httpService.registerServlet( CONTEXT, this.servlet, initParams, null );

// Register a new preference
this.manager.preferencesMngr().addToList( IPreferencesMngr.WEB_EXTENSIONS, CONTEXT );
```

This preference will have to be removed when the extension is unloaded.

```java
// The path to access our servlet
String CONTEXT = "/roboconf-web-extension/kibana";

// Update the HTTP service
this.logger.fine( "iPojo unregisters REST and icons servlets related to Roboconf's DM." );
if( this.httpService != null ) {
	this.httpService.unregister( CONTEXT );

} else {
	this.logger.fine( "The HTTP service is gone. The servlets were already unregistered." );
}

// Unregister the preference
if( this.manager != null ) {
	this.manager.preferencesMngr().removeFromList( IPreferencesMngr.WEB_EXTENSIONS, CONTEXT );
}
```

Again, the Kibana extension is the right example as it shows everything.  
When the web console is loaded by the browser, the preference that lists web extensions is retrieved.
If there exist web extensions, a new item is added to the global menu.

<img src="/resources/img/web-extension-menu.png" alt="A menu to access all the web extensions" class="gs" />

This allows the web console to show links towards web extensions. The content served by these extensions
is embedded in the console's pages. It allows extensions to provide new features while benefiting from the
same user experience (Angular stuff, look and feel, etc).

<img src="/resources/img/web-extension-kibana.png" alt="An extension that links to Kibana dashboards" class="gs" />

> Be careful, the web console can only load extensions hosted by the DM's web server.  
> So, you cannot reference any URL directly.

To deploy your extension, package your project.  
Then, deploy and start it in Roboconf's DM.
