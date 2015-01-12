---
title: "Tutoriel - Débuter avec Roboconf"
layout: page
id: "ug.snapshot.tutorial-getting-started-with-roboconf"
menus: [ "users", "user-guide" ]
---

## Introduction

Ce tutoriel vous propose de vous familiariser avec Roboconf.  
Vous allez ici...

1. ... installer la brique d'administration de Roboconf, le DM.
2. ... apprendre les rudiments de l'administration avec Roboconf.
3. ... simuler le déploiement d'une application répartie.

> Il est préférable de suivre ce tutoriel sur Linux.  
> Cependant, il devrait aussi fonctionner, **à priori**, sur Windows et Mac.


## Installation

Dans le cadre de ce tutoriel, vous allez simplement utiliser la brique d'administration
de Roboconf (le DM, pour *Deployment Manager*), ainsi que le serveur de messagerie RabbitMQ.

Téléchargez le DM sur [cette page](../telecharger.html).  
Vous aurez besoin d'une machine virtuelle Java pour le faire tourner (JDK 6+).  
Pour l'installer, il suffit de dézipper l'archive. Optez de préférence pour le \*.tar.gz, qui
conserve les permissions sur les fichiers.

En ce qui concerne RabbitMQ, reportez-vous au [guide utilisateur](/en/user-guide/installing-the-messaging-server.html) 
qui documente la procédure à suivre pour l'installer. Malheureusement, cette partie du guide utilisateur n'a
pas encore été traduite.


## Administration

Une fois l'installation terminée, nous allons explorer la configuration et les commandes offertes par le DM.
Pour commencer, il va falloir indiquer au DM où se trouve le serveur de messagerie (RabbitMQ), ainsi que les
identifiants à utiliser pour s'y connecter.

Le DM est en fait un ensemble de librairies Java, organisées sous la forme de bundles OSGi.  
Il est conditionné sous la forme d'une distribution [Karaf](http://karaf.apache.org/). 
Autrement dit, vous avez téléchargé un serveur OSGi pré-conditionné, avec tout ce qu'il 
faut et (quasiment) prêt à l'emploi.

Ouvrez le fichier **etc/net.roboconf.dm.configuration.cfg** de Karaf.  
Mettez à jour les propriétés de messagerie, conformément à ce que vous avez défini lors de son installation.
Mettez également à jour le répertoire qui sera utilisé pour stocker les applications et leurs états. Par défaut,
tout est stocké dans le répertoire temporaire de votre système d'exploitation.

Lancez ensuite le fichier **bin/karaf** de Karaf.  
Un shell s'ouvre avec une invite de commande. C'est au travers de cette fenêtre que vous allez pouvoir
activer ou désactiver certaines extensions de Roboconf.

<img src="/resources/img/karaf-shell-console.jpg" alt="L'invite de commandes de Karaf" />

Tapez la commande suivante.

```
bundle:list 
```

Cette commande permet de lister tous les bundles déployés.  
Remarquez que certains sont marqués comme démarrés, alors que d'autres sont seulement installés.
C'est notamment le cas des extensions liées aux infrastructures de déploiement (Amazon Web Services,
Openstack, Docker...). Dans les faits, tout le monde n'utilise pas toutes ces infrastructures en
même temps. Il est donc préférable et plus optimal de n'activer que celles dont on se sert.

Tapez cette nouvelle commande.

```
feature:list
```

Celle-ci liste les *features*, à savoir, des groupes de bundles.  
La majorité d'entre elles ne sont pas activées. Celles qui le sont voient
leurs bundles listés dans la commande **bundle:list**.

Au-delà de cette interface de commande, Karaf proposer différentes fonctionnalités que le DM
exploite à son avantage. Vous trouverez les logs dans le dossier **data/log**. La configuration
des divers services, y compris celle du DM, se trouvent dans le dossier **etc**. Ces propriétés
peuvent être mises à jour à chaud. Elles seront prises en compte sans redémarrage de la plate-forme.


## Console Web

Karaf embarque une console web.  
Par défaut, elle est accessible à l'adresse [http://localhost:8181/system/console](http://localhost:8181/system/console).  
Les identifiants par défaut sont **karaf** / **karaf**.

<img src="/resources/img/web-console-bundles.jpg" alt="La console web de Karaf" class="gs" />

A priori, vous n'allez pas utiliser cette console pendant ce tutoriel, mais il est toujours utile
de savoir qu'elle est existe et qu'elle est là.


## Préparer le Mode Simulation

Avant de déployer une application "pour de faux", nous allons configurer la plate-forme
pour un mode simulation. Ce mode nécessite des bundles qui ne sont pas installés par défaut dans le DM.

