---
title: "Customizing the Web Console's Look and Feel"
layout: page
cat: "ug-0-8"
id: "customizing-the-web-administration-look-n-feel"
menus: [ "users", "user-guide", "0.8" ]
---

It is possible to customize the look and feel of the web administration console.  
This web console is served by the DM. Two elements are available:

1. Override the CSS file.  
This CSS style sheet should be generated from our LESS file.

2. Provide a new banner image.


## How to set these elements?

One you have these files, copy them under Karaf's **etc** directory.  
As a reminder, if you installed the DM with our RPM or Debian packages, this directory is located at
**/etc/roboconf-dm**.

Be careful, these files must have a specific name.

* The CSS file must be named **roboconf.custom.css**.
* The banner image must be named **roboconf.custom.jpg**.

> The banner image should have the same proportions than the default one.


## How to use our LESS file?

1. Get our [LESS file](https://raw.githubusercontent.com/roboconf/roboconf-web-administration/master/src/roboconf.less) from the web administration's Git repository.
2. Update the LESS variables at the beginning of the file.  
Customization is only about colors for the moment.

3. Generate a new CSS file with LESS.  

```properties
# Install LESS with NPM
sudo npm install -g less

# Generate the CSS file
lessc roboconf.less roboconf.custom.css
```

You can find other tools and installation modes on [LESS's web site](http://lesscss.org).

> Editing other elements of the LESS style sheet is feasible but at your own risks.
