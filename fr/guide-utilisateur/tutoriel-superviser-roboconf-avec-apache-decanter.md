---
title: "Tutoriel - Superviser Roboconf avec Apache Decanter"
layout: page
cat: "ug-snapshot"
id: "tutorial-monitoring-roboconf-with-apache-decanter"
menus: [ "users", "user-guide", "Snapshot" ]
---

> Il est supposé que vous avez déjà suivi les autres tutoriels et que vous êtes familiers avec Roboconf.

Ce tutoriel vous guide dans l'installation et la configuration d'Apache Decanter pour superviser le DM
et des agents Roboconf avec Elastic Search et Kibana. Dans les grandes lignes...

1. ... Decanter collecte des métriques sur les machines.
2. ... elles sont envoyées dans une instance ou un cluster Elastic Search.
3. ... des tableaux de bord Kibana sont utilisés pour filtrer et afficher les données collectées.


## Installation d'ELK

Elastic Search et Kibana forment une solution connue pour collecter et afficher des données.  
Pour faciliter la mise en œuvre (trouver les versions compatibles entre elles), nous allons nous appuyer
sur Docker.

L'installation de Docker est documentée sur [le site web](https://docs.docker.com/engine/installation/) de la solution.  
Elastic Search et Kibana ont des versions différentes et seules certaines combinaisons fonctionnent. Les versions utilisées
ici sont compatibles.

> Tout comme Rabbit MQ, Elastic Search doit être visible sur le réseau du DM et des agents.
> Il lui faut donc être sur un serveur avec une IP publique.

