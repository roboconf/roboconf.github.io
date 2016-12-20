---
title: "Security :: CORS"
layout: page
cat: "ug-snapshot"
id: "security-and-cors"
menus: [ "users", "user-guide", "Snapshot" ]
---

CORS is related to the web administration.  
[CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) stands for **cross-origin resource sharing**.

Concretely, when CORS are enabled within Roboconf, it is possible to access the DM from any instance of the
web administration, including ones that were not served by the DM itself. As an example, the DM may be available
at http://localhost:8181/roboconf-web-administration/index.html and the web administration being served from
http://localhost:8000/.

CORS is very useful in development mode.  
But it can be dangerous in production environments. This is why it is disabled by default.

To enable (or disable it), edit the **net.roboconf.dm.rest.services.configuration.cfg** file
under Karaf's **etc** directory. The property to look for is called **enable-cors**.
