---
title: "Development Guidelines for Javascript"
layout: page
cat: "dg-snapshot"
id: "javascript-development-guidelines"
menus: [ "developers", "developer-guide", "Snapshot" ]
---

## Use NPM and Gulp

There is no constraint over which development environment people use.  
However, the build tools are NPM and Gulp. So, use them.

Before every commit or pull request, run...

```tcl
gulp dist
```


## Follow Google's linter

This linter is configured by default in our build tools.  
It verifies the code is formatted correctly. Unlike what we do with Java,
code formatting is very strict in our Javascript projects.


## Git Commit Messages

This section is widely inspired (and partially copied) from [Atom.io's web site](https://atom.io/docs/v0.176.0/contributing).

* Use the present tense ("Add feature" not "Added feature").
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
* Limit the first line to 72 characters or less.
* Reference issues and pull requests liberally (with #*&lt;issue-number&gt;*).
* Optionally, consider starting the commit message with an applicable [emoji](http://www.emoji-cheat-sheet.com).

    * :art: <code>:<span>art</span>:</code> when improving the format or structure of the code
    * :racehorse: <code>:<span>racehorse</span>:</code> when improving performance
    * :bomb: <code>:<span>bomb</span>:</code> when fixing a bug
    * :green_heart: <code>:<span>green_hart</span>:</code> when fixing the CI build
    * :heavy_check_mark: <code>:<span>heavy_check_mark</span>:</code> when adding tests
    * :lock: <code>:<span>lock</span>:</code> when dealing with security
    * :arrow_up: <code>:<span>arrow_up</span>:</code> when upgrading dependencies
    * :arrow_down: <code>:<span>arrow_down</span>:</code> when downgrading dependencies


## Squash your Commits

Sometimes, and for whatever reason, it takes several commits to solve an issue.  
To improve the readability and the history browsing, it is better to squash your commits when you can.

Squashing means merging contiguous commits into a single one.  
Squashing should be ONLY be done on forks. They are acceptable on pull requests provided they have not yet been
accepted (`git push -force` will be necessary then).

To squash your commits, we suggest you follow [this very good tutorial](https://ariejan.net/2011/07/05/git-squash-your-latests-commits-into-one/) from the web.
