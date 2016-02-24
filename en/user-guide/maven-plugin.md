---
title: "Roboconf's Maven plug-in"
layout: page
cat: "ug-last"
id: "maven-plugin"
menus: [ "users", "user-guide" ]
---

Roboconf's Maven plug-in allows to automate some tasks related to Roboconf.  
It also allows a seamless integration with build tools, such as [Jenkins](http://jenkins-ci.org) or [Travis](http://travis-ci.org).

Here is a sample **pom.xml** file for a Roboconf project.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
		xmlns="http://maven.apache.org/POM/4.0.0" 
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

	<modelVersion>4.0.0</modelVersion>
	<prerequisites>
		<maven>3.0.3</maven>
	</prerequisites>

	<groupId>net.roboconf</groupId>
	<artifactId>my-project</artifactId>
	<version>1.0-SNAPSHOT</version>
	<name>This is a sample</name>
	<packaging>roboconf-app</packaging>

	<build>
		<plugins>
			<plugin>
				<groupId>net.roboconf</groupId>
				<artifactId>roboconf-maven-plugin</artifactId>
				<version>0.6</version>
				<extensions>true</extensions>
			</plugin>
		</plugins>
	</build>
</project>
```

There are 2 things to notice.

* The **roboconf-app** packaging, which indicates to Maven this is a Roboconf project.
* The **roboconf-maven-plugin** declaration in the **build** section.

The project structure must be the following one.

	- pom.xml
	- src/main/model/
	** descriptor/
	** graph/
	** instances/

Basically, this is the usual Roboconf structure, translated into a Maven-like project.


## Maven archetype

Use the following command to create a new Roboconf project from our Maven archetype.

```tcl
mvn archetype:generate                              \
  -DarchetypeGroupId=net.roboconf                   \
  -DarchetypeArtifactId=roboconf-maven-archetype    \
  -DarchetypeVersion=1.0                            \
  -DgroupId=<my.groupid>                            \
  -DartifactId=<my-artifactId>
```


## Maven Properties

Filtering is enabled in the Roboconf Maven plug-in.  
It means you can inject Maven properties in your resource files.

Example with the **application.properties** file:

```properties
application-name = Tomcat 8 cluster
application-qualifier = ${project.artifactId}-${project.version}

# Etc.
```


## Maven Goals
  
The plug-in has the following goals.

### initialize

This goal configures the project (model directory, build output).  
It has no parameter.

Users are not supposed to invoke this goal manually.  
It is part of the default life cycle for **roboconf-app** projects.


### validate-project

This goal validates the project's structure.  
It has no parameter.

Users are not supposed to invoke this goal manually.  
It is part of the default life cycle for **roboconf-app** projects.


### validate-application

This goal validates the Roboconf application.  
It is part of the default life cycle for **roboconf-app** projects. You can also invoke it manually.

```tcl
mvn roboconf:validate-application
```
  
Its configuration accepts the following parameters.

| Name | Type | Required | Default | Since | Description |
| ---- | ---- | -------- | ------- | ----- | ----------- |
| **recipe** | boolean | no | false | 0.3 | True if the Maven project contains a recipe, false if it contains a complete Roboconf application. |
| **official** | boolean | no | false | 0.3 | True if this is a recipe managed by the Roboconf team. This parameter only makes sense when **recipe** is true. |


### package

This goal packages a Roboconf application as a ZIP file.  
It has no parameter.

It is part of the default life cycle for **roboconf-app** projects. You can also invoke it manually.

```tcl
mvn package
```

... or the verbose way...


```tcl
mvn roboconf:package
```


## documentation

This goal generates documentation from the configuration files.  
Documentation includes text documents and images (as PNG files). It lists all the components
of the application and their relations. Generated documents can be used by people in charge production
environments, as well as for maintenance teams.

This goal must be invoked explicitly.

```tcl
mvn roboconf:documentation
```

It accepts the following parameters.

| Name | Type | Required | Default | Since | Description |
| ---- | ---- | -------- | ------- | ----- | ----------- |
| **renderers** | List&lt;String&gt; | yes | - | 0.3 | A list of renderers to use. Currently available: **html** and **markdown**. Unknown renderers are ignored. |
| **locales** | List&lt;String&gt; | no | The system's locale. | 0.3 | A list of locales for the generated documentation. Currently available: **en_US** and **fr_FR**. |
| **options** | Map&lt;String,String&gt; | no | - | 0.3 | A map associating rendering options and their values. Available options are documented below. |

Available options for the documentation generator.

| Name | Type | Default | Since | Description |
| ---- | ---- | ------- | ----- | ----------- |
| img.background.color | String | #ffffff | 0.3 | The background color for generated images. |
| img.foreground.color | String | #b23e4b | 0.3 | The foreground (font) color for generated images. |
| img.highlight.bg.color | String | #f3df20 | 0.3 | The background color for components to highlight in the generated images. |
| recipe | String | - | 0.3 | Generate documentation for a recipe and not for a complete application. Enabled as soon as it is present (no matter its value). |
| html.exploded | String | - | 0.3 | Option for the HTML renderer. When this option is present (no matter its value), the output HTML is split into several files instead of a single one. |
| html.css.file | String | - | 0.3 | Option for the HTML renderer. It specifies the location of a CSS file to replace the default one. |
| html.css.reference | String | - | 0.3 | Option for the HTML renderer. It specifies the URL of a CSS file to reference in the generated HTML files. |
| html.header.image.file | String | - | 0.3 | Option for the HTML renderer. It specifies the location of an image file to use as the header image. |

You can find examples of configuration [here](maven-examples-documentation.html).

In addition to the default output, users can include additional information in their project.  
The generator will read and include them in the result.

Thus, if you want to add a specific description for a component called **toto**, you can add a **toto.summary.txt** file under **src/main/doc**.
Locales are supported too. Assuming you want to have one version for English and one for French, you will only have to add **toto_en_US.summary.txt**
and **toto_fr_FR.summary.txt** under **src/main/doc**.

**summary.txt** files aim at adding a specific description of a given Roboconf component.
It will be added at the beginning of a component's description. You can also add information at the end of its dedicated section by
using **extra.txt** files. As an example, if you want to add a warning or a caution section, you can add **toto.extra.txt**, **toto_en_US.extra.txt**
or **toto_fr_FR.extra.txt** under **src/main/doc**.

For recipes, information ca be specified for facets.  
To document a facet, create a file called *your-facet-name*.**facet.txt**. As usual, when you want to specify a locale, add it as a suffix
(your-facet-name\_**en_US.facet.txt**).
