---
title: "Roadmap"
layout: page
cat: "main"
id: "roadmap"
menus: [ "project", "roadmap" ]
---

Roboconf started as a Research prototype and is now under industrialization.  
The roadmap for the next months covers several aspects.

<!-- 
	 &nbsp; <span class="glyphicon glyphicon-ok"></span>
	 &nbsp; <span class="glyphicon glyphicon-time"></span>
-->


* **From October 2015**

	* Prepare a new API for Roboconf messaging.
	* Add support of commands in Roboconf.
	* Improve agent measures for the autonomic (average measures, etc.).
	* Add fine-grained quotas for the autonomic on the DM's side.
	* Handle complex combinations of events to trigger a reaction.
	* Support the live update of thresholds (in the agent's autonomic) through the web console.
	* Make RabbitMQ optional (alternative HTTP-based messaging for new beginners).


* **After January 2016**

	* Create RPM packages for Roboconf.
	* Complete support in Eclipse and other editors.	
	* Add support to execute user scenarios.
	* Support applications migration (continuous deployment).
	* Create a Jenkins plugin.
	* Implement a SSH target.


* **For Contributions**

    * Implement a Chef plug-in.
    * Implement a Puppet plug-in for Puppet masters.
    * Implement an ANT plug-in.
    * Study TOSCA support.
    * Upgrade Roboconf's messaging with SSL support.


Roboconf 0.5 will be released on October, 19<sup>th</sup>.  
Roboconf 0.6 will be released in January 2016.
