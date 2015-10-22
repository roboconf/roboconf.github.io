---
title: "Tutorial - First Deployment in the Cloud - 3/4"
layout: page
cat: "ug-snapshot"
id: "tutorial-first-deployment-in-the-cloud-3"
menus: [ "users", "user-guide", "Snapshot" ]
---

## Deploying the Application

Take the application that was given in the first tutorial.  
As a reminder, it is available [here](https://bintray.com/artifact/download/roboconf/roboconf-tutorial-samples/lamp-webapp-bash-0.2.0-1.0.zip).

Extract it and bring it the following modifications:

1. Change the application name in **descriptor/application.properties**.  
This will prevent name conflicts with the previous application.

2. Replace **graph/VM/target.properties** by the one you created for AWS.

3. Zip the application's directory.  
Compare the archive's structure with the original's one to make sure it is valid.

4. In the DM's command line interface, start the **roboconf-target-iaas-ec2** bundle.  
As a reminder, you must retrieve the bundle identifier with the **bundle:list** command, and then execute
**bundle:start id**, where *id* is the bundle identifier. The Roboconf extension in charge of Amazon Web Services
deployments is now activated.

You can now deploy your new application with roboconf's web administration.
In the same way you did it *in memory*, play with the life cycle of the components. Make sure virtual machines
are successfully created and that the components are installed correctly.

The most simple solution to check everything works is to connect to the load balancer. Get its IP address in Amazon's EC2 console.
Then, open your web browser and connect to the 80 port. The web application should appear. If you deployed two instances of the
web application, you should verify that the requests are correctly balanced.

At the end, stop all the machines with Roboconf's web administration.  
Make sure all the VM instances were destroyed in Amazon's web console.

For those who want to go deeper, additional exercises are available in [the last step](tutorial-first-deployment-in-the-cloud-4.html).
