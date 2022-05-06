---
title: "Tutoriel pour Développez.com"
layout: page
cat: "main"
id: "tutoriel-developpez.com"
menus: [ "users", "Développez.com" ]
---

Cloud et BigData avec Roboconf
==============================


Introduction
------------

*{TODO: Blablabla…}*


### Présentation de Apache Storm

[Apache Storm][storm] est un système de calcul distribué open-source. Il est généralement utilisé pour effectuer des
calculs temps-réel dans le contexte du Big Data (calcul en continu, impliquant des flots de données potentiellement
illimitées manipulés façon streaming).

Apache Storm permet d'exécuter des *topologies* (graphes de calcul) sur un *cluster Storm*. Ce cluster est composé de
plusieurs nœuds, à savoir :

- Un nœud maître, appelé *Nimbus*,
- Des nœuds esclaves, appelés superviseurs, encharge d'exécuter des tâches (*workers*),
- Des nœuds de coordination, basés sur [Apache Zookeeper][zookeeper].

tutorial-storm-cluster.png

![alt](https://roboconf.github.io/resources/img/tutorial-storm-cluster.png)

Une topologie Storm est un type de calcul temps réel en streaming. Des *tuple* de données sont échangés entre les unités
de calcul, appelées *spouts* et *bolts*:

- Les *spouts* sont les sources de tuples de données,
- Les *bolts* des transformateurs de tuples de données, qui effectuent les calculs proprement dits.

![alt](https://roboconf.github.io/resources/img/tutorial-storm-topology.png)

Les topologies Storm sont empaquetées dans un fichier JAR, qui est ensuite soumis au noeud Nimbus. Puis, le Nimbus 
distribue les unités de calcul (*spouts* et *bolts*) sur le cluster de nœuds esclaves.

![alt](https://roboconf.github.io/resources/img/tutorial-storm-submit.png)

Dans ce tutoriel nous allons utiliser Roboconf pour déployer un Cluster Storm sur plusieurs machines:

- tout d'abord nous allons simuler les machines en mémoire
- dans l'étape suivance nous déploierons les nœeuds Storm en local, dans des contenurs Docker
- enfin nous passerons dans le Cloud, en deployant sur Amazon Web services.

![alt](https://roboconf.github.io/resources/img/tutorial-storm-multivm.png)


### Présentation de Roboconf

[Roboconf][roboconf] est une solution pour des déploiements élastiques 

*TODO: Blablabla…*


Prise en main de Roboconf
------------------------

Dans le cadre de ce tutoriel, vous allez simplement utiliser la brique d'administration de Roboconf (le DM, pour
Deployment Manager).


### Installation

Téléchargez le DM sur [cette page][roboconf-download].
Vous aurez besoin d'une machine virtuelle Java pour le faire tourner (Java 7 ou ultérieur).
Pour l'installer, il suffit de décompresser l'archive. Optez de préférence pour l'archive tar.gz, qui conserve les
permissions sur les fichiers.

Le DM est en fait un ensemble de librairies Java, organisées sous la forme de bundles [OSGi][osgi].
Il est conditionné sous la forme d'une distribution [Karaf][karaf]. Autrement dit, vous avez téléchargé un serveur
OSGi pré-conditionné, avec tout ce qu'il faut et prêt à l'emploi.

Lancez ensuite le programme `bin/karaf` contenu dans l'archive fraîchement extraite.

Un shell s'ouvre avec une invite de commande. C'est au travers de cette fenêtre que vous allez pouvoir activer ou
désactiver certaines extensions de Roboconf.

*{TODO: IMG: Screenshot DM karaf shell}*

Nous verrons par la suite comment cette console pourra nous servir à installer de nouvelles fonctionnalités pour
Roboconf.


### Console Web

Le DM de Roboconf embarque une console Web d'administration. C'est à travers cette interface que vous pourrez configurer
et installer de nouvelles applications.

La console d'administration se trouve à l'adresse suivante: http://localhost:8181/roboconf-web-administration/

*{TODO: IMG: Screenshot DM Web Admin}*


Déploiement en mémoire
----------------------

La première étape de ce tutoriel est une simulation de déploiement en mémoire. Nous allons tout d'abord vous présenter
l'application de référence, basée sur Apache Storm.


### Structure d'une application Roboconf

Une application Roboconf se présente sous la forme d'une archive ZIP avec une structure particulière. Plus précisément,
cette archive décrite un *template* d'application, qu'il est enuite possible d'instancier et de configurer de multiples
fois. Les répertoires que l'on retrouve à chaque fois sont `descriptor`, `graph` et `instances`.

*{TODO: IMG: Screenshot Listing Apache Storm Example Archive}*

La partie `descriptor` est assez simple à comprendre. Nous allons en revanche passer du temps pour étudier le contenu du
répertoire `graph`. Ouvrez le fichier `main.graph`. Celui-ci contient les définitions des briques logicielles. Il 
contient aussi et surtout les différents types de relation qui les unissent. Roboconf connaît 3 types de relations.

- Conteneurs : une brique logicielle se déploie sur ou au sein d'une autre.<br/>
Ex : un serveur d'application se déploie sur une machine, une application se déploie sur un serveur...

- Exécution : une brique logicielle utilise ou dépend d'une autre.<br/>
Ex : une application utilise une base de données, elle ne peut donc pas fonctionner sans elle.

- Héritage : une brique est similaire à une autre, ou bien l'enrichit.<br/>
Ex : une base de données pour la gestion des clients et une autre pour les produits. Dans les 2 cas, on peut avoir le
même type de base de données, elles s'installent et se démarrent de la même manière, mais ont un rôle et un nom
différent. L'héritage est une solution pour mutualiser le maximum de choses.

Observez le fichier définissant le graphe.
Il n'y a pas d'héritage dans cet exemple. Les relations de type conteneurs sont définies au travers du mot-clé
`children`. Les relations de type exécution sont définies au travers des mots-clés `imports` et `exports`. C'est pour ce
type de relation que l'on utilise un système de messagerie : pour synchroniser l'export de variables et donc, le partage
d'informations entre briques logicielles.

Remarquez ensuite que pour chaque brique (composant), il existe un dossier éponyme.
Chaque dossier contient les recettes (ou les ressources) de déploiement pour la brique en question. Les recettes gèrent
l'installation, le démarrage, l'arrêt et la suppression d'une brique logicielle. Elles sont aussi en charge de réagir à
l'arrivée ou au départ d'une dépendance. Roboconf garantit que si une dépendance est manquante, la brique sera arrêtée.
Elle sera redémarrée aussitôt que toutes ses dépendances seront présentes.

> Cette résolution des dépendances permet des déploiements concurrents à grande échelle.
> Les dépendances sont résolues de manière asynchrone par Roboconf. Cette faculté est aussi utilisée pour gérer
> l'élasticité de certaines plate-formes qui utilisent Roboconf comme socle de déploiement.

La façon dont sont écrites les recettes dépend de la propriété installer des composants. S'il s'agît de l'installeur
`bash`, alors on utilise des scripts Bash pour les recettes. S'il s'agît de l'installeur `puppet`, alors on utilise un
 module Puppet comme recette. Etc.

Enfin, regardez le répertoire `instances` à la racine de l'archive.  Le graphe n'est qu'un ensemble de règles, un peu
comme un méta-modèle. Il faut ensuite instancier les composants. Une instance correspond à une brique logicielle qui est
ou qui va être déployée. Lorsque vous utiliser la console d'administration de Roboconf, ce sont des instances que vous
allez manipuler.


### L'application Apache Storm Example pour Roboconf


*{TODO: translate below}
```
Let's make it simple: we will consider 2 kinds of nodes, called Nimbus (the master node) and Worker (a slave node).

The Nimbus node will embed an instance of ZooKeeper (nodes coordination) and StormUI (Storm's web-based management console).
Both Nimbus and Worker nodes will provide a storm platform (each one with a specific configuration), and the processes will be run under supervision using supervisor.

A Worker node needs to know the IP address of the Nimbus node, in order to complete its configuration before starting.
This is a runtime dependency, that must be resolved before starting the node.

So, to sum up:

Nimbus has storm + supervisord + ZooKeeper + StormUI
A Worker has storm + supervisord
Each kind of node has specific configuration files for all software components deployed on it
There is a runtime dependency between Nimbus and Worker(s) - each Worker needs the Nimbus IP address.

In this tutorial, we decided to design the Roboconf graph as follows:

A "storm_platform" component is a container for Nimbus and Worker: it provides the Storm + supervisord software stack, without configuration.
A "storm_worker" component is an application to be deployed on a "storm_platform" (here, mainly configuration files). It imports the IP address of the Nimbus node, and will be able to complete its configuration and start up as soon as the Nimbus IP is known.
A "storm_nimbus" component is an application to be deployed on a "storm_platform" (configuration files + additional software, including StormUI and ZooKeeper). It exports its IP address, so that other components may use it (here, "storm_worker" instances).
A "VM" is the virtual machine where other components can be deployed (we'll use Docker containers, but switching to a IaaS is quite easy - just adapt the "target.properties" configuration file with adequate credentials).
```

![alt](https://roboconf.github.io/resources/img/tutorial-storm-model.png)

```
Which is equivalent to this graph definition:
```

```roboconf
# The VM
VM {
    installer: target;
    children: storm_platform;
}

# Storm base platform
storm_platform {
    installer: script;
    children: storm_nimbus, storm_worker;
}

# Storm nodes

# Storm master node (Nimbus, along with zookeeper + stormUI)
storm_nimbus {
    installer: script;
    exports: ip;
}

# Storm worker (slave) node
storm_worker {
    installer: script;
    imports: storm_nimbus.ip;
}
```



### Premier déploiement

Vous avez dû remarquer dans le graphe que le composant `VM` est associé à l'installeur `target`.
En gros, c'est notre machine cible. Si vous observez le contenu du fichier `graph/VM/target.properties`, vous allez voir
que la cible est en mémoire : `in-memory`.

Lorsque vous allez instanciez une VM et la déployer, Roboconf va lire le contenu de ce fichier et déterminer ce qu'il
doit faire. La propriété `target-id` référence une extension de Roboconf. Cette extension exploite le contenu du fichier
pour créer votre VM sur l'infrastructure de votre choix. Ainsi, si vous voulez passer d'une VM en mémoire à une VM sur
Amazon Web Services (ou n'importe quel autre cloud supporté), il vous suffit de mettre à jour le contenu du fichier
`target.properties`.

Ici, le déploiement d'une VM donnera lieu à l'instanciation d'un agent Roboconf en mémoire. Chaque machine-cible est
sensée avoir son propre agent. C'est cet agent qui va gérer les déploiements et les actions à effectuer sur la machine
en question.

Afin du pouvoir déployer notre première application, nous devons nous assurer que l'extension `in-memory` de Roboconf
est bien installée. Dans l'invite de commande du DM, exécutez la commande suivante :

```bash
roboconf-dm > roboconf:target in-memory 
```

Maintenant rendez-vous sur la console d'aministration et ajoutez un nouveau template d'application.

*{TODO: IMG: Add new application template}*

Enfin, à partir du template nouvellement créé, instanciez une application.

*{TODO: IMG: Add new application from template}*

*{TODO: play with the instances}*

Déploiement sur Docker
----------------------

Après cette simulation, nous allons passer à l'étape suivante, qui consiste à déployer notre application sur des
conteneurs [Docker][docker]. Avant toute chose, il faut installer et configurer Docker sur votre machine, afin que le DM
Roboconf puisse créer des conteneurs sur celle-ci.

### Installation et configuration de Docker

Sur les systèmes Linux Debian et dérivés (Ubuntu notamment), il suffit d'intaller le package `lxc-docker`.

Cependant la version disponible dans les repos officiels peut ne pas être suffisante: roboconf requiert Docker v1.5 ou
ultérieure. Il faudra donc ajouter manuellement le repo officiel de Docker. Par exemple pour Ubuntu:

```bash
wget -qO- https://get.docker.io/gpg | sudo apt-key add -
sudo sh -c "echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
sudo apt-get update
sudo apt-get install lxc-docker
```

Pour plus de précision, consultez la page (en anglais) concernant l'[installation de Docker][install-docker].

Le DM de Roboconf, plus précisément le `target-docker` s'appuie sur l'interface REST exposé par Docker. Par défaut cette
interface c'est pas accessible par Roboconf. Il faut donc configurer Docker pour exposer cette interface REST sur un
port TCP (dans notre cas, le port 4243).

Éditez le fichier `/etc/default/docker` et définissez la variable `DOCKER_OPTS` comme suit:

```bash
# Make Docker listen on TCP port 4243 (along with local Unix socket)
DOCKER_OPTS="-H=tcp://0.0.0.0:4243 -H unix:///var/run/docker.sock"
```

Une fois ce changement effectué, redémarrez simplement le service Docker:

```bash
sudo stop docker
sudo start docker
```

### Installation du support Docker pour Roboconf

Dans l'invite de commande de cotre DM, tapez simplement:


```bash
roboconf-dm > roboconf:target docker
```


### Déploiement de l'application Apache Storm Example sur Docker

Dans la partie précédente de ce turoriel, le template de l'application *Apache Storm Example* a normalement déjà été
téléversé dans l'interface d'aministration de Roboconf. Nous allons instancier ce template (préconfiguré pour un
déploiement en mémoire) et configurer l'application ainsi créée pour une exécution sur des conteneurs Docker.

*{TODO: IMG: web admin target.properties editor}*

*{TODO: play with instances, kill worker containers, ...}


Déploiement sur Amazon Web Services
-----------------------------------

Blablabla…


### Mise en place de la messagerie RabbitMQ pour Roboconf

Dans les parties précédentes, les déploiements se sont tous effectués en local, sur une même machines physique. Dans ce
cadre limité, le protocole de messagerie intégré de Roboconf (basé sur HTTP) est largement suffisant. Mais maintenant
que nous allons vraiment distribuer noter application, nous devons utiliser un protocole de messagerie plus adapté,
basé sur [RabbitMQ][rabbitmq].

La première étape consiste à installer un serveur de messagerie RabbitMQ sur une VM Amazon. En effet, ce serveur doit
pouvoir être accessible par toutes les machines: le DM et les agents Roboconf.

Blablabla…


### Préconfiguration d'Amazon Web Services

Blablabla…



[storm]: http://storm.apache.org
[zookeeper]: https://zookeeper.apache.org/
[roboconf]: https://roboconf.github.io
[roboconf-download]: https://roboconf.github.io/fr/telecharger.html
[osgi]: http://www.osgi.org
[karaf]: http://karaf.apache.org
[roboconf-webadmin]: http://localhost:8181/roboconf-web-administration/
[docker]: https://www.docker.com/
[install-docker]: http://docs.docker.com/linux/step_one/
[rabbitmq]: https://www.rabbitmq.com/

