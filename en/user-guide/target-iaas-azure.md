---
title: "Microsoft Azure Support"
layout: page
id: "ug.snapshot.target-iaas-azure"
menus: [ "users", "user-guide" ]
---

Roboconf has a target implementation for Microsoft Azure.  
It only supports the creation of *compute* VMs.

Every new VM is associated with a public IP address.  
This address will be used by other components which resolve their dependencies through Roboconf.

Sample **target.properties**.  
Just copy / paste and edit.

``` properties
# Configuration file for Azure
target.id = azure

# Credentials to connect
azure.key.store.file =
azure.key.store.password =
azure.subscription.id =

# VM configuration
azure.create.cloud.service.template =
azure.create.deployment.template =
azure.location =
azure.vm.size =
azure.vm.template =
```

Here is a complete description of the parameters for Microsoft Azure.

| Property | Description | Default | Mandatory
| --- | --- | --- | --- |
| target.id | Determines the target handler to use. | none, must be "azure" | yes |
| azure.key.store.file | Path to [JKS Key store][jks] file (see below for help). | none | yes |
| azure.key.store.password | Key store password. | none | yes |
| azure.subscription.id | Subscription ID of an Azure account using value of "azure.key.store.file" parameter as credential. | none | yes |
| azure.create.cloud.service.template | Path to a XML template file containing the "Body Request" used to submit to the Azure REST API for creating an Azure Cloud service (see below for help). | none | yes |
| azure.create.deployment.template | Path to a XML template file containing the "Body Request" used to submit to the Azure REST API for creating a VM deployment on the Cloud service designated by value of **azure.create.cloud.service.template** parameter (see below for more details). | none | yes |
| azure.location | The Azure region chosen for both Cloud service and VM deployment (e.g. West Europe). | none | yes |
| azure.vm.size | The VM size (e.g. Small). | none | yes |
| azure.vm.template | The ID of the VM image used as a template for the VM. | none | yes |

<br />
## Key Store

To create a key store, you can use a tool called [Keytool][keytool].  
Here is the command used to create a key store.

	keytool -genkeypair -alias mydomain -keyalg RSA -keystore WindowsAzureKeyStore.jks -keysize 2048 -storepass "test123";

What we have done is creating a key store called **WindowsAzureKeyStore.jks** and set its access password to **test123**. 
You should see a file called **WindowsAzureKeyStore.jks** in your current Java bin folder 
(e.g. */usr/lib/jvm/java-1.7.0-openjdk-amd64/bin*). Next, we need to export a certificate from this key store. To do so, 
we will once again use [Keytool][keytool]. Here is the command to use.

	keytool -v -export -file ~/WindowsAzureSMAPI.cer -keystore WindowsAzureKeyStore.jks -alias mydomain

Once this operation completes, we will get a **WindowsAzureSMAPI.cer** file under **~/**.  
The next (final) step consists in uploading this certificate to the Windows Azure Portal. To do so, login into the 
[Windows Azure Portal](https://manage.windowsazure.com), click **Settings** > **Management Certificates**
and upload the **WindowsAzureSMAPI.cer** file there.


## XML Template for Cloud Service

Cloud service's XML template file should be similar to the following...

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


## XML Template for VM deployment

VM Deployment's XML template file should be similar to the following...

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
