---
title: "Tutoriel - Débuter avec Roboconf"
layout: page
cat: "ug-snapshot"
id: "tutorial-getting-started-with-roboconf"
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
de Roboconf (le DM, pour *Deployment Manager*), ainsi que la messagerie HTTP (ce qui signifie que le
DM et les agents Roboconf interagiront par le biais de web sockets).

Téléchargez le DM sur [cette page](../telecharger.html). Vous aurez besoin d'une machine virtuelle Java 
pour le faire tourner (JDK 7). Pour l'installer, il suffit de dézipper l'archive. Optez de préférence 
pour le \*.tar.gz, qui conserve les permissions sur les fichiers.

Voilà, c'est installé et prêt à l'emploi.  
HTTP est la messagerie configurée par défaut. Elle est parfaitement adaptée pour les débutants. Elle
n'est toutefois pas adaptée aux environnements de production. On la remplacera alors par [RabbitMQ](https://www.rabbitmq.com). 


## Administration

Une fois l'installation terminée, nous allons explorer la configuration et les commandes offertes par le DM.

Le DM est en fait un ensemble de librairies Java, organisées sous la forme de bundles OSGi.  
Il est conditionné sous la forme d'une distribution [Karaf](http://karaf.apache.org/). 
Autrement dit, vous avez téléchargé un serveur OSGi pré-conditionné, avec tout ce qu'il 
faut et prêt à l'emploi.

Lancez le DM en exécutant le fichier **bin/karaf** de Karaf.  
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
De plus, Roboconf fournit des commandes shell qui facilitent l'installation de telles extensions. Tapez `roboconf:target in-memory`.

Cette commande télécharge les bundles adéquats, les installe et les démarre.  
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
Téléchargez-la [ici](https://bintray.com/artifact/download/roboconf/roboconf-tutorial-samples/lamp-webapp-bash-0.6.0-1.0.zip). Il s'agît d'une archive ZIP avec une structure particulière.
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
En gros, c'est notre machine cible. Où cette machine sera créée est déterminé par le contenu des fichiers de propriétés
dans **graph/VM/**.

Dans le cadre de ce tutoriel, on souhaite déployer *en mémoire*.  
Cela signifie que nous n'allons rien déployer réellement. Au lieu de créer des machines virtuelles,  nous allons
lancer des agents Roboconf en mémoires. Les tâches habituellement réalisées par ces agents (déploiement, démarrage,
confiugration....) seront ici simulées.

Procédez comme suit :

1\. Lancez votre navigateur web et allez à l'adresse 
[http://localhost:8181/roboconf-web-administration/index.html](http://localhost:8181/roboconf-web-administration/index.html).

<img src="/resources/img/tutorial-sample-web-admin-1.jpg" alt="Page d'accueil" class="gs" />

Suivez les instructions à l'écran pour charger l'archive et créer une application.

<img src="/resources/img/tutorial-sample-web-admin-2.jpg" alt="Créer une application depuis l'archive" class="gs" />

2\. Dans la console web, cliquez sur votre application, puis rendez-vous dans le menu **application targets**.  
Définissez la cible par défaut comme étant **in-memory**.

<img src="/resources/img/tutorial-sample-web-admin-3.jpg" alt="Définissez la cible de déploiement par défaut (ici, en mémoire)" class="gs" />

3\. Allez dans le sous-menu **instances** et jouez avec le cycle de vie des composants.  
Pour manipuler une brique, il est essentiel que son parent (ou son conteneur)
soit déployé et démarré. La seule exception concerne les instances racines (autrement dit, les machines), qui
elles ne connaissent que 2 états : déployées et démarrées, ou non-déployées (certaines solutions de virtualisation
ne connaissent pas d'état *déployée mais stoppée*).

<img src="/resources/img/tutorial-sample-web-admin-4.jpg" alt="Jouez avec le cycle de vie des différents composants" class="gs" />

4\. Pour tester la gestion des dépendances, essayez le scénario suivant.  
Assurez-vous au préalable que tout est arrêté.

* Démarrez et lancez l'équilibreur de charge (le *load balancer*).  
Le serveur Apache devrait rester en état **starting**. C'est parce qu'une de ses dépendances (l'application web)
n'est pas encore démarrée.

* Faîtes de même avec l'application web.  
Elle devrait également rester en état **starting**, et ce, parce que la base de données dont elle dépend n'est
pas encore démarrée.

* Enfin, démarrez le base de données.  
Toutes les briques devraient être démarrées désormais.



<!-- Bootstrap -->
<a class="btn btn-roboconf" role="button" data-toggle="collapse" href="#whatIsHappening" aria-expanded="false" aria-controls="whatIsHappening">
  Montrer ce qui se passe en arrière-plan...
</a>
<span class="glyphicon glyphicon-info-sign"></span>
<div class="collapse more-about" id="whatIsHappening">

	<p>
	A chaque fois qu'une brique démarre ou s'arrête, elle publie des notifications sur la messagerie (RabbitMQ)
	pour informer les briques qui dépendent d'elle de son état et de ses propriétés (adresse IP, port, etc). Ce ne sont
	pas les briques logicielles elle-mêmes qui gèrent ça, mais l'agent Roboconf qui tourne sur leur machine. Ici, les agents
	tournent en mémoire (mode simulation). Sur une vraie machine, cet agent doit être installé et lancé. Tout cela est
	automatisable, notamment avec les solutions de virtualisation, ce qui inclut le *cloud computing*.
	</p>
	<p>
	Un autre point à préciser concerne ce qui se passe lorsque vous déclenchez une action depuis la console
	d'administration. En effet, puisque nous sommes dans un mode "simulation", Roboconf change simplement l'état
	des instances. Si nous étions dans un autre mode, sur une véritable infrastructure, l'agent exécuterait **en plus** une
	recette (soit pour installer, soit pour démarrer... l'instance). Pour rappel, les recettes se trouvent dans le
	répertoire **graph**. Un autre élément, c'est qu'une action n'est pas forcément suivie d'un effet immédiat. Cette
	interface permet simplement de donner une instruction à un agent donné. Le fait que cette instruction soit valide
	ou exécutable est d'abord évalué par l'agent. C'est lui le plus à même de déterminer s'il peut l'exécuter ou s'il
	doit la rejeter.
	</p>

	<a class="btn btn-roboconf" role="button" data-toggle="collapse" href="#whatIsHappening" aria-expanded="false" aria-controls="whatIsHappening">
  		Masquer ces détails...
	</a>

</div>
<!-- Bootstrap -->


## Conclusion

Voilà pour ce premier tutoriel.  
Vous devez désormais être familier avec le DM, son installation et ses commandes. Vous avez aussi pu voir comment 
définir une application Roboconf, l'installer et modifier l'état de ses composantes.
