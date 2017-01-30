---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.7"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0.7.


## Paquets RPM

Des paquets RPM sont désormais disponibles pour installer Roboconf sur CentOS, Fedora et systèmes affiliés.

> yum install roboconf-dm  
> yum install roboconf-agent

<img src="/resources/img/nn-0.7-rpm-packages-for-roboconf.jpg" alt="Paquets RPM pour Roboconf" class="gs" />


## Docker Images

Des images Docker pour Roboconf sont désormais disponibles depuis [Docker Hub](https://hub.docker.com/u/roboconf/).

> docker pull roboconf/roboconf-dm  
> docker run...

<img src="/resources/img/nn-0.7-docker-images-for-roboconf.jpg" alt="Images Docker pour Roboconf" class="gs" />


## Exécution Planifiée de Commandes Roboconf

Les commandes Roboconf, qui sont des instructions d'administration scriptées, peuvent maintenant
être exécutée dans le cadre d'une planification. La console d'administration permet d'associer
ces commandes avec des expressions CRON.

<img src="/resources/img/nn-0.7-scheduling-for-commands.jpg" alt="Exécution planifiée de commands Roboconf" class="gs" />


## Outillage Eclipse

L'outillage Eclipse a été nettement amélioré.  
Les éditeurs textuels proposent désormais de l'auto-complétion.

<img src="/resources/img/nn-0.7-eclipse-editor-with-auto-completion.jpg" alt="Auto-completion dans Eclipse" class="gs" />

Ils sont complétés par une valdiation à la volée...

<img src="/resources/img/nn-0.7-eclipse-editor-with-validation.jpg" alt="Validation à la volée dans Eclipse" class="gs" />

... ainsi que par un modeleur graphique.

<img src="/resources/img/nn-0.7-eclipse-graphical-modeler.jpg" alt="Éditeur graphique dans Eclipse" class="gs" />

Ce dernier outil a été réalisé dans le cadre du projet [OCCIware](http://www.occiware.org), qui vise l'amélioration
des standards du monde du cloud autour de la norme [OCCI](http://occi-wg.org), pilotée par [l'OGF](https://www.ogf.org).
OCCIware inclut le développement d'outils en lien avec l'ingénieurie des modèles.


## Réparation des Connexions RabbitMQ

Il arrive que les connexions entre RabbitMQ et les clients Roboconf (DM et agents) cassent.  
Roboconf gère maintenant ces situations en réparant automatiquement les pertes de connexions.

<img src="/resources/img/nn-0.7-auto-reconnect-fr.png" alt="Répération automatique des connexions avec RabbitMQ" class="gs" />


## Générateurs de Documentation Complétés

Les générateurs de documentation ont été enrichis.  
Ils peuvent désormais générer des [documents FOP](https://xmlgraphics.apache.org/fop/) ainsi que des documents PDF.

<img src="/resources/img/nn-0.7-doc.png" alt="Générer une documentation project en PDF" class="gs" />


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux entrées sur Github pour plus de détails.

* [Plate-forme](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Administration Web](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.7)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.7)
