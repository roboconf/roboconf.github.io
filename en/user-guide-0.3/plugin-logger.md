---
title: "The Logger Plug-in"
layout: page
cat: "ug-0-3"
id: "plugin-logger"
menus: [ "users", "user-guide", "0.3" ]
---

The logger plug-in is a plug-in which only logs invocations.
As an example, the *start* method only logs that "the start method was invoked".

This can be useful for debug purpose.
This plug-in is associated with the **logger** installer name.

<pre><code class="language-roboconf">
Component_Y {
	installer: logger;
}
</code></pre>
