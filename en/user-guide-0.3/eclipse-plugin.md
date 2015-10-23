---
title: "Roboconf's Eclipse plug-in"
layout: page
cat: "ug-0-3"
id: "eclipse-plugin"
menus: [ "users", "user-guide", "0.3" ]
---

There is an Eclipse plug-in for Roboconf.  
This plug-in includes a creation wizard for new Roboconf projects,
and text editors to edit configuration files.


## Installation

In Eclipse, click **Help &gt; Install New Software...**.  
Click **Add...** and complete the dialog that shows up.  
Give it a name, like...

	Roboconf's update site

... and this URL: 
[http://dl.bintray.com/roboconf/roboconf-eclipse/0.3/](http://dl.bintray.com/roboconf/roboconf-eclipse/0.3/)

<img src="/resources/img/eclipse-install.jpg" alt="The update dialog" />

Click **OK**.    
Wait few seconds. An item containing **Roboconf** should appear. Check it and click **Next**.  
Keep on clicking **Next** and **OK** until you are asked to restart your Eclipse.  
Confirm. After the restart, the plug-in is installed. 


## New Project Wizard

There is a creation wizard to generate a new Roboconf project.  
You can access it by clicking **File &gt; New &gt; ...** and then **Roboconf &gt; Roboconf Project**.

<img src="/resources/img/eclipse-wizard-1.jpg" alt="Overview of the Eclipse wizard" />

<img src="/resources/img/eclipse-wizard-2.jpg" alt="Another overview of the Eclipse wizard" />


## Editors

There is one editor for **instances** file and another one for **graph** files.  
These editors provide syntax highlighting for Roboconf's DSL.

<img src="/resources/img/eclipse-editor.jpg" alt="Overview of the Eclipse editor(s)" />


> Validation and context assistance (such as auto-completion)
> have not yet been implemented in these editors.
