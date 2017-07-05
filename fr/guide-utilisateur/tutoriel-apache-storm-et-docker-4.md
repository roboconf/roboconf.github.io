---
title: "Tutoriel - Gestion de Apache Storm avec Docker - 3/5"
layout: page
cat: "ug-last"
id: "tutoriel-apache-storm-et-docker-4"
menus: [ "users", "user-guide" ]
---

Dans cette troisième partie, nous allons créer une nouvelle application
Roboconf qui permettra de déployer Storm. Pour l'instant, nous allons faire
simple et viser un déploiement local. Dans la dernière partie, nous essayerons
de généraliser un tel déploiement à un environnement totalement réparti (par
exemple pour le cloud).

Commencez par créer un projet Roboconf.  
Vous pouvez utiliser [notre outillage Eclipse](/en/user-guide/eclipse-plugins.html)
([téléchargement ici](../telecharger.html)), ou bien tout faire à la main, la structure et les fichiers
étant assez simples. Dans cette deuxième hypothèse, nous vous fournissons une base de pom.xml (pour Maven).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
		xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<prerequisites>
		<maven>3.0.3</maven>
	</prerequisites>
	
	<groupId>net.roboconf</groupId>
	<artifactId>dockerized-storm</artifactId>
	<version>1.0-SNAPSHOT</version>
	<packaging>roboconf-app</packaging>
	
	<name>dockerized storm</name>
	<description>An application to deploy a Storm cluster as Docker containers</description>
	
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<timestamp>${maven.build.timestamp}</timestamp>
		<maven.build.timestamp.format>yyyy-MM-dd--HH-mm</maven.build.timestamp.format>
		
		<maven.storm.version>1.1</maven.storm.version>
		<maven.zookeeper.version>3.3</maven.zookeeper.version>
	</properties>
	
	<build>
		<finalName>${project.artifactId}--${project.version}--${timestamp}</finalName>
		<plugins>
			<plugin>
				<groupId>net.roboconf</groupId>
				<artifactId>roboconf-maven-plugin</artifactId>
				<version>0.8</version>
				<extensions>true</extensions>
			</plugin>
		</plugins>
	</build>
	
</project>
```

En vous servant de l'application LAMP, de [ces exemples](https://github.com/roboconf/roboconf-examples) et de 
[la documentation en ligne](/en/user-guide/user-guide.html),
construisez un graphe Roboconf qui reprend les dépendances précédemment vues.

* Nimbus dépend de Zoo Keeper.
* Chaque nœud de travail dépend de Nimbus.
* L'interface d'administration dépend de Nimbus.
* La topologie dépend de Nimbus et des nœuds de travail.

> Utilisez **ip** comme variable exportée pour les composants.  
> En plus de définir la relation de dépendance, celle-ci sera utilisée plus tard.

Notez que nous avons rajouté une dépendance entre notre topologie et les nœuds de travail,
de sorte à la redistribuer dés que le cluster évolue (à la montée ou à la descente).

Vérifiez la validité de votre graphe avec la cible en-mémoire.  
Dans un deuxième temps, rajoutez des recettes en bash, avec le cycle suivant :

* deploy.sh : récupération de l'image Docker.
* start.sh : lancement du conteneur.
* stop.sh : arrêt du conteneur.
* undeploy.sh : rien (vous pouvez l'omettre).

> Pour faire simple, considérez qu'il n'y aura qu'un seul Zoo Keeper et un seul Nimbus.
> Utilisez les *link* Docker. En résumé, pour l'instant, seuls les nœuds de travail
> devraient avoir des noms dynamiques.

Pour lmes noms dynamiques, vous pouvez utiliser `utilisez ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}`.  
Voir [cette page](/en/user-guide/using-docker-on-the-agent-side.html) (en anglais) pour de plus amples détails.

Enfin, pour tester la validité de vos recettes, modifiez la cible de déploiement dans la console
Roboconf. Rajoutez-lui [les options adéquates](/en/user-guide/target-in-memory.html) afin d'exécuter les recettes au lieu de simuler leur
exécution. Jouez avec le cycle de vie des instances et vérifiez que tout se passe bien dans la console de Storm.

Nous pouvons maintenant [rajouter une commande](tutoriel-apache-storm-et-docker-5.html)
pour automatiser le rajout d'un nœud de travail.
