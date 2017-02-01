---
title: "Nouveautés Principales"
layout: page
cat: "main"
id: "new-and-noteworthy-0.8"
menus: [ "users", "download" ]
---

Cette page liste les nouvelles fonctionnalités et améliorations apportées à Roboconf 0.7.

<!-- FIXME: all the links should point to 0.8. --> 


## Securité

Plusieurs travaux ont été menés concernant la sécurité.

* Activer ou désactiver le support des « [CORS](../user-guide/security-and-cors.html) » pour les clients REST.
* Pouvoir spécifier [l'interface réseau](../user-guide/security-and-agents.html) utilisée par les agents Roboconf.
* Authentifier les utilisateurs en ligne de commande depuis diverses soruces
([fichiers de propriétés](../../en/user-guide/security-and-authentication-with-properties-files.html),
[annuaire LDAP](../../en/user-guide/security-and-authentication-with-a-ldap-server.html),
[base de données](../../en/user-guide/security-and-authentication-with-a-database.html)).
* [Configurer la console web en HTTPS](../../en/user-guide/security-and-https-console.html).

<img src="/resources/img/nn-0.8-web-console-in-https.png" alt="Console web en HTTPS" class="gs" />

D'autres chantiers sont prévus sur la sécurité pour la prochaine version.
<br />
<div><hr class="darker" /></div>


## Nouvelles Topologies de Déploiement

De nouvelles topologies de déploiement sont désormais possibles avec Roboconf.  
La notion de [domaines Roboconf](../../en/user-guide/roboconf-domains.html) en constitue l'un des ressorts.

<img src="/resources/img/nn-0.8-fr-roboconf-domains--same-messaging.png" alt="Installation avec plusieurs DMs" class="gs" />

Vous pouvez vous reporter sur cette [page](../../en/user-guide/roboconf-domains.html) pour de plus amples détails.
<br />
<div><hr class="darker" /></div>


## Internationalisation de la Console d'Administration

La console web d'administration peut désormais être affichée en plusieurs langues.

<img src="/resources/img/nn-0.8-i18n.png" alt="Internationalisation de la console web" class="gs" />

La langue utilisée peut être définie par les administrateurs dans [les préférences du DM](../../en/user-guide/roboconf-preferences.html).

```properties
# The user language (e.g. for the web console).
#
# Possible values:
#  - EN (for English)
#  - FR (for French)
#
user.language = FR
```

Pour le moment, seuls le français et l'anglais sont disponibles.
<div><hr class="darker" /></div>


## Personnalisation de la Console d'Administration

Il est maintenant possible d'utiliser ses [propres feuilles de style et bannière](../../en/user-guide-snapshot/customizing-the-web-administration-look-n-feel.html)
dans la console web d'administration.

<img src="/resources/img/nn-0.8-customizing-the-web-administration.png" alt="Console web avec feuille de style et bannière personnalisées" class="gs" />
<div><hr class="darker" /></div>


## Documentation de notre REST API

Le site web de Roboconf héberge désormais une page avec [Swagger UI](../developer-guide/rest-api.html)
qui documente notre API REST, ainsi que notre web socket.

<img src="/resources/img/nn-0.8-swagger-ui-for-roboconf.png" alt="Swagger UI" class="gs" />
<div><hr class="darker" /></div>


## Artefacts Maven pour les Cibles de Déploiement

Les cibles de déploiement pouvaient jusqu'à présent être créées de 2 manières :
en passant par la console web, ou bien en les déployant au sein d'un modèle d'application.
Elles peuvent dorénavant être empaquetées dans leurs 
[propres modules Maven](../../en//user-guide-snapshot/maven-plugin-for-targets.html),
et installées de manière indépendante via la console web.

<img src="/resources/img/nn-0.8-targets-upload.png" alt="Cibles de déploiement" class="gs" />
<div><hr class="darker" /></div>


## Associations Affinées des Cibles de Déploiement

Les cibles de déploiement peuvent être associées avec une application (choix par défaut),
avec des instances spécifiques....

<img src="/resources/img/nn-0.8-fine-grained-associations-for-targets-2.png" alt="Association avec des instances" class="gs" />

...  et désormais avec des composants.  
Roboconf propose ainsi une approche plus flexible pour ces associations.

<img src="/resources/img/nn-0.8-fine-grained-associations-for-targets-1.png" alt="Association avec des composants" class="gs" />
<div><hr class="darker" /></div>


## Supervision avec Apache Decanter et ELK

Nous avons rédigé un [tutoriel](../guide-utilisateur/tutoriel-superviser-roboconf-avec-apache-decanter.html)
qui illustre la supervision de Roboconf avec [Apache Decanter](https://karaf.apache.org/manual/decanter/latest-1/),
[Elastic Search](https://www.elastic.co) et [Kibana](https://www.elastic.co/products/kibana).
Pour le moment, nous ne monitorons que le système hôte et des métriques de l'agent.
Le monitoring des applications viendra plus tard.

<img src="/resources/img/nn-0.8-kibana-dashboard-example.png" alt="Exemple de tableau de bord Kibana pour Roboconf" class="gs" />
<div><hr class="darker" /></div>


## Configuration Avancée des Machines

Il est maintenant possible d'enrichir les cibles de déploiements de scripts qui
peaufineront la configuration des machines.

* Du côté des agents, un tel script peut être utilisé pour partitionner et monter des partitions.
* Du côté du DM, de tels scripts peuvent servir à compléter la configuration d'une machine
(exemple : passage de paramètres à l'agent, voire même envoi et installation d'un agent).

<img src="/resources/img/nn-0.8-advanced-machine-configurations.png" alt="Configuration avancée d'une machine" class="gs" />
<div><hr class="darker" /></div>


## Relations 1-\* pour les Liens Inter-Applications

Les versions précédentes de Roboconf limitaient ces relations (1-1).  
On peut désormais lier plusieurs applications ensemble (relations 1-\*).

<img src="/resources/img/nn-0.8-multi-bindings.png" alt="Relations 1-n pour les liens inter-applications" class="gs" />
<div><hr class="darker" /></div>


## Stockage Objet pour Openstack

Roboconf peut maintenant créer des domaines dans le composant Swift d'Openstack.

<img src="/resources/img/openstack.jpg" alt="Stockage objet pour Openstack" class="gs" />
<div><hr class="darker" /></div>


## Support d'OCCI Infrastructure

Roboconf est maintenant capable de piloter des infrastructures cloud au travers de la spécification
[OCCI Infrastructure](http://occi-wg.org/about/specification/).

<img src="/resources/img/nn-0.8-occi-support.png" alt="Support d'OCCI Infrastructure" class="gs" />
<div><hr class="darker" /></div>


## Divers

D'autres améliorations, de moindre ampleur, ont aussi été apportées dans cette nouvelle mouture de Roboconf.  
Un certain nombre de bugs ont également été corrigés. Veuillez vous référer aux entrées sur Github pour plus de détails.

* [Plate-forme](https://github.com/roboconf/roboconf-platform/issues?utf8=%E2%9C%93&q=milestone%3A0.8)
* [Administration Web](https://github.com/roboconf/roboconf-web-administration/issues?utf8=%E2%9C%93&q=milestone%3A0.8)
* [Eclipse](https://github.com/roboconf/roboconf-eclipse/issues?q=milestone%3A0.8)
