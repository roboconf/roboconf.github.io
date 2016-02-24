---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.6"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0.5.


## Messagerie HTTP

La messagerie internet de Roboconf a été retravaillée pour être extensible.  
Il existe désormais une implémentation de cette messagerie basée sur des *web sockets*, ce qui rend
l'utilisation de RabbitMQ optionnelle.

<img src="/resources/img/nn-0.6-http-messaging.png" alt="Topologie Roboconf avec la messagerie HTTP" class="gs" />

Cette implémentation est idéale pour les débutants et les déploiements de faible envergure.  
En revanche, elle est déconseillée pour les environnements de production.
<br /><br />


## Commandes Roboconf

Nouveauté de cette version, les commandes sont en fait des instructions
Roboconf scriptées dans des fichiers.

<pre><code class="language-roboconf-commands"># Créer une instance racine.
Create RootComponent as myRoot

# Créer une instance.
Create component as myInstance under /myRoot

# Répliquer une instance racine.
Replicate /myRoot as myRoot2

# Renommer une instance.
Rename /myRoot2 as myRootCopy

# Associer une instance racine avec une cible de déploiement.
Associate /myRootCopy with 3

# Modifier l'état d'une instance.
Change status of /myRoot/myInstance to NOT_DEPLOYED
Change status of /myRoot/myInstance to DEPLOYED_STOPPED
Change status of /myRoot/myInstance to DEPLOYED_STARTED

# Actions de masse.
Deploy and start all /myRootCopy
Stop all /myRootCopy
Undeploy all /myRootCopy

# Supprimer une instance.
Delete /myRootCopy
</code></pre>

Elles peuvent être listées et exécutées depuis la console web...

<img src="/resources/img/nn-0.6-commands-in-the-web-console.png" alt="Listing de commandes Roboconf depuis la console web" class="gs" />

... mais aussi être utilisée avec l'autonomique.

<img src="/resources/img/autonomic-diagram.png" alt="Rappel sur le fonctionnement de l'autonomique" class="gs" />
<br />


## Nouveau DSL pour l'autonomique

Les règles de fonctionnement de l'autonomique utilisent une nouvelle syntaxe.  
Celle-ci est un sous-ensemble très restreint de la syntaxe de [Drools](http://www.drools.org/).
L'ancienne syntaxe n'est plus supportée.

<pre><code class="language-roboconf-rules">rule "scale"
	when
		cpuIsTooHigh
	then
		replicateMachine
end
</code></pre>
<br />


## Blocs de stockage avec Openstack et AWS

De nouvelles options ont été ajoutées dans les extensions Roboconf pour Openstack et
Amazon Web Services. La plupart d'entre elles concernent la création, la réutilisation et l'attachement
de blocs de stockage avec des machines virtuelles.

<img src="/resources/img/aws.png" alt="Logo d'AWS" class="gs" /><br />
<img src="/resources/img/openstack.jpg" alt="Logo d'Openstack" class="gs" />
<br />


## Déploiements multi-IaaS de conteneurs Docker

Nous avons ajouté de nouvelles variables dans l'extension **script** et dans le DSL du graphe.  
Cela permet de gérer la répartion de conteneurs Docker sur plusieurs hôtes et infrastructures de cloud.
Cela permet notamment de gérer les conflits de ports et la résolution d'information à l'exécution.

<img src="/resources/img/docker-containers-managed-by-agents.png" alt="Conteneurs Docker gérés par des agents Roboconf" class="gs" />
<br />


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux entrées sur Github pour plus de détails.

* [Plate-forme](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.6)
* [Administration Web](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.6)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.6)
