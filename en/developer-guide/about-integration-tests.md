---
title: "About Integration Tests"
layout: page
cat: "dg-snapshot"
id: "about-integration-tests"
menus: [ "developers", "developer-guide" ]
---

Roboconf has two kinds of tests.
  
* Unit tests rely on JUnit and fairly easy to understand.
* Integration tests launch real Karaf distributions and executes scenarios.


## Integration Tests

Integration tests rely on [PAX-Exam](https://ops4j1.jira.com/wiki/display/PAXEXAM3/Pax+Exam).  
They are located in **miscellaneous/roboconf-integration-tests...** modules. It is always good to write such tests, as they
validate our bundles behavior in an OSGi environment. Not only PAX-Exam runs these tests, but it also allow
to control the Karaf distributions (configuration files, which bundles to deploy, etc).

Here is a short description of the Maven IT modules.

* The `roboconf-integration-tests-commons` module defines classes used in other integration tests.
* The `roboconf-integration-tests-agent` module includes integration tests that imply the Karaf distribution for the agent.
* The `roboconf-integration-tests-dm` module includes integration tests that imply the Karaf distribution for the DM.
* The `roboconf-integration-tests-dm-with-agents-in-memory` module includes integration tests that imply the Karaf distribution for the DM
with agents running in memory.

Every module that include tests matches a different (configured) Karaf installation.  
In these modules, packages named `net.roboconf.integration...probes` packages contain abstract test classes for **paxrunner** tests.  
In particular, they define the Karaf distribution to use.

There are 2 kinds of integration tests.

* **Probe-based**: these tests are wrapped into a dynamic bundle that is deployed and executed INSIDE Karaf.
Such tests are useful to verify assertions on internal bundle objects.
* **Server-based**: these tests launch Karaf distributions but
execute tests OUTSIDE the container. They are used as an example to verify the DM's web socket, the REST API
and the Karaf console work as expected.

> IT modules only contains test classes. They are not deployed on Maven Central.  
> They are not part of the default build. To run them, use `mvn clean install -P run-integration-tests`


## The PAX Probe

This section explains a little more how **probe-based** tests work.  
Theses tests...

1. ... launch real OSG runtime platforms (here, Roboconf's Karaf distributions).
2. ... install and configure whatever we need in the platform (bundles, configuration files).
3. ... wrap all the test classes into a unique bundle (the probe) and deploy it in Karaf.
4. ... execute the test classes inside the OSGi container.

So, all the test classes are packaged together into a bundle that is generated on the fly by PAX-Exam.
This bundle is called the **probe**. It can be configured by test classes within the method annotated
with **@ProbeBuilder**. What is important is to understand that the probe's customization affects all
the test classes. So, people must be careful when they add or modify the probe's configuration.

Adding classes to the probe (*addTest*) should be reserved for internal classes, that is to say those that
are not exported by bundles. Other ones should be automatically resolved by the framework. Indeed, it is
possible to specify OSGi directives through the *setHeader* method. By default, there is a dynamic import
directive set to \*. It means the probe can automatically import all the classes other bundles export (make public). 

It was once *discussed* the possibility of [having one probe per test](https://github.com/roboconf/roboconf-platform/issues/413).  
But we dropped the idea as nothing in PAX-Exam was planned for this. If for any reason, we could not, one day,
be able to make coexist some test classes, then we would have to create a new Maven module to separate integration
tests. Hopefully, there are very few chances for this to happen.
