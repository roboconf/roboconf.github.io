---
title: "Tutoriel - Premier Déploiement dans le Cloud - 1/4"
layout: page
id: "ug.snapshot.tutorial-first-deployment-in-the-cloud-1"
menus: [ "users", "user-guide" ]
---

## Paramétrer Amazon Web Services

Si vous n'en avez pas déjà, créez-vous un compte sur [AWS](http://aws.amazon.com/fr/).    
Choisissez l'offre basique. La première année d'utilisation est gratuite, à condition que vous respectiez certains quotas.
Vous êtes en effet limités à des machines virtuelles **small** et vous ne devez pas dépasser 750 
heures d'utilisation par mois. Ce sera amplement suffisant dans le cadre de ce projet.

Allez ensuite dans la console de gestion d'AWS.  
Une fois arrivé(e), changez de zone géographique (en haut à droite) et choisissez EU (Ireland).
Vous pouvez choisir une autre zone. Simplement, celle-ci correspond à l'URL d'accès **ec2.eu-west-1.amazonaws.com**
que vous retrouverez plus loin dans les fichiers de configuration.

Allez ensuite dans les paramètres de votre compte pour éditer vos paramètres de sécurité.

<img src="/resources/img/tutorial-aws-security-credentials.jpg" alt="Paramètres de sécurité" class="gs" />

Créez un jeu de clés d'accès (**access keys**).

<img src="/resources/img/tutorial-aws-new-access-key.jpg" alt="Créer une nouvelle clé d'accès" class="gs" />

Téléchargez ces informations sous la forme d'un fichier CSV.

<img src="/resources/img/tutorial-aws-download-access-key.jpg" alt="Télécharger la nouvelle clé d'accès" class="gs" />

Celui-ci contient l'identifiant de votre clé, ainsi qu'une clé privée qui sera nécessaire plus tard.  
Allez ensuite dans l'interface d'EC2, menu **Groupes de Sécurité**.

<img src="/resources/img/tutorial-aws-security-groups-menu.jpg" alt="Accéder aux groupes de sécurité" />

Créez-en nouveau groupe que vous appelerez **open**. Pour faire simple, autorisez tous les types de connexion
(vous pourrez l'optimiser plus tard).

<img src="/resources/img/tutorial-aws-new-security-group.jpg" alt="Nouveau groupe de sécurité" class="gs" />

Enfin, allez dans le menu **Paire de Clés** et créez une nouvelle paire de clés.

<img src="/resources/img/tutorial-aws-new-key-pair.jpg" alt="Nouvelle paire de clés" class="gs" />

Cette clé sera utilisée quand vous vous connecterez en SSH sur des VM Amazon.  
Sauvegardez le fichier **pem** en local. Vous le passerez en paramètres des commandes SSH.


## Préparer les Fichiers de Configuration

Créez un fichier appelé **target.properties**.  
Copiez le modèle ci-dessous et complétez-le avec les informations récupérées plus haut.  
Seule la propriété *ami* ne peut pas être complétée. Elle le sera dans l'étape d'après.

``` properties
# Indiquer à l'agent Roboconf qu'il va tourner sur EC2
target.id = ec2

# URL d'accès à EC2
ec2.endpoint = ec2.eu-west-1.amazonaws.com

# Identifiants de connexion
ec2.access.key = 
ec2.secret.key = 

# Configuration de la VM
ec2.ami	= 
ec2.instance.type = t1.micro
ec2.ssh.key = 
ec2.security.group	= 
```

> Il est crucial de prendre les précautions adéquates pour que ces informations ne se retrouvent pas en public 
> (sur GitHub par exemple).  
> Des indications vous seront données plus loin à ce sujet.


## Nettoyage

Durant votre première année, Amazon vous offre 750 heures cumulées et gratuites par mois (pour les machines
virtuelles de type **small**). Toutefois, lorsque vous cessez d'utiliser vos VM, il faut les détruire, et
faire un peu de ménage pour éviter une facturation.

A la fin de ce tutoriel, pensez donc...

1. ... à **arrêter toutes les instances** de vos VMs.
2. ... à **effacer tous les snapshots** (stockage).

L'image ci-dessous vous montre où trouver les *snapshots* dans la console d'EC2.

<img src="/resources/img/tutorial-aws-snapshots.jpg" alt="Emplacement des snapshots" />

<!-- -->

	D'expérience, l'auteur de ce tutoriel s'est déjà vu facturer 1 € pour avoir oublié de 
	supprimer des snapshots dans son espace de stockage. Pensez à les supprimer.

Voilà, vous pouvez maintenant [passer à l'étape suivante](tutoriel-premier-deploiement-sur-le-cloud-2.html),
l'installation de l'agent Roboconf.
