---
title: "Tutoriel - Premier Déploiement dans le Cloud - 2/4"
layout: page
id: "ug.snapshot.tutorial-first-deployment-in-the-cloud-2"
menus: [ "users", "user-guide" ]
---

## Installer l'Agent Roboconf

Installez le DM et RabbitMQ.  
Vous avez normalement déjà fait ça dans [le tutoriel pour débuter avec Roboconf](tutoriel-debuter-avec-roboconf.html).
Nous ne nous attarderons donc pas sur cette partie.

Maintenant que vous allez déployer dans le cloud, c'est Roboconf qui va interagir avec votre cloud pour créer (ou détruire)
des machines virtuelles. Pour cela, vous allez avoir besoin qu'un agent Roboconf soit installé sur chaque VM. Et pour cela, il va falloir créer une image virtuelle. Lorsque l'on voudra créer une nouvelle VM, on prendra cette image et on demandera
au IaaS (*Infrastructure as a Service*) de l'instancier.

> Un agent Roboconf se présente comme le DM, sous la forme d'une application OSGi
> pré-conditionnée dans un serveur Karaf.

Première chose, instanciez une nouvelle VM dans la console d'Amazon Web Services.  
Pour cela, allez dans le menu **Instances**.

<img src="/resources/img/tutorial-aws-instances.jpg" alt="Créer une nouvelle VM" class="gs" />

Cliquez sur **Launch**, puis sélectionnez le système d'exploitation et la configuration
matérielle qui sera utilisée pour la VM. Utilisez de préférence Ubuntu Server comme image de base.
Pour le type de VM, prenez **small** (sans quoi ce sera facturé).
  
> Concernant les VM, vous aurez (parfois) à vous y connecter en SSH.  
> Pour rappel, la commande à utiliser est **ssh -i /path/to/your.pem ubuntu@ip-address**

A partir de là, 2 options s'offrent à vous.  
Soit vous installez [tout à la main](/en/user-guide/installing-an-agent.html), soit vous 
utilisez [un script](/en/user-guide/installing-everything.html) qui va uploader, installer et
configurer l'agent pour vous.

A l'issue de l'installation, votre VM devrait être opérationnelle.  
Si vous la redémarrez, l'agent démarrera avec le système. Rendez-vous ensuite dans la console de gestion de votre
infrastructure de cloud, puis créez une image *snapshot* de la VM sur laquelle se situe l'agent. Attendez que cela 
soit terminé, puis récupérez l'identifiant de l'image associée. Mettez à jour le fichier **target.properties** 
précédemment créé (propriété **ec2.ami**).

<img src="/resources/img/tutorial-aws-amis.jpg" alt="Images virtuelles chez AWS" class="gs" />

Voilà. Désormais, chaque fois que l'on instanciera une VM à partir de cette image, un agent Roboconf sera
lancé au démarrage de celle-ci, prêt à interagir avec le DM. Vous aller maintenant pouvoir 
[déployer une application avec Roboconf](tutoriel-premier-deploiement-dans-le-cloud-3.html).
