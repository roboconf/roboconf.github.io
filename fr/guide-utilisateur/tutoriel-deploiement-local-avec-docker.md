---
title: "Tutoriel - Déploiement Local avec Docker"
layout: page
cat: "ug-last"
id: "tutorial-local-deployment-with-docker"
menus: [ "users", "user-guide" ]
---

## Introduction

Ce tutoriel vous propose de déployer [l'application LAMP](https://bintray.com/artifact/download/roboconf/roboconf-tutorial-samples/lamp-webapp-bash-0.6.0-1.0.zip)
sur votre machine locale, au sein de conteneurs Docker.  
Pour rappel, cette application a déjà été utilisée dans le 
[le tutoriel pour débuter avec Roboconf](tutoriel-debuter-avec-roboconf.html).

> Nous partons du principe que vous avez déjà suivi le tutoriel précédent.  
> Vous êtes donc supposés familiers de l'utilisation et de la configuration du DM.

Vous allez également utiliser RabbitMQ au lieu de la messagerie HTTP de Roboconf.


## Installation de Docker

Commencez par installer Docker sur votre machine.  
Nous avons mis quelques indications dans [le guide utilisateur](/en/user-guide/docker-tips.html) (en anglais).

L'idée globale est de créer des conteneurs Docker locaux au lieu de créer des agents en mémoire ou
de vraies machines virtuelles. Les agents Roboconf tourneront dans ces conteneurs Docker. Et ils y
effectueront également les actions (déploiement, reconfiguration...)  concernant l'application LAMP.

A titre d'information, cette configuration n'est qu'une des possibilités pour marier 
[Roboconf avec Docker](/en/user-guide/using-docker-with-roboconf.html).


## Installation de RabbitMQ

Pour l'installation de RabbitMQ, nous vous invitons à suivre [le guide utilisateur](/en/user-guide/installing-rabbit-mq.html) (en anglais).  
Vous pouvez aussi utiliser un compte gratuit sur [www.cloudamqp.com](https://www.cloudamqp.com/).

> Note : la messagerie HTTP pourrait aussi être utilisée avec des conteneurs Dockers locaux.  
> La seule chose à faire serait de spécifier l'adresse IP du DM dans le fichier **etc/net.roboconf.messaging.http.cfg** (172.17.42.1).


## Configuration du DM

Pour activer le support de Docker côté DM, allez dans l'invite de commandes du DM, puis tapez `roboconf:target docker`.
Cela installera toutes les librairies nécessaires.

Il vous faut ensuite indiquer à Roboconf que vous souhaitez utiliser RabbitMQ.  
Dans le dossier **etc** de Roboconf, éditez le fichier **net.roboconf.messaging.rabbitmq.cfg**. Précisez l'empalcement de RabbitMQ,
ainsi que les identifiants pour vous y connecter. Editez également le fichier **net.roboconf.dm.configuration.cfg** et mettez **rabbitmq**
comme valeur de la propriété **messaging-type**.

Toutes ces actions peuvent être effectuées sans arrêter, ni même redémarrer Roboconf.  
La modification de ces fichiers entraînera automatiquement la reconfiguration du DM.


## Création de l'Application

Si vous avez suivi le [tutoriel pour débuter avec Roboconf](tutoriel-debuter-avec-roboconf.html),
vous avez déjà uploadé une archive (ZIP) qui a défini un modèle d'application. Et vous avez également créé
une application depuis ce modèle. Vous allez maintenant créer une nouvelle application, en partant d'un modèle
existant (celui que vous avez uploadé).

<img src="/resources/img/tutorial-docker-new-app.jpg" alt="Créer une nouvelle application" class="gs" />

Allez dans le menu **application targets** et définissez la cible (de déploiement) par défaut comme étant *docker*.

<img src="/resources/img/tutorial-docker-default-target.jpg" alt="Mettre Docker comme cible par défaut" class="gs" />

Cliquez sur la cible Docker pour observer les paramètres utilisés.  
La configuration suivante...

```properties
handler = docker
name = Docker
description = Exécuter les agents et les déploiements dans des conteneurs Docker locaux.

docker.image = demo_roboconf_demo
docker.generate.image = true
docker.option.run.cap-add = SYS_PTRACE
```

... signifie que les conteneurs seront créés depuis une image appelée **demo\_roboconf\_demo**. Celle-ci sera générée depuis une image
qui n'est pas précisée. Par défaut, ce sera donc à partir de **ubuntu:latest**. Rien n'est indiqué non plus quant à l'agent Roboconf qui
sera embarqué dans cette image, tout comme aucun JDK n'est référencé. Ces deux informations ont également des valeurs par défaut. Ces éléments
seront téléchargés automatiquement lors de la génération de l'image. Enfin, il est mentionné que les conteneurs créés à partir de cette image
seront lancés avec l'option *SYS_PTRACE*.

Rendezvous maintenant dans le menu **instances** et cliquez sur **deploy all** (en haut à droite).

<img src="/resources/img/tutorial-docker-instances.jpg" alt="Déployer toutes les instances" class="gs" />

Cette opération peut prendre plusieurs minutes puisque la génération de l'image implique de télécharger et d'installer un JDK et
un agent Roboconf. Une fois l'image créée (`docker images`), les conteneurs devraient rapidement être créés, et tout
devrait apparaître comme déployé et démarré dans la console Roboconf. Vous pouvez également vérifier que les conteneurs ont bien été lancés avec
la commande `docker ps`.

L'application déployée peut être vsualisée dans votre navigateur web.  
Trouvez l'adresse IP du serveur Apache (dans la console) et rendez-vous à cette adresse. L'application devrait être accessible.
Si les deux instances de Tomcat sont déployées, rafraichissez la page plusieurs fois et vérifiez que les requêtes sont successivement
envoyées vers les 2 serveurs.


<!-- Bootstrap -->
<a class="btn btn-roboconf" role="button" data-toggle="collapse" href="#whatIsHappening" aria-expanded="false" aria-controls="whatIsHappening">
  Expliquer ce qui se passe en arrière-plan...
</a>
<span class="glyphicon glyphicon-info-sign"></span>
<div class="collapse more-about" id="whatIsHappening">

	<p>
	La configuration définie dans la console permet de générer une image Docker avec un JDK et un agent Roboconf.
	Lorsque le DM démarrer un conteneur depuis cette image, il lui passe des informations (notamment, quelle partie de
	l'application cet agent doit-il gérer, comment contacter le DM, quel type de messagerie, quels identifiants de
	connexion, etc). L'agent Roboconf démarrant avec le conteneur, il récupère ces informations et met à jour sa configuration.
	</p>
	<p>
	Il peut alors interagir avec le DM (ici, au travers de RabbitMQ).<br />
	Contrairement à ce que l'on avait pu voir avec le mode « en mémoire », les recettes sont ici réellement exécutées.
	Les agents Roboconf procèdent donc au déploiement et à la configuration des différentes briques dont ils ont la charge.
	Le mode utilisé ici permet de remplacer des machines virtuelles par des conteneurs Docker, ce qui peut s'avérer utile
	pour des tests en local.
	</p>

	<a class="btn btn-roboconf" role="button" data-toggle="collapse" href="#whatIsHappening" aria-expanded="false" aria-controls="whatIsHappening">
  		Masquer ces détails...
	</a>

</div>
<!-- Bootstrap -->


## Conclusion

Félicitations ! Vous avez effectué un véritable déploiement avec Roboconf.  
Vous avez également découvert la reconfiguration du DM et l'utilisation de RabbitMQ.

Vous pouvez maintenant vous frotter [à un déploiement dans le cloud](tutoriel-premier-deploiement-dans-le-cloud.html) avec Roboconf.
