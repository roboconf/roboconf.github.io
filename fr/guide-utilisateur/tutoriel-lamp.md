---
title: "Tutoriel LAMP"
layout: page
id: "ug.snapshot.tutoriel-lamp"
menus: [ "users", "user-guide" ]
---

## Introduction

Ce tutoriel vous propose de déployer une pile logicielle *classique* dans une infrastructure de cloud avec Roboconf.  
Cette pile inclut un équilibreur de charge (Apache avec ModJK), un serveur d'application (Tomcat)
et une base de données (MySQL). C'est un peu le *Hello World!* de Roboconf.

Au travers de ces exercices, vous allez vous familiariser avec Roboconf.  
Les deux points forts mis en évidence ici sont :

1. La facilité pour faire évoluer une architecture selon un canevas pré-défini.  
Ici, on va pouvoir facilement rajouter ou enlever des instances de Tomcat pour s'adapter à la charge.

2. L'automatisation de procédures d'administration.  
Dans une application distribuée, de nombreuses briques peuvent avoir à être déployées, configurées ou reconfigurées.
Roboconf permet d'automatiser ces tâches. Il peut certes y avoir des scripts à écrire, mais leur invocation se fait 
ensuite de manière normalisée / automatisée.

Par ailleurs, des travaux sont en cours pour permettre de réutiliser des recettes de déploiement.  
Cela permettra à terme de réduire la quantité de scripts à écrire en vous appuyant sur ce que d'autres auront partagé.


## Plan

Le tutoriel est découpé en 5 grandes parties.

1. [La configuration de l'infrastructure de cloud](tutoriel-lamp-1.html).
2. [L'installation de Roboconf](tutoriel-lamp-2.html).
3. [Le déploiement d'un exemple LAMP basique](tutoriel-lamp-3.html).
4. [L'évolution de cet exemple pour jouer avec le modèle et les outils](tutoriel-lamp-4.html).
5. [Des exercices en plus pour aller plus loin](tutoriel-lamp-5.html).

Pour le moment, les cibles de déploiement utilisées dans ce tutoriel n'incluent que Amazon Web Services.  
D'autres seront rajoutées au fur et à mesure.

Ce découpage vous permet d'avancer de manière progressive et à votre rythme.  
Commençons par [la première étape](tutoriel-lamp-1.html).
