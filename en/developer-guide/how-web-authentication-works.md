---
title: "How Web Authentication Works"
layout: page
cat: "dg-snapshot"
id: "how-web-authentication-works"
menus: [ "developers", "developer-guide", "Snapshot" ]
---

Unlike authentication for the command-line interface (CLI), which is natively supported
by Karaf's JAAS, web authentication is specific to Roboconf's web administration. This page
explains how it works.

> It is strongly recommended to enabled HTTPS along with web authentication.


## Server Side

First, authentication is disabled by default.  
It can be enabled by editing the configuration for REST services (no restart is required
when the configuration is updated). Once enabled, a servlet filter is used to filter all
the requests sent to our REST API and web socket.

All the requests should have a cookie set.  
This cookie contains a session ID. A Java class is used to store the known sessions. If the
cookie's session is found in the class's instance, the request can go on. Otherwise, a 403 error is sent.

Login and logout are managed by the REST API.  
Logging in requires a user name and a password. The authentication itself is delegated to
Karaf's JAAS (exactly like CLI authentication). If it succeeds, a session ID is generated
and returned to the client as a cookie. If it fails, a 403 error is returned.

Logging out means deleting the stored session ID.

> A user may log in several times from different browsers.  
> A different session ID will be registered for each browser.

By default, the returned cookie is valid for all the domain.  
The cookie's validity is set until the web browser is closed. On the server side, there is also
a validity period, which is hard-coded. A session ID is stored only for a given period.
Which means it is not possible to by-pass the server settings. And not matter what the cookies say,
the server manages the sessions' validity.

> Very few methods and operations can by-pass the request filter to reach their target.
> Only OPTIONS invocations, logging in and getting the user language preference do not need authentication.  


## Client Side

The web administration uses Angular JS and Restangular to manage REST invocations.  
The main issue with authentication is CORS (cross-origin resource sharing). Indeed,
the web administration is associated with one domain, while the REST API is associated
with another one. And cookies, by definition, are associated with the main domain.

So, the web administration solves this issue by using the **withAuthority** attribute (set to true).
It is passed in both **Restangular** and **$http** invocations.

The web administration is configured to dynamically determine whether it should display a login page or not.
During its initialization, it invokes a REST operation. If the server was configured to require authentication,
this invocation will fail and the AngularJS application will redirect to the login page.

In case of successful login, a cookie will be stored in the web browser.  
It will be sent automatically in every request sent to the REST API. A logout menu will also be available
when this cookie exists.

Logging out not only invokes the REST operation to log out (and thus destroy the stored session on the server
side), but it will also delete the cookie stored in the web browser.


## Audit

When authentication is enabled, all the accesses are logged in a file.  
This achieved by the same servlet filter. It is configured as a logger. Only the log message
is formatted internally by Roboconf classes.


## Miscellaneous

Enabling authentication in the web administration has no impact on the HTTP messaging.   
The servlet filter is only applied for the bundle that contains the REST services and the web socket.
