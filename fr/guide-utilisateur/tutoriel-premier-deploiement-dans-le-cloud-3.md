---
title: "Tutoriel - Premier Déploiement dans le Cloud - 3/4"
layout: page
id: "ug.snapshot.tutorial-first-deployment-in-the-cloud-3"
menus: [ "users", "user-guide" ]
---

## Déployer l'Application

Reprenez l'application du premier tutoriel de Roboconf.  
Pour rappel, elle est disponible [ici](todo).

Extrayez-la et apportez les modifications suivantes :

1. Changez le nom de l'application dans **descriptor/application.properties**.  
Cela évitera un éventuel conflit avec l'application précédente.

2. Ecrasez le fichier **graph/VM/target.properties** avec celui que vous venez de créer pour AWS.

3. Rezippez le tout en une seule archive.  
Comparez avec l'archive originale pour vérifiez la validité de la structure.

Vous pouvez maintenant déployer cette nouvelle application au travers de l'administration web de Roboconf.
Comme vous l'avez fait *en mémoire*, jouez avec le cycle de vie des différentes briques. Assurez-vous que
des machines virtuelles sont bien lancées et que les briques s'installent correctement.

Le plus simple pour vérifier le bon fonctionnement de toutes les briques est de se connecter sur l'équilibreur
de charges. Récupérez son adresse IP dans la console d'Amazon, et connectez-vous sur le port 80. Vous devriez
voir l'application web s'afficher. Si vous avez déployé les 2 isntances de l'application web, vous devriez aussi
pouvoir vérifier que l'équilibrage de charge est opérationnel et que les requêtes tombent alternativement sur chacune
des 2 instances de l'application web.

Pour terminer, arrêtez toutes les machines via l'administration web de Roboconf.  
Assurez-vous que toutes les instances de VMs ont bien été détruites dans la console d'Amazon Web Services.

Pour ceux qui souhaitent aller plus loin, des exercices supplémentaires sont disponibles dans [la dernière étape](tutoriel-premier-deploiement-dans-le-cloud-4.html).
