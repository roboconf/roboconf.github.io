---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.9"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0..


## Sécurité : Échanges SSL avec RabbitMQ

Il est désormais possible de configurer la messagerie RabbitMQ avec SSL pour Roboconf.  
Les échanges se feront alors sur un canal sécurisé.

<img src="/resources/img/nn-0.9-rabbitmq-over-ssl.png" alt="Échanges sécurisés avec SSL entre Roboconf et RabbitMQ" class="gs" />


## Sécurité : Authentification dans la Console Web

L'authentification peut désormais être requise dans la console web.  
Les utilisateurs peuvent être définis dans des REALMs Karaf, à savoir dans des fichiers
de propriétés, des bases de données ou bien dans un annuaire LDAP.

<img src="/resources/img/nn-0.9-authentication-in-the-web-console.png" alt="Authentification dans la console web de Roboconf" class="gs" />

Une fois activiée dans la configuration,
la console web requiert automatiquement que les utilisateurs s'authentifient.

```properties
# Enable or disable CORS.
# CORS = https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
# It should be disabled in production environments.
enable-cors = false

# Enable or disable authentication.
# Users are authenticated against the specified REALM.
enable-authentication = false

# The REALM that is used for authentication.
# We use Karaf realms.
authentication-realm = karaf

# The period of validity for a session once a user is logged in.
# Expressed in seconds. Use a negative value for infinite validity.
session-period = -1
```

<br />



## Sécurité : Fichiers d'Audit pour les Accès Web

Quand l'authentification est activée pour les accès web, toute connexion
et toute action sont tracées à des fins d'audit.

<img src="/resources/img/nn-0.9-audit-files.png" alt="Log des accès web" class="gs" />
<br /><br />


## MBeans pour Roboconf

Cette nouvelle version de Roboconf arrive avec ses propres MBeans.  
Cela permet ainsi de collecter des métriques propres à Roboconf, au travers de JMX.

<img src="/resources/img/nn-0.9-new-mbeans.png" alt="Nouveaux MBeans pour Roboconf" class="gs" />

Un exemple d'utilisation peut être la création de tableaux de bord avec Elastic Search et Kibana.

<img src="/resources/img/nn-0.9-kibana-dashboard-example.png" alt="Exemple de tableau de bord Kibana" class="gs" />
<br /><br />


## Historique des Commandes

Les commandes Roboconf peuvent être exécutées à la demande, via l'API REST, ou bien automatiquement,
que ce soit par l'autonomique ou bien sur planification. L'exécution des commandes est désormais
historisées. Cet historique fournit des détails sur le résultat de l'exécution, sur son déclenchement, etc.

L'historique peut être global...

<img src="/resources/img/nn-0.9-global-commands-history.png" alt="Historique global des commandes" class="gs" />

... ou bien contextualisé pour une application donnée.

<img src="/resources/img/nn-0.9-commands-history-for-an-application.png" alt="Historique des commandes pour une application spécifique" class="gs" />


## Refonte de la Cible Docker

La cible Docker est une solution pour utiliser des conteneurs Docker en lieu et place de VMs.  
Elle sert essentiellement dans le cadre de tests.

Cette cible a été retravaillée pour s'appuyer sur les images Docker officielles du projet Roboconf. Toute la
partie « génération d'images » a été remplacée. Elle s'appuie désormais sur la possibilité de fournir un dockerfile
(qui devrait étendre l'image officielle de l'agent Roboconf).

<img src="/resources/img/nn-0.9-docker-target-v2.png" alt="Refonte de la cible Docker" class="gs" />


## Déploiements « on-premise »

La cible « embarquée » permet d'utiliser des serveurs créés sans l'aide de Roboconf.  
Elle présuppose qu'un agent Roboconf a été installé sur ces machines.

Ce gestionnaire de cible a été enrichi afin d'être capable de sélectionner une machine parmi
une liste d'adresses IP. Une identité est alors affectée à l'agent Roboconf, identité qui pourra
être réinitialisée lorsque le serveur ne sera plus utilisé.

<img src="/resources/img/nn-0.9-on-premise-hosts--fr.png" alt="Le DM peut utiliser et réutiliser des serveurs issus d'un pool préddéfini" class="gs" />


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux entrées sur Github pour plus de détails.

* [Plate-forme](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.9)
* [Administration Web](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.9)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.9)
