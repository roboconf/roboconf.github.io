---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.5"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0.5.



## Cibles de Déploiement via la Console Web

Il est désormais possible de définir des **target.properties** indépendamment de toute application.  
Cela doit s'effectuer par la console web d'administration.

<img src="/resources/img/nn-0.5-new-deployment-target.png" alt="Création d'une nouvelle cible de déploiement avec la console web de Roboconf" class="gs" />

Les **target.properties** prédéfinis sont toujours fonctionnels, mais ne sont plus obligatoires.  
Une fois définie, il est possible d'associer une cible de déploiement avec une application ou bien avec une instance précise au sein d'une application.

<img src="/resources/img/nn-0.5-deployment-target-associations.png" alt="Association d'une cible avec une application ou certaines de ses instances" class="gs" />

Combinée aux modèles d'applications, cette fonctionnalité permet de déployer une même application sur différents environnements.

<img src="/resources/img/nn-0.5-applications-over-different-targets.png" alt="Une même application déployée sur plusieurs infrastructures" class="gs" />
<br /><br />


## Dépendances Externes

Les utilisateurs peuvent désormais définir des liens entre applications Roboconf.  
Cela signifie que le graphe d'une application peut référencer des variables exportées par d'autres applications.

<img src="/resources/img/nn-0.5-inter-application-dependencies.png" alt="Dépendances inter-applications" class="gs" />
<br />

Cela n'est possible que si l'autre application a marqué certaines de ses variables internes comme visibles depuis l'extérieur.

```properties
# Un préfixe (unique) pour les variables externes
exports-prefix: Lamp

# Marquage et définition d'un alias pour une variable interne.
# Celle-ci pourra être importée par une autre application.
exports: Apache.ip as lb_ip
```

L'import d'une telle variable se note...

<pre><code class="language-roboconf">
MyApp { 
	installer: script; 
	imports: Tomcat.portAJP, Tomcat.ip; # variables locales
	imports: external Lamp.lb_ip;      # variables externes
	exports: ip;
}
</code></pre>


Les liens inter-applications relient 2 applications ensemble.  
Ce sont des relations de type &laquo; 1 à 1 &raquo;.

<img src="/resources/img/nn-0.5-application-bindings.png" alt="Lien entre 2 applications" class="gs" />

<br />
Une fois 2 applications attachées, un changement sur un composant dans l'une (composant dont les variables sont visibles à
l'extérieur) enverra une notification aux composants de l'autre application qui en dépendent. Cette fonctionnalité autorise
une plus grande modularité et fournit une approche plus réaliste dans un cadre &laquo; système d'information &raquo;.
<br />


## Amélioration de l'Autonomique

Le gestionnaire d'autonomique a été retravaillé pour être un peu moins *bête*.  
Au lieu d'exécuter une réaction chaque fois qu'un agent émet une alerte, celui-ci étudie le contexte pour décider
si une telle action fait sens. Ainsi, si une action similaire lancée précédemment est toujours en cours, l'alerte sera
ignorée. Il est aussi possible de définir un délai de sécurité entre l'exécution de 2 réactions identiques.

<img src="/resources/img/autonomic-diagram.png" alt="Un rappel sur le fonctionnement de l'autonomique dans Roboconf" class="gs" />

Enfin, nous avons introduit la notion de quota.  
Pour l'instant, cela se limite à un quota global, qui empêche l'autonomique de créer des VM sans fin.  
D'autres types de quotas seront ajoutés dans les prochaines versions (par application, par infrastructure, etc).
<br />


## Système de Sondes Extensible

Le système de sondes des agents Roboconf est désormais extensible.  
Ces sondes sont utilisées dans le cadre de l'autonomique pour récupérer des métriques sur les machines distantes.
En plus des sondes de type **fichier**, **REST** et **Nagios**, on peut donc maintenant brancher ses propres librairies
de surveillance.

C'est par exemple ce qui a été utilisé pour [Petals ESB](http://petals.ow2.org).  
Une sonde basée sur la librairie JMX de Petals a été créée. Celle-ci s'intègre au sein d'un agent Roboconf en étant déposée
dans un répertoire adéquat.

<img src="/resources/img/nn-0.5-roboconf-extensible-probe-framework.png" alt="Des sondes spécifiques peuvent être développées et déployées sur des agents Roboconf" class="gs" />

<br />

## Configuration Docker Simplifiée

La configuration pour l'utilisation de Docker avec Roboconf (en mode infrastructure) a été simplifiée.  
Les fonctionnalités fournies sont les mêmes qu'en version 0.4, mais avec un nombre plus restreint de propriétés.

Par exemple, la configuration suivante permet de générer automatiquement une image docker, d'installer et de configurer un agent Roboconf, de lancer des conteneurs depuis cette image, puis d'y installer des composants logiciels (tels que spécifiés dans une application Roboconf).

```properties
# Information que l'on retrouve pour toute cible
handler = docker
name = Docker
description = Une installation Docker basée sur une image générée par Roboconf.

# Propriétés spécifiques à Docker
docker.generate.image = true
docker.image = roboconf-docker-img
```

<br />


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux entrées sur Github pour plus de détails.

* [Plate-forme](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.5)
* [Administration Web](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.5)

