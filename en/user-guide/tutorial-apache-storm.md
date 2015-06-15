---
title: "Tutorial - Apache Storm"
layout: page
cat: "ug-snapshot"
id: "tutorial-apache-storm"
menus: [ "users", "user-guide" ]
---

## Introduction

Apache Storm allows to run "topologies" (graphs of computation) on a "storm cluster".

A storm cluster is made of several nodes, including:

- A master node, called "Nimbus".
- Slave nodes, called "supervisor nodes" or "workers" (in fact, workers, that do the real computation, are running on supervisor nodes).
- Coordination nodes, based on Apache Zookeeper.

<img src="/resources/img/tutorial-storm-cluster.png" alt="Apache storm cluster" class="gs" />

A storm topology (the graph of computation) is a kind of real-time computation "stream". Data tuples are exchanged between computation units, called "spouts" and "bolts". Spouts are unbounded sources of tuples (they provide data), and bolts issue tuple transformations (they perform calculations).

<img src="/resources/img/tutorial-storm-topology.png" alt="Apache storm topology" class="gs" />

Storm topologies are packaged in a jar file, which is then submitted to the "Nimbus" node (the master node of the storm cluster). Then, Storm distributes the computation units (spouts and/or bolts) on the cluster "worker" nodes.

<img src="/resources/img/tutorial-storm-submit.png" alt="Apache storm topology submission" class="gs" />

In this tutorial, we will use Roboconf to deploy a storm cluster on multiple VMs (in fact, on multiple Docker containers - but switching to IaaS VMs is merely a configuration issue).

<img src="/resources/img/tutorial-storm-multivm.png" alt="Apache storm on multiple VMs" class="gs" />
