---
title: "Configuring the Web Consoles"
layout: page
cat: "ug-0-3"
id: "configuring-the-web-consoles"
menus: [ "users", "user-guide", "0.3" ]
---

Both the DM and the agent distributions rely on Apache Karaf.
And they both include a web server with an administration console.

This console is, by default, available at [http://localhost:8181/system/console](http://localhost:8181/system/console).
Default credentials are **karaf** / **karaf**.

This console provides several menus, including the bundle administration...

<img src="/resources/img/web-console-bundles.jpg" alt="The bundle management page in Karaf's web console" class="gs" />

... the HTTP contexts...

<img src="/resources/img/web-console-http.jpg" alt="The HTTP contexts in Karaf's web console" class="gs" />

...  and the iPojo objects.

<img src="/resources/img/web-console-ipojo.jpg" alt="The iPojo page in Karaf's web console" class="gs" />

By default, the port is 8181. When you start one of the Karaf distributions for the first time, a **jetty.xml**
file is created under Karaf's **etc** directory. You can change the port and other web settings by editing this
file. This configuration is also used by the DM's web administration.

More information can be found at [http://karaf.apache.org/manual/latest/users-guide/webconsole.html](http://karaf.apache.org/manual/latest/users-guide/webconsole.html).
