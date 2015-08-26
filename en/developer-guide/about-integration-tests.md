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

Integration tests rely on [PAX-Exam](https://ops4j1.jira.com/wiki/display/PAXEXAM3/Pax+Exam).  
They are located under **miscellaneous/integration-tests**. It is always good to write such tests, as they
validate our bundles behavior in an OSGi environment. Not only PAX-Exam runs these tests, but it also allow
to control the Karaf distributions (configuration files, which bundles to deploy, etc).

Here is a short description of the packages inside this Maven module.

* `net.roboconf.integration.probes` contains abstract test classes for **paxrunner** tests.  
In particular, they define the Karaf distributions we can use in these tests.

* `net.roboconf.integration.tests.paxrunner` contains **paxrunner** tests.  
These tests are wrapped into a dynamic bundle. They are then deployed and executed INSIDE Karaf.
Such tests are useful to verify assertions on internal bundle objects.
 
* `net.roboconf.integration.tests.servermode` contains tests that launch Karaf distributions but
execute tests OUTSIDE the container. They are used as an example to verify the websocket, the REST API
and the Karaf console work as expected. 

* `net.roboconf.integration.tests.internal` contains utility classes for integration tests.

> The **roboconf-integration-tests** bundle only contains test classes.  
> It is not deployed on Maven Central.
