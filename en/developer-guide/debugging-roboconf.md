---
title: "Debugging Roboconf"
layout: page
cat: "dg-snapshot"
id: "debugging-roboconf"
menus: [ "developers", "developer-guide" ]
---

Roboconf is still under development.  
Besides, it is a distributed application that aims at deploying distributed applications.
Eventually, communication is asynchronous. Therefore, and despite the presence of logs,
Roboconf is really hard to test and debug.


## Tip: write and use unit tests

First, Roboconf is very modular.  
So, most of the features should be testable in a unit fashion. It implies you should be
able to debug specific parts of Roboconf. Unit tests are co-located with the code they cover, 
in the same Maven module.

> Unit tests can easily be run in any IDE (Eclipse, etc.).  
> They are are run by the default Maven build.


## Tip: write and use integration Tests

The main Roboconf repository has a Maven module dedicated to integration tests.  
They are based on PAX-Exam, that starts a real Roboconf DM (in its Karaf distribution) and
performs various operations and verifies assertions.

> Integration tests can be launched in any IDE (Eclipse, etc.).  
> They are are run by the default Maven build.


## Tip: Maven log level with the platform

By default, the Maven build of the platform only logs entries with the **SEVERE** level.  
It means you can hardly debug Roboconf with logs with a normal Maven build.

When you want to debug a specific test (suite), you can **temporarily** enable more
precise logs. Edit the *build-logging.properties* file at the root of the **roboconf-platform**
project. As an example, to see the log outputs of the package *net.roboconf.something*...

```properties
# By default, we only output logs to the console
handlers = java.util.logging.ConsoleHandler

# Global log level
.level = SEVERE

# Custom log levels
net.roboconf.something.level = FINEST

# Update the level for the console output
java.util.logging.ConsoleHandler.level = FINEST
```

> Do not forget to revert your changes to this file before committing.  
> Or add it to the *.gitignore* file.


## Tip: redirecting Maven logs into a file

This may seem trivial...  
On Linux systems, `mvn clean test > my-file.txt` should do the job.  
Except that sometimes, it does not. For some reason, logs are sometimes only redirected to
the console.

You can achieve the expected result with a specific Maven option.  
`mvn clean test -l my-file.txt` will redirect ALL the Maven (and logs) output in *my-file.txt*.

Notice that `mvn -X` is a different option.  
It is not used to debug the built module but to debug Maven itself.


## Tip: running a specific test with Maven

`mvn clean test` will execute all the tests of a given Maven module.  
`mvn clean test -Dtest=MyTest` will execute tests contained in the *MyTest* test class.  
`mvn clean test -Dtest=MyTest#myMethod` will execute the *myMethod* test contained in the *MyTest* test class.

Please, refer to the [documentation of the Maven Surefire plug-in](http://maven.apache.org/surefire/maven-surefire-plugin/examples/single-test.html)
for more details.    


## Tip: debugging Karaf

Karaf supports launching with JVM arguments to enable remote debug.  
Please, refer to [the official Karaf documentation](https://karaf.apache.org/manual/latest/developers-guide/debugging.html) for more information.


## Tip: create your own handy project

Although Roboconf is based on OSGi, it perfectly works in a simple JVM.  
Therefore, you can create your own Java project that depends on all the bundles you need.
Obviously, such a project will not benefit from OSGi features, but it will be enough to
debug the code. It will also not benefit from iPojo features. It means you will have to
inject plug-ins in the agent by hand. Same thing for the target handlers in the DM.

You can find an example of such a project in the [debug-sample](https://github.com/vincent-zurczak/roboconf-debug-sample).  
When you have an **Agent** or a **Manager** object, you can inject whatever you want in it.
