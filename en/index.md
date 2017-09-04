---
title: "Roboconf"
layout: welcome
id: "home"
description: Roboconf is a solution to deploy distributed applications in cloud environments or connected objects...
---

{% capture locale %}{{ page.url | truncate: 3, "" | replace: "/", "" }}{% endcapture %}
{% if locale == "" or site.locales[locale] == null %}{% assign locale = site.default-locale %}{% endif %}

<div id="welcome-dl">
	<div class="button">
		<p class="info-main">
			<span class="octicon octicon-arrow-down"></span>
			<a href="download.html">Download Roboconf</a>
		</p>
		<p class="info-details">Access the Download Page</p>
	</div>

	<br />
	<div class="button">
		<p class="info-main">
			<span class="octicon octicon-mark-github"></span>
			<a href="https://github.com/roboconf/roboconf-platform">Fork it on Github!</a>
		</p>
		<p class="info-details">Access the Project Sources</p>
	</div>
</div>

<div id="last-update" class="button">
	Last Updated on {{ site.time | date: '%b %d, %Y' }}
</div>

<div id="welcome-logo">
	<p>
		<img src="/resources/img/roboconf.jpg" alt="Roboconf" />
	</p>
	<p class="welcome-desc">
		A Solution for Elastic Applications<span id="slogan-wrapper"><span id="slogan-sep">{{ site.locales[locale].sep }}</span>
			<span id="slogan-ext" data-r-values="[
				&#34;Describe&#34;,
				&#34;Deploy&#34;,
				&#34;Scale&#34;,
				&#34;Repair&#34;,
				&#34;Migrate&#34;,
				&#34;In Cloud&#34;,
				&#34;On-Premises&#34;,
				&#34;With Packages&#34;,
				&#34;With Containers&#34;]">
			</span>
		</span>
	</p>
</div>
