---
title: "Tutorial - Monitoring Roboconf with Apache Decanter"
layout: page
cat: "ug-snapshot"
id: "tutorial-monitoring-roboconf-with-apache-decanter"
menus: [ "users", "user-guide", "Snapshot" ]
---

> It is assumed here that you followed this previous tutorials and are familiar with Roboconf.

This tutorial shows how to install and configure Apache Decanter to monitor Roboconf (DM and agents)
with Elastic Search and Kibana. The big picture is that...

1. ... Decanter retrieves metrics from the machines and the Roboconf distributions.
2. ... these metrics are sent in an Elastic Search instance / cluster.
3. ... Kibana dashboards are used to show and filter monitoring information.


## ELK Installation

Elastic Search and Kibana are a well-known solution to collect and display data.  
To make things easy (find the right versions that work together), we are going to use Docker to run them.

To complete...
