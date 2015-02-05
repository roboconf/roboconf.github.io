---
title: "Liste des Changements"
layout: page
id: "main.download.changelog"
menus: [ "users", "download" ]
---

Cette page récapitule la liste des fonctionnalités principales et des changements apportés
à chaque version de Roboconf.

## Version 0.2

Roboconf 0.2 est une refonte de Roboconf basée sur OSGi.

Le DM et l'agent se présentent sous la forme d'applications OSGi pré-conditionnées sous la forme
de distributions Karaf. Cette nouvelle version est aussi plus robuste, plus modulaire et facilement extensible.
Par ailleurs, le formalisme de description de Roboconf a été revu et complété.

* *Cibles* supportées : Amazon EC2, Microsoft Azure, Openstack, VMWare, Docker, ainsi que les hôtes plus classiques (serveurs, objets embarqué...).
* Extensions disponibles : Bash, File, Puppet, Logger.


## Version 0.1

La version 0.1 est la première release stable de Roboconf.  

Le **Deployment Manager** (DM) est une application web qui peut être déployée
sur n'importe quel serveur d'application.  
L'**agent** est quant à lui une application Java autonome.

* *Cibles* supportées : Amazon EC2, Microsoft Azure, Openstack, VMWare, ainsi que les hôtes plus classiques (serveurs, objets embarqué...).
* Extensions disponibles : Bash, Puppet, Logger.
