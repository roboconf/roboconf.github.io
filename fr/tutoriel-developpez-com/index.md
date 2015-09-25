Cloud et BigData avec Roboconf
==============================


Introduction
------------

*TODO: Blablabla…*


### Présentation de Apache Storm

[Apache Storm][storm] est un système de calcul distribué open-source.

*TODO: Blablabla…*


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


### Présentation de l'application Apache Storm Example pour Roboconf

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


Déploiement sur Docker
----------------------

Blablabla…


Déploiement sur Amazon Web Services
-----------------------------------

Blablabla…


### Mise en place de la messagerie RabbitMQ pour Roboconf

Blablabla…


### Préconfiguration d'Amazon Web Services

Blablabla…



[storm]: http://storm.apache.org
[roboconf]: http://roboconf.net
[roboconf-download]: http://roboconf.net/fr/telecharger.html
[osgi]: http://www.osgi.org
[karaf]: http://karaf.apache.org
[roboconf-webadmin]: http://localhost:8181/roboconf-web-administration/
