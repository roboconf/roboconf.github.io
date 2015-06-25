---
title: "Qu'est-ce que Roboconf ?"
layout: page
cat: "main"
id: "what-is-roboconf"
menus: [ "project", "what-is-roboconf" ]
---

Roboconf est une plateforme pour déployer des applications réparties.  
C'est une solution adaptée pour les déploiements dans le *cloud*, mais pas seulement. Roboconf permet
de décrire une application répartie et se charge ensuite de la déployer automatiquement, de manière intégrale
ou en partie, selon le choix de l'administrateur. Roboconf est conçu pour supporter nativement les passages à l'échelle
(qu'ils soient ascendants ou descendants). Son point fort est donc la reconfiguration dynamique, ce qui offre
une grande flexibilité et autorise des déploiements élastiques. 

Roboconf prend en entrée la description d'une application en termes de "compoosants" et "d'instances".  
A partir de ce modèle, la plateforme prend en charge le lancement de machines virtuelles (VMs), le déploiement
de composants logiciels sur ces mêmes VMs, leur configuration et leur démarrage.

Roboconf gère le cycle de vie des applications. Cela passe par la reconfiguration à chaud (pour s'adapter aux phases
d'élasticité) ainsi que la consistence globale (s'assurer que l'état de l'aplication répartie reste cohérent, même
quand un de ses constituants vient à s'arrêter, que ce soit accidentel ou non). Ces propriétés reposent sur l'utilisation
d'un serveur de messagerie (actuellement, [Rabbit MQ](https://www.rabbitmq.com)). Les constituants de l'application répartie
savent ce qu'ils exposent et ce dont ils dépendent vis-à-vis des autres parties. Globalement, l'idée est de retranscrire à
un niveau applicatif, les concepts que l'on retrouve dans des modèles à composants comme OSGi, le tout de manière non-invasive.
Cela permet notamment d'utiliser Roboconf sur des systèmes pré-existants.

Ainsi, un serveur d'application a connaissance
des bases de données. Cette information est relayée via la messagerie. Roboconf se charge de prendre les décisions adéquates
en fonction des messages qui transitent. Ces actions, effectuées par Roboconf, sont en réalité exécutées au travers d'extensions
(ou de plug-ins). Il y a par exemple un plug-in Bash, ainsi qu'un plug-in [Puppet](http://puppetlabs.com). 

Roboconf est elle-même une application répartie, basée sur AMQP et REST / JSon. Elle supporte plusieurs IaaS (dont
OpenStack, Amazon Web Services, Microsoft Azure, VMWare, ainsi qu'un déploiement "local" pour des hôtes pré-existants, voire
même pour de l'embarqué).


## Historique

Roboconf a été créé pour être le socle d'[Open PaaS](http://open-paas.org/).  
Open PaaS est un réseau social d'entreprise, c'est à dire une plate-forme dédiée à la collaboration au sein
d'organisations (messagerie, gestion de groupes et de projets, vidéo conférence...). Le projet est mené par 
[Linagora](http://linagora.com), qui développe également Roboconf en partenariat avec le 
[Laboratoire Informatique de Grenoble](https://www.liglab.fr/), rattaché à l'[Université Joseph Fourier](https://www.ujf-grenoble.fr/).

Les <strong>impératifs techniques</strong> pour le socle d'Open PaaS étaient clairs.
	
* Supporter des déploiements dans le cloud (clouds publics, privés et hybrides)
* Garantir aux développeurs des parties hautes qu'ils pourraient choisir les solutions qu'ils souhaitent (bases de données, serveurs, langages de programmation...)
* Fournir des mécanismes d'élasticité (adaptation automatique à la charge...)
* Être totalement open-source (comme toutes les solutions utilisées et/ou développées par Linagora).

La plus-value de la plate-forme réside clairement dans les applications au-dessus, et non dans le socle.  
A l'époque (fin 2012), certaines solutions *cloud* commençaient à émerger, mais aucune ne satisfaisait tous les critères décris ci-dessus.
Des contacts établis entre [Linagora](http://linagora.com) et le [Laboratoire Informatique de Grenoble](https://www.liglab.fr/) aboutirent à un partenariat industriel
avec l'[Université Joseph Fourier](https://www.ujf-grenoble.fr/) et à la création d'une équipe commune pour protyper une telle solution. Ainsi est né Roboconf...
 

## Cas d'Usage

Les cas d'usage généraux sont listés [ici](/slides/general/cas-d-usage-de-roboconf.html).  
La liste suivante fait référence à des exemples, des démonstrations ou de vrais besoins.

* **LAMP Patrimonial** : un cas classique, avec un équilibreur de charge basé sur un serveur Apache, une application web
déployée sur Tomcat, et une base de données MySQL. L'intérêt de ce cas réside dans la facilité avec laquelle on peut rajouter
ou enlever des instance de Tomcat. La connexion avec MySQL est configurée par Roboconf, tandis que l'équilibeur de charge
prend en compte l'arrivée ou la suppression des Tomcat à chaud.

* **M2M / IoT** : il s'agît ici de déployer et d'inter-connecter de l'embarqué et des éléments déployées dans un *cloud*.  
Le cas d'usage nominal met en oeuvre des capteurs domestiques qui envoient, de par leur nombre, de gros volumes de données
à des outils d'analyse déployés dans le nuage. On parle ici d'outils comme [Hadoop](http://hadoop.apache.org/) ou 
[Storm](http://storm.incubator.apache.org/) pour du calcul en temps réel. Que des capteurs apparaissent ou disparaissent,
Roboconf prend en charge la reconfiguration de l'ensmeble. Pour rappel, M2M signifie *machine to machine* et IoT *Internet of Things*.

* **Open PaaS** : [Open PaaS](http://open-paas.org) est un Réseau Social d'Entreprise (RSE) open-source 
et adapté à l'ère du *cloud*.  
Présenté autrement, il s'agît d'une plateforme web pour faciliter et améliorer la collaboration au sein d'entreprises, et plus généralement,
au sein d'organisations. Open PaaS s'appuie sur de nombreuses technologies, telles que [NodeJS](http://nodejs.org/), [NPM](http://www.npmjs.org/),
 [Redis](http://redis.io/), [MongoDB](http://www.mongodb.org/), LDAP, etc.
