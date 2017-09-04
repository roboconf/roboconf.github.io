---
title: "Tutoriel - Gestion de Apache Storm avec Docker - Éléments de Solutions"
layout: page
cat: "ug-last"
id: "tutorial-apache-storm-with-docker-7"
menus: [ "users", "user-guide" ]
---

Cette page a été rajoutée afin de fournir quelques éléments de solutions.  


## Version 1

Voici le graphe à utiliser pour la version 1.

<pre><code class="language-roboconf">
vm {
	installer: target;
	children: zookeeper, storm_nimbus, storm_worker, storm_ui, test_topology;
}

zookeeper {
	installer: script;
	exports: ip;
}

storm_nimbus {
	installer: script;
	exports: ip;
	imports: zookeeper.ip;
}

storm_worker {
	installer: script;
	exports: ip;
	imports: storm_nimbus.ip, zookeeper.ip;
}

storm_ui {
	installer: script;
	imports: storm_nimbus.ip;
}

test_topology {
	installer: script;
	imports: storm_nimbus.ip, storm_worker.ip;
}
</code></pre>

Ainsi que les recettes pour le composant **storm_worker**, les autres pouvant être
facilement déduites de ce modèle.

**deploy.sh**

```bash
#!/bin/sh
docker pull storm:${maven.storm.version}
```

**deploy.sh**

```bash
#!/bin/sh
docker run -d \
       --restart always \
       --name ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH} \
       --link zookeeper:zookeeper \
       --link nimbus:nimbus \
       storm:${maven.storm.version} storm supervisor
```

Notez que l'on utilise ici l'identifiant d'une instance Roboconf comme nom de conteneur.  
Cela simplifie la gestion par la suite, notamment pour retrouver le nom du conteneur
lorsque l'on souhaite l'arrêter. Zoo Keeper et Nimbus peuvent avoir un nom en dur, puisque
nous avons fait l'hypothèse que ces composants n'auraient qu'une seule instance (pour cette version 1).

**stop.sh**

```bash
#!/bin/sh
docker kill ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}
```

Pas besoin de **undeploy.sh** ou de **update.sh**, pour le moment.  
Exception faîte du composant **test_topology**, pour lequel on voudrait que la
topologie soit redistribuée chaque fois qu'un nœud de travail apparaît ou disparaît. Cela
passe par la fourniture d'un script **update.sh**, qu'il n'y avait pas pour les autres
composants.

```bash
#!/bin/sh
docker run -it --rm \
       --link nimbus:nimbus \
       storm:${maven.storm.version} \
       storm rebalance my-topology
```

Enfin, voici les arbres d'instances que l'on peut utiliser.

<pre><code class="language-roboconf">
instance of vm {
	name: vm;

	instance of zookeeper {
		name: Zoo Keeper;
	}

	instance of storm_nimbus {
		name: Nimbus;
	}

	instance of storm_ui {
		name: UI;
	}
}

instance of vm {
	name: vm_worker 1;

	instance of storm_worker {
		name: worker;
	}
}

instance of vm {
	name: vm_worker 2;

	instance of storm_worker {
		name: worker;
	}
}
</code></pre>


## Version 2

Globalement, le graphe et les arbres d'instances n'ont pas à être modifiés.  
C'est au niveau des recettes qu'il faut travailler. Les *link* Docker doivent être supprimés,
et les adresses IP des dépendances être injectées au lancement des conteneurs **storm_worker**
et **storm_ui**.

On peut s'aider pour cela de la manière dont l'image Docker pour Storm a été bâtie.  
Si l'on regarde [le Dockerfile](https://github.com/31z4/storm-docker/blob/e20c50c9704ed64765ba80e6964df4c0c189be3e/1.1.0/Dockerfile),
on voit que [la commande par défaut](https://github.com/31z4/storm-docker/blob/e20c50c9704ed64765ba80e6964df4c0c189be3e/1.1.0/docker-entrypoint.sh)
génère un fichier de configuration. On peut donc s'en inspirer pour nos recettes : il faut générer un tel fichier à partir
des informations fournies par Roboconf, puis monter ce fichier en tant que volume au lancement du conteneur.


## Aller plus loin...

Jusqu'à présent, nous avons considéré, pour faire simple, qu'il n'y avait qu'une seule instance de
Zoo Keeper et une seule de Nimbus. On pourrait faire évoluer l'application pour gérer plusieurs instances
(un cluster de Zoo Keeper). Pour le Nimbus, Storm ne supporte pas aujourd'hui de mode en grappe pour ce nœud.
Il faut donc en rester à une seule instance.
