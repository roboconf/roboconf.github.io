---
title: "Toubles with Installation"
layout: page
id: "ug.0.1.troubles-installation"
menus: [ "users", "user-guide" ]
---

These page gives solutions to common troubles people may encounter while installing Roboconf.  

## Installing the DM on Tomcat @ Ubuntu

If you decided to install the Deployment Manager (DM) on a Tomcat server, and
that this Tomcat was installed from Ubuntu's repositories, then you may encounter errors
during the deployment of the DM.

The symptoms are:

* You installed and started Tomat. http://localhost:8080 shows you something.
* You installed the DM's WAR file, but an error occurred during the start phase.

What happens is that Tomcat is run by the system as another user.  
It may result in permissions errors. And if you defined the **ROBOCONF_DM_DIR**
environment variable in your profile, Tomcat will most likely not see it.

To solve this, follow the next steps.

* Type in *sudo gedit /etc/default/tomcat6*
* Note the user and group names associated with the server.
* At the end of the file, define the **ROBOCONF_DM_DIR** environment variable.

``` properties
# Add environment variables for web applications
ROBOCONF_DM_DIR=/some/directory
```

<!-- -->
* Save and close the file.
* Make sure /some/directory exists and has read and write permissions for the Tomcat user.
* Restart Tomcat. *sudo /etc/init.d/tomcat6 restart*

Make another try to deploy and start the DM.  
This time, it should work.

Notice this is not a bug in the Deployment Manager.  
This is pure administration system, related to Ubuntu packages for Tomcat. For a development mode,
it may be better to install Tomcat manually (download the ZIP on the web site, unzip it...).