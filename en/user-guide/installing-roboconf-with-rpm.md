---
title: "Installing Roboconf with RPM"
layout: page
cat: "ug-last"
id: "installing-roboconf-with-rpm"
menus: [ "users", "user-guide" ]
---

## Releases

Roboconf has packages for RPM (Red Hat Release Manager). They are are hosted by [Bintray](https://bintray.com/roboconf/roboconf-rpm).  
To install the DM or agents with these packages, follow this procedure.

First, you need to add our RPM repository into your repo list.  
We here assume you are logged in as an administrator.

You can either...

```bash
# Download the repo file...
yum install -y wget
wget https://bintray.com/roboconf/roboconf-rpm/rpm -O bintray-roboconf-roboconf-rpm.repo

# ... and move it into YUM's directory
mv bintray-roboconf-roboconf-rpm.repo /etc/yum.repos.d/
```

... or copy the following content into **/etc/yum.repos.d/bintray-roboconf-roboconf-rpm.repo**...

```properties
#bintraybintray-roboconf-roboconf-rpm - packages by roboconf from Bintray
[bintray-roboconf-rpm]
name=bintray-roboconf-roboconf-rpm
baseurl=https://dl.bintray.com/roboconf/roboconf-rpm
gpgcheck=0
enabled=1
```

Then, run...

```
yum install roboconf-dm
```

... to install Roboconf's DM and...

```
yum install roboconf-agent
```

... to install a Roboconf agent.


## Snapshots

Snapshot packages are available on both Sonatype and Bintray.  
On Bintray, use the **roboconf-rpm-unstable** repository instead of **roboconf-rpm**.
 
You can download them from 
[our Maven snapshots repository](https://oss.sonatype.org/content/repositories/snapshots/net/roboconf/),
which is hosted by Sonatype.  
Once available on your system, run one of the following commands to install the RPM file.

```bash
# Install the Java version you want (optional)
yum install java-1.7.0-openjdk

# Install the RPM with its dependencies
yum install your.rpm
```


## Configuration

Configuration files are available under **/etc/roboconf-dm** or **/etc/roboconf-agent**.  
The data are located under **/var/lib/roboconf-dm** or **/var/lib/roboconf-agent** (KARAF\_DATA).  
The binaries are located under **/var/lib/roboconf-dm** or **/var/lib/roboconf-agent**.  
Logs are located under **/var/log/roboconf-dm** or **/var/log/roboconf-agent**.

Once installed, please refer to the configuration pages:

* [Configuring the DM](configuring-the-deployment-manager.html)
* [Configuring an Agent](configuring-an-agent.html)
