---
title: "Roboconf's Eclipse plug-in"
layout: page
cat: "ug-last"
id: "eclipse-modeling-plugin"
menus: [ "users", "user-guide" ]
---

This page lists the modeling [Eclipse features](eclipse-plugins.html) for Roboconf.


## Creating a New Diagram Project

Click **File** > **New** > **Project**.  
Then select **Roboconf** > **Diagram Project for Roboconf Graphs**.

<img src="/resources/img/eclipse-modeler-wizard.png" alt="Diagram Wizard" class="gs" />

Click **Next**.

<img src="/resources/img/eclipse-modeler-wizard-page.png" alt="The project page in thee diagram wizard" class="gs" />

Give your project a name and click **Finish**. On wizard completion, a project is created and an editor is visible.
For those who are familiar with Eclipse, this project is now compliant with [Sirius](https://eclipse.org/sirius/).


## The Sirius Modeler

You can use the palette on the right to add new Roboconf facets and components on the drawing area. You can also define the
relations between the graph elements: inheritance, containment (children) links and runtime relations.

<img src="/resources/img/eclipse-modeler-overview.png" alt="Overview of the graph(s) modeler" class="gs" />

Here is a summary of the available operations.

* Clicking a node **label** allows you to edit its name.
* Double-clicking a node allows you to select an image on your disk.  
This image will be imported in the project under **images** and used in the diagram.
* Double-clicking a runtime link allows to edit imported variables.
* Right-clicking the diagram shows a menu to export it as an image.

You can also use the layers icon (at the top) to filter the relations you want to see.  
It does not delete the links (the model remains the same). Only the representation is impacted.

<img src="/resources/img/eclipse-modeler-layers.png" alt="Use layers to manage relations separately" class="gs" />

You can also manage exported and imported variables by using the Roboconf variables view.  
To open it, click **Window** > **Show View** > **Other** and select **Roboconf** > **Roboconf Variables**.

<img src="/resources/img/eclipse-modeler-sample-diagram.png" alt="The Roboconf Variables view completes the modeler" class="gs" />


## Code Generation

This modeler allows you to build visual representations of Roboconf graphs.  
From these representations, it is also possible to generate a graph file or even a Roboconf project.

Once your diagram is complete, right-click the *graph-ui* model file in the explorer and select
**Roboconf** > **Generate Files**.  
A wizard shows up and provides various options to generate artifacts.

<img src="/resources/img/eclipse-modeler-generation-page-1.png" alt="Choose between generating a project and a single file" class="gs" />

The project generation page is very similar to the one to create a new Roboconf project.  
The main difference is that the graph will be exactly what you modeled graphically.

<img src="/resources/img/eclipse-modeler-generation-page-2.png" alt="Generating a project..." class="gs" />


## Creating new Representations (Advanced)

As for any Sirius modeler, representations are stored in the *representations.aird* file.

In the **Model Explorer**, find the *configuration* element under the *graph-ui* file.  
Right-click it and select **New Representation** > **New Graph(s) Diagram**.

<img src="/resources/img/eclipse-modeler-new-representation.png" alt="Create a new representation" class="gs" />

Give a name to your representation (e.g. *graph*) and click **OK**.

<img src="/resources/img/eclipse-modeler-new-representation-name.png" alt="Give a name to the new representation" class="gs" />

The representation is now visible in a Sirius modeler.  