Pour simplifier les choses, on peut déployer Elastic Search et Kibana sur la même machine.  
Commençons par [Elastic Search](https://hub.docker.com/_/elasticsearch/).

```tcl
docker pull elasticsearch:5.1.1-alpine
docker run --name rbcf-elasticsearch -p 9200:9200 -d elasticsearch:5.1.1-alpine -E "http.host=0.0.0.0" -E "transport.host=127.0.0.1"
```

Par défaut, le conteneur expose les ports ports 9200 et 9300.  
9300 est le port pour la récupération des données. Le conteneur Kibana l'invoquera localement.
De son côté, le port 9200 est utilisé pour injecter des données. Il sera invoqué par les agents Roboconf.
C'est la raison pour laquelle il doit être exposé au niveau du système hôte.

Il faut noter que nous démarrons Elastic Search en mode développement.  
Pour l'utiliser en mode production ou cluster, il est probable que vous aurez besoin
[d'augmenter certains paramètres systèmes](https://www.elastic.co/guide/en/elasticsearch/reference/current/system-config.html),
et ce, en dépit de l'utilisation de Docker.

Pour persister les données de manière permanente, il vous faudra utiliser un volume Docker.

```tcl
-v "$PWD/esdata":/usr/share/elasticsearch/data
```

Intéressons-nous maintenant à [Kibana](https://hub.docker.com/_/kibana/).  
Celui-ci doit être démarré après Elastic Search.

```tcl
docker pull kibana:5.1.1
docker run --name rbcf-kibana --link rbcf-elasticsearch:elasticsearch -p 5601:5601 -d kibana:5.1.1
```

Le port 5601 doit être exposé au niveau du système hôte, afin que les navigateurs internet puissent y accéder.  
Les tableaux de bord sont accessibles à l'adresse [http://localhost:5601/app/kibana](http://localhost:5601/app/kibana)
Kibana peut mettre plusieurs secondes à démarrer.

> Il est possible d'embarquer Elastic Search et Kibana
> directement dans Karaf. **Cette approche n'est pas recommandée**. 



## Installation de Decanter

Decanter est une extension de Karaf pour la supervision.  
Decanter peut collecter des informations depuis plusieurs sources, puis les envoyer
vers différentes destinations pour être stockées ou traitées.

Dans le cadre de ce tutoriel, nous utilisons JMX comme source de métriques. Et nous utiliserons
une extension Decanter pour Elastic Search. Concrètement, Karaf va régulièrement interroger des
sondes JMX and expédier les données collectées vers Elastic Search.

Decanter peut (et devrait) être installé à la fois sur le DM et les agents.  
Pour les agents, il est judicieux de l'installer lors de la création de l'image (qui servira de base
à toutes les VM instanciées par Roboconf).

Connectez-vous au client en ligne de commande de Karaf, puis tapez...

```bash
# Source des "features" Karaf
feature:repo-add mvn:org.apache.karaf.decanter/apache-karaf-decanter/1.3.0/xml/features

# Support JMX dans Karaf
feature:install management

# Installation des fonctionnalités de Decanter
feature:install decanter-collector-jmx
feature:install decanter-appender-elasticsearch-rest
``` 

Par défaut, **decanter-collector-jmx** créé un fichier de configuration appelé
`org.apache.karaf.decanter.collector.jmx-local.cfg`. Pour ceux qui ne veulent pas que ce fichier
soit créé automatiquement, il est possible d'utiliser la *feature* Karaf **decanter-collector-jmx-core**
à la place.


## Configuration de Decanter

La configuration de Elastic Search est définie dans **etc/org.apache.karaf.decanter.appender.elasticsearch.rest.cfg**.

```properties
# Adresse HTTP d'Elastic Search.
# Les autres nœuds seront récupérés par Decanter via l'API d'Elastic Search.
address=http://localhost:9200

# Authentification HTTP basique
# username=user
# password=password
```

Mettez à jour l'adresse IP.  
Si vous l'avez configurée, rajoutez les paramètres pour l'authentification.

La configuration JMX doit être définie dans un fichier dont le nom respecte la convention suivante :
`org.apache.karaf.decanter.collector.jmx-<some name>.cfg`. Par défaut, **decanter-collector-jmx**
créé un fichier nommé `org.apache.karaf.decanter.collector.jmx-local.cfg`.

```properties
#
# Configuration local pour Decanter
#

# Identifiant de la collection
type=jmx-local

# URL du serveur JMX.
# local => serveur JMX du processus
# On peut aussi spécifier une URL complète comme
# service:jmx:rmi:///jndi/rmi://hostname:port/karaf-instance
url=local

# Nom d'utilisateur pour se connecter au serveur JMX
#username=karaf

# Mot de passe pour se connecter au serveur JMX
#password=karaf

# Filtre pour récupérer les MBeans pertinents.
object.name=java.lang:*

# On peut également rajouter des attributs personnalisés.
#
# my=stuff
```

L'URL **local** signfie que Decanter utilisera le serveur JMX embarqué.  
Cela éviter d'avoir à spécifier une URL complète avec tous les paramètres de connexion.
Pour ceux qui souhaitent utiliser l'URL complète, celle par défaut pour Karaf est
`service:jmx:rmi:///jndi/rmi://localhost:1099/karaf-root`

Du côté du DM, complétez ce fichier en rajoutant à la fin :

```properties
source=DM
```

Du côté de l'agent, la source est différente et demande plus de détails.  
En effet, on est en droit d'espérer faire la différence entre les données remontées par différentes
applications et machines. Nous allons pour cela utiliser
[l'injection de configurations dans les agents](../en/user-guide/dynamic-configuration-files-for-agents.html).

Prenez le fichier de configuration décrit plus haut et copiez-le dans le dossier **etc/roboconf/cfg-injection**
de Karaf. Ajoutez-lui le suffixe **.cfg**. Par exemple, vous pourriez appeler ce fichier
**etc/roboconf/cfg-injection/org.apache.karaf.decanter.collector.jmx-local.cfg.tpl**.
Ajoutez-lui ensuite les propriétés suivantes.

```properties
source = agent
application = <application-name>
scoped-instance = <scoped-instance-path>
```

Chaque fois qu'un agent démarre ou est reconfiguré, il créera ou mettra à jour le fichier **etc/org.apache.karaf.decanter.collector.jmx-local.cfg**,
ce qui reconfigurera la récupération de métriques JMX. Il mettra aussi à jour les propriétés additionnelles avec ses propres informations.

Le « polling » JMX peut être configuré dans **etc/org.apache.karaf.decanter.scheduler.simple.cfg**.


## Configuration de Kibana

Jusque-là, nous avons réussi à faire en sorte que le DM et les agents envoient des données à Elastc Search.
Maintenant, il serait plaisant de pouvoir les visualiser. Connectez-vous à Kibana ([http://localhost:5601/app/kibana](http://localhost:5601/app/kibana)).
Une fois sur la page, créez un index par défaut, basé sur le temps. Le champ temporel envoyé par Karaf s'appelle **@timestamp**.

Allez ensuite dans l'onglet **Management**. Sélectionnez **Saved Objects** et importez
[ces tableaux de bord prédéfinis](/resources/tutorials/kibana_5.0__roboconf__v251116.json). Le fichier en question
contient les définitions de tableaux de bord et les différentes visualisations utilisées.
Il se peut que vous ayez à rafraichir la page une fois l'import effectué.

> Ce tutoriel a été écrit en utilisant Apache Karaf 4.0.8.  
> En fonction de la version, certains champs peuvent changer. Éditez simplement le fichier JSon et mettez à jour
> le nom des champs si nécessaire.

Vous pouvez retrouver les tableaux de bord importés sous l'onglet **visualize**.

<img src="/resources/img/kibana-dashboard-example.png" alt="Tableaux de bord Kibana" class="gs" />

L'étape suivante consiste à filtrer les données.  
Exemple : quelles sont les métriques remontées par telle machine de telle application ?
Nous pouvons pour cela utiliser la barre de filtrage de Kibana en spécifiant la source (`source = DM` pour le DM,
`source=agent AND app=my app` pour une application précise, etc).
Pour nous simplifier la vie, l'administration web de Roboconf propose une liste de raccourcis.


## L'Administration Web de Roboconf

La console web d'administration de Roboconf fournit une liste de liens qui mènent aux différents tableaux de bord :
DM, par application, par machine, etc. Pour visualiser ces liens, proccédez comme suit :

* Connectez-vous à la ligne de commande du DM.
* Tapez ensuite `bundle:install --start mvn:net.roboconf/roboconf-web-extension-for-kibana/%v_SNAP%`
* Rechargez la console web de Roboconf :
[http://localhost:8181/roboconf-web-administration/index.html](http://localhost:8181/roboconf-web-administration/index.html)

Un nouveau menu devrait apparaitre.

<img src="/resources/img/web-extension-menu.png" alt="Nouveau menu pour accéder aux extensions web" class="gs" />

Il vous faut aussi indiquer à Roboconf où Kibana est accessible.  
Créez le fichier **etc/net.roboconf.dm.web.extension.kibana.cfg** avec le contenu suivant (à adapter).

```properties
# URL du tableau de bord pour les applications
dashboard-url-applications = http://localhost:5601/app/kibana#/dashboard/Global-Dashboard

# URL du tableau de bord pour les machines / agents
dashboard-url-agents = http://localhost:5601/app/kibana#/dashboard/Global-Dashboard
```

L'extension web pour **Kibana** fournit une liste organisée de liens vers les différents tableaux de bord.  
Attention toutefois, le fait qu'un lien existe ne signifie pas forcément que des données existent dans Elastic Search
pour cette source et pour ce tableau de bord.

<img src="/resources/img/web-extension-kibana.png" alt="Une extension qui pointe vers des tableaux de bord Kibana" class="gs" />
