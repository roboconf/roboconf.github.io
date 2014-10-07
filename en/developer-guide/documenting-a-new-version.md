---
title: "Documenting a New Version"
layout: page
id: "dg.snapshot.documenting-a-new-version"
menus: [ "developers", "developer-guide" ]
---

As explained [here](web-site-organization.html), the user and developer guides have a version.  
This version is used in the page IDs.

This page explains how to document a new version of these guides.  
In the next lines, **directory** is either **user-guide** or **developer-guide**. We assume
the version to create or release is 1.0.

1. *directory* match the snapshot version. Copy it as *directory-1.0*.

2. In this directory, replace all the IDs.  
*dg.snapshot.* must become *dg.1.0.*  
*ug.snapshot.* must become *ug.1.0.*

3. Open **_config.yml**.  
Copy the section that declares the snapshot pages.  
In the new section, update the IDs as explained above.

4. Still in the **_config.yml** file, update the relative path of the copied IDs.  
As an example, the **en** entry **user-guide/my-page-id** will become **user-guide-1.0/my-page-id**.

5. Add a link to the new version in the main user or developer guide.

6. Translate the guides for other languages.

> The best practice is to only document the snapshot version in English.  
> When it is released, as explained above, the guides should be translated
> for other languages. Therefore, French, Spanish, (...) versions should be written
> only once the guides have been released in English.
