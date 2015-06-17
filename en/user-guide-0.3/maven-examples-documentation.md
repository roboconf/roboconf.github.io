---
title: "Maven Examples for the &laquo; documentation &raquo; goal"
layout: page
cat: "ug-0-3"
id: "maven-examples-documentation"
menus: [ "users", "user-guide", "0.3" ]
---

This page shows some examples about how to configure documentation generation with the Roboconf
Maven plug-in. In the next samples, we did not specify the **version** and **extensions** attributes
in the Maven **plugin** declarations.


The following sample will generate HTML documentation with the system's default locale, provided that
it is supported. If it is not, English will be used.

```xml
<build>
	<plugins>
		<plugin>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-maven-plugin</artifactId>
			<configuration>
				<renderers>
					<renderer>html</renderer>
				</renderers>
			</configuration>
		</plugin>
	</plugins>
</build>
```

Same thing but this time with French output.  
Translations for this language have been provided.

```xml
<build>
	<plugins>
		<plugin>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-maven-plugin</artifactId>
			<configuration>
				<renderers>
					<renderer>html</renderer>
				</renderers>
				<locales>
					<locale>fr_FR</locale>
				</locales>
			</configuration>
		</plugin>
	</plugins>
</build>
```

Next example, we generate HTML and Markdown files, in both French and English.  
It means we will have 4 output: HTML in French, HTML in English, Markdown in
French and Markdown in English.

```xml
<build>
	<plugins>
		<plugin>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-maven-plugin</artifactId>
			<configuration>
				<renderers>
					<renderer>html</renderer>
					<renderer>markdown</renderer>
				</renderers>
				<locales>
					<locale>fr_FR</locale>
					<locale>en_US</locale>
				</locales>
			</configuration>
		</plugin>
	</plugins>
</build>
```

The following sample shows how to customize the generated images.  
It is configured to generate exploded HTML with a custom CSS file and the system's locale.

```xml
<build>
	<plugins>
		<plugin>
			<groupId>net.roboconf</groupId>
			<artifactId>roboconf-maven-plugin</artifactId>
			<configuration>
				<renderers>
					<renderer>html</renderer>
				</renderers>
				<options>
					<html.exploded>true</html.exploded>
					<img.background.color>#efefef</img.background.color>
					<img.highlight.bg.color>#b5e145</img.highlight.bg.color>
					<html.css.file>${basedir}/src/build/custom.css</html.css.file>
				</options>
			</configuration>
		</plugin>
	</plugins>
</build>
```
