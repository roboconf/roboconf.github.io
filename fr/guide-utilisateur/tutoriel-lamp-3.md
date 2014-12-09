---
title: "Tutoriel LAMP - 3/5"
layout: page
id: "ug.snapshot.tutoriel-lamp"
menus: [ "users", "user-guide" ]
---

## Comprendre l'Exemple LAMP

Afin de comprendre ce qui va se passer, commencez par lire ces 2 pages.

* [Understanding Roboconf - part 1](/en/user-guide/lamp-example-part-1.html)
* [Understanding Roboconf - part 2](/en/user-guide/lamp-example-part-2.html)

Une fois cela fait, étudiez le projet **apache-tomcat-bash**.  
Mettez à jour le fichier **target.properties** pour y ajouter vos accès à l'infrastructure.  
Assurez-vous que le dossier contenant le **target.properties** englobe aussi un fichier *.gitignore*
ou *.svnignore* (selon l'endroit où vous allez sauvegarder les sources de votre projet).

> Cette dernière étape est très importante.  
> Elle évitera que d'autres n'utilisent votre compte pour créer des VM.

Vous pouvez ensuite créer une archive qui englobe les trois dossiers **descriptor**, **instances**
et **graph**. Vous pouvez aussi utiliser Maven pour réaliser cette tâche. Non seulement le plug-in Maven pour
Roboconf va créer cette archive, mais il effectuera aussi une validation du projet.


## Déployer l'Exemple LAMP

Connectez-vous à l'interface d'administration de Roboconf. Celle-ci est embarquée par le DM.  
Si vous avez installé le DM sur votre machine, l'adresse par défaut est 
[http://dm-ip:8181/roboconf-web-administration/index.html](http://dm-ip:8181/roboconf-web-administration/index.html).

Chargez votre application et déployez-la via l'interface web.  
Vérifiez dans l'interface de votre infrastructure de cloud que des machines virtuelles ont bien été créées.  Assurez-vous que
l'application déployée fonctionne bien. Pour cela, connectez-vous sur le port 80 de la VM qui héberge le *load balancer* (Apache).

> En cas de problème, regardez les logs des divers agents Roboconf.

Une fois cette tâche réalisée, désinstallez les instances racines via Roboconf.  
Cela devrait détruire les machines virtuelles. Assurez-vous en dans la console de gestion de votre infrastructure.


Prochaine étape, [faire évoluer cet exemple](tutoriel-lamp-4.html).
