---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.4"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0.4.



## Paquets Debian

Vous pouvez maintenant installer Roboconf avec (quasiment) une seule ligne de commande grâce à nos paquets Debian.

> sudo apt-get install roboconf-dm  
> sudo apt-get install roboconf-agent

<img src="/resources/img/nn-0.4-debian-packages-for-roboconf.jpg" alt="Paquets Debian pour Roboconf" class="gs" />
<br />


## Améliorations sur le support de Docker

<br />
<img src="/resources/img/nn-0.4-enhanced-docker-support.png" alt="Meilleur support de Docker" />
<br /><br />

* Nouveaux paramètres pour générer une image Docker pour et avec Roboconf.
* Création de conteneurs Docker sur la machine locale ou sur des machines distances (VM créées par Roboconf).
* Support d'options Docker pour la création de conteneurs.
* Meilleures performances.

<br />

## Administration Web

L'administration web a été entièrement retravaillée.

* La liste d'applications fournit plus de raccourcis et d'informations qu'auparavant.
* Elle est accompagnée d'indicateurs plus précis pour savoir quelles actions sont possibles.

<img src="/resources/img/nn-0.4-web-admin-app-listing.png" alt="Liste des applications" class="gs" />

<br />
La gestion des instances a été améliorée.
<br />
<img src="/resources/img/nn-0.4-web-admin-instances.png" alt="Liste des instances dans une application" class="gs" />

<br />
La liste des actions disponibles, ainsi que leur rendu, ont été revus.
<br />
<img src="/resources/img/nn-0.4-web-admin-instance-state.png" alt="Gestion d'une instance particulière" class="gs" />

<br />
Il est désormais possible de créer une ou plusieurs instances depuis l'administration web.
<br />
<img src="/resources/img/nn-0.4-web-admin-new-instances.png" alt="Créer une nouvelle instance dans une application" class="gs" />

<br />
Le menu a été contextualisé et rendu plus discret.
<br />
<img src="/resources/img/nn-0.4-web-admin-contextual-menu.png" alt="Menu contextuel" class="gs" />


## Squelettes d'Applications

Les applications Roboconf (graphe, descripteur...) correspondent désormais à des squelettes d'applications.  
Une fois le ZIP uploadé, on peut instancier plusieurs applications à partir de cette base.

<img src="/resources/img/nn-0.4-web-admin-new-application.png" alt="Crér une nouvelle application depuis un template" class="gs" />

<br />
Les applications et leurs squelettes sont gérés séparément.
<br />
<img src="/resources/img/nn-0.4-web-admin-app-templates-listing.png" alt="Liste des squelettes d'application" class="gs" />


## Tutoriel avec Apache Storm

Un tutoriel a été rédigé pour montrer comment déployer une pile &laquo; Big Data &raquo; légère basée sur [Apache Storm](https://storm.apache.org/).  
Il explique les fondamentaux de Storm, le déploiement avec Roboconf et comment faire tourner cet exemple.

<img src="/resources/img/nn-0.4-apache-storm-with-roboconf.png" alt="Apache Storm déployé avec Roboconf" class="gs" />


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux entrées sur Github pour plus de détails.

* [Plate-forme](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.4)
* [Administration Web](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.4)
* [Outillage Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?utf8=%E2%9C%93&q=milestone%3A0.4)

