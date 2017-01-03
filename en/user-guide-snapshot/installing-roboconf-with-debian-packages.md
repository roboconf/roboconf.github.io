---
title: "Installing Roboconf with Debian Packages"
layout: page
cat: "ug-snapshot"
id: "installing-roboconf-with-debian-packages"
menus: [ "users", "user-guide", "Snapshot" ]
---

> Notice these packages may ask questions.  
> This prevents from having to configure Roboconf after the installation.

## Releases

Released Debian packages for Roboconf are hosted by [Bintray](https://bintray.com/roboconf/roboconf-debian-packages).  
To install the DM or agents with these packages, follow this procedure.

First, you need to add our Debian repository into your repo list.  
We here assume you are logged in as an administrator.

```bash
# If you do not have them installed...
# Install https transport for APT and wget.
apt-get install apt-transport-https wget

# "jessie" is the Debian version we tested our package on (~ Ubuntu 14.04).
echo "deb https://dl.bintray.com/v1/content/roboconf/roboconf-debian-packages jessie main" >> /etc/apt/sources.list

# Add the SSH key.
wget --quiet -O - "https://bintray.com/user/downloadSubjectPublicKey?username=bintray" | apt-key add -

# Update the list of packages.
apt-get update

exit
```

Then, run...

```
sudo apt-get install roboconf-dm
```

... to install Roboconf's DM and...

```
sudo apt-get install roboconf-agent
```

... to install a Roboconf agent.


## Snapshots

Snapshot packages are available on both Sonatype and Bintray.  
On Bintray, use the **roboconf-debian-packages-unstable** repository instead of **roboconf-debian-packages**.

You can also download them from 
[our Maven snapshots repository](https://oss.sonatype.org/content/repositories/snapshots/net/roboconf/),
which is hosted by Sonatype.  
Once available on your system, run one of the following commands to install the DEB file.

```bash
sudo apt-get update
sudo dpkg -i your.deb
sudo apt-get -f install
```

Or you can use...

```bash
sudo apt-get update
sudo apt-get install gdebi
sudo gedbi your.deb
```


## Configuration

Configuration files are available under **/etc/roboconf-dm** or **/etc/roboconf-agent** (KARAF\_ETC).  
The data are located under **/var/lib/roboconf-dm** or **/var/lib/roboconf-agent** (KARAF\_DATA).  
The binaries are located under **/opt/roboconf-dm** or **/opt/roboconf-agent** (KARAF\_HOME and KARAF\_BASE).  
Logs are located under **/var/log/roboconf-dm** or **/var/log/roboconf-agent** (set through the logging configuration).

Once installed, please refer to the configuration pages:

* [Configuring the DM](configuring-the-deployment-manager.html)
* [Configuring an Agent](configuring-an-agent.html)

## Troubleshooting

On Ubuntu 16.x, some releases of Roboconf can cause dependency problems, due to openjdk 7 which is no more supported.
OpenJdk 7 still can be installed, as follows:

```
sudo add-apt-repository ppa:openjdk-r/ppa  
sudo apt-get update   
sudo apt-get install openjdk-7-jre
```
