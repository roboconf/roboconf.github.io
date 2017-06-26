---
title: "Security: Miscellaneous"
layout: page
cat: "ug-snapshot"
id: "security-and-miscellaneous"
menus: [ "users", "user-guide", "Snapshot" ]
---

By default, deployments from the ***deploy** folder are disabled in Roboconf.  
This feature indeed allows to install a bundle or a feature by dropping it in Karaf's **deploy**
directory. If for some reason you had to enable it temporarily, you might disable it then by...

1. ... deleting the **etc/org.apache.felix.fileinstall-deploy.cfg** file.
2. ... deleting the **deploy** directory.
