---
title: "How to write Reusable Recipes?"
layout: page
cat: "ug-0-7"
id: "how-to-write-reusable-recipes"
menus: [ "users", "user-guide", "0.7" ]
---

Here are some good practices to write reusable recipes.

## 1. Be as Minimal as Possible

To maximize reusability, make your recipe as minimal as possible.  
The functional scope should be clearly defined. And it should have the fewest dependencies.

## 2. Name it correctly

Try to follow this convention.

```
installer-software-version
```

As an example, **puppet-apache-mod-jk-latest** indicates the recipe is based on **Puppet**
and that it manages the **last version** of Apache with mod_jk.

## 3. Coherence

Use the same name for the Maven artifact ID, the module name and the Git repository (if you use Git).

## 4. Do not add a Descriptor

Unlike complete applications, recipes do not need an application descriptor.  
This is always true, unless your recipe contains more than one graph files right under the **graph** directory.

## 5. Exported Variables must be used in Recipes

If a component exports a variable, then it should be used in its recipe.  
Indeed, exported variables can be overridden by instances and sub-components. If it is overridden,
then the recipe should use the value set by the user. Otherwise, inconsistency may occur.

As an example, if you have a component called **Apache** and that it exports a **port** variable,
then the recipe should update the Apache configuration if a user chooses another port than the default one.
