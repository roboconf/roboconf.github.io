---
title: "Security: Deployed Software"
layout: page
cat: "ug-0-7"
id: "security-and-software"
menus: [ "users", "user-guide", "0.7" ]
---

For agents, beyond this access to the messaging server, ports / firewalls should be configured
to allow applicative connections. Configuring applicative connections should be part of the recipes. As an example, if you
wrote a recipe to manage the life cycle of a Tomcat server, you should open the right ports in the script that deploys this server.
And you should close these ports in the **uninstall** script.

When using system packages (like RPM or Debian packages), port configuration is generally part of
the install process. If you choose a manual installation, port configuration will have to be managed by hand (as
a example with iptables commands if you run on Linux systems).
