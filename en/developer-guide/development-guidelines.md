---
title: "Development Guidelines"
layout: page
cat: "dg-snapshot"
id: "development-guidelines"
menus: [ "developers", "developer-guide" ]
---

## Use Maven

There is no constraint over which development environment people use.  
However, the build tool is Maven (3.x). So, use it.

And before every commit or pull request, run...

```tcl
mvn clean install
```


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


## CheckStyle

Roboconf's Maven configuration comes with a [CheckStyle](http://checkstyle.sourceforge.net/) configuration.  
Basically, it checks some casual rules about code quality. It also checks the well-formedness of Javadoc comments.

In particular, classes must be documented as follows...

```java
/**
 * A brief and optional sentence describing the class (and ending with a dot).
 * <p>Additional (and still optional) information wrapped in HTML mark-ups.</p>
 *
 * @author the author's name - company name
 */
```

And methods must be described as follows...

```java
/**
 * A brief and mandatory sentence describing the method (and ending with a dot).
 * <p>Additional (and optional) information wrapped in HTML mark-ups.</p>
 *
 * @param param1 an optional description
 * @param param2 an optional description
 * @return an optional description of the result 
 */
```

CheckStyle is also in charge of checking license headers in Java and XML files.  
They must contain the headers for the Apache license. The copyright years are also checked.


## FindBugs

There is no default configuration for [FindBugs](http://findbugs.sourceforge.net/) in Roboconf's **pom.xml**.  
However, it is a good practice for developers to run this tool locally from time to time.

Using it with your IDE (such as Eclipse) makes it quite easy to use.


## Check Code Coverage

Even if it is not dramatic, keeping a high code-coverage is useful.  
This indicator determines whether your unit tests check all the possible execution branches.

You can verify it in a given Maven module by typing in...

```tcl
mvn clean cobertura:cobertura
```

Then, open the **target/site/cobertura/index.html** file in your web browser.


## Rely on Utility Methods

**roboconf-core** contains several utility methods.  
Take a look at the **utils** package and try to reuse these methods.
This will prevent redundant code.


## Running Sonar Locally

Roboconf does not have an online Sonar instance.  
However, it is good sometimes to run it locally to get feedback and warnings about your code.
Sonar brings information some other tools, like FindBugs and CheckStyle, do not have.

1. First, make sure you have [Sonar](http://www.sonarqube.org/downloads/) installed on your machine.  
No need to install a database. You can use an in-memory database, such as H2.
2. Start Sonar.  
3. Go to Roboconf's directory and execute the following commands.

```tcl
mvn clean install
mvn sonar:sonar
```

See [Sonar's web site](http://mojo.codehaus.org/sonar-maven-plugin/) for more information.  
You can now check out results on **http://localhost:9000** 
