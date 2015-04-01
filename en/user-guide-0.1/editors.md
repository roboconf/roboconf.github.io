---
title: "Editors"
layout: page
cat: "ug-0-1"
id: "editors"
menus: [ "users", "user-guide", "0.1" ]
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


## Eclipse

It is planned to develop Eclipse tools to easily edit Roboconf's configuration files.  
The value of such edition tools resides in syntax highlighting, auto-completion and contextual
help (such as validation markers or quick fix).

As a reminder, Roboconf's parsing and model library is written in Java and is technology-agnostic.  
It means it could be used in any IDE or Java tool. The fact we create Eclipse tools does not mean
you could not create such editors in NetBeans or other IDE.
