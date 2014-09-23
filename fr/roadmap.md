---
title: "Roadmap"
layout: page
id: "main.roadmap"
menus: [ "project", "roadmap" ]
---

Roboconf a démarré en tant que prototype de recherche et est maintenant en cours d'industrialisation.  
La roadmap pour les prochains mois couvre plusieurs aspects.

* **Jusqu'à Octobre**

	* Packager le DM et l'agent dans des distributions [Karaf](http://karaf.apache.org/).
	* Utiliser [iPOJO](http://felix.apache.org/documentation/subprojects/apache-felix-ipojo.html) pour une approche orientée service.
	* Créer des paquets systèmes (comme des paquets Debian) pour simplifier l'installation.
	* Mettre en place un [dépôt Maven](https://docs.sonatype.org/display/Repository/Sonatype+OSS+Maven+Repository+Usage+Guide) pour Roboconf. &nbsp; <span class="glyphicon glyphicon-ok"></span>
	* Compléter la section **téléchargement** sur le site web. &nbsp; <span class="glyphicon glyphicon-ok"></span>
	* Ajouter le support de [Docker](http://www.docker.com/).
	* Ecrire le premier tutoriel pour Roboconf.

* **A partir d'Octobre**

	* Ajouter des MBeans pour superviser Roboconf.
	* Ajouter la supervision des applications avec Roboconf.
	* Créer un plug-in Maven pour automatiser la validation et la construction de pack de déploiement.
	* Créer un éditeur texte pour le DSL de Roboconf.
	* Créer des générateurs de documentation.
	* Supporter l'exécution de scénarios utilisateurs.
	* Mettre en place un dépôt de recettes et de composants réutilisables.

* **Ouvert à Contributions**

    * Implémenter un plug-in pour Chef.
    * Implémenter un plug-in pour Puppet Master.
    * Implémenter un plug-in ANT.

Pour le moment, il n'y a pas de date de release planifiée.
