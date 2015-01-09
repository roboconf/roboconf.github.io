---
title: "Tutoriel - Premier Déploiement dans le Cloud - 4/4"
layout: page
id: "ug.snapshot.tutorial-first-deployment-in-the-cloud-4"
menus: [ "users", "user-guide" ]
---

## Pour Aller plus Loin

Cette page regroupe des idées pour aller plus loin dans l'utilisation de Roboconf.

<br />

**Nouvelles Briques**

1. Rajoutez de nouvelles briques logicielles dans votre graphe.  
2. Ecrivez les recettes adéquates, avec Bash ou Puppet, en fonction de ce qui vous arrange.

<br />

**Déploiement Hybride**

1. Créez différents types de VM, chacune associée à une infrastructure différente.
2. Assurez-vous des briques logicielles que vous pouvez déployer sur ces différentes VM.
3. Faîtes un déploiement où une partie des briques tourne sur une cible 1 et une autre partie sur une cible 2.

Exemple : déployer une partie de votre application sur AWS et une autre sur Openstack.

<br />

**Sécurité**

1. Retravaillez les groupes de sécurité de votre infrastructure pour limiter le nombre de ports accessibles.  
2. Améliorez votre image virtuelle avec l'agent en configurant **iptables** pour que seuls les ports nécessaires soient ouverts (SSH, RabbitMQ...).
3. Retravaillez les scripts Bash ou Puppet de votre projet pour ouvrir ou fermer des ports via **iptables** lorsqu'une application démarre ou s'arrête.
