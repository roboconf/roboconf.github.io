---
title: "Documenting a New Version"
layout: page
cat: "dg-snapshot"
id: "documenting-a-new-version"
menus: [ "developers", "developer-guide" ]
---

As explained [here](web-site-organization.html), the user and developer guides have a version.
This version is used in the page IDs.

## Automatically

The [&laquo; release scripts &raquo;](https://github.com/roboconf/roboconf-release-scripts) project contains a **website.sh** file.
Provided you updated the **conf.sh** file, you can use it to perform most of the update task automatically.

For the moment, it will create a new user guide version and update the indexes.
You still need to verify the result and clean the user guides. In particular, released user guides do not contain
links toward older user guides. And the newly created user guide needs to be added to the main one.

This script **does not** support the release of the developer guide (since we will not release it as long as we will
remain in version 0.x).
Also, git commit and push have to be done manually, after the review.


## By Hand

This page explains how to document a new version of these guides.
In the next lines, **directory** is either **user-guide** or **developer-guide**. We assume
the version to create or release is 1.0.

> Most of the string replacements that are described below can be
> achieved in few seconds with an IDE (e.g. with Eclipse).

1. *directory* match the snapshot version. Copy it as *directory-1.0*.

2. In this directory, replace all the **cat** property in the **markdown** files.
*dg.snapshot* must become *dg.1.0.*
*ug.snapshot* must become *ug.1.0.*

3. Still in the markdown files, update the **menus** field.
Add the version as a third property.
**Example:** *menus: menus: [ "users", "user-guide" ]* **becomes** *menus: [ "users", "user-guide", "1.0" ]*

4. Copy the data files.
**_data/ug-snapshot.yml** becomes **_data/ug-1-0.yml**.
**_data/dg-snapshot.yml** becomes **_data/dg-1-0.yml**.
Notice these file names do not contain dots!

5. In the newly created **yml** files, update the relative path of the copied IDs.
As an example, the **en** entry **user-guide/my-page-id** will become **user-guide-1.0/my-page-id**.

6. Add a link to the new version in the main user or developer guide.

7. Remove the **Released Versions** section from the newly released user guide.
We do not want to see a link to the user guide 0.1 in the user guide 0.2. Only the main
user guide should list released versions.

8. Translate the guides for other languages.

> The best practice is to only document the snapshot version in English.
> When it is released, as explained above, the guides should be translated
> for other languages. Therefore, French, Spanish, (...) versions should be written
> only once the guides have been released in English.
