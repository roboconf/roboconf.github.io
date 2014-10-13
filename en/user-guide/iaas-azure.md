---
title: "Microsoft Azure Support"
layout: page
id: "ug.snapshot.iaas-azure"
menus: [ "users", "user-guide" ]
---

Roboconf has a IaaS implementation for Microsoft Azure.  
It only supports the creation of *compute* VMs.

Every new VM is associated with a public IP address.  
This address will be used by other components which resolve their dependencies through Roboconf.

Sample **iaas.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for Azure
iaas.type = azure

# Credentials to connect
azure.key.store.file =
azure.key.store.password =
azure.subscription.id	=

# VM configuration
azure.create.cloud.service.template	=
azure.create.deployment.template =
azure.location =
azure.vm.size	=
azure.vm.template	=
```

Here is a complete description of the parameters for Microsoft Azure.

| Property | Description | Default | Mandatory
| --- | --- | --- | --- |
| iaas.type | Determines the IaaS plugin to be used | none, must be "azure" | yes |
| azure.key.store.file | Path to [JKS Keystore][jks] file (to create this file, see I) | none | yes |
| azure.key.store.password | Keystore password | none | yes |
| azure.subscription.id | Subscription ID of an Azure account using value of "azure.key.store.file" parameter as credential | none | yes |
| azure.create.cloud.service.template | Path to a xml template file containing the "Body Request" used to submit to the Azure REST API for creating an Azure Cloud service (see II for more details) | none | yes |
| azure.create.deployment.template | Path to a xml template file containing the "Body Request" used to submit to the Azure REST API for creating a VM deployment on the Cloud service designated by value of "azure.create.cloud.service.template" parameter (see III for more details) | none | yes |
| azure.location | The Azure region chosen for both Cloud service and VM deployment (e.g. West Europe) | none | yes |
| azure.vm.size | The size of VM (e.g. Small) | none | yes |
| azure.vm.template | The ID of the VM image used as a template for the VM | none | yes |


I. To create a Keystore, you would use a tool called [Keytool][keytool]. Here’s the command used to create a Keystore:

> `keytool -genkeypair -alias mydomain -keyalg RSA -keystore WindowsAzureKeyStore.jks -keysize 2048 -storepass "test123";`

What we’ve done is created a Keystore called “WindowsAzureKeyStore.jks” and set the password to access this as “test123”. You should see a file called “WindowsAzureKeyStore.jks” in your current Java bin folder (e.g. /usr/lib/jvm/java-1.7.0-openjdk-amd64/bin). Next we’ll export a certificate from this Keystore we just created. To do so, again we will use Keytool. Here’s the command used:

> `keytool -v -export -file ~/WindowsAzureSMAPI.cer -keystore WindowsAzureKeyStore.jks -alias mydomain`

Once this operation completes, we will get a “WindowsAzureSMAPI.cer” file in “~/”. Next step is to upload this certificate to the Windows Azure Portal. To do so, login into Windows Azure Portal at https://manage.windowsazure.com and click on “SETTINGS” tab and then go to “MANAGEMENT CERTIFICATES” tab and upload this “WindowsAzureSMAPI.cer” file there.

We're done !!!

II. Cloud service xml template file should be similar to follow:
```xml
<?xml version="1.0" encoding="utf-8" standalone="no"?>  
<CreateHostedService xmlns="http://schemas.microsoft.com/windowsazure">  
  <ServiceName>service-fake-name</ServiceName>  
  <Label>VGVzdCBmcm9tIEFQSQ==</Label>  
  <Description/>  
  <Location>West Europe</Location>  
</CreateHostedService>
```
  See full details about creating a Azure Cloud service [here][createcloud].

III. VM deployment xml template file should be similar to follow:
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<Deployment xmlns="http://schemas.microsoft.com/windowsazure" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
  <Name>deployment-fake-name</Name>
  <DeploymentSlot>Production</DeploymentSlot>
  <Label>label-fake-name</Label>      
  <RoleList>
    <Role>
      <RoleName>vm-fake-name</RoleName>
      <RoleType>PersistentVMRole</RoleType>      
      <ConfigurationSets>
        <ConfigurationSet i:type="LinuxProvisioningConfigurationSet">
          <ConfigurationSetType>LinuxProvisioningConfiguration</ConfigurationSetType>
          <HostName>vm-fake-host-name</HostName>
          <UserName>username</UserName> 
          <UserPassword>password</UserPassword> 
          <DisableSshPasswordAuthentication>false</DisableSshPasswordAuthentication>           
          <CustomData>aXBNZXNzYWdpbmdTZXJ2ZXI9NTQuNzIuMjIwLjE2MgphcHBsaWNhdGlvbk5hbWU9aW90c3Rvcm0KY2hhbm5lbE5hbWU9dm1henVyZW1vc3F1aXR0bwo=</CustomData>
        </ConfigurationSet>        
        <ConfigurationSet> 
          <ConfigurationSetType>NetworkConfiguration</ConfigurationSetType>
          <InputEndpoints>
            <InputEndpoint>
              <LocalPort>22</LocalPort>
              <Name>SSH</Name>
              <Port>22</Port>
              <Protocol>tcp</Protocol>
            </InputEndpoint>
	          <InputEndpoint>          
              <LocalPort>8080</LocalPort>
              <Name>Tomcat</Name>
              <Port>8080</Port>
              <Protocol>tcp</Protocol>
            </InputEndpoint>
          </InputEndpoints>
        </ConfigurationSet>
      </ConfigurationSets>
      <OSVirtualHardDisk>
        <HostCaching>ReadWrite</HostCaching>    
        <SourceImageName>vm-template</SourceImageName>
      </OSVirtualHardDisk>      
      <RoleSize>Small</RoleSize>
      <ProvisionGuestAgent>true</ProvisionGuestAgent>
    </Role>
  </RoleList>
</Deployment>
```
See full details about creating a VM deployment on Azure [here][vmdeployment].

[jks]: http://en.wikipedia.org/wiki/Keystore
[keytool]: http://docs.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html
[createcloud]: http://msdn.microsoft.com/library/azure/gg441304.aspx
[vmdeployment]: http://msdn.microsoft.com/en-us/library/azure/jj157194.aspx
