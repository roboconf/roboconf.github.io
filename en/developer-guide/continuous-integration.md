---
title: "Continuous Integration"
layout: page
cat: "dg-snapshot"
id: "continuous-integration"
menus: [ "developers", "developer-guide" ]
---

Continuous Integration (CI) is applied to almost all the Git repositories of Roboconf.  
On these repositories, every commit triggers a build that will compile the code and run the tests.

CI is handled by [Travis](https://travis-ci.org/).  
The build is configured through a **.travis.yml** file, located at the root of the Git repository.

Our Java projects are generally built against 3 JDK: Oracle JDK 7, OpenJDK 7 and Oracle JDK 8.  
This kind of features is directly handled by Travis.


## Build Scenario

1. Clone the repository and run **mvn clean install**.
2. The Maven build is configured to run some checks.
3. Artifacts may eventually be deployed.

The checks include:

* Checkstyle verifications (verify the code is well-formed).
* Dependencies analysis (to avoid cycles and version conflicts).

They rely on some resources.  
To avoid another project (and circular dependencies issues), these resources are hosted statically on Roboconf's web site.  
They are located under the **/resources/build/** directory.


## Deployment and Code Coverage

Some actions may be performed in case of successful build.  

* **Code coverage analysis** is handled by [Coveralls](https://coveralls.io/).
* **Deployment** of the built artifacts to a Maven repository (hosted by [Sonatype](http://www.sonatype.org/)).

Since we build against 3 JDKs, and that we do not want to perform these actions twice per build, we only
run them for the OpenJDK 7.

The Maven deployment is run by the **mvn deploy** command.  
The Maven settings (where do we upload the artifacts, with which credentials) are specified [here](/resources/build/settings.xml).  
The CI server copies this *settings.xml* file and uses it at the end of the build to upload artifacts.

*env.USER_ID* and *env.USER_PWD* are replaced by the values that were specified in [Travis Settings](http://docs.travis-ci.com/user/environment-variables/).  
More exactly, they are defined in the repository settings on Travis. These values are made available to the build if and only if a commit occurs.
It means no artifact will be uploaded if a pull request is proposed. But it will run if a pull request is accepted.

Artifacts are uploaded to the **snapshots Maven repository**. So, they are not synchronized with Maven Central.  
These artifacts have neither Javadoc, nor sources archives. And they are not signed.  
This is not a problem for snapshots. But this would not be suitable for a release.


## Build Matrix for the Platform

[Roboconf-platform](https://github.com/roboconf/roboconf-platform) has the most complex build.  
It follows what was explained in the previous lines. However, this section gives some additional
information about its build matrix.

* Oracle JDK 7: simple build (`mvn clean install`).
* Oracle JDK 8: simple build with a profile to customize Javadoc checks.
* Open JDK 7: a first build verifies code coverage metrics (Cobertura + Coveralls) and deploys snapshot artifacts on Sonatype.
* Open JDK 7: a second build is in charge of running integration tests (but not unit tests, as other builds already do it).


## Build Outputs

Build results can be checked on [Travis](https://travis-ci.org/)'s web site.  
In the case of **roboconf-platform**, the outputs are so big we also configured the Maven build to hide basic log entries.
Otherwise, the console output is truncated by Travis and this is a problem in case of build failure.


## Other Projects

* Most of the Java projects have continuous integration and are similar to what is done for the platform
(in less complex).

* The web administration is built on Travis CI and uses NPM and Gulp to run integration tests, verify the code
formatting and so on. On success, the CI uploads a zipped distribution of the application on 
[Bintray](https://dl.bintray.com/roboconf/roboconf-web-administration/all/).

* The system installers are built on Travis CI.  
Scripts allow to verify assertions on the installers. On success, they are upload on both
Sonatype's snapshot repository and Bintray.

* The Docker images are built automatically by Travis CI.  
There are test scripts that are run and used to verify the images work correctly.
They are NOT pushed automatically on Dockerhub or anywhere else.
