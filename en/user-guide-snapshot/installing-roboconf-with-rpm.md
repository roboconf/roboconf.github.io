---
title: "Installing Roboconf with RPM"
layout: page
cat: "ug-snapshot"
id: "installing-roboconf-with-debian-packages"
menus: [ "users", "user-guide", "Snapshot" ]
---

> Notice these packages may ask questions.  
> This prevents from having to configure Roboconf after the installation.


## Releases

Roboconf has packages for RPM (Red Hat Release Manager). They are are hosted by [Bintray](https://bintray.com/roboconf/roboconf-debian-packages).  
To install the DM or agents with these packages, follow this procedure.

First, you need to add our RPM repository into your repo list.

```bash
# todo
```

Then, run...

```
sudo yum install roboconf-dm
```

... to install Roboconf's DM and...

```
sudo yum install roboconf-agent
```

... to install a Roboconf agent.


## Snapshots

Snapshot packages are not hosted on Bintray.  
You will have to build and upload them manually. Once available on your system, run one
of the following commands to install the DEB file.


## Configuration

Configuration files are available under **/etc/roboconf-dm** or **/etc/roboconf-agent**.  
Logs are located under **/var/log/roboconf-dm** or **/var/log/roboconf-agent**.  
The binaries are located under **/var/lib/roboconf-dm** or **/var/lib/roboconf-agent**.

Once installed, please refer to the configuration pages:

* [Configuring the DM](configuring-the-deployment-manager.html)
* [Configuring an Agent](configuring-an-agent.html)
