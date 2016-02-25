---
title: "Editors"
layout: page
cat: "ug-0-5"
id: "editors"
menus: [ "users", "user-guide", "0.5" ]
---

Roboconf's configuration files use a custom notation.  
This notation is inspired from CSS. The main difference relies in the key words
and in the comment delimiters (there is only a in-line comment delimiter, the sharp '#'
character).

This make these configuration files very easy to read and to modify within any text editor.


## Notepad ++

For those who use [Notepad ++](http://notepad-plus-plus.org), a configuration file has been written for the Roboconf syntax.  
It brings syntax highlighting in the editor. You can download it [here](/resources/downloads/roboconf--npp.xml). 

Follow [these instructions](http://sourceforge.net/apps/mediawiki/notepad-plus/index.php?title=User_Defined_Language_Files#How_to_install_user_defined_language_files)
to install it in Notepad ++.


## Atom.io

There is an Atom package for Roboconf's DSL.  
It provides syntax highlighting and snippets for the Roboconf configuration files (graph and instances).  
You can find information on [Atom's web site](https://atom.io/packages/language-roboconf).

Here is a screenshot with the dark theme.  
<img src="/resources/img/atom.io-overview.png" alt="Atom.io overview" class="gs" />


## IDE

The value of such edition tools resides in syntax highlighting, auto-completion and contextual
help (such as validation markers or quick fix).

For the moment, only Eclipse tooling has been created.  
You can find more information about the Eclipse plug-in [here](eclipse-plugin.html).

Since Roboconf's parsing and model library is an independent Java library, it is possible to reuse the
validation code and model classes in other IDE (such as Netbeans).


## HTML Pages

If you want to embed snippets of Roboconf's DSL in HTML pages, we have added Roboconf
support to [Highlight JS](http://highlightjs.org/).  
Just add the right JS and CSS links in your HTML page and wrap your code as follows.

```html
<pre><code class="roboconf" data-trim>
	# Your snippet of Roboconf's DSL
</code></pre>
```

This is what is used for syntax highlighting in the [online presentations](../reusable-slides.html).