Karaf permet de déployer des bundles directement depuis un dépôt Maven.  
Dans la console de Karaf, exécutez les commandes suivantes. On suppose ici que vous utilisez
la version 0.2 de Roboconf.

```
bundle:install mvn:net.roboconf/roboconf-plugin-api/0.2
bundle:install mvn:net.roboconf/roboconf-agent/0.2
bundle:install mvn:net.roboconf/roboconf-target-in-memory/0.2
```

A chaque installation, Karaf vous indique l'identifiant du bundle installé.  
Utilisez ces identifiants pour démarrer ces bundles (remplacez *id1*, *id2* et *id3* par leurs valeurs).

```
bundle:start id1 id2 id3
```

Listez les bundles et vérifiez qu'ils sont bien démarrés (et non juste installés).  
Observez les logs de Roboconf. Vous devriez trouver la mention suivante...

```
Target handler 'in-memory' is now available in Roboconf's DM.
```

Au moment où vous avez **démarré** l'extension *en mémoire*, elle a été automatiquement détectée (le terme
exact est **injectée**) dans la classe principale du DM. Si vous stoppez le bundle, cette extension sera
désenregistrée. Un certain nombre de fonctionnalités et d'extensions peuvent ainsi être activées ou désactivées par
ce biais.


## Première Application Roboconf

Nous allons maintenant nous intéresser à l'application que nous allons déployer.  
Téléchargez-la [ici](todo). Il s'agît d'une archive ZIP avec une structure particulière.
Les répertoires que l'on retrouve à chaque fois sont **descriptor**, **graph** et **instances**.

<img src="/resources/img/tutorial-sample-app-structure.jpg" alt="Structure de l'archive" />

La partie **descriptor** est assez simple à comprendre. Nous allons en revanche passer du temps pour
étudier le contenu du répertoire **graph**. Ouvrez le fichier **main.graph**. Celui-ci contient la définition
de briques logicielles. Il contient aussi et surtout les différents types de relation qui les unissent.
Roboconf connaît 3 types de relations.

* **Conteneurs** : une brique logicielle se déploie sur ou au sein d'une autre.  
Ex : un serveur d'application se déploie sur une machine, une application se déploie sur un serveur...

* **Exécution** : une brique logicielle utilise ou dépend d'une autre.  
Ex : une application utilise une base de données, elle ne peut donc pas fonctionner sans elle.

* **Héritage** : une brique est similaire à une autre, ou bien l'enrichit.  
Ex : une base de données pour la gestion des clients et une autre pour les produits. Dans les 2 cas,
on peut avoir le même type de base de données, elles s'installent et se démarrent de la même manière, mais ont un rôle
et un nom différent. L'héritage est une solution pour mutualiser le maximum de choses.

Observez le fichier définissant le graphe.  
Il n'y a pas d'héritage dans cet exemple. Les relations de type **conteneurs** sont définies au travers du
mot-clé **children**. Les relations de type **exécution** sont définies au travers des mots-clés **imports** et
**exports**. C'est pour ce type de relation que l'on utilise un serveur de messagerie, pour synchroniser l'export 
de variables et donc, le partage d'informations entre briques logicielles.

Remarquez ensuite que pour chaque brique (composant), il existe un dossier éponyme.  
Chaque dossier contient les recettes (ou les ressources) de déploiement pour la brique en question. Les
recettes gèrent l'installation, le démarrage, l'arrêt et la suppression d'une brique logicielle. Elles sont aussi
en charge de réagir à l'arrivée ou au départ d'une dépendance. Roboconf garantit que si une dépendance est manquante,
la brique sera arrêtée. Elle sera redémarrée aussitôt que toutes ses dépendances seront présentes.

> Cette résolution des dépendances permet des déploiements concurrents à grande échelle.  
> Les dépendances sont résolues de manière asynchrone par Roboconf. Cette faculté est aussi utilisée
> pour gérer l'élasticité de certaines plate-formes qui utilisent Roboconf comme socle de déploiement.

La façon dont sont écrites les recettes dépend de la propriété **installer** des composants.
S'il s'agît de l'installeur **bash**, alors on utilise des scripts Bash pour les recettes. S'il s'agît
de l'installeur **puppet**, alors on utilise un module Puppet comme recette. Etc.

Enfin, regardez le répertoire **instances** à la racine de l'archive.  
Le graphe n'est qu'un ensemble de règles, un peu comme un méta-modèle. Il faut ensuite instancier
les composants. Une instance correspond à une brique logicielle qui est ou qui va être déployée. Lorsque vous
utiliser la console d'administration de Roboconf, ce sont des instances que vous allez manipuler. 


