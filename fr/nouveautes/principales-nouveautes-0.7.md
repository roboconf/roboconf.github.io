---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.7"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0.5.


## Paquets RPM

Des paquets RPM sont désormais disponibles pour installer Roboconf sur CentOS, Fedora et autres systèmes.


## Docker Images

Des images Docker pour Roboconf sont désormais disponibles depuis [Docker Hub](https://hub.docker.com).


## Exécution Planifiée de Commandes Roboconf

Les commandes Roboconf, qui sont des instructions d'administration scriptées, peuvent maintenant
être exécutée dans le cadre d'une planification. La console d'administration permet d'associer
ces commandes avec des expressions CRON.


## Outillage Eclipse

L'outillage Eclipse a été nettement amélioré.  
Les éditeurs textuels proposent désormais de l'auto-complétion.

Ils sont complétés par une valdiation à la volée...

... ainsi que par un modeleur graphique.


## Réparation des Connexions RabbitMQ

Il arrive que les connexions entre RabbitMQ et les clients Roboconf (DM et agents) cassent.  
Roboconf gère maintenant ces situations en réparant automatiquement les pertes de connexions.


## Générateurs de Documentation Complétés

Les générateurs de documentation ont été enrichis.  
Ils peuvent désormais générer des [documents FOP](https://xmlgraphics.apache.org/fop/) ainsi que des documents PDF.


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux entrées sur Github pour plus de détails.

* [Plate-forme](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Administration Web](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.7)

