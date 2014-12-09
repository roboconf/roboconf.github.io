---
title: "Tutoriel LAMP - 2/5"
layout: page
id: "ug.snapshot.tutoriel-lamp-2"
menus: [ "users", "user-guide" ]
---

## Installer Roboconf

Pour commencer, il va falloir installer les différentes briques de Roboconf.  
Cela inclut une brique d'administration (le DM), un serveur de messagerie (RabbitMQ) et un agent, à préinstaller
sur notre infrastructure de cloud.

> Pour vos machines virtuelles, utilisez Ubuntu Server comme image de base.  
> Vous aurez aussi (parfois) à vous connecter en SSH. Pour rappel, la commande à utiliser est...
> 
> **ssh -i /path/to/your.pem ubuntu@ip-address**

1. Créez 3 machines virtuelles (VM) sur votre infrastructure de cloud.  
Appelez-les **dm**, **messagerie** et **image-agent**.  
Comme leurs noms l'indiquent, l'une servira à installer le serveur de messagerie, la deuxième hébergera le DM, 
et la troisième servira de modèle pour la création des images en général.

2. Dézippez l'archive **roboconf-0.2-SNAPSHOT** et allez dans le répertoire **scripts**.  
Complétez le script **conf.sh**. Puis exécutez les scripts suivants : **install-messaging.sh**, **install-agent.sh** et **install-dm.sh**.

3. Rendez-vous ensuite dans la console de gestion de votre infrastructure de cloud, puis créez une image *snapshot* de la
VM sur laquelle se situe l'agent.

4. En parallèle, vérifiez que le DM fonctionne.  
Connectez-vous en SSH sur la machine du DM, puis allez dans *~/roboconf-dm-0.2-SNAPSHOT/bin*.  
Lancez l'exécutable **./karaf** (en mode interactif donc), puis activez le module pour votre infrastructure (*bundle:list* puis *bundle:start ID*).

5. Dans votre navigateur web, rendez-vous sur la page [http://dm-ip:8181/roboconf-web-administration/index.html](http://dm-ip:8181/roboconf-web-administration/index.html).

6. Revenez voir la console de gestion de l'infrastructure. Le *snapshot* doit être terminé.  
Récupérez son identifiant et mettez à jour le fichier **target.properties** précédemment créé.

<!-- -->

	Les scripts se connectent en SSH sur les machines distantes pour installer et configurer chaque brique.  
	A noter que le DM est plutôt censé tourner en local. Mais il peut parfois être intéressant de le faire tourner dans le cloud,
	surtout dans le cadre d'un tutoriel.


Vous aller maintenant pouvoir [déployer une application avec Roboconf](tutoriel-lamp-3.html).
