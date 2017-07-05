---
title: "Tutoriel - Gestion de Apache Storm avec Docker - 5/5"
layout: page
cat: "ug-last"
id: "tutoriel-apache-storm-et-docker-6"
menus: [ "users", "user-guide" ]
---

Cette dernière partie vous propose de revoir l'application Roboconf
afin de pouvoir déployer les conteneurs Docker sur une infrastructure virtualisée
répartie (exemple : sur Amazon Web Services). Dans cette optique, Roboconf pourra
non seulement déployer les conteneurs et gérer leurs liens, mais il sera également
en charge de gérer la création des VMs.

Dans la première version, nous avons utilisé les liens (*link*) Docker.  
Ces liens permettent d'associer un nom d'hôte (tel que résolu par le conteneur)
avec un autre conteneur. Par exemple, lorsque l'on écrit...

```
docker run -d --rm --restart always --name nimbus --link zookeeper-c:zookeeper storm:1.1 storm nimbus
```

... cela signifie que Nimbus recherche un hôte appelé **zookeeper** et que celui-ci sera résolu
par le conteneur **zookeeper-c**. Concrètement, les réseaux Docker génèrent des règles au niveau du
pare-feu pour rediriger les requêtes vers le conteneur adéquat (SDN - *Software Defined Network*).

Cela fonctionne très bien en local. C'est un peu plus compliqué en distribué.  
Certains outils, comme Docker Swarm, savent toutefois le gérer.

Sur cet exemple, un tel lien docker signfie aussi que la configuration de Nimbus référence
quelque part un hôte appelé **zookeeper**. En distribué, nous souhaiterions que cela soit une adresse
IP qui a été allouée dynamiquement, a posteriori. Il faut modifier la manière dont on lance nos conteneurs
afin de leur injecter les bonnes informations.

Plusieurs options, à combiner, sont possibles :

- Modifier les fichiers de configurations à la main via **docker exec**.
- Recréer un conteneur chaque fois que la configuration change.
- Injecter la configuration au lancement des conteneurs [via les paramètres adéquats](https://hub.docker.com/_/storm/).

Modifiez votre application de sorte à supprimer les liens Docker et en vous appuyant sur l'injection de l'adresse
IP des dépendances dans les fichiers de Storm. Redéployez votre application dans Roboconf et vérifiez que tout fonctionne.
