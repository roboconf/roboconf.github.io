---
title: "Source Code"
layout: page
id: "main.sources"
menus: [ "developers", "sources" ]
---

Le code source de Roboconf est hébergé sur GitHub.  
Voir [https://github.com/roboconf/roboconf](https://github.com/roboconf/roboconf)  
Le code source des projets relatifs (consoles web, etc) peut être trouvé [ici](https://github.com/roboconf).

# Compiler Roboconf

Il faut avoir installé [Maven](http://maven.apache.org/) pour compiler Roboconf.  
Maven 3 est régulièrement utilisée dans l'équipe de développement, mais cela devrait fonctionner aussi avec Maven 2.  
Clonez le dépôt principal et exécutez

	mvn clean install

Vous trouverez...

* ... le *deployment manager* (DM) sous **roboconf-dm-webapp/target** (il s'agît d'un WAR).
* ... l'agent under **roboconf-agent/target** (il s'agît d'un ZIP).

Pour utiliser Roboconf, vous aurez également besoin de [l'administration web de Roboconf](https://github.com/roboconf/roboconf-web-administration).  
Les applications web liées à Roboconf utilisent un autre système de build que Maven. En effet, ces applications
sont développées en Javascript. Il est conseillé de suivre les *readme* de ces sous-projets pour les construire.

# Contribuer au Projet

Le projet est open-source.  
Toutes les contributions sont les bienvenues. Nous utilisons le mécanisme des *pull requests* sur GitHub.

Ces liens (en anglais) devraient vous aider si vous n'en êtes pas familier.  
Sinon, il y a probablement des blogs francophones qui auront fourni d'autres explications.

* [Understanding pull requests](https://help.github.com/articles/using-pull-requests)
* [Forking a repository](https://help.github.com/articles/fork-a-repo)
* [Creating a pull request](https://help.github.com/articles/creating-a-pull-request)

# Contribuer au Site Web

Le site est généré avec [Jekyll](http://jekyllrb.com). Il est hébergé avec [GitHub](http://github.com),
et est réalisé avec [Twitter Bootstrap](http://getbootstrap.com) et [Glyph Icons](http://glyphicons.com).

Les sources du site web sont elles-aussi hébergées sur [GitHub](https://github.com/roboconf/roboconf.github.io).  
Pour proposer des corrections ou des évolutions, il vous suffit de *forker* ce dépôt, d'y appliquer vos modifications
et de soumettre une *pull request*.

Le [guide développeur](guide-developpeur/guide-developpeur.html) explique les grandes lignes de la configuration 
Jekyll, ainsi que la façon dont le site fonctionne.