## Premier Déploiement

Vous avez dû remarquer dans le graphe que le composant **VM** est associé à l'installeur **target**.  
En gros, c'est notre machine cible. Si vous observez le contenu du fichier **graph/VM/target.properties**,
vous allez voir que la cible est en mémoire.

Lorsque vous allez instanciez une **VM** et la déployer, Roboconf va lire le contenu de ce fichier et déterminer
ce qu'il doit faire. La propriété **target-id** référence une extension de Roboconf (ici, celle que vous avez installée
tout à l'heure, le **target-in-memory**). Cette extension exploite le contenu du fichier pour créer votre VM sur
l'infrastructure de votre choix. Ainsi, si vous voulez passer d'une VM en mémoire à une VM sur Amazon Web Services
(ou n'importe quel autre cloud supporté), il vous suffit de mettre à jour le contenu du fichier **target.properties**.

Ici, le déploiement d'une **VM** donnera lieu à l'instanciation d'un agent Roboconf en mémoire. Chaque machine-cible
est sensée avoir son propre agent. C'est cet agent qui va gérer les déploiements et les actions à effectuer sur la
machine en question.

Allez à l'adresse [http://localhost:8181/roboconf-web-administration/index.html](http://localhost:8181/roboconf-web-administration/index.html).

<img src="/resources/img/roboconf--web-administration--welcome.jpg" alt="La console d'administration de Roboconf" class="gs" />

Vérifiez que la configuration est valide. Puis uploadez l'archive de l'application. Une fois uploadée, jouez avec
le cycle de vie des différentes briques. Pour manipuler une brique, il est essentiel que son parent (ou son conteneur)
soit déployé et démarré. La seule exception concerne les instances racines (autrement dit, les machines), qui
elles ne connaissent que 2 états : déployées et démarrées, ou non-déployées (certaines solutions de virtualisation
ne connaissent pas d'état *déployée mais stoppée*).

Pour tester la gestion des dépendances, essayez le scénario suivant.  
Assurez-vous au préalable que tout est arrêté.

1. Démarrez et lancez l'équilibreur de charge (le *load balancer*).  
Le serveur Apache devrait rester en état **starting**. C'est parce qu'une de ses dépendances (l'application web)
n'est pas encore démarrée.

2. Faîtes de même avec l'application web.  
Elle devrait également rester en état **starting**, et ce, parce que la base de données dont elle dépend n'est
pas encore démarrée.

3. Enfin, démarrez le base de données.  
Toutes les briques devraient être démarrées désormais.

A chaque fois qu'une brique démarre ou s'arrête, elle publie des notifications sur la messagerie (RabbitMQ)
pour informer les briques qui dépendent d'elle de son état et de ses propriétés (adresse IP, port, etc). Ce ne sont
pas les briques logicielles elle-mêmes qui gèrent ça, mais l'agent Roboconf qui tourne sur leur machine. Ici, les agents
tournent en mémoire (mode simulation). Sur une vraie machine, cet agent doit être installé et lancé. Tout cela est
automatisable, notamment avec les solutions de virtualisation, ce qui inclut le *cloud computing*.

Un autre point à préciser concerne ce qui se passe lorsque vous déclenchez une action depuis la console
d'administration. En effet, puisque nous sommes dans un mode "simulation", Roboconf change simplement l'état
des instances. Si nous étions dans un autre mode, sur une véritable infrastructure, l'agent exécuterait **en plus** une
recette (soit pour installer, soit pour démarrer... l'instance). Pour rappel, les recettes se trouvent dans le
répertoire **graph**. Un autre élément, c'est qu'une action n'est pas forcément suivie d'un effet immédiat. Cette
interface permet simplement de donner une instruction à un agent donné. Le fait que cette instruction soit valide
ou exécutable est d'abord évalué par l'agent. C'est lui le plus à même de déterminer s'il peut l'exécuter ou s'il
doit la rejeter.


## Conclusion

Voilà pour ce premier tutoriel.  
Vous devez désormais être familier avec le DM, avec son installation, ainsi que celle de RabbitMQ.
Vous avez aussi pu voir comment définir une application à déployer avec Roboconf. Comme vous avez pu le noter,
il n'y a pas de contrainte sur ce qu'on peut modéliser et déployer avec Roboconf. Toutes les architectures et tous
les langages sont envisageables.

Enfin, vous avez manipulé la console en ligne de commande, ainsi que l'administration web de Roboconf.
Vous savez désormais installer une application et modifier l'état d'une de ses composantes.
