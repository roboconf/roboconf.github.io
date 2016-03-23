---
title: "Installation Tips"
layout: page
cat: "ug-snapshot"
id: "installation-tips"
menus: [ "users", "user-guide", "Snapshot" ]
---

## Externalize Karaf directories

When using Roboconf in production environments, we strongly recommend you to
externalize Karaf's directories. If for any reason you had to install a new
version of Roboconf, your data would be preserved on the next restart.

More precisely, we suggest you define the following environment variables:

* **KARAF_ETC**: the location of your configuration files.  
Move the content of Karaf's **etc** directory there.

* **KARAF_DATA**: the location of Karaf and Roboconf's data.  
All the information managed by Roboconf about deployed applications is stored there.

Also, make sure **JAVA_HOME** is defined and points to a valid Java binary.  
Eventually, you may want to configure [the location of log files](configuring-the-loggers.html).

> Notice that when you use Debian and/or RPM packages,
> these practices are already set up.

You can refer to [Karaf's user guide](https://karaf.apache.org/manual/latest/users-guide/configuration.html)
for more details.


## Upgrade Karaf distributions

Major and minor releases of Roboconf may be delivered with new versions of Karaf.  
However, maintenance releases generally use the same. For such situations, users may want
to only update the Roboconf bundles instead of reinstalling everything.

For those who want to try such a procedure, here is how to proceed.  
We here consider **roboconf-dm** It works the same way with **roboconf-agent**.  
First, login to Karaf's command line.

```properties
# Start Karaf in interactive mode...
./karaf

# ... or connect to a running instance.
./client -u karaf
```

Uninstall the old version.

```properties
feature:uninstall roboconf-dm
```

Then, register the newly released Karaf feature for Roboconf.    
We here use a maintenance release (%v_SNAP%.1)

```properties
feature:repo-add http://repo1.maven.org/maven2/net/roboconf/roboconf-karaf-feature-dm/%v_SNAP%.1/roboconf-karaf-feature-dm-%v_SNAP%.1-features.xml
```

Eventually, install it.

```properties
feature:install roboconf-dm
```

Verify the used version is the right one (%v_SNAP%.1).

```properties
feature:list
```
