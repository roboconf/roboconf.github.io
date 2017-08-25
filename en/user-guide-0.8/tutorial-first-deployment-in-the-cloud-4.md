---
title: "Tutorial - First Deployment in the Cloud - 4/4"
layout: page
cat: "ug-0-8"
id: "tutorial-first-deployment-in-the-cloud-4"
menus: [ "users", "user-guide", "0.8" ]
---

## Going Farther

This page lists ideas to go farther with Roboconf.

<br />

**New Components**

1. Add new components in the graph.  
2. Write their recipes by using the extension you prefer (Bash, Puppet, File...).

<br />

**Hybrid Deployment**

1. Create various VM types, each one being associated with a different infrastructure.
2. Make sure the other components can be deployed over one or another one of these VMs.
3. Instantiate a deployment where some components run over a target 1, and others run over another target.

Example: deploy parts of your application on AWS and other parts on Openstack.

<br />

**Security**

1. Rework your security groups to reduce the number of open ports.  
2. Improve your virtual image for the agent by configuring **iptables** so that only the required ports are open (SSH, RabbitMQ...).
3. Rework the component recipes to open or close ports via **iptables** when an application starts or is stopped.
