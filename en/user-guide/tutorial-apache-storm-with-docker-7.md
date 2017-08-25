---
title: "Tutorial - Managing Apache Storm with Roboconf and Docker - Hints and Solutions"
layout: page
cat: "ug-last"
id: "tutoriel-apache-storm-et-docker-7"
menus: [ "users", "user-guide" ]
---

This page was added to provide some hints and solutions.  


## Version 1

Here is the graph to use for version 1.

<pre><code class="language-roboconf">
vm {
	installer: target;
	children: zookeeper, storm_nimbus, storm_worker, storm_ui, test_topology;
}

zookeeper {
	installer: script;
	exports: ip;
}

storm_nimbus {
	installer: script;
	exports: ip;
	imports: zookeeper.ip;
}

storm_worker {
	installer: script;
	exports: ip;
	imports: storm_nimbus.ip, zookeeper.ip;
}

storm_ui {
	installer: script;
	imports: storm_nimbus.ip;
}

test_topology {
	installer: script;
	imports: storm_nimbus.ip, storm_worker.ip;
}
</code></pre>

Here are the recipes for the **storm_worker** component.  
Other ones can be deduced from this example.

**deploy.sh**

```bash
#!/bin/sh
docker pull storm:${maven.storm.version}
```

**deploy.sh**

```bash
#!/bin/sh
docker run -d \
       --restart always \
       --name ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH} \
       --link zookeeper:zookeeper \
       --link nimbus:nimbus \
       storm:${maven.storm.version} storm supervisor
```

Notice we here use the identifier of a Roboconf instance as the container name.  
It will make things easier then to find the container name when we want to stop
a given Roboconf instance. ZooKeeper and Nimbus are a little bit different, since we
supposed there was only once instance of each (for version 1).

**stop.sh**

```bash
#!/bin/sh
docker kill ${ROBOCONF_CLEAN_REVERSED_INSTANCE_PATH}
```

No need of **undeploy.sh** or **update.sh**, for the moment.  
The only exception is **test_topology**, for which we would like the topology to be redistributed
over the Storm cluster every time a worker node appears or disappears. We use a **update.sh** script
for that. Other components do not need it.

```bash
#!/bin/sh
docker run -it --rm \
       --link nimbus:nimbus \
       storm:${maven.storm.version} \
       storm rebalance my-topology
```

Eventually, here is the tree of instances we can use.

<pre><code class="language-roboconf">
instance of vm {
	name: vm;

	instance of zookeeper {
		name: Zoo Keeper;
	}

	instance of storm_nimbus {
		name: Nimbus;
	}

	instance of storm_ui {
		name: UI;
	}
}

instance of vm {
	name: vm_worker 1;

	instance of storm_worker {
		name: worker;
	}
}

instance of vm {
	name: vm_worker 2;

	instance of storm_worker {
		name: worker;
	}
}
</code></pre>


## Version 2

Overall, the grapgh and the instances tree do not need to be modified.  
Changes focus on the recipes. Docker links must be deleted. And dependency IP addresses must be
injected when **storm_worker** and **storm_ui** components are started.

We can find inspiration in the way the Docker image for Storm was built.  
If we look at [the Dockerfile](https://github.com/31z4/storm-docker/blob/e20c50c9704ed64765ba80e6964df4c0c189be3e/1.1.0/Dockerfile),
we can see [the default command](https://github.com/31z4/storm-docker/blob/e20c50c9704ed64765ba80e6964df4c0c189be3e/1.1.0/docker-entrypoint.sh)
generates a configuration file. We can mimic this behavior for our recipes: generate a file from the information Roboconf provides and
mount this file as a container volume that will be used at runtime.


## Going further...

Until now, we made simple and considered there was only one instance of Nimbus and of ZooKeeper. We could
upgrade our application to support several instances of ZooKeeper (i.e. have a ZooKeeper cluster). About Nimbus,
Storm does not support a HA (high availability) configuration it. So, we have to stick with a single instance.
