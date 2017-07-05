---
title: "Tutoriel - Gestion de Apache Storm avec Docker - 4/5"
layout: page
cat: "ug-last"
id: "tutoriel-apache-storm-et-docker-5"
menus: [ "users", "user-guide" ]
---

Cette avant-dernière partie vous propose de créer [un fichier de commandes](/en/user-guide/roboconf-commands.html)
Roboconf. Un tel fichier équivaut à un script avec des commandes spécifiques
à Roboconf.

Ils peuvent être utilisés pour définir des actions complexes...

* ... à exécuter explicitement via la console web de Roboconf.
* ... à [planifier](/en/user-guide/roboconf-commands-scheduling.html) (tel jour, telle heure, avec telle périodicité).
* ... à exécuter lorsque surviennent un ou plusieurs événements
([autonomique](/en/user-guide/autonomic-management-with-roboconf.html)).

Modifiez votre application en lui rajoutant une commande **scale-up.commands**.  
Celle-ci devra :

* Générer un nouveau nom de VM.
* Créer une nouvelle instance de VM.
* Créer une nouvelle instance de nœud de travail Storm.
* Déployer et démarrer le tout.

Redéployez votre application, redéployez les instances, puis exécuter explicitement
votre commande depuis la console Roboconf. Vérifiez qu'un nouveau conteneur a bien été créé
et que la topologie a bien été redistribuée au bout de quelques minutes.

Nous pouvons maintenant passer à [la dernière partie de ce tutoriel](tutoriel-apache-storm-et-docker-6.html).
