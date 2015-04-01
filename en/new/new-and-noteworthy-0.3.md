---
title: "New &amp; Noteworthy"
layout: page
cat: "main"
id: "download-new-and-noteworthy-0.3"
menus: [ "users", "download" ]
---

This page lists the enhancements and new features brought by Roboconf 0.3.


## Better Performances for Cloud Deployments

VM configuration is now made in background/asynchronous mode and in parallel.  
It results in much faster deployments when there are _a lot_ of virtual machines.

<img src="/resources/img/nn-0.3-cloud-deployments.png" alt="Cloud deployment in AWS" />

<br />

## Reusable Recipes

We have set up all the mechanics to define and reuse recipes.  
Recipes are defined and managed independently.

<img src="/resources/img/nn-0.3-recipes-4.png" alt="A Git repository for an Apache recipe" class="gs" />

To use a recipe, reference its artifact...

<img src="/resources/img/nn-0.3-recipes-2.png" alt="Declare a dependency in your POM" />

... and import the graph definition.

<img src="/resources/img/nn-0.3-recipes-3.png" alt="Import the graph definition" />

<br />

## Documentation Generator

<img src="/resources/img/nn-0.3-doc.png" alt="An example of generated documentation" class="gs" />

We created a tool to generate documentation from your Roboconf applications.  
It comes with several options, output formats and languages.

<br />

## The Bash plug-in becomes the Script plug-in

We have extended the scope of the **Bash** plug-in to support any script.  
Bash, Shell, Perl and Python are just examples. But this gives quite a lot of new possibilities.

<br />
<img src="/resources/img/nn-0.3-bash-becomes-script.png" alt="The script plug-in" />

<br />

## Roboconf's DSL support in Atom.io

<img src="/resources/img/atom.io-overview.png" alt="Atom.io support" />

<br />

## Miscellaneous

A lot of tiny enhancements have been brought to this new version.  
And many bugs were fixed too. Please, refer to the 
[release notes](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.3)
for details.
