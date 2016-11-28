---
title: "Syntax Highlighting"
layout: page
cat: "dg-snapshot"
id: "syntax-highlighting"
menus: [ "developers", "developer-guide", "Snapshot" ]
---

Several moves have been made to promote Roboconf's DSL and provide syntax highlighting.  
This page gives some tips to update them if necessary.


## On the web site

Syntax highlighting on the web site is handled by Javascript.  
Efforts were pushed to contribute to Pygments, with few success unfortunately. In fact,
it seems hardly possible to push a custom lexer on Github Pages (the solution that hosts Roboconf's web site).
This is mainly due to Github's security policies.

This is why we finally chose a Javascript solution.  
The script that highlights code on the web site is available at [the web site's root](/resources/js/roboconf.js).

To use it, just wrap your Roboconf code snippet with HTML mark-ups.

```html
<pre><code class="language-roboconf">
	Your Roboconf snippet
</code></pre>
```


## Highlight.js

Web site: [http://highlightjs.org](http://highlightjs.org)  
**Highlight.js** aims at using syntax highlighting in HTML pages.  
It is used, as an example, in the [reusable slides](../reusable-slides.html) that we provide.

If for some reason, the Roboconf DSL is upgraded, or if there is an enhancement to bring to Roboconf's support
in **highlight.js**, here are some tips to update it.

* Fork the highlight.js git repository.
* Check **src/languages/roboconf.js**. It contains the parsing rules for Roboconf.
* If necessary, update the **test/detect/roboconf/default.txt** file.  
Propagate these modifications in the **src/test.html** file.
* To preview your changes, run the following commands.

```properties
# Get JS dependencies (to perform only once)
npm install

# Build support for all the languages, Roboconf included
nodejs tools/build.js -t node

# Prepare an overview for your web browser
nodejs tools/build.js -t browser

# Open the src/test.html file in your web browser.
# Find the Roboconf snippet and make sure the rendering is correct.

# Run the test to make sure Roboconf DSL is recognized correctly.
nodejs tools/build.js -t node
npm test
```

Once you have performed your modifications, create a pull request on the project.


## Atom.io

Syntax highlighting was added for Roboconf's DSL in [Atom.io](https://atom.io), Github's editor.  
To update it, follow the developer guide available on [Atom.io's web site](https://atom.io/docs/v0.176.0/creating-a-package).
  
Globally...

1. Make the required changes and upgrades.
2. Update and run the tests (coffee scripts).
3. Commit and push the version.
4. Run **apm publish minor** and follow the instructions in the console to publish a new version of the package.

