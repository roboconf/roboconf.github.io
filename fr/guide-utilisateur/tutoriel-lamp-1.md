---
title: "Tutoriel LAMP - 1/5"
layout: page
id: "ug.snapshot.tutoriel-lamp-1"
menus: [ "users", "user-guide" ]
---

## Paramétrer Amazon Web Services

Si vous n'en avez pas déjà, créez-vous un compte sur [AWS](http://aws.amazon.com/fr/).    
Choisissez l'offre basique. La première année d'utilisation est gratuite, à condition que vous respectiez certains quotas.
Vous êtes en effet limités à des machines virtuelles **micro** et vous ne devez pas dépasser 750 
heures d'utilisation par mois. Ce sera amplement suffisant dans le cadre de ce projet.

Allez ensuite dans la console de gestion d'AWS.  
Une fois arrivé(e), changez de zone géographique (en haut à droite) et choisissez EU (Ireland).

Allez ensuite dans les paramètres de votre compte pour éditer vos paramètres de sécurité.  
Créez un jeu de clés d'accès (**access keys**). Téléchargez ces informations sous la forme d'un fichier CSV.
Celui-ci contient l'identifiant de votre clé, ainsi qu'une clé privée qui sera nécessaire plus tard.

Allez ensuite dans l'interface d'EC2, menu **Groupes de Sécurité**.  
Créez-en un nouveau que vous appelerez **open**. Laissez les connexions sortantes telles quelles.
Pour les connexions entrantes, ajoutez 2 règles qui autorisent des connexions de n'importe où en mode TCP et UDP.
Rajoutez aussi une règle pour SSH. Sauvegardez le groupe (vous pourrez l'optimiser plus tard).

Enfin, allez dans le menu **Paire de Clés** et créez une nouvelle paire de clés.  
Cette clé sera utilisée quand vous vous connecterez en SSH sur des VM Amazon.  
Sauvegardez le fichier **pem** en local. Vous le passerez en paramètres des commandes SSH.


## Préparer la Configuation pour AWS

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

> Il est crucial de prendre les précautions adéquates pour que ces informations ne se retrouvent pas en public (sur GitHub par exemple).  
> Des indications vous seront données plus loin à ce sujet.

Voilà, vous pouvez maintenant [passer à l'étape suivante](tutoriel-lamp-2.html), l'installation de Roboconf.
