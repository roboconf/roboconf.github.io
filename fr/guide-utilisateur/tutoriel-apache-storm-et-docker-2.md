---
title: "Tutoriel - Gestion de Apache Storm avec Docker - 1/5"
layout: page
cat: "ug-last"
id: "tutoriel-apache-storm-et-docker-2"
menus: [ "users", "user-guide" ]
---

Commencez par suivre, si ce n'est déjà fait, le tutoriel [pour débuter avec Roboconf](tutoriel-debuter-avec-roboconf.html).  
Il fournit en effet les bases de l'utilisation du DM.

> Notez que l'on n'installe pas le DM via [son image Docker](https://hub.docker.com/r/roboconf/roboconf-dm/). La raison en est que nous
> allons par la suite déployer du Docker. Il est possible de lancer des conteneurs Docker
> depuis du Docker ([DooD](http://container-solutions.com/running-docker-in-jenkins-in-docker/)), mais cela ne fonctionne pas sur tous les systèmes d'exploitation.

Dans un second temps, installez [RabbitMQ via Docker](https://hub.docker.com/_/rabbitmq/).  
Nous allons l'utiliser en lieu et place de la messagerie HTTP de Roboconf.

```
docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
```

Configurez le serveur avec les noms d'utilisateurs `roboconf / roboconf`.  
Mettez également à jour la configuration du DM. Vous pouvez vous reporter à [cette page](/en/user-guide/installing-rabbit-mq.html),
ainsi qu'à [celle-ci](/en/user-guide/configuring-the-messaging.html) (en anglais), pour de plus amples détails.

> La reconfiguration du DM ne nécessite pas de redémarrage.

Une fois cela fait, revérifiez que l'exemple LAMP fonctionne toujours correctement.  
Vous pouvez ensuite passer à [la deuxième étape](tutoriel-apache-storm-et-docker-3.html).
