---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.3"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0.3.


## Des Déploiements Cloud plus Rapides

La configuration des VM se fait désormais en arrière-plan, de manière asynchrone et en parallèle.    
Les déploiements sont par conséquent beaucoup plus rapides lorsqu'il y a plusieurs machines virtuelles.

<img src="/resources/img/nn-0.3-cloud-deployments.png" alt="Exemple d'un déploiement dans AWS" />

<br />

## Recettes Réutilisables

Nous avons mis en place une mécanique pour définir et réutiliser des "recettes".    
Chaque recette pour Roboconf est maintenue indépendamment des autres.

<img src="/resources/img/nn-0.3-recipes-4.png" alt="Un dépôt Git pour une recette Apache" class="gs" />

Pour utiliser une recette, il suffit de la référencer dans le POM du projet...

<img src="/resources/img/nn-0.3-recipes-2.png" alt="Déclaration d'une dépendance dans le pom.xml" />

... puis d'importer la portion de graphe dans son application.

<img src="/resources/img/nn-0.3-recipes-3.png" alt="Import d'une portion de graphe" />

<br />

## Générateur de Documentation

<img src="/resources/img/nn-0.3-doc.png" alt="Exemple de documentation générée" class="gs" />

Nous avons créé un outil pour générer de la documentation depuis vos applications Roboconf.  
Plusieurs options sont disponibles, ainsi que plusieurs langues et formats de sortie.

<br />

## Le plug-in Bash devient le plug-in Script

Nous avons étendu le périmètre fonctionnel de l'extension **Bash** de Roboconf.  
Celle-ci supporte désormais n'importe quel type de script (tels que Bash, Shell, Perl et même Python). Cette évolution offre de nombreuses perspectives.

<br />
<img src="/resources/img/nn-0.3-bash-becomes-script.png" alt="L'extension script de Roboconf" />

<br />

## Support du DSL de Roboconf dans Atom.io

<img src="/resources/img/atom.io-overview.png" alt="Support de Roboconf dans Atom.io" />


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux
[entrées sur Github](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.3)
pour plus de détails.

