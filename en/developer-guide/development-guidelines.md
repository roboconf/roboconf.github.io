---
title: "Development Guidelines"
layout: page
id: "dg.snapshot.development-guidelines"
menus: [ "developers", "developer-guide" ]
---

## CheckStyle

Roboconf's Maven configuration comes with a [CheckStyle](http://checkstyle.sourceforge.net/) configuration.  
Basically, it checks some casual rules about code quality. It also checks the well-formedness of Javadoc comments.

In particular, classes must be documented as follows...

``` java
/**
 * A brief and optional sentence describing the class (and ending with a dot).
 * <p>Additional (and still optional) information wrapped in HTML mark-ups.</p>
 * @author the author's name - company name
 */
```

And methods must be described as follows...

``` java
/**
 * A brief and mandatory sentence describing the method (and ending with a dot).
 * <p>Additional (and optional) information wrapped in HTML mark-ups.</p>
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


## Running Sonar Locally

Roboconf does not have an online Sonar instance.  
However, it is good sometimes to run it locally to get feedback and warnings about your code.
Sonar brings information some other tool, like FindBugs and CheckStyle, do not have.

1. First, make sure you have [Sonar](http://www.sonarqube.org/downloads/) installed on your machine.  
No need to install a database. You can use an in-memory database, such as H2.
2. Start Sonar.  
3. Then, go to Roboconf's directory and execute the following commands.

<!-- -->

	mvn clean install
	mvn sonar:sonar

See [Sonar's web site](http://docs.codehaus.org/display/SONAR/Analyzing+with+Maven) for more information.  
You can now check out results on **http://localhost:9000** 
