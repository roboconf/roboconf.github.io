---
title: "Roboconf Preferences"
layout: page
cat: "ug-last"
id: "roboconf-preferences"
menus: [ "users", "user-guide" ]
---

This page introduces Roboconf preferences.  
Preferences are a set of key-value pairs. They can be set through a configuration
file (**etc/net.roboconf.dm.preferences.cfg**), through our REST API or
programmatically (by using the Manager's methods).

> The content of the **net.roboconf.dm.preferences.cfg** file is generated
> on the fly during the build process. So, it is always up-to-date with the code.

There are preferences related to e-mailing (SMTP configuration, etc), user language in
the web administration, ports to skip when generating random ports, etc.

Each preference comes with its own documentation.  
Please, refer to the **net.roboconf.dm.preferences.cfg** file for more details.
