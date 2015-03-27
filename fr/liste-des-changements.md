---
title: "Liste des Changements"
layout: page
id: "main.download.changelog"
menus: [ "users", "download" ]
---

Cette page récapitule la liste des fonctionnalités principales et les changements apportés
à chaque version de Roboconf.


<!--
## Version 0.3

Roboconf 0.3 apporte des améliorations pour le déploiement dans le cloud.  
La création des machines est plus rapide, et leur configuration se fait désormais
en parallèle et de manière asynchrone. Ces optimisations permettent d'effectuer de
gros déploiements plus rapidement qu'avec les versions précédentes de Roboconf.

L'équipe de développement a égalemen ttravaillé sur la réutilisabilité de recettes.
Nous avons mis en place une nouvelle organisation Github, [Roboconf-recipes](https://github.com/roboconf-recipes), 
pour partager de telles recettes. N'hésitez pas à vous en servir et à en contribuer de nouvelles.

Enfin, l'outillage a continué d'être enrichi.  
Le plug-in Maven est désormais complet, un générateur de documentation a été réalisé,
et des contributions ont été faites pour supporter le DSL de Roboconf dans des outils d'édition
comme [Atom.io](https://atom.io/).

Vous pouvez jeter un oeil [aux nouveautés](nouveautes/nouveautes-principales-0.3.html) de cette version 0.3.
-->


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
