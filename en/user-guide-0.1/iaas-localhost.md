---
title: "Localhost Support"
layout: page
cat: "ug-0-1"
id: "iaas-localhost"
menus: [ "users", "user-guide", "0.1" ]
---

Roboconf has a IaaS implementation to deploy on the local host.

> This implementation has no interest for production environments.
> However, it is really useful to debug Roboconf.

When it is asked to create a VM, this implementation launches an agent instance into
a distinct thread. Depending on the plug-ins the agent uses, this can lead to permissions issues.
As an example, the Puppet plug-in requires root permissions to work. When someone uses this
implementation, he or she should use the logger plug-in.

Sample **iaas.properties**.
Just copy / paste and edit.

```properties
# Configuration file for localhost
iaas.type = local
```

This kind of IaaS does not have any specific property.
