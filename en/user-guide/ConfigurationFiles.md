# Outline

An application, let's say "MyApp", should provide 3 directories:

descriptor/ contains the main Roboconf config file, application.properties

graph/ contains:
* a .graph file (whose name is specified in application.properties), that lists components and their dependencies (components can be software components to install, or VMs to deploy on).
* one sub-directory for each component listed in the .graph file, containing all the files necessary to deploy the component (eg. scripts, software packages, configuration files...)

instances/ contains a .instances file (whose name is specified in application.properties), that lists all instances for initial deployment (= to be deployed when starting the application for the 1st time).

MyApp/
├── descriptor
│   └── application.properties (main roboconf config file)
├── graph
│   ├── .graph file (describes components ans their dependencies)
│   ├── One directory for each component...
└── instances
    └── initial-deployment.instances (instances to deploy at startup)

# Example

Let's assume you wish to deploy an application called "MyApp", using bash scripts, on EC2 and OpenStack IaaS.

Roboconf configuration files should be organized as follows :

MyApp/
├── descriptor
│   └── application.properties
├── graph
│   ├── graph.graph
│   ├── VM_EC2
│   │   └── iaas.properties
│   │   ├── VM_Openstack
│   │   └── iaas.properties
│   └── MyApp
│       ├── files
│       └── script
│           ├── setup.sh
│           ├── start.sh
│           ├── stop.sh
│           └── update.sh
└── instances
    └── initial-deployment.instances

Content of "application.properties":

    application-name = MyApp
    application-qualifier = sample
    application-description = A sample application
    graph-entry-point = graph.graph
    instance-entry-point = initial-deployment.instances

Content of "graph.graph":

    # My app to deploy on the IaaS
    MyApp {
        alias: My test application;
        installer: bash;
        exports: ip;
    }

    # The VMs where to deploy the Wall application
    VM_EC2 {
        alias: Virtual Machine on Amazon EC2;
        installer: iaas;
        children: MyApp;
    }
    VM_Openstack {
        alias: Virtual Machine on Openstack;
        installer: iaas;
        children: MyApp;
    }

Content of "initial-deployment.instances":

    # Deploy on EC2 VM (called VM1)
    instanceof VM_EC2 {
        name: VM1;
        instanceof MyApp {
                name: MyApp_on_EC2;
        }
    }
    # Deploy on Openstack VM (called VM2)
    instanceof VM_Openstack {
        name: VM2;
        instanceof MyApp {
                name: MyApp_on_Openstack;
        }
    }

Content of VM_EC2/iaas.properties:

    iaasEndpoint            = eu-west-1.ec2.amazonaws.com
    iaasAccessKey           = YOUR_EC2_ACCESS_KEY
    iaasSecretKey           = YOUR_EC2_SECRET_KEY
    amiVmNode               = ami-YourAmiNumber
    vmInstanceType          = t1.micro
    sshKeyName              = YourSshKey
    securityGroupName       = YourSecurityGroup

