---
title: "Web Site Organization"
layout: page
cat: "dg-snapshot"
id: "web-site-organization"
menus: [ "developers", "developer-guide" ]
---

The web site is generated from a Git repository.
Every time one pushes modifications on the [Git repository](https://github.com/roboconf/roboconf.github.io),
the web site is built by [Jekyll](http://jekyllrb.com/) and published on
[GitHub pages](https://help.github.com/pages/).

Jekyll generates static HTML files.
As a reminder, to build the web site locally, you must:

* Clone the web site repository from GitHub.
* Make sure you have installed Ruby and Jekyll.
* Go into the project's directory.
* Open a terminal and type in one of the following commands.

```properties
# Simply build the web site.
# The generated files will be located under _site
jekyll build

# Continuously build the web site.
# The web site can be visited at http://localhost:4000
jekyll serve -w
```

The key file in the **roboconf.github.io** repository is the **_config.yml** file.
It is used by Jekyll to configure the generation. It also contains information for i18n.

## General Organization

The web site is designed to be completely translated.
This includes both page contents and page URLs. Therefore, it is entirely
optimized for SEO (Search Engine Optimization).

The structure of the sources is the following :

* **includes/** contains the menus.
There is one menu per category. Each one supports i18n.

* **layouts/** contains the page layouts.
There is one layout for the welcome page and another one for all the other pages.

* **downloads/** contains resources people can download from the web site.

* **resources/** contains web resources (scripts, style sheets, images...).

* **slides/** contains documents related to presentations.

* **en/** contains the English version of the web site. **fr/** contains the French one.
This structure allows to create a different content for every language.


## Details

For a given language, the web site is organized as follows:

* The associated directory contains the main pages.
These pages give general information. Their ID starts with *main.*, except for **home**.

* The associated directory contains a **user-guide** directory.
Its name depends on the language. This sub-directory contains the pages related to the user guide.
Their ID starts with *ug.&lt;version&gt;.*. User guides have a version.

* The associated directory contains a **developer-guide** directory.
Its name depends on the language. This sub-directory contains the pages related to the developer guide.
Their ID starts with *dg.&lt;version&gt;.*. Developer guides have a version.


## i18n

Internationalization is handled through two means:

Menus names are translated in the **_config.yml** file.

	locales:
	  en:
	    icon: gb.png
	    language: English
	    menu-lang: Language
	    ...

> Be careful to YAML.
> A sub-element is indented by 2 spaces. No tabulation.

URLs are translated in the **_config.yml** file.

	main.support:
	  en: support
	  fr: support

The *en* and *fr* suffix point to a Markdown file (*.md).
The translated page is contained into this file.

## Pages

Pages must respect the following guidelines.

* Pages are defined in Markdown (*.md) files.
* Markdown files have a name in lower case.
* Words are separated by a *-* character in page names. Example: user-guide.md
* Page contents are written in [Markdown](http://daringfireball.net/projects/markdown/syntax) but may contain in-line HTML.
* Page contents begin with meta-data.

<!-- -->

	---
	title: "The Management REST API"
	layout: page
cat: "dg-snapshot"
	id: "rest-api-management"
	menus: [ "developers", "developer-guide" ]
	---

<!-- -->

* **title** is the page title (to be displayed in the HTML tag &laquo; title &raquo;).
* **layout** is always **page**.
* **id** is the page ID. It is used by *_config.yml* to associated a page with its different translations.
* **menus** is the menus this pages fits into. It is made up of two menus.
