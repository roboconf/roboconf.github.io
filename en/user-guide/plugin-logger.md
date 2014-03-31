---
title: "The Logger Plug-in"
layout: page
id: "ug.snapshot.plugin-logger"
menus: [ "users", "user-guide" ]
---

The logger plug-in is a plug-in which only logs invocations.  
As an example, the *start* method only logs that "the start method was invoked".

This can be useful for debug purpose.  
This plug-in is associated with the **logger** installer name.

	Component_Y {
		alias: an alias;
		installer: logger;
	}
