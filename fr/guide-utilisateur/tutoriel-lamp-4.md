---
title: "Tutoriel LAMP - 4/5"
layout: page
id: "ug.snapshot.tutoriel-lamp-4"
menus: [ "users", "user-guide" ]
---

## Evolution : scinder le composant Tomcat

Notre exemple a un défaut majeur.  
Notre serveur Tomcat est pré-packagé avec une application web, ce qui est loin d'être modulaire et réutilisable.

Faîtes évoluer le graphe pour scinder le composant actuel **Tomcat** en un composant **Tomcat** et un composant **Mon-Appli-Web**.  
Modifiez les recettes en conséquences. Faîtes en sorte que le load balancer ne soit reconfiguré que lorsque vous démarrerez cette application web.

<!--

En résumé, votre nouveau graphe devrait ressembler à ça...

-->

## Evolution : mutualiser une recette

Imaginons que l'on souhaite déployer une autre application web sur Tomcat.

Premier constat : il faut faire évoluer le graphe et définir un nouveau composant.  
C'est contraignant d'un point de vue développeur, voire même pour un exploitant. D'un autre côté,
dans les projets d'entreprises, il y a une entropie naturelle qui aboutit parfois à de vraies difficultés
dans les Systèmes d'Information. Si Roboconf n'est pas un outil dédié à l'urbanisation, cette contrainte-ci 
permet en tout cas de cartographier ce que Roboconf déploie et/ou gère.

Admettons donc qu'il faille définir un nouveau composant dans le graphe.  
Ce ne sont jamais que 3 lignes de plus. Qu'en est-il par contre des scripts ? Doit-on les dupliquer ?

Roboconf permettra bientôt de réutiliser ou d'étendre des composants.  
Malheureusement, ce mécanisme ne sera pas viable dans le cas des WAR (puisqu'à chaque fois, le WAR change). 
En revanche, il est possible de créer une extension dédiée qui facilitera ces tâches.

En vous aidant du guide développeur de Roboconf (en anglais), créez une nouvelle extension Roboconf pour un agent.  
L'identifiant de cette extension devra être **file** (tout comme il existe une extension **puppet** et une **bash**). 
La phase de déploiement doit potentiellement télécharger un fichier (par exemple depuis le web) et le mettre
à un endroit précis sur le disque. La phase de démarrage doit déplacer ce fichier local à un autre emplacement (par exemple dans le 
dossier **webapps* d'un Tomcat). La phase d'arrêt doit remettre le fichier vers son emplacement temporaire. Enfin, la phase de désinstallation
doit supprimer ce fichier temporaire. Vous pouvez par exemple utiliser un fichier de propriétés pour stocker les différentes informations
que votre extension va devoir manipuler.

Reprenez votre image de l'agent Roboconf et déployez cette nouvelle extension dessus.  
Assurez-vous qu'elle se déploie bien en analysant les logs de Karaf. Refaîtes un *snapshot* de cette VM, puis mettez à jour le fichier
**target.properties** de votre application, en utilisant l'identifiant de la nouvelle image *snapshot*. 
Assurez-vous que dans votre graphe, le composant **Mon-Appli-Web** utilise bien *l'installer* associé à votre nouvelle extension. Puis faîtes le test.


Pour ceux qui souhaitent aller plus loin, des exercices supplémentaires sont disponibles dans [la dernière étape](tutoriel-lamp-5.html).
