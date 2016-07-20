---
title: "Source Code"
layout: page
cat: "main"
id: "sources"
menus: [ "developers", "sources" ]
---

Le code source de Roboconf est hébergé sur GitHub.  
Voir [https://github.com/roboconf](https://github.com/roboconf).


# Compiler Roboconf

La plupart des projets Roboconf sont des projets Java. Ils utilisent tous Maven comme outil de *construction*.
L'administration web de Roboconf est un projet Javascript. Et le site web est quant à lui construit avec Jekyll.
Ce sont les seules exceptions notoires.

Il vous faut avoir installé [Maven](http://maven.apache.org/) (version 3) pour compiler Roboconf.    
Vous aurez aussi besoin de [NodeJS](http://nodejs.org/), de [NPM](https://www.npmjs.org/) et de [Gulp](http://gulpjs.com/).

```tcl 
# Exemple sur Ubuntu
sudo apt-get install npm
sudo npm install gulp -g
```

Vous aurez probablement besoin des deux pour compiler Roboconf.  
NPM est utilisé pour construire l'administration web. Mais cette administration est aussi embarquée
dans la plate-fome.

> Sur Debian/Ubuntu, l'exécutable de NodeJS s'appelle parfois **nodejs** au lieu de **node**.  
> Il suffit alors d'aller dans **/usr/bin** et d'exécuter **ln -s nodejs node**.

Pour les projets Java comme la plate-forme, le plug-in Maven ou les outils Eclipse, il vous suffit
de cloner le dépôt de sources et d'exécuter...

```tcl
mvn clean install
```

Si vous travaillez sur un tag ou une branche, il se peut que la compilation échoue à cause des vérifications
faites par Checkstyle. Vous pouvez désactiver ces vérifications en utilisant...

```tcl
mvn clean install -Dcheckstyle.skip=true
```

Même chopse si vous souhaitez travailler en mode déconnecté.

```tcl
mvn clean install -o -Dcheckstyle.skip=true
```

Par défaut, les tests d'intégration ne sont pas exécutés lors de l'assemblage standard.    
Pour les faire tourner, vous devez utiliser...

```tcl
mvn clean install -P run-integration-tests
```

Quand les projets utilisent un outil d'assemblage différent, des instructions sont données dans le *readme* du projet. 


# Contribuer au Projet

Le projet est open-source.  
Toutes les contributions sont les bienvenues. Nous utilisons le mécanisme des *pull requests* sur GitHub.

Ces liens (en anglais) devraient vous aider si vous n'en êtes pas familier.  
Sinon, il y a probablement des blogs francophones qui auront fourni d'autres explications.

* [Understanding pull requests](https://help.github.com/articles/using-pull-requests)
* [Forking a repository](https://help.github.com/articles/fork-a-repo)
* [Creating a pull request](https://help.github.com/articles/creating-a-pull-request)


# Contribuer à l'Administration Web

Les informations relatives au développement de l'administration web (Angular JS) sont regroupées
dans le [fichier « readme »](https://github.com/roboconf/roboconf-web-administration) du projet.


# Contribuer au Site Web

Le site est généré avec [Jekyll](http://jekyllrb.com). Il est hébergé avec [GitHub](http://github.com),
et est réalisé avec [Twitter Bootstrap](http://getbootstrap.com) et [Glyph Icons](http://glyphicons.com).

Les sources du site web sont elles-aussi hébergées sur [GitHub](https://github.com/roboconf/roboconf.github.io).  
Pour proposer des corrections ou des évolutions, il vous suffit de *forker* ce dépôt, d'y appliquer vos modifications
et de soumettre une *pull request*.

Le [guide développeur](guide-developpeur/guide-developpeur.html) explique les grandes lignes de la configuration 
Jekyll, ainsi que la façon dont le site fonctionne.
