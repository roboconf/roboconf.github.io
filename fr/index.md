---
title: "Roboconf"
layout: welcome
id: "home"
description: Roboconf est une solution pour déployer des applications distribuées dans le cloud ou sur un réseau d'objets connectés...
---

{% capture locale %}{{ page.url | truncate: 3, "" | replace: "/", "" }}{% endcapture %}
{% if locale == "" or site.locales[locale] == null %}{% assign locale = site.default-locale %}{% endif %}

<div id="welcome-dl">
	<div class="button">
		<p class="info-main">
			<span class="octicon octicon-arrow-down"></span>
			<a href="telecharger.html">Télécharger</a>
		</p>
		<p class="info-details">Accès aux Téléchargements</p>
	</div>

	<br />
	<div class="button">
		<p class="info-main">
			<span class="octicon octicon-mark-github"></span>
			<a href="https://github.com/roboconf/roboconf-platform">Contribuer sur Github</a>
		</p>
		<p class="info-details">Accès aux Sources du Projet</p>
	</div>
</div>

<div id="last-update" class="button">
	Dernière mise à jour le {{ site.time | date: '%d / %m / %Y' }}
</div>

<div id="welcome-logo">
	<p>
		<img src="/resources/img/roboconf.jpg" alt="Roboconf" />
	</p>
	<p class="welcome-desc">
		Pour des Applications Élastiques<span id="slogan-wrapper"><span id="slogan-sep">{{ site.locales[locale].sep }}</span>
			<span id="slogan-ext" data-r-values="[
				&#34;Décrivez&#34;,
				&#34;Déployez&#34;,
				&#34;Passez à l'Échelle&#34;,
				&#34;Réparez&#34;,
				&#34;Migrez&#34;,
				&#34;Dans le Cloud&#34;,
				&#34;Sur Sites&#34;,
				&#34;Avec des Paquets&#34;,
				&#34;Avec des Conteneurs&#34;]">
			</span>
		</span>
	</p>
</div>
